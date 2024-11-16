import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        "w-8 h-8  border-2 border-white border-t-black border-solid rounded-full animate-spin",
        className
      )}
    ></div>
  );
};

export default LoadingSpinner;
