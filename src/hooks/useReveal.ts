import { useEffect, useRef } from 'react';

export function useReveal() {
  const seen = useRef(new WeakSet());
  const io = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const sel = '[data-reveal],[data-reveal-fade]';

    const setup = () => {
      const els = Array.from(document.querySelectorAll(sel));
      if (reduce || !('IntersectionObserver' in window)) {
        els.forEach((e) => e.classList.add('rv-in'));
        return;
      }

      if (!io.current) {
        io.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (!en.isIntersecting) return;
              const el = en.target;
              const sibs = Array.from(el.parentNode?.children ?? []).filter(
                (c) =>
                  c.hasAttribute('data-reveal') || c.hasAttribute('data-reveal-fade'),
              );
              const i = Math.max(0, sibs.indexOf(el));
              io.current?.unobserve(el);
              setTimeout(() => el.classList.add('rv-in'), Math.min(i, 8) * 80);
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
        );
      }

      els.forEach((e) => {
        if (seen.current.has(e)) return;
        seen.current.add(e);
        if (e.classList.contains('rv-in')) return;
        io.current!.observe(e);
      });

      setTimeout(() => {
        Array.from(document.querySelectorAll(sel)).forEach((e) => {
          const r = e.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) e.classList.add('rv-in');
        });
      }, 3000);
    };

    setup();
    const timer = setInterval(setup, 500);
    return () => {
      clearInterval(timer);
      io.current?.disconnect();
    };
  }, []);
}
