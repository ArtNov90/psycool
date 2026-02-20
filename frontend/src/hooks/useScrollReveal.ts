import { useEffect, useRef } from "react";
import type { RefObject } from "react";

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options?: RevealOptions
): RefObject<T | null> {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = new WeakSet<HTMLElement>();

    const hydrateItem = (item: HTMLElement) => {
      const delay = item.dataset.revealDelay;
      if (delay) {
        item.style.setProperty("--reveal-delay", delay);
      }
    };

    let intersectionObserver: IntersectionObserver | null = null;
    if (!reducedMotion) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              intersectionObserver?.unobserve(entry.target);
            }
          }
        },
        {
          threshold: options?.threshold ?? 0.18,
          rootMargin: options?.rootMargin ?? "0px 0px -8% 0px",
        }
      );
    }

    const register = (item: HTMLElement) => {
      if (seen.has(item)) return;
      seen.add(item);
      hydrateItem(item);

      if (reducedMotion) {
        item.classList.add("is-visible");
        return;
      }

      intersectionObserver?.observe(item);
    };

    const scan = () => {
      const items = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"));
      items.forEach(register);
    };

    scan();

    const mutationObserver = new MutationObserver(() => {
      scan();
    });

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      intersectionObserver?.disconnect();
    };
  }, [options?.rootMargin, options?.threshold]);

  return containerRef;
}
