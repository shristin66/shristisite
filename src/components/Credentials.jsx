import { motion } from 'framer-motion';
import { Award, ShieldCheck } from 'lucide-react';
import { credentials } from '../constants';
import { useSectionInView } from '../hooks/useSectionInView';
import { cn } from '../utils/cn';
import SectionHeading from './SectionHeading';

const TYPES = {
  license: { label: 'License', icon: ShieldCheck },
  certification: { label: 'Certification', icon: Award },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const TypeBadge = ({ type }) => {
  const { label, icon: Icon } = TYPES[type];
  return (
    <span className="bg-brand/10 text-brand inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium">
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
};

const CredentialCard = ({ credential }) => {
  const { type, title, issuer, description, icon: Icon } = credential;

  return (
    <motion.li
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      className={cn(
        'bg-secondary flex w-full flex-col items-center rounded-3xl border p-5 text-center transition-shadow hover:shadow-lg',
        'sm:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]',
      )}>
      <div className="flex w-full justify-end">
        <TypeBadge type={type} />
      </div>
      <div className="bg-brand/10 text-brand mt-1 w-fit rounded-full p-4">
        <Icon className="size-8" aria-hidden="true" />
      </div>
      <h3 className="mt-3 text-lg font-medium leading-snug">{title}</h3>
      {issuer && <p className="text-brand mt-1 font-mono text-sm">{issuer}</p>}
      {description && <p className="text-muted-foreground mt-3 text-sm">{description}</p>}
    </motion.li>
  );
};

const Credentials = () => {
  const { ref } = useSectionInView('Credentials');

  return (
    <section ref={ref} id="credentials" className="my-6 w-full scroll-mt-28 sm:my-8">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
        viewport={{ once: true }}>
        <SectionHeading
          heading="Licenses & Certifications"
          content="Licensed to practise as a registered nurse in Nepal and the United States."
        />
      </motion.div>
      <motion.ul
        className="flex flex-wrap justify-center gap-8"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}>
        {credentials.map((credential) => (
          <CredentialCard key={credential.title} credential={credential} />
        ))}
      </motion.ul>
    </section>
  );
};

export default Credentials;
