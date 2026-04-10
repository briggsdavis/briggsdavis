import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { scrollToTop } from '@/lib/lenisStore';

// Duration of the wipe in ms — slower = more dramatic
const DURATION = 1100;

// Ease-in-out cubic: slow start (edge approaches), fast mid, slow finish
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const Layout = () => {
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    scrollToTop();

    const overlay = overlayRef.current;
    if (!overlay) return;

    cancelAnimationFrame(rafRef.current);

    // Reset: restore full blur with no mask (entire viewport blurred)
    overlay.style.backdropFilter = 'blur(14px)';
    overlay.style.webkitBackdropFilter = 'blur(14px)';
    overlay.style.maskImage = '';
    overlay.style.webkitMaskImage = '';

    let startTime = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const t = Math.min(1, (timestamp - startTime) / DURATION);
      const eased = ease(t);

      // Hard-stop gradient: transparent left portion grows right, blurred side shrinks from right
      // At t=0: pos=0% → everything is white (blurred)
      // At t=1: pos=100% → everything is transparent (clear)
      const pos = `${eased * 100}%`;
      const mask = `linear-gradient(to right, transparent ${pos}, white ${pos})`;
      overlay.style.maskImage = mask;
      overlay.style.webkitMaskImage = mask;

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Done — disable backdrop-filter so the compositing layer is released
        overlay.style.backdropFilter = 'none';
        overlay.style.webkitBackdropFilter = 'none';
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [location.key]);

  return (
    <>
      {/*
        All styles managed imperatively via the ref so React reconciliation
        never overwrites animation progress mid-frame.
        z-[45] keeps the overlay below the Navbar (z-50) — Navbar stays sharp.
      */}
      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none z-[45]"
      />
      <Outlet />
    </>
  );
};

export default Layout;
