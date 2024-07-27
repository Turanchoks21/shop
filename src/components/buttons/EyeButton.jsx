import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function EyeButton({ onClick, isPasswordVisible }) {
  return (
    <div
      onClick={onClick}
      className="text-chiper-chartreuse hover:text-chiper-chartreuse/60 cursor-pointer"
    >
      {isPasswordVisible ? (
        <EyeIcon className="h-7" />
      ) : (
        <EyeSlashIcon className="h-7" />
      )}
    </div>
  );
}

export default EyeButton;
