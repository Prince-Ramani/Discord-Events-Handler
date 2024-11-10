import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/CustomButton";

const Page = () => {
  const isSignedIn = true;
  return (
    <section>
      <div className="bg-gray-200 h-full   p-2 md:px-7 lg:px-10 flex justify-between  items-center border-b-2 border-blue-500/55">
        <div className="flex gap-x-2 lg:gap-x-4 justify-between  items-center ">
          <Image
            src="https://res.cloudinary.com/dwxzguawt/image/upload/v1731209933/vecteezy_cute-cat-cartoon-kitty_8483809_d0nmig_a_hflip_gttuhd.png"
            alt="Cat Image"
            height={60}
            width={160}
            quality={100}
            className=" size-14 md:size-20  "
          />
          <span className=" p-2 font-semibold h-full text-xl sm:text-2xl md:text-3xl  lg:text-4xl text-blue-700 ">
            Zeno
          </span>
        </div>
        {isSignedIn ? (
          <div className="h-full">
            <CustomButton
              href="/dashboard"
              className="bg-blue-700 p-1 sm:p-3 md:p-2 lg:px-5"
            >
              Dashboard
            </CustomButton>
          </div>
        ) : (
          <div className=" p-2 h-full flex items-center justify-center gap-1 md:gap-5 lg:gap-20">
            <Button variant="outline" size="custom">
              <SignInButton>Sign In</SignInButton>
            </Button>
            <Button variant="outline" size="custom">
              <SignUpButton>Sign Up</SignUpButton>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
