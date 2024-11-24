"use client";
import { useState } from "react";

import { toast } from "@/hooks/use-toast";
import { trpc } from "@/server/client";
import { Button } from "@/components/ui/button";

const SettingsContent = ({ discordId }: { discordId: string }) => {
  const [newDiscordId, setDiscordId] = useState(discordId);

  const { mutate, isPending } = trpc.usageInfo.setDiscordId.useMutation({
    onSuccess: () => {
      toast({ description: "Discord id set successfully!" });
    },
  });

  const handleClick = () => {
    if (newDiscordId === discordId) {
      return toast({ description: "Already setted!" });
    }
    if (newDiscordId.length > 20 && discordId != newDiscordId) {
      return toast({ description: "Invalid discord id!" });
    }
    mutate({ discordId: newDiscordId });
  };

  return (
    <div className="bg-white rounded-md lg:m-10 max-w-3xl p-2 px-4 ">
      <h1 className="font-medium">Discord ID</h1>
      <div className="w-full pr-8 flex items-center mt-2 h-10 ">
        <input
          type="number"
          className=" bg-slate-100  rounded-sm h-full w-full  px-4 tracking-widest  border appearance-none  focus:outline-none "
          value={newDiscordId}
          onChange={(e) => setDiscordId(e.target.value)}
          placeholder="Enter your Discod Id"
        />
      </div>
      <p className="text-gray-700 text-sm p-2">
        Don't know how to find your Discord ID?{" "}
        <a
          href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID"
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          Learn how to obtain it here.
        </a>
      </p>

      <div className=" max-w-48  p-2">
        <Button
          className="bg-purple-600 p-1 px-2 rounded-sm"
          onClick={handleClick}
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default SettingsContent;
