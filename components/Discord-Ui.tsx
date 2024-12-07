import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  Box,
  CirclePlusIcon,
  Cog,
  Gift,
  HeadphonesIcon,
  Home,
  Mic,
  Phone,
  Pin,
  PlusCircle,
  Search,
  Smile,
  Sticker,
  UserCircle,
  UserCircle2Icon,
  Video,
} from "lucide-react";
import { AnimatedList } from "./ui/animated-list";
import DiscordMessage from "./DiscordMessage";

const DiscordUi = () => {
  return (
    <MaxWidthWrapper className="flex  h-full  p-1 px-0 md:px-8  justify-center items-center ">
      <div className="flex flex-1  bg-[#272831] max-h-[600px] max-w-[90vw]  sm:min-h-[700px] sm:max-w-[1200px] h-full rounded-sm select-none">
        <div className="  bg-gray-900/50 p-2 rounded-l-sm  min-h-[600px] sm:min-h-[700px] h-full flex flex-col ">
          {/* server */}
          <div className=" w-8 h-8 flex justify-center items-center rounded-md bg-[#5865f2]">
            <Image
              src="https://res.cloudinary.com/dwxzguawt/image/upload/v1731301307/discord-logo-discord-icon-transparent-free-png_agvcfz.webp"
              height={40}
              width={40}
              alt="discord server"
              objectFit="cover"
              quality={100}
              className="rounded-md "
            />
          </div>
          <div className="pt-4 gap-y-2 flex justify-center items-center flex-col">
            {[...Array(5)].map((_, index) => (
              <div
                className=" w-8 h-8 flex justify-center items-center rounded-full   bg-[#36393f] text-[#dcddde] text-sm opacity-75"
                key={index}
              >
                {String.fromCharCode(65 + index)}
              </div>
            ))}
          </div>
          <div className="w-8 h-8 p-1 mt-auto   flex justify-center items-center rounded-full gap-y-2  bg-[#36393f] text-green-500 opacity-75 text-sm">
            <CirclePlusIcon />
          </div>
        </div>

        {/* Second section */}
        <div className="hidden md:flex flex-col  w-60 bg-[#2f3136] h-full  min-h-[700px] ">
          <div className="text-xs bg-gray-900 m-2 rounded-sm p-3 text-slate-400 font-light ">
            Find or start a conversation
          </div>
          <div className="border border-black/10" />
          <div className="p-2 flex justify-center items-start flex-col gap-4 text-[#dcddde] h-full   ">
            <div className="flex  justify-start items-center  gap-4">
              <UserCircle2Icon />
              Friends
            </div>
            <div className="flex  justify-start items-center  gap-4">
              <Box />
              More
            </div>
            <div className="text-gray-500 w-full  flex justify-center items-start gap-1  flex-col font-semibold text-xs   h-full ">
              <div>DIRECT MESSAGES</div>

              <div className="flex justify-start items-center gap-3 hover:bg-gray-700 w-full h-full p-1">
                <div className="rounded-full w-8 h-8 bg-[#36393f]">
                  <Image
                    src="https://res.cloudinary.com/dwxzguawt/image/upload/v1731306471/tumblr_906625ecdd0eadd9810ff5438572aa43_cc7d6d26_640_mqtzkf.jpg"
                    alt="Zeno"
                    quality={100}
                    height={32}
                    width={32}
                    className="rounded-full"
                  />
                </div>
                Zeno
              </div>

              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex justify-start items-center gap-3 hover:bg-gray-700 w-full p-1"
                >
                  <div className="rounded-full w-8 h-8 bg-[#36393f]"></div>
                  User {index + 1}
                </div>
              ))}
            </div>
          </div>
          <div className=" flex  gap-2 text-[#dcddde] w-full p-1 bg-gray-800 text-xs mt-auto  pb-2">
            <div className="h-8 w-8 rounded-full bg-blue-600 "></div>
            <div>
              <div>You</div>
              <div className="text-gray-500">@your_account</div>
            </div>
            <div className="flex justify-center items-center ">
              <Mic className="p-1 text" />
              <HeadphonesIcon className="p-1" />
              <Cog className="p-1" />
            </div>
          </div>
        </div>
        {/* Third section */}
        <div className="w-full bg-[#36393f] flex flex-col rounded-r-md">
          <div className="w-full p-2 flex justify-between items-center text-[#dcddde]">
            <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 ">
              <img
                src="https://res.cloudinary.com/dwxzguawt/image/upload/v1731306471/tumblr_906625ecdd0eadd9810ff5438572aa43_cc7d6d26_640_mqtzkf.jpg"
                alt="Profile pic"
                className="rounded-full shrink-0  h-9 w-9 sm:h-10 sm:w-10  "
              />
              <div className=" sm:text-lg font-semibold select-none hover:text-gray-500 text-sm">
                Zeno
              </div>
            </div>
            {/* ProfileIcons */}

            <div className="flex gap-3 sm:gap-4 p-2 items-center justify-center">
              <Phone className="hover:text-gray-600 size-4 sm:size-6" />
              <Video className="hover:text-gray-600 size-4 sm:size-6" />
              <Pin className="hover:text-gray-600 size-4 sm:size-6" />
              <UserCircle className="hover:text-gray-600 size-4 sm:size-6" />
              <Search className="hover:text-gray-600 size-4 sm:size-6" />
              <Home className="hover:text-gray-600 size-4 sm:size-6" />
            </div>
          </div>

          <div className="border-black/10 border" />
          {/*   Messages */}
          <div className="w-full flex-1 overflow-y-auto p-4 bg-discord-background flex flex-col-reverse">
            <AnimatedList>
              <DiscordMessage
                avatarSrc="https://res.cloudinary.com/dwxzguawt/image/upload/v1731306471/tumblr_906625ecdd0eadd9810ff5438572aa43_cc7d6d26_640_mqtzkf.jpg"
                avatarAlt="bot logo"
                username="Zeno"
                timestamp="Today at 6:09 AM"
                title="New member "
                badgeColor="ffffff"
                content={{
                  Name: "Prince",
                  Welcome: "Welcome to zeno",
                }}
              />
              <DiscordMessage
                avatarSrc="https://res.cloudinary.com/dwxzguawt/image/upload/v1731306471/tumblr_906625ecdd0eadd9810ff5438572aa43_cc7d6d26_640_mqtzkf.jpg"
                avatarAlt="bot logo"
                username="Zeno"
                timestamp="Today at 6:09 AM"
                title="New member "
                badgeColor="ffffff"
                content={{
                  Name: "Prince",
                  Welcome: "Welcome to zeno",
                }}
              />
              <DiscordMessage
                avatarSrc="https://res.cloudinary.com/dwxzguawt/image/upload/v1731306471/tumblr_906625ecdd0eadd9810ff5438572aa43_cc7d6d26_640_mqtzkf.jpg"
                avatarAlt="bot logo"
                username="Zeno"
                timestamp="Today at 6:09 AM"
                title="Purchased premium "
                badgeColor="3b82f6"
                badgeTextColor="E9DFB4"
                content={{
                  Name: "Prince",
                  Message: "Thankyou Prince for purchasing Premium!",
                }}
              />
            </AnimatedList>
          </div>

          {/* Input button */}
          <div className="p-2 text-[#dcddde]  mt-auto mb-1 ">
            <div className=" bg-[#4b4f59df] w-full text p-2 rounded-md flex justify-between items-center ">
              <div className="flex gap-4 pointer-events-none items-center">
                <PlusCircle />
                <div className="text-sm leading-tight">Zeno</div>
              </div>
              <div className="flex jutify-center items-center gap-4">
                <Gift />
                <Sticker />
                <Smile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default DiscordUi;
