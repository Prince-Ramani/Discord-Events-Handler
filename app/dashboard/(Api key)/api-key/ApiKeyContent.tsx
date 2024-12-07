"use client";

import { toast } from "@/hooks/use-toast";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Tooltip } from "@radix-ui/react-tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

const ApiKeyContent = ({ apiKey }: { apiKey: string }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    toast({ description: "Api key copied successfully!" });
  };
  return (
    <div className="bg-white rounded-md lg:m-10 max-w-3xl p-2 ">
      <h1 className="font-medium">Your API Key</h1>
      <div className="w-full pr-8 flex items-center mt-2 h-10 ">
        <input
          type="password"
          className=" bg-slate-100  rounded-sm h-full w-full focus:outline-none px-4 tracking-widest  rounded-r-none border border-r-0   "
          value={apiKey}
          readOnly
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={handleClick}
                className="p-1 w-10 focus:outline-none border border-l-0 rounded-l-none min-h-full bg-slate-100 "
              >
                {copied ? (
                  <CheckIcon className="size-8 text-gray-900" />
                ) : (
                  <ClipboardIcon className="size-8 text-gray-900" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Click to copy API key</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <p className="text-gray-700 text-sm p-2">
        Keep your key secret and do not share it with others.
      </p>
    </div>
  );
};

export default ApiKeyContent;
