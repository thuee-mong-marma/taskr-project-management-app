import { OrganizationList } from '@clerk/nextjs';

export default function OrganizationCreatePage() {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl="/org/:id"
      afterSelectOrganizationUrl="/org/:id"
    />
  );
}
