import { cn } from "@/lib/utils";

interface maxWidthWrapperProps {
  children: React.ReactNode;
  className?: String;
}

const MaxWidthWrapper = ({ children, className }: maxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        " p-12 px-7 sm:p-14 md:px-16 lg:p-18 lg:px-28 border border-black",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
