import { Sidebar } from '../_components/Sidebar';

const OrganizationParentLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="pt-16 md:pt-18 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto flex">
      <div className="flex gap-x-7 md:mr-3">
        <div className="w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div>
      </div>
      {children}
    </main>
  );
};

export default OrganizationParentLayout;
