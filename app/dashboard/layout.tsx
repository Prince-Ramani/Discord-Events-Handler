import Sidebar from "./_components/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full min-h-full bg-slate-100 flex">
      <Sidebar />
      <div className="min-h-full min-w-full mt-16 md:mt-0 md:ml-[200px] lg:ml-[300px]  ">
        {children}
      </div>
    </div>
  );
};

export default Layout;
