import Image from "next/image";

interface authLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: authLayoutProps) => {
  return (
    <div
      className={`h-screen sm:h-full w-full  flex flex-col justify-start   sm:justify-center items-center bg-blue-500   sm:bg-[url('https://res.cloudinary.com/dwxzguawt/image/upload/v1731130487/pexels-marko-mocilac-597205498-17164973_lggyxd.jpg')]  sm:bg-cover  sm:bg-center sm:bg-no-repeat`}
    >
      <div className="flex  justify-between items-center relative top-[10px] z-50 ">
        <div>
          <Image
            src="https://res.cloudinary.com/dwxzguawt/image/upload/v1731126126/cat-9144_hmi9ls.png"
            alt="logo"
            height={100}
            width={100}
            quality={100}
          />
        </div>
        <div className="flex justify-center  items-center flex-col  sm:w-52 lg:w-72 ">
          <span className="lg:text-2xl text-lg  text-white font-mono  underline decoration-wavy decoration-black/70 decoration-2 font-semibold    sm:decoration-yellow-400  p-1">
            Welcome to Zeno!
          </span>
          <span className=" hidden sm:block text-[10px]   p-[2px] text-center text-opacity-90 text-pretty leading-tight text-white font-light">
            We're excited to have you on board. Let's get you started and make
            every move count!
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
