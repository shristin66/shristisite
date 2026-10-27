import { cn } from '../../utils/cn';

const base =
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-muted text-secondary-foreground hover:bg-muted/80',
  outline: 'border border-input hover:bg-muted/80',
  link: 'text-primary underline-offset-4 hover:underline',
};

const sizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 px-3',
  lg: 'h-11 px-8',
  icon: 'h-11 w-11',
};

// Button styles that can be applied to <button> and <a> elements alike.
export const buttonVariants = ({ variant = 'default', size = 'default', className } = {}) =>
  cn(base, variants[variant], sizes[size], className);
