import { PlusIcon } from '@assets/icons';

interface IPlaceholderButtonProps {
     title: string;
     onClick: () => void;
}

const PlaceholderButton = ({ title, onClick }: IPlaceholderButtonProps) => {
     return (
          <button
               onClick={onClick}
               className="flex w-full items-center justify-center gap-3 rounded-lg border border-dashed border-button-primary-default p-2 text-button-primary-default"
          >
               <PlusIcon />
               <span className="text-sm font-medium">{title}</span>
          </button>
     );
};

export default PlaceholderButton;
