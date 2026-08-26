"use client";

import { useState } from "react";
import Image from "next/image";

// Image dengan skeleton shimmer sampai foto ke-load.
function ShimmerImage({ src, alt, width, height, sizes, className }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <span className={`img-shimmer block ${loaded ? "loaded" : ""} ${className || ""}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}

export default ShimmerImage;
