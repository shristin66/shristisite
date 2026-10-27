import { Toaster as Sonner } from 'sonner';
import { useTheme } from '../context/theme';

const Toaster = () => {
  const { theme } = useTheme();

  return (
    <Sonner
      position="bottom-left"
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-none',
          description: 'group-[.toast]:text-muted-foreground group-[.toast]:text-sm group-[.toast]:font-normal',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
    />
  );
};

export default Toaster;
