import FormPopover from '@/components/form/FormPopover';
import Hint from '@/components/ui/hint';
import { HelpCircle, User } from 'lucide-react';

const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="relative w-full h-full aspect-video bg-muted rounded-sm flex-col gap-y-1 flex items-center justify-center hover:opacity-75 transition"
          >
            <span className="text-sm">Create new board</span>
            <span className="text-xs">5 remaining</span>
            <Hint
              description={`Free workspaces can have up to 5 open boards.For unlimited boards upgrade this workspace.`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

export default BoardList;
