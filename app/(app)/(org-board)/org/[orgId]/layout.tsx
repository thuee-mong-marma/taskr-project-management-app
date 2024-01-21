import { auth } from '@clerk/nextjs';
import { startCase } from 'lodash';
import OrganizationControl from './_components/OrgControl';

export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || 'Organization'),
  };
}

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
