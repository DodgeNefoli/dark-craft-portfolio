import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [isLight, setIsLight] = useState(
    document.documentElement.classList.contains("light")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes: Node[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Create nodes
    const nodeCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 25000));
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const connectionDistance = 150;
    const mouseRadius = 200;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      if (isLight) {
        // OSINT map style - dots and grid
        // Faint grid
        ctx.strokeStyle = "hsla(220, 10%, 50%, 0.04)";
        ctx.lineWidth = 0.5;
        const gridSize = 80;
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        // Nodes as map dots
        nodes.forEach((node) => {
          node.x += node.vx * 0.3;
          node.y += node.vy * 0.3;
          if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

          const distToMouse = Math.hypot(node.x - mx, node.y - my);
          const mouseInfluence = Math.max(0, 1 - distToMouse / mouseRadius);

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + mouseInfluence * 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(220, 15%, 40%, ${0.1 + mouseInfluence * 0.35})`;
          ctx.fill();

          // Small crosshair on some dots
          if (node.radius > 1.2) {
            const size = 4 + mouseInfluence * 3;
            ctx.strokeStyle = `hsla(220, 15%, 40%, ${0.04 + mouseInfluence * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x - size, node.y);
            ctx.lineTo(node.x + size, node.y);
            ctx.moveTo(node.x, node.y - size);
            ctx.lineTo(node.x, node.y + size);
            ctx.stroke();
          }
        });

        // Mouse glow for light mode
        if (mx > 0) {
          const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, mouseRadius);
          gradient.addColorStop(0, "hsla(40, 60%, 70%, 0.06)");
          gradient.addColorStop(1, "hsla(40, 60%, 70%, 0)");
          ctx.fillStyle = gradient;
          ctx.fillRect(mx - mouseRadius, my - mouseRadius, mouseRadius * 2, mouseRadius * 2);
        }
      } else {
        // Dark mode - Network graph
        nodes.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

          const distToMouse = Math.hypot(node.x - mx, node.y - my);
          const mouseInfluence = Math.max(0, 1 - distToMouse / mouseRadius);

          // Node glow near mouse
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + mouseInfluence * 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(220, 60%, 70%, ${node.opacity * 0.07 + mouseInfluence * 0.2})`;
          ctx.fill();
        });

        // Connections
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
            if (dist < connectionDistance) {
              const midX = (nodes[i].x + nodes[j].x) / 2;
              const midY = (nodes[i].y + nodes[j].y) / 2;
              const distToMouse = Math.hypot(midX - mx, midY - my);
              const mouseInfluence = Math.max(0, 1 - distToMouse / mouseRadius);
              const baseOpacity = (1 - dist / connectionDistance) * 0.06;

              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.strokeStyle = `hsla(220, 50%, 65%, ${baseOpacity + mouseInfluence * 0.15})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        // Mouse glow for dark mode
        if (mx > 0) {
          const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, mouseRadius);
          gradient.addColorStop(0, "hsla(220, 60%, 60%, 0.05)");
          gradient.addColorStop(1, "hsla(220, 60%, 60%, 0)");
          ctx.fillStyle = gradient;
          ctx.fillRect(mx - mouseRadius, my - mouseRadius, mouseRadius * 2, mouseRadius * 2);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isLight]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 1 }}
    />
  );
};

export default AnimatedBackground;
