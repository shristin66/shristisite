import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'framer-motion';
import { BriefcaseMedical, GraduationCap } from 'lucide-react';
import { experiences } from '../constants';
import { useSectionInView } from '../hooks/useSectionInView';
import { cn } from '../utils/cn';
import SectionHeading from './SectionHeading';

const TYPE_ICONS = { work: BriefcaseMedical, education: GraduationCap };

// Dots alternate between these horizontal positions on wider screens.
const DOT_X = [0.56, 0.44];

// Smooth S-curves through each dot, used for the desktop timeline line.
const buildPath = (points) => {
  if (points.length === 0) return '';
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midY = (prev.y + curr.y) / 2;
    path += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return path;
};

const ExperienceItem = ({ experience, index, total, scrollYProgress, dotRef }) => {
  const isEven = index % 2 === 0;
  const Icon = TYPE_ICONS[experience.type];

  // The card is in focus while scroll progress is within its slice of the timeline.
  const slice = 1 / (total > 0 ? total : 1);
  const start = slice * index;
  const end = slice * (index + 1);
  const fade = slice * 0.5;
  const range = [start - fade, start, end, end + fade];

  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const scale = useTransform(progress, range, [0.8, 1.1, 1.1, 0.8]);
  const opacity = useTransform(progress, range, [0.5, 1, 1, 0.5]);
  const blur = useTransform(progress, range, [4, 0, 0, 4]);
  const zIndex = useTransform(progress, range, [1, 10, 10, 1]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <div
      className={cn(
        'mb-8 flex w-full flex-col justify-between last:mb-0 sm:flex-row',
        !isEven && 'sm:flex-row-reverse',
      )}>
      <div className="hidden w-[45%] sm:block" />
      <div
        ref={dotRef}
        className={cn(
          'bg-background border-border text-brand absolute left-4 z-20 ml-[-18px] mt-3 flex size-9 items-center justify-center rounded-full border shadow-sm',
          isEven ? 'sm:left-[56%]' : 'sm:left-[44%]',
        )}>
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <motion.div
        initial={{ x: isEven ? -50 : 50 }}
        whileInView={{ x: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
        viewport={{ once: true, margin: '-100px' }}
        style={{ scale, opacity, filter, zIndex }}
        className={cn(
          'bg-secondary hover:bg-secondary/80 relative w-full rounded-2xl border p-6 pl-12 text-left transition-colors sm:w-[45%] sm:pl-6',
          isEven ? 'sm:text-right' : 'sm:text-left',
        )}>
        <h3 className="font-semibold">{experience.title}</h3>
        <p className="!mt-0 font-normal">{experience.location}</p>
        {experience.description && (
          <p className="border-border text-muted-foreground !mt-2 border-l-2 pl-4 text-sm font-normal">
            {experience.description}
          </p>
        )}
        <span className="text-brand mt-4 block font-mono text-xs font-medium uppercase tracking-widest">
          {experience.date}
        </span>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const { ref } = useSectionInView('Experience');
  const containerRef = useRef(null);
  const dotRefs = useRef([]);
  const [points, setPoints] = useState([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const box = container.getBoundingClientRect();
      const next = dotRefs.current.map((dot, index) => {
        if (!dot) return null;
        const rect = dot.getBoundingClientRect();
        return {
          x: DOT_X[index % 2] * box.width,
          y: rect.top - box.top + rect.height / 2,
        };
      });
      if (next.every((point) => point !== null)) {
        setPoints(next);
        setSize({ width: box.width, height: box.height });
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const path = useMemo(() => buildPath(points), [points]);

  return (
    <section ref={ref} id="experience" className="my-6 w-full max-w-4xl scroll-mt-28 sm:my-8">
      <SectionHeading
        heading="Experience & Education"
        content="Where I have trained and where I have cared for patients."
      />
      <div ref={containerRef} className="relative w-full overflow-visible">
        <div className="absolute left-4 h-full w-[2px] -translate-x-1/2 bg-gray-200 sm:hidden dark:bg-gray-800">
          <motion.div style={{ height: lineHeight }} className="bg-brand w-full origin-top" />
        </div>
        {points.length > 1 && (
          <svg
            className="pointer-events-none absolute left-0 top-0 hidden sm:block"
            width={size.width}
            height={size.height}
            viewBox={`0 0 ${size.width} ${size.height}`}>
            <path
              d={path}
              fill="none"
              strokeWidth={2}
              strokeLinejoin="round"
              className="stroke-gray-200 dark:stroke-gray-800"
            />
            <motion.path
              d={path}
              fill="none"
              strokeWidth={2}
              strokeLinejoin="round"
              className="stroke-brand"
              style={{ pathLength }}
            />
          </svg>
        )}
        {experiences.map((experience, index) => (
          <ExperienceItem
            key={index}
            experience={experience}
            index={index}
            total={experiences.length}
            scrollYProgress={scrollYProgress}
            dotRef={(element) => {
              dotRefs.current[index] = element;
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
