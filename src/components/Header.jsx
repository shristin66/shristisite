import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronDown, X } from 'lucide-react';
import { navLinks } from '../constants';
import { useActiveSection } from '../context/activeSection';
import { cn } from '../utils/cn';
import { buttonVariants } from './ui/button';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [open, setOpen] = useState(false);
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSection();

  const selectSection = (name) => {
    setActiveSection(name);
    setTimeOfLastClick(Date.now());
  };

  return (
    <>
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground fixed left-4 top-4 z-50 -translate-y-16 rounded px-4 py-2 font-medium transition-transform focus:translate-y-0">
        Skip to main content
      </a>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="md:bg-secondary/80 sticky top-5 z-20 my-5 flex items-center gap-2 md:top-10 md:my-10 md:rounded-full md:px-2 md:py-3 md:backdrop-blur-sm"
        role="banner">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger
            className={buttonVariants({ variant: 'secondary', size: 'lg', className: 'md:hidden' })}>
            Menu <ChevronDown className="ml-2 size-4" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
            <Dialog.Content
              className={cn(
                'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-1/2 top-8 z-50 grid w-full max-w-lg -translate-x-1/2 gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg',
                'text-muted-foreground max-h-screen w-[90%] rounded',
              )}>
              <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                <Dialog.Title
                  className={cn(
                    'text-lg font-semibold leading-none tracking-tight',
                    'text-md self-start font-medium',
                  )}>
                  Navigation
                </Dialog.Title>
                <Dialog.Description className="text-muted-foreground sr-only text-sm">
                  Jump to a section of the portfolio.
                </Dialog.Description>
              </div>
              <nav aria-label="Mobile navigation" className="font-mono">
                <ul>
                  {navLinks.map(({ name, hash }) => (
                    <li
                      key={name}
                      className="border-muted-foreground/10 py-3 text-sm [&:not(:last-child)]:border-b">
                      <a
                        className="block"
                        href={hash}
                        aria-current={name === activeSection ? 'location' : undefined}
                        onClick={() => {
                          setOpen(false);
                          selectSection(name);
                        }}>
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <Dialog.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-6 top-6 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
                <X className="size-5" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <ThemeToggle className="md:hidden" />
        <nav
          aria-label="Main navigation"
          className="text-muted-foreground hidden font-mono text-sm md:block">
          <ul className="flex gap-5">
            {navLinks.map(({ name, hash }) => (
              <li key={name}>
                <a
                  href={hash}
                  aria-current={name === activeSection ? 'location' : undefined}
                  className={cn(
                    'relative px-4 py-2 transition-colors',
                    name === activeSection ? 'text-brand' : 'hover:text-foreground',
                  )}
                  onClick={() => selectSection(name)}>
                  {name}
                  {name === activeSection && (
                    <motion.span
                      className="bg-brand/10 absolute inset-0 -z-10 rounded-full"
                      layoutId="activeSection"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>
    </>
  );
};

export default Header;
