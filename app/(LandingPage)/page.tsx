import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/CustomButton";
import Heading from "@/components/Heading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Check } from "lucide-react";
import DiscordUi from "@/components/Discord-Ui";

const Page = () => {
  const isSignedIn = true;
  return (
    <>
      <section>
        <div className="bg-slate-100 h-full w-full   p-2 px-5 sm:px-14 md:px-24 lg:px-32 flex justify-between  items-center border-b">
          <div className="flex gap-x-2 lg:gap-x-4 justify-between  items-center ">
            <Image
              src="https://res.cloudinary.com/dwxzguawt/image/upload/v1731209933/vecteezy_cute-cat-cartoon-kitty_8483809_d0nmig_a_hflip_gttuhd.png"
              alt="Cat Image"
              height={60}
              width={160}
              quality={100}
              className=" size-14 md:size-20 hidden sm:block "
            />
            <span className=" p-2 font-semibold h-full text-xl sm:text-2xl md:text-3xl  lg:text-4xl text-blue-700 ">
              Zeno
            </span>
          </div>
          <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-5  lg:gap-6  ">
            <div className="flex justify-center items-center   ">
              <Button
                variant="ghost"
                className="font-medium text-sm  sm:text-base hover:text-gray-400"
              >
                Princing
              </Button>

              {isSignedIn ? (
                <SignOutButton>
                  <Button
                    variant="ghost"
                    className="font-medium text-sm sm:text-base hover:text-gray-400 "
                  >
                    Sign out
                  </Button>
                </SignOutButton>
              ) : (
                <SignInButton>
                  <Button
                    variant="ghost"
                    className="font-medium text-sm sm:text-base hover:text-gray-400"
                  >
                    Sign In
                  </Button>
                </SignInButton>
              )}
            </div>
            <div className="h-full border border-black/30 py-5 md:py-7" />
            <div>
              {isSignedIn ? (
                <CustomButton
                  href="/dashboard"
                  className="bg-blue-700 p-2 text-xs sm:text-base  md:p-2 lg:px-5"
                >
                  Dashboard
                </CustomButton>
              ) : (
                <SignUpButton>
                  <CustomButton className="bg-blue-700 p-2 text-xs sm:text-base md:p-2 lg:p-3">
                    Sign Up
                  </CustomButton>
                </SignUpButton>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full">
        <MaxWidthWrapper>
          <div className="flex justify-center items-center flex-col gap-y-10  ">
            <Heading>
              <span>Real-Time SaaS Insights,</span>
              <span className="text-purple-600">Delivered to Your Discord</span>
            </Heading>

            <div className="max-w-prose tracking-wider text-center text-sm  text-gray-600 font-light ">
              Zeno is the easiest way to monitor your SaaS. Get instant
              notifications for{" "}
              <span className="font-semibold">
                Sales, new users, or any other events{" "}
              </span>
              sent directly to your Discord.
            </div>

            <div className=" flex flex-col gap-1 tracking-wide  ">
              <div className="flex gap-2 text-gray-600 text-sm justify-start items-center">
                <Check />
                Real-time Discord alerts for critical events.
              </div>
              <div className="flex gap-2 text-gray-600 text-sm justify-start items-center">
                <Check />
                Buy once, use forever
              </div>
              <div className="flex gap-2 text-gray-600 text-sm justify-start items-center">
                <Check />
                Track sales, new users, or any other event
              </div>
            </div>
            <CustomButton className="bg-purple-600 p-2 px-4 sm:px-5 md:px-6 lg:px-8">
              Start For Free Today
            </CustomButton>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="w-full">
        <DiscordUi />
      </section>
    </>
  );
};

export default Page;
