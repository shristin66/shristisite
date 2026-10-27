import { motion } from 'framer-motion';
import { about } from '../constants';
import { useSectionInView } from '../hooks/useSectionInView';
import SectionHeading from './SectionHeading';

const About = () => {
  const { ref } = useSectionInView('About');

  return (
    <motion.section
      ref={ref}
      id="about"
      className="mb-6 mt-3 flex w-full scroll-mt-28 flex-col items-center sm:mb-8"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}>
      <SectionHeading heading="About Me" />
      <div className="max-w-2xl text-center leading-7">
        {about.paragraphs.map((paragraph, index) => (
          <p key={index} className={index < about.paragraphs.length - 1 ? 'mb-4' : undefined}>
            {paragraph}
          </p>
        ))}
        <div className="mt-6">
          <h3 className="text-muted-foreground mb-3 font-mono text-xs uppercase tracking-widest">
            Areas of focus
          </h3>
          <ul className="flex flex-wrap justify-center gap-2" aria-label="Areas of focus">
            {about.focus.map((area) => (
              <li key={area} className="bg-muted rounded-full px-3 py-1 text-sm">
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
