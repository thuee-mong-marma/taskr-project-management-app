import { auth, OrganizationSwitcher } from '@clerk/nextjs';
export default function OrganizationPage() {
  // console.log('auth', auth());
  const { userId, orgId } = auth();
  return <div>Organization Page!</div>;
}
