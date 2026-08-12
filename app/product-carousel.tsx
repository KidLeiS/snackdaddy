"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const flavours = [
  {
    name: "Chai Chocolate",
    image: "/products/br-oats-chai-chocolate-clear.webp",
    scale: "scale-chai",
  },
  {
    name: "Tiramisu",
    image: "/products/br-oats-tiramisu-clear.webp",
    scale: "scale-standard",
  },
  {
    name: "Banana Bread",
    image: "/products/br-oats-banana-bread-clear.webp",
    scale: "scale-standard",
  },
  {
    name: "PB&J",
    image: "/products/br-oats-pbj-clear.webp",
    scale: "scale-standard",
  },
] as const;

export function ProductCarousel() {
  const [active, setActive] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const swiped = useRef(false);

  const move = useCallback((direction: 1 | -1) => {
    setActive((current) => (current + direction + flavours.length) % flavours.length);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => move(1), 2000);
    return () => window.clearInterval(timer);
  }, [move]);

  return (
    <div
      className="product-carousel"
      aria-roledescription="carousel"
      aria-label="BR-OATS flavours"
      onPointerDown={(event) => {
        pointerStart.current = event.clientX;
        swiped.current = false;
      }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const distance = event.clientX - pointerStart.current;
        if (Math.abs(distance) > 38) {
          swiped.current = true;
          move(distance < 0 ? 1 : -1);
        }
        pointerStart.current = null;
      }}
      onPointerCancel={() => {
        pointerStart.current = null;
        swiped.current = false;
      }}
    >
      <div className="carousel-images">
        {flavours.map((flavour, index) => (
          <Image
            className={index === active ? `product-image ${flavour.scale} is-active` : `product-image ${flavour.scale}`}
            key={flavour.name}
            src={flavour.image}
            alt={index === active ? `BR-OATS ${flavour.name} overnight oats tub` : ""}
            aria-hidden={index !== active}
            fill
            sizes="(max-width: 900px) 92vw, 48vw"
            preload={index === 0}
          />
        ))}
      </div>

      <button
        className="carousel-hit-area"
        type="button"
        aria-label={`Showing ${flavours[active].name}. Show next flavour.`}
        onClick={() => {
          if (swiped.current) {
            swiped.current = false;
            return;
          }
          move(1);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        }}
      />
    </div>
  );
}
