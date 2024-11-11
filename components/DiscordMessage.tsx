import { Clock } from "lucide-react";
import Image from "next/image";

interface discordMessageProps {
  avatarSrc: string;
  avatarAlt: string;
  username: string;
  timestamp: string;
  badgeText?: string;
  badgeTextColor?: string;
  badgeColor?: string;
  title: string;
  content: {
    [key: string]: string;
  };
}

const DiscordMessage = ({
  avatarAlt,
  avatarSrc,
  timestamp,
  username,
  badgeText = "Bot",
  badgeColor = "ffffff",
  badgeTextColor = "000000",
  title,
  content,
}: discordMessageProps) => {
  return (
    <div className="w-full  flex justify-start items-start">
      <div className="flex items-center mb-2">
        <Image
          src={avatarSrc}
          alt={avatarAlt}
          height={40}
          width={40}
          className="rounded-full"
        />
      </div>

      {/* Message Content */}
      <div className="min-w-[70%] ">
        <div className="flex items-center px-2 h-full">
          <p className="font-semibold text-white">{username}</p>
          <span className="ml-2 px-1.5 py-0.5 text-xs font-semibold bg-yellow-600 text-white rounded">
            APP
          </span>
          <span className="text-gray-400 ml-1.5 text-xs font-normal">
            {timestamp}
          </span>
        </div>

        <div className="bg-gray-800 flex flex-1  flex-col mx-2 p-2  rounded mt-2 min-w-[70%] ">
          <div className="flex justify-between ">
            <p className="text-white font-semibold text-sm">{title}</p>
            <div
              style={{
                backgroundColor: `#${badgeColor}`, // Badge background color
                color: `#${badgeTextColor}`, // Badge text color
              }}
              className={`rounded-sm flex justify-center items-center  px-2  text-xs font-semibold `}
            >
              {badgeText}
            </div>
          </div>
          {Object.entries(content).map(([key, value]) => (
            <p key={key} className="text-[#dcddde] text-sm/6">
              <span className="text-[#b9bbbe]">{key}:</span> {value}
            </p>
          ))}
          <p className="text-[#72767d] text-xs mt-2 flex items-center">
            <Clock className="size-3 mr-1" />
            {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscordMessage;
