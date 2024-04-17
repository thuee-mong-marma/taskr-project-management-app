import { Navbar } from './_components/Navabar';
import Footer from './_components/Footer';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="home-layout h-full min-h-screen flex flex-col">
      <Navbar />
      <main className="w-full flex-1 pt-40 pb-20 home-container">{children}</main>
      <Footer/>
    </div>
  );
};
export default HomeLayout;
