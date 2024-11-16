import { cn } from "@/lib/utils";

interface headingProps {
  children: React.ReactNode;
  className?: String;
}

function Heading({ children, className }: headingProps) {
  return (
    <div
      className={cn(
        "text-4xl sm:text-5xl font-heading text-center text-pretty font-medium flex flex-col",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Heading;
