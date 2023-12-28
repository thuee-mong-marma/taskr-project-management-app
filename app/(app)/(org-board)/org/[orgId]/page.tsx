import { auth, OrganizationSwitcher } from '@clerk/nextjs';
export default function OrganizationPage() {
  const { userId, orgId } = auth();
  return (
    <div>
      Organization Page! {userId} {orgId}
    </div>
  );
}
