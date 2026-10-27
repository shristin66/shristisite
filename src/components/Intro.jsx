import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { personal, socials } from '../constants';
import { useSectionInView } from '../hooks/useSectionInView';
import { buttonVariants } from './ui/button';

const Intro = () => {
  const { ref } = useSectionInView('Home');

  return (
    <section
      ref={ref}
      id="home"
      className="mb-3 mt-5 flex scroll-mt-96 flex-col items-center gap-4 text-center sm:mt-8">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'tween', duration: 0.2 }}
        className="bg-muted inline-flex items-center gap-2 rounded px-3 py-1 text-sm font-medium">
        <span aria-hidden="true" className="bg-brand size-2 animate-pulse rounded-full" />
        {personal.status}
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl">
        {personal.name} - {personal.role}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground max-w-lg">
        {personal.intro}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2">
        {/* Without an email address there's no contact form, so point to LinkedIn instead. */}
        <a
          href={personal.email ? '#contact' : personal.linkedin}
          target={personal.email ? undefined : '_blank'}
          rel={personal.email ? undefined : 'noopener noreferrer'}
          className={buttonVariants({ size: 'lg' })}>
          Get in touch <ArrowRight className="ml-2 size-4" />
        </a>
        {personal.cv && (
          <>
            <a
              href={personal.cv}
              download
              className={buttonVariants({
                variant: 'secondary',
                size: 'lg',
                className: 'hidden sm:flex',
              })}>
              Download CV <Download className="ml-2 size-4" />
            </a>
            <a
              href={personal.cv}
              download
              aria-label="Download CV"
              className={buttonVariants({ variant: 'secondary', size: 'icon', className: 'sm:hidden' })}>
              <Download className="size-6" />
            </a>
          </>
        )}
        {socials.map(({ label, href, icon: Icon }) => {
          const external = href.startsWith('http');
          return (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className={buttonVariants({ variant: 'secondary', size: 'icon' })}>
              <Icon className="size-6" />
            </a>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Intro;
