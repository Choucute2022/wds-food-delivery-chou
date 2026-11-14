"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";

type LazyImageProps = ImageProps & {
  /** How far outside the viewport the image may start loading. */
  rootMargin?: string;
};

/**
 * Defers below-the-fold images until they are close to the viewport. Native
 * `loading="lazy"` is not enough for Lighthouse: on a fast local connection
 * Chrome loads everything eagerly, and Lantern then models those downloads
 * competing with the hero image, which delays LCP.
 *
 * Always placed inside a relative container (the image uses `fill`).
 */
export function LazyImage({ alt, rootMargin = "200px", ...props }: LazyImageProps) {
  const frameRef = useRef<HTMLSpanElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;

    if (!frame || shouldLoad) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(frame);

    return () => observer.disconnect();
  }, [rootMargin, shouldLoad]);

  return (
    <span ref={frameRef} className="absolute inset-0 block">
      {shouldLoad ? <Image alt={alt} {...props} /> : null}
    </span>
  );
}
