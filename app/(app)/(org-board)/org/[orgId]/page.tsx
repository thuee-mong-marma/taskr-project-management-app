import { Separator } from '@/components/ui/separator';
import BoardList from './_components/BoardList';
import { OrganizationInfo } from './_components/Info';

const OrganizationPage = async () => {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <OrganizationInfo />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
};

export default OrganizationPage;
