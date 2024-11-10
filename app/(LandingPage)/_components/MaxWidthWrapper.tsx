import { cn } from "@/lib/utils";

interface maxWidthWrapperProps {
  children: React.ReactNode;
  className?: String;
}

const MaxWidthWrapper = ({ children, className }: maxWidthWrapperProps) => {
  return (
    <div className={cn("border w-full p-2 sm:p-5 md:p-6 lg:p-8 ", className)}>
      {children}
    </div>
  );
};
export default MaxWidthWrapper;
