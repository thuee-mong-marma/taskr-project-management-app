import { Navbar } from './_components/Navabar';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full home-layout">
      <Navbar />
      <main className="pt-40 pb-20 home-container">{children}</main>
    </div>
  );
};
export default HomeLayout;
