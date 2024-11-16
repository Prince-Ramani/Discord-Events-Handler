interface LayoutProps {
  children: React.ReactNode;
}

const WelcomeLayout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full w-full flex justify-center items-center bg-slate-200">
      {children}
    </div>
  );
};

export default WelcomeLayout;
