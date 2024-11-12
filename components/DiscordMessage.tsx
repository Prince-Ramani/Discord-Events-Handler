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
  badgeColor = "3b82f6",
  badgeTextColor = "000000",
  title,
  content,
}: discordMessageProps) => {
  return (
    <div className="w-full flex justify-start items-start">
      <div className="flex items-center justify-center mb-2  ">
        <img
          src={avatarSrc}
          alt={avatarAlt}
          className="rounded-full min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px]  shrink-0 bg-blue-600"
        />
      </div>

      {/* Message Content */}
      <div className="min-w-[70%] ">
        <div className="flex items-center px-2 h-full">
          <p className="font-semibold text-white text-sm sm:text-base ">
            {username}
          </p>
          <span className="ml-2 px-1.5 py-0.5 text-xs font-semibold bg-yellow-600 text-white rounded ">
            APP
          </span>
          <span className="text-gray-400 ml-1.5 text-xs font-normal  ">
            {timestamp}
          </span>
        </div>

        <div className="bg-gray-800 flex flex-1 flex-col mx-2 p-2 rounded mt-2 min-w-[70%]">
          <div className="flex justify-between ">
            <p className="text-white font-semibold text-sm">{title}</p>
            <div
              style={{
                backgroundColor: `#${badgeColor}`,
                color: `#${badgeTextColor}`,
              }}
              className="rounded-sm flex justify-center items-center px-1 sm:px-2 text-xs font-semibold "
            >
              {badgeText}
            </div>
          </div>
          {Object.entries(content).map(([key, value]) => (
            <p key={key} className="text-[#dcddde] sm:text-sm/6 text-xs">
              <span className="text-[#b9bbbe] ">{key}:</span> {value}
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
