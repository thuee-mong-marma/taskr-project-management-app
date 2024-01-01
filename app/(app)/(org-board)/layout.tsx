import { Navbar } from './_components/Navbar';
const RootOrganizationLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full bg-white text-black">
      <Navbar />
      {children}
    </div>
  );
};

export default RootOrganizationLayout;
