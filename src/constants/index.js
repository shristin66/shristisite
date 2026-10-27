import { BadgeCheck, HeartPulse, IdCard, Mail } from 'lucide-react';
import { Icons } from '../components/Icons';

// Your personal content for the site: edit this file to update it.

export const personal = {
  name: 'Shristi Niroula',
  role: 'Registered Nurse',
  // Shown next to the pulsing dot above your name.
  status: 'Currently at Shahid Gangalal National Heart Centre',
  intro:
    'A registered nurse in Kathmandu, Nepal, caring for heart patients with skill, calm and compassion.',
  // Messages sent through the contact form are delivered here (see README). Set to null to
  // hide the contact form, its nav link and the email icon.
  email: 'shristin66@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shristi-niroula-55879a359/',
  // The file in /public behind the "Download CV" button. Set to null to hide the button.
  // Keep it relative (no leading slash) so it also works when the site lives in a
  // subfolder, as it does on GitHub Pages (shristin66.github.io/shristisite/).
  cv: 'ShristiNiroulaCV.pdf',
};

export const socials = [
  { label: 'LinkedIn profile', href: personal.linkedin, icon: Icons.linkedin },
  { label: 'Send me an email', href: `mailto:${personal.email}`, icon: Mail },
].filter(({ icon }) => icon !== Mail || personal.email);

export const navLinks = [
  { name: 'Home', hash: '#home' },
  { name: 'About', hash: '#about' },
  { name: 'Experience', hash: '#experience' },
  { name: 'Credentials', hash: '#credentials' },
  { name: 'Contact', hash: '#contact' },
].filter(({ name }) => name !== 'Contact' || personal.email);

export const about = {
  paragraphs: [
    "I'm a registered nurse with a Master's in Medical-Surgical Nursing from Kathmandu University, working as a Nursing Officer at Shahid Gangalal National Heart Centre, Nepal's national centre for heart care.",
    'My nursing career began at Norvic International Hospital in 2018. Today I care for cardiac patients, and I am licensed as a registered nurse in both Nepal and the United States, with training in critical care.',
    'I believe good nursing means calm, evidence-based care, clear communication with patients and their families, and a team that looks out for one another.',
  ],
  focus: [
    'Cardiac Care',
    'Critical Care',
    'Medical-Surgical Nursing',
    'Patient Education',
    'Evidence-Based Practice',
  ],
};

// Most recent first. `type` picks the timeline icon: 'work' or 'education'.
// `description` is optional.
export const experiences = [
  {
    type: 'work',
    title: 'Nursing Officer',
    location: 'Shahid Gangalal National Heart Centre',
    date: '2023 - Present',
  },
  {
    type: 'education',
    title: 'Master of Science in Medical-Surgical Nursing',
    location: 'Kathmandu University',
    date: '2021 - 2023',
  },
  {
    type: 'work',
    title: 'Staff Nurse',
    location: 'Norvic International Hospital',
    date: '2018 - 2021',
  },
  {
    type: 'education',
    title: 'Bachelor of Science in Nursing',
    location: 'Norvic International College',
    date: '2014 - 2018',
  },
];

// Shown in this order. `type` is 'license' or 'certification', shown as a badge on the card.
// `issuer` and `description` are optional.
export const credentials = [
  {
    type: 'license',
    title: 'U.S. Registered Nurse (USRN)',
    issuer: 'NCLEX-RN',
    description:
      'Passed the NCLEX-RN, the licensing exam for registered nurses in the United States.',
    icon: BadgeCheck,
  },
  {
    type: 'license',
    title: 'Registered Nurse, Nepal',
    issuer: 'Nepal Medical Council',
    description: 'Registered and licensed to practise as a nurse in Nepal.',
    icon: IdCard,
  },
  {
    type: 'certification',
    title: 'Critical Care Training',
    description: 'Training in the assessment, monitoring and care of critically ill patients.',
    icon: HeartPulse,
  },
];
