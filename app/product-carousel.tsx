"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const flavours = [
  {
    name: "Chai Chocolate",
    note: "Cacao depth. Chai warmth.",
    image: "/products/br-oats-chai-chocolate-clear.webp",
    scale: "scale-chai",
  },
  {
    name: "Tiramisu",
    note: "Coffee shop energy. Breakfast credentials.",
    image: "/products/br-oats-tiramisu-clear.webp",
    scale: "scale-standard",
  },
  {
    name: "Banana Bread",
    note: "Soft spice. Zero baking required.",
    image: "/products/br-oats-banana-bread-clear.webp",
    scale: "scale-standard",
  },
  {
    name: "PB&J",
    note: "Salty, jammy, gone by nine.",
    image: "/products/br-oats-pbj-clear.webp",
    scale: "scale-standard",
  },
] as const;

export function ProductCarousel() {
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const swiped = useRef(false);

  const move = useCallback((direction: 1 | -1) => {
    setActive((current) => (current + direction + flavours.length) % flavours.length);
  }, []);

  useEffect(() => {
    if (userPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => move(1), 3600);
    return () => window.clearInterval(timer);
  }, [move, userPaused]);

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

      <div className="flavour-caption" aria-live={userPaused ? "polite" : "off"}>
        <p><span>0{active + 1}</span> / 04</p>
        <div className="flavour-copy" key={flavours[active].name}>
          <strong>{flavours[active].name}</strong>
          <small>{flavours[active].note}</small>
        </div>
        <button
          className="carousel-pause"
          type="button"
          aria-label={userPaused ? "Resume automatic flavour rotation" : "Pause automatic flavour rotation"}
          aria-pressed={userPaused}
          onClick={() => setUserPaused((current) => !current)}
        >
          <span aria-hidden="true">{userPaused ? "▶" : "Ⅱ"}</span>
        </button>
      </div>
    </div>
  );
}
