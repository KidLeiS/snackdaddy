"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const products = [
  {
    number: "01",
    name: "Chai Chocolate",
    display: <>Chai<br />Chocolate</>,
    line: "Deep cacao + warm spice.",
    image: "/products/br-oats-chai-chocolate-clear.webp",
    description: "Rich chocolate overnight oats rounded out with cinnamon, cardamom and a warming chai finish.",
    profile: "Cacao-rich · gently spiced · not too sweet",
    colour: "cacao",
  },
  {
    number: "02",
    name: "Tiramisu",
    display: <>Tira<br />misu</>,
    line: "Coffee-led. Spoon-ready.",
    image: "/products/br-oats-tiramisu-clear.webp",
    description: "Creamy, coffee-forward oats with cocoa depth—the breakfast version of ordering dessert first.",
    profile: "Espresso · cocoa · creamy finish",
    colour: "coffee",
  },
  {
    number: "03",
    name: "Banana Bread",
    display: <>Banana<br />Bread</>,
    line: "Bakery comfort, breakfast maths.",
    image: "/products/br-oats-banana-bread-clear.webp",
    description: "Ripe banana and cinnamon folded into thick oats for all the comfort of a warm loaf, straight from the fridge.",
    profile: "Ripe banana · cinnamon · toasted oat",
    colour: "banana",
  },
  {
    number: "04",
    name: "PB&J",
    display: <>PB<br />&amp;J</>,
    line: "Salty peanut + sharp berry.",
    image: "/products/br-oats-pbj-clear.webp",
    description: "Roasted peanut meets a sharp berry ripple in a proper sweet-salty breakfast with real texture.",
    profile: "Roasted peanut · tart berry · lightly salted",
    colour: "berry",
  },
] as const;

export function FlavourShowcase() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = products[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const restoreFocus = () => triggerRef.current?.focus();
    const closeOnBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };
    dialog.addEventListener("close", restoreFocus);
    dialog.addEventListener("click", closeOnBackdrop);
    return () => {
      dialog.removeEventListener("close", restoreFocus);
      dialog.removeEventListener("click", closeOnBackdrop);
    };
  }, []);

  const openProduct = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActiveIndex(index);
    window.requestAnimationFrame(() => dialogRef.current?.showModal());
  };

  const previousIndex = (activeIndex - 1 + products.length) % products.length;
  const nextIndex = (activeIndex + 1) % products.length;

  return (
    <>
      <div className="flavour-grid">
        {products.map((product, index) => (
          <button
            className={`flavour-card flavour-card-${product.colour}`}
            key={product.name}
            type="button"
            aria-haspopup="dialog"
            aria-label={`Explore BR-OATS ${product.name}`}
            onClick={(event) => openProduct(index, event.currentTarget)}
          >
            <span className="flavour-card-topline">
              <span>{product.number} / 04</span>
              <span>Overnight oats</span>
            </span>
            <div className="flavour-card-product" aria-hidden="true">
              <Image src={product.image} alt="" fill sizes="(max-width: 680px) 50vw, 25vw" />
            </div>
            <h3>{product.display}</h3>
            <div className="flavour-card-footer">
              <p>{product.line}</p>
            </div>
          </button>
        ))}
      </div>

      <dialog
        className="product-dialog"
        ref={dialogRef}
        aria-labelledby="product-dialog-title"
      >
        <div className={`product-dialog-panel product-dialog-${active.colour}`}>
          <button
            className="product-dialog-close"
            type="button"
            aria-label="Close product details"
            onClick={() => dialogRef.current?.close()}
          >
            <span className="product-dialog-close-icon" aria-hidden="true" />
          </button>

          <div className="product-dialog-visual">
            <div className="product-dialog-visual-topline">
              <p>BR-OATS®</p>
              <p>{active.number} / 04</p>
            </div>
            <div className="product-dialog-image" key={active.name}>
              <Image
                src={active.image}
                alt={`BR-OATS ${active.name} overnight oats tub`}
                fill
                sizes="(max-width: 760px) 92vw, 50vw"
              />
            </div>
          </div>

          <div className="product-dialog-copy">
            <h2 id="product-dialog-title" aria-live="polite">{active.name}</h2>
            <p className="product-dialog-description">{active.description}</p>
            <dl>
              <div><dt>Flavour profile</dt><dd>{active.profile}</dd></div>
              <div><dt>Make it</dt><dd>Add milk, stir, chill overnight. Grab it in the morning.</dd></div>
            </dl>
            <div className="product-dialog-actions">
              <a className="button button-dialog" href="https://tally.so/r/KY2BvM">Get first dibs <span aria-hidden="true">→</span></a>
            </div>
            <nav className="product-dialog-nav" aria-label="Browse BR-OATS flavours">
              <button type="button" onClick={() => setActiveIndex(previousIndex)}>
                <small>← Previous</small>
                <span>{products[previousIndex].name}</span>
              </button>
              <button type="button" onClick={() => setActiveIndex(nextIndex)}>
                <small>Next →</small>
                <span>{products[nextIndex].name}</span>
              </button>
            </nav>
          </div>
        </div>
      </dialog>
    </>
  );
}
