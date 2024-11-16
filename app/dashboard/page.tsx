import Bar from "@/app/dashboard/_components/bar";
import DashboardContent from "./_components/DashboardContent";

const Page = () => {
  return (
    <div className="min-h-full h-full w-full overflow-y-scroll">
      <Bar title="Dashboard" />
      <DashboardContent />
    </div>
  );
};

export default Page;
