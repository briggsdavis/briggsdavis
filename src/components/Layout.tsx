import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { scrollToTop } from '@/lib/lenisStore';

const Layout = () => {
  const location = useLocation();
  const [blurring, setBlurring] = useState(true);

  useEffect(() => {
    // Scroll to top of new page
    scrollToTop();

    // Blur in: jump to blurred, then animate clear over ~0.55s
    setBlurring(true);
    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => setBlurring(false));
      return () => cancelAnimationFrame(id2);
    });
    return () => cancelAnimationFrame(id1);
  }, [location.key]);

  return (
    <>
      {/*
        Backdrop-filter overlay instead of filter on the content wrapper —
        filter on a parent breaks position:fixed children (Navbar).
        This overlay sits below the Navbar (z-45 vs Navbar z-50) so the
        Navbar stays crisp while page content blurs in on navigation.
      */}
      <div
        className="fixed inset-0 pointer-events-none z-[45]"
        style={{
          backdropFilter: `blur(${blurring ? 14 : 0}px)`,
          WebkitBackdropFilter: `blur(${blurring ? 14 : 0}px)`,
          transition: blurring
            ? 'none'
            : 'backdrop-filter 0.55s cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      <Outlet />
    </>
  );
};

export default Layout;
