import Image from "next/image";

interface authLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: authLayoutProps) => {
  return (
    <div className="flex justify-center flex-col items-center h-full  ">
      <div className="flex">
        <div className="flex justify-center items-start flex-col p-2">
          <h2 className="text-xl tracking-wide font-bold ">
            Welcome to Twitch{" "}
          </h2>
          <h3 className="font-semibold">Let's play!</h3>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
