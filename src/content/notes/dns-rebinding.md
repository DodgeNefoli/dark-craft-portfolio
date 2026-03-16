---
title: DNS Rebinding Attack
date: 2026-03-08
readTime: 4 min
category: note
description: Exploiting DNS to bypass same-origin policy and access internal services.
icon: 🌐
coverImage: ""
---

# DNS Rebinding Attack

DNS rebinding is a technique that allows an attacker to bypass the browser's same-origin policy by manipulating DNS responses.

## How It Works

1. Victim visits `attacker.com`
2. DNS resolves to attacker's server, serves malicious JS
3. TTL expires, DNS re-resolves to `127.0.0.1` or internal IP
4. Browser still considers it `attacker.com` — same origin
5. JS now has access to internal services

## Real-World Impact

- Access IoT devices on local network
- Read data from internal APIs
- Interact with cloud metadata endpoints (169.254.169.254)

## Defense

- Validate `Host` headers on internal services
- Use HTTPS with proper certificates
- Implement DNS pinning where possible
