import { personal } from '../constants';
import { buttonVariants } from './ui/button';

const Footer = () => (
  <footer className="text-muted-foreground my-2 font-mono text-sm">
    © {new Date().getFullYear()}{' '}
    <a
      href={personal.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonVariants({
        variant: 'link',
        className: 'text-muted-foreground hover:text-brand p-0 font-medium',
      })}>
      {personal.name}
    </a>
    . All rights reserved.
  </footer>
);

export default Footer;
