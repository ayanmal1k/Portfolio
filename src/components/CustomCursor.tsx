import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Disable on touch devices or if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) {
      setIsDisabled(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isPointer = false;
    let isMouseDown = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      if (target) {
        isPointer = Boolean(
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('project-card') ||
          target.classList.contains('service-card') ||
          target.classList.contains('contact-card')
        );
      }
    };

    const handleMouseDown = () => { isMouseDown = true; };
    const handleMouseUp = () => { isMouseDown = false; };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    // High performance lerp animation loop (0 React state re-renders during movement)
    const animate = () => {
      // Lerp ring towards mouse target
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      if (dotRef.current) {
        const scale = isMouseDown ? 0.6 : isPointer ? 1.5 : 1;
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0) scale(${scale})`;
      }

      if (ringRef.current) {
        const scale = isMouseDown ? 1.3 : isPointer ? 1.8 : 1;
        ringRef.current.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0) scale(${scale})`;
        if (isPointer) {
          ringRef.current.classList.add('is-pointer');
        } else {
          ringRef.current.classList.remove('is-pointer');
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (isDisabled) return null;

  return (
    <div className="custom-cursor-wrapper" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
