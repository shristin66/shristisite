import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/theme';
import { buttonVariants } from './ui/button';

const ThemeToggle = ({ className }) => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="theme toggle"
      className={buttonVariants({ variant: 'secondary', size: 'icon', className })}
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}>
      <Sun className="size-5 dark:hidden" />
      <Moon className="hidden size-5 dark:block" />
    </button>
  );
};

export default ThemeToggle;
