import { useEffect, useRef, useState } from 'react';
import { navLinks } from '../constants';
import { useActiveSection } from '../context/activeSection';

// Contact is hidden until an email address is set, so the last section can vary.
const LAST_SECTION = navLinks[navLinks.length - 1].name;

const isAtBottom = () =>
  window.scrollY > 0 &&
  window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

const getBottomMargin = () => Math.max(0, window.innerHeight - 200);

// Marks `sectionName` as active in the nav while the section crosses a band
// 100-200px below the top of the viewport.
export const useSectionInView = (sectionName) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [bottomMargin, setBottomMargin] = useState(getBottomMargin);
  const { setActiveSection, timeOfLastClick } = useActiveSection();

  useEffect(() => {
    const handleResize = () => setBottomMargin(getBottomMargin());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
      rootMargin: `-100px 0px -${bottomMargin}px 0px`,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [bottomMargin]);

  useEffect(() => {
    if (!inView) return;
    // After a nav click, wait out the smooth scroll so the sections it passes
    // don't briefly steal the highlight.
    const delay = Math.max(0, 1000 - (Date.now() - timeOfLastClick));
    const timer = window.setTimeout(
      () => setActiveSection(isAtBottom() ? LAST_SECTION : sectionName),
      delay,
    );
    return () => window.clearTimeout(timer);
  }, [inView, sectionName, setActiveSection, timeOfLastClick]);

  // The last section can be too short to reach the band, so also activate it
  // once the page is scrolled to the bottom.
  useEffect(() => {
    if (sectionName !== LAST_SECTION) return;
    const handleScroll = () => {
      if (isAtBottom()) setActiveSection(LAST_SECTION);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionName, setActiveSection]);

  return { ref };
};
