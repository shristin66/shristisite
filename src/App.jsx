import { avatar } from './assets';
import { personal } from './constants';
import {
  About,
  Contact,
  Credentials,
  Experience,
  Footer,
  Header,
  Intro,
  SectionDivider,
  ThemeToggle,
  Toaster,
} from './components';

const App = () => {
  return (
    <>
      <main id="main-content" className="overflow-x-clip">
        <div className="container flex flex-col items-center">
          <Header />
          <div className="ring-brand/20 ring-offset-background relative size-48 shrink-0 overflow-hidden rounded-full shadow-2xl ring-4 ring-offset-4">
            <img
              src={avatar}
              alt={personal.name}
              draggable={false}
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <Intro />
          <SectionDivider />
          <About />
          <Experience />
          <Credentials />
          {personal.email && <Contact />}
          <Footer />
        </div>
      </main>
      <ThemeToggle className="fixed bottom-5 right-5 hidden md:bottom-8 md:right-8 md:flex" />
      <Toaster />
    </>
  );
};

export default App;
