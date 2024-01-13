import { OrganizationProfile } from '@clerk/nextjs';

const OrganizationSettingsPage = () => {
  return (
    <div>
      <div className="w-full">
        <OrganizationProfile
          appearance={{
            elements: {
              rootBox: {
                boxShadow: 'none',
                width: '100%',
              },
              card: {
                border: '1px solid #e5e5e5',
                boxShadow: 'none',
                width: '100%',
              },
              navbar: {
                padding: '1.5rem',
              },
              pageScrollBox: {
                padding: '1.5rem',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default OrganizationSettingsPage;
