"use client";

import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { Prism } from "react-syntax-highlighter";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/CustomButton";
import Heading from "@/components/Heading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Check, Star, Verified } from "lucide-react";
import DiscordUi from "@/components/Discord-Ui";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const codeSnippet = `await fetch("http://localhost:3000/api/v1/events", {
    method: "POST",
    body: JSON.stringify({
      category: "sale",
      fields: {
        plan: "PRO",
        email: "zoe.martinez2001@email.com",
        amount: 49.00
      }
    }),
    headers: {
      Authorization: "Bearer <YOUR_API_KEY>"
    }
  })`;

  return (
    <>
      <section>
        <div className="bg-white h-full w-full   p-2 px-5 sm:px-14 md:px-24 lg:px-32 flex justify-between  items-center border-b">
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
                onClick={() => router.push("/pricing")}
              >
                Pricing
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
                  className="bg-purple-600 p-2 text-xs sm:text-base  md:p-2 lg:px-5"
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
            <CustomButton
              className="bg-purple-600 p-2 px-4 sm:px-5 md:px-6 lg:px-8"
              href="/sign-up"
            >
              Start For Free Today
            </CustomButton>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="w-full">
        <DiscordUi />
      </section>
      <section>
        <MaxWidthWrapper className="lg:px-40 bg-slate-200">
          <div className="flex flex-col ">
            <div className="p-2 ">
              <Heading>Intuitive Monitoring</Heading>
              <Heading className="text-purple-600 px-2 sm:px-0 pt-2 ">
                Stay ahead with real-time insights
              </Heading>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 p-2 gap-2 md:text-center  ">
              {/* !st */}
              <div className="lg:row-span-2 border rounded-sm p-1 pb-0 lg:rounded-l-[2rem] bg-white max-h-[600px] md:max-h-[700px]   ">
                <div className="  rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)] h-full flex items-center justify-between flex-col  flex-1">
                  <div className=" p-4 mx-5 flex flex-col gap-3">
                    <h1 className="font-medium  text-xl xl:text-2xl 3xl:text-3xl  ">
                      Real-time notifications
                    </h1>
                    <p className="text-gray-600 text-sm ">
                      Get notified about critical events the moment they happen,
                      no matter if you're at home or on the go.
                    </p>
                  </div>
                  <div className="mx-5 max-w-[300px]  max-h-[500px]   overflow-hidden border-[8px] border-gray-700 border-b-0 bg-gray-700 rounded-3xl rounded-b-none h-full ">
                    <img
                      src="https://res.cloudinary.com/dwxzguawt/image/upload/v1731389149/phone-screen_p4d0ed.png"
                      className="rounded-[calc(theme(borderRadius.3xl)-10px)] h-full w-full  rounded-b-none "
                    />
                  </div>
                </div>
              </div>
              {/* 2nd */}
              <div className="border bg-white rounded-md p-1 col-span-1 row-span-1">
                <div className=" rounded-[calc(theme(borderRadius.md)-2px)] h-full flex flex-col justify-center items-center ">
                  <div className=" p-4 mx-5 flex flex-col gap-2">
                    <h1 className="font-medium  text-xl xl:text-2xl 3xl:text-3xl ">
                      Track Any Event
                    </h1>
                    <p className="text-gray-600 text-sm  ">
                      From new user signups to successful payments, Zeno
                      notifies you for all official events in your SaaS.
                    </p>
                  </div>
                  <div className="m-7  h-full">
                    <Image
                      src="https://res.cloudinary.com/dwxzguawt/image/upload/v1731385921/bento-any-event_e0m6v4.png"
                      alt="Image"
                      height={400}
                      width={500}
                    />
                  </div>
                </div>
              </div>
              {/* 3rd */}
              <div className="border bg-white rounded-md pt-1 pl-1 row-span-2 max-h-[600px] md:max-h-[700px] ">
                <div className=" rounded-[calc(theme(borderRadius.md)-2px)] h-full flex flex-col justify-center  ">
                  <div className=" p-4 mx-5 flex flex-col gap-2 mr-1 mb-1 justify-center items-center">
                    <h1 className="font-medium  text-xl xl:text-2xl 3xl:text-3xl ">
                      Easy Integration
                    </h1>
                    <p className="text-gray-600 text-sm  ">
                      Connect Zeno with your existing workflows in minutes and
                      call our intuitive logging API from any language.
                    </p>
                  </div>
                  <div className="ml-7 mt-3 rounded-tl-lg border h-full   flex flex-col bg-slate-900">
                    <div className="rounded-[calc(theme(borderRadius.lg)-3px)]  bg-slate-800 border-b-2  rounded-tr-none border-slate-600/60 rounded-b-none  flex justify-start">
                      <span className="text-white text-xs bg-slate-300/10 p-2 border-b border-white/40">
                        Zeno.js
                      </span>
                    </div>
                    <div className="overflow-hidden">
                      <div className="max-h-[30rem] ">
                        <Prism
                          language="typescript"
                          style={{
                            ...oneDark,
                            'pre[class*="language-"]': {
                              ...oneDark['pre[class*="language-"]'],
                              background: "transparent",
                              overflow: "hidden",
                              fontSize: "14px",
                            },
                            'code[class*="language-"]': {
                              ...oneDark['code[class*="language-"]'],
                              background: "transparent",
                            },
                          }}
                        >
                          {codeSnippet}
                        </Prism>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 4th */}
              <div className="border bg-white rounded-md p-1 ">
                <div className=" rounded-[calc(theme(borderRadius.md)-2px)] h-full flex flex-col justify-center items-center ">
                  <div className=" p-4 mx-5 flex flex-col gap-2">
                    <h1 className="font-medium  text-xl xl:text-2xl 3xl:text-3xl ">
                      Track Any Properties
                    </h1>
                    <p className="text-gray-600 text-sm">
                      Add any custom data you like to an event, such as a user
                      email, a purchase amount or an exceeded quota.
                    </p>
                  </div>
                  <div className="m-7 h-full">
                    <Image
                      src="https://res.cloudinary.com/dwxzguawt/image/upload/v1731386709/bento-custom-data_rtzmyv.png"
                      alt="Image"
                      height={300}
                      width={500}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper className="bg-white">
          <div className="flex flex-1 justify-center items-center flex-col ">
            <div className="flex flex-col justify-center items-center gap-2 mb-20">
              <h1 className=" text-purple-600">Real-World Experiences</h1>
              <Heading>What our customers say</Heading>
            </div>
            <div className="bg-slate-200 rounded-md md:rounded-lg p-4 flex flex-col gap-20 md:flex-row md:p-16  ">
              <div className="flex flex-col justify-center items-center  gap-4">
                <div className="flex gap-2">
                  <Star className="fill-blue-400 text-blue-600 size-5" />
                  <Star className="fill-blue-400 text-blue-600 size-5" />
                  <Star className="fill-blue-400 text-blue-600 size-5" />
                  <Star className="fill-blue-400 text-blue-600 size-5" />
                  <Star className="fill-blue-400 text-blue-600 size-5" />
                </div>
                <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-gray-600 text-center lg:text-left text-pretty md:text-sm">
                  {" "}
                  Zeno has been a game-changer for me. I've been using it for
                  two months now and seeing sales pop up in real-time is super
                  satisfying.
                </p>
                <Image
                  src="https://res.cloudinary.com/dwxzguawt/image/upload/v1731395836/8bfa1f3ab8ff1994e5a4674155e63b20_t47xb0.jpg"
                  height={70}
                  width={70}
                  alt="userPic"
                  className="rounded-full"
                />
                <div className="flex justify-center items-center flex-col">
                  <div className=" flex gap-2 justify-center items-center">
                    <h1 className="font-semibold">Freya</h1>
                    <Verified className="size-5 fill-blue-500 text-white" />
                  </div>
                  <p className="text-gray-500">@isefreys</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center  gap-4">
                <div className="flex gap-2">
                  <Star className="fill-blue-400 text-blue-600 size-5" />
                  <Star className="fill-blue-400 text-blue-600 size-5" />
                  <Star className="fill-blue-400 text-blue-600 size-5" />
                  <Star className="fill-blue-400 text-blue-600 size-5" />
                  <Star className="fill-blue-400 text-blue-600 size-5" />
                </div>
                <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-gray-600 text-center lg:text-left text-pretty md:text-sm">
                  {" "}
                  Zeno been paying off for our SaaS. Nice to have simple way to
                  see how we're doing day-to-day. Definitely makes our lives
                  easier.
                </p>
                <Image
                  src="https://res.cloudinary.com/dwxzguawt/image/upload/v1731396876/0861b76ad6e3b156c2b9d61feb6af864_ekjmdt.jpg"
                  height={70}
                  width={70}
                  alt="userPic"
                  className="rounded-full"
                />
                <div className="flex justify-center items-center flex-col">
                  <div className=" flex gap-2 justify-center items-center">
                    <h1 className="font-semibold">Kai Durant</h1>
                    <Verified className="size-5 fill-blue-500 text-white" />
                  </div>
                  <p className="text-gray-500">@kdurant_</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 mb-5  flex justify-center items-center">
            <CustomButton
              className="bg-purple-600 p-2 w-[50%] min-w-[250px]"
              href="/sign-up"
            >
              Start For Free Today
            </CustomButton>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Page;
