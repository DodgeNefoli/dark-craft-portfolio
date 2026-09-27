import { useState } from "react";
import { resolveContentAssetUrl } from "@/lib/content";

interface PostCoverProps {
  imagePath: string;
  fallback: string;
  alt: string;
  className: string;
  imageClassName?: string;
}

const PostCover = ({ imagePath, fallback, alt, className, imageClassName = "" }: PostCoverProps) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <span className={className}>
      {imagePath && !imageFailed ? (
        <img
          src={resolveContentAssetUrl(imagePath)}
          alt={alt}
          className={imageClassName}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        fallback
      )}
    </span>
  );
};

export default PostCover;