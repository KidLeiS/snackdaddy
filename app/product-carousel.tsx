"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const flavours = [
  {
    name: "Chai Chocolate",
    note: "Cacao depth. Chai warmth.",
    image: "/products/br-oats-chai-chocolate.webp",
  },
  {
    name: "Tiramisu",
    note: "Coffee shop energy. Breakfast credentials.",
    image: "/products/br-oats-tiramisu.webp",
  },
  {
    name: "Banana Bread",
    note: "Soft spice. Zero baking required.",
    image: "/products/br-oats-banana-bread.webp",
  },
  {
    name: "PB&J",
    note: "Salty, jammy, gone by nine.",
    image: "/products/br-oats-pbj.webp",
  },
] as const;

export function ProductCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStart = useRef<number | null>(null);

  const move = (direction: 1 | -1) => {
    setActive((current) => (current + direction + flavours.length) % flavours.length);
  };

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => move(1), 4800);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="product-carousel"
      aria-roledescription="carousel"
      aria-label="BR-OATS flavours"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={(event) => { pointerStart.current = event.clientX; }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const distance = event.clientX - pointerStart.current;
        if (Math.abs(distance) > 38) move(distance < 0 ? 1 : -1);
        pointerStart.current = null;
      }}
    >
      <div className="carousel-images">
        {flavours.map((flavour, index) => (
          <Image
            className={index === active ? "product-image is-active" : "product-image"}
            key={flavour.name}
            src={flavour.image}
            alt={`BR-OATS ${flavour.name} overnight oats tub`}
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
        onClick={() => move(1)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        }}
      />

      <div className="flavour-caption" aria-live="polite">
        <p><span>0{active + 1}</span> / 04</p>
        <div>
          <strong>{flavours[active].name}</strong>
          <small>{flavours[active].note}</small>
        </div>
      </div>
    </div>
  );
}
