import OrganizationControl from './_components/OrgControl';

const OrganizationPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <OrganizationControl />
      {children}
    </>
  );
};

export default OrganizationPageLayout;
