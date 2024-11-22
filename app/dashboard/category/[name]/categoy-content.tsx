import { trpc } from "@/server/client";

interface CategoryContentProps {
  hasEvents: boolean;
  categoryName: string;
}

const CategoryContent = ({ hasEvents, categoryName }: CategoryContentProps) => {
  return (
    <div className="flex flex-1 flex-col min-h-full w-full  justify-start items-center p-10 "></div>
  );
};
export default CategoryContent;
