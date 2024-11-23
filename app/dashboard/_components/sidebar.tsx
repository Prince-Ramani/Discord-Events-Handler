"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { UserButton, useUser } from "@clerk/nextjs";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Gem, HomeIcon, Key, Menu, Settings, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  children?: React.ReactNode;
  className?: string;
}

const Sidebar = ({ children, className }: SidebarProps) => {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="bg-white w-full md:min-h-full md:w-[200px] lg:w-[300px] fixed p-3 md:p-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-purple-600 select-none">
          Zeno
        </h2>
        <Menu
          className="size-6 md:hidden text-gray-800 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <div className="md:hidden">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] p-6 bg-slate-300 shadow-lg rounded-lg z-50"
              aria-labelledby="sidebar-title"
              aria-describedby="sidebar-description"
            >
              <div className="flex justify-between items-center flex-col ">
                <DialogHeader className=" w-full">
                  <div className="flex justify-between items-center">
                    <DialogTitle>
                      <p className="text-xl font-semibold">Sidebar</p>
                    </DialogTitle>
                    <DialogClose asChild onClick={() => setIsOpen(false)}>
                      <Button size="sm" variant="outline" className="hover">
                        <X />
                      </Button>
                    </DialogClose>
                  </div>
                  <DialogDescription className="text-xs p-1 text-gray-600">
                    Here you can navigate through various sections such as the
                    Dashboard, Upgrade, and Account Settings.
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="flex  flex-col gap-4">
                <div className="flex flex-col gap-2 mt-4  ">
                  <p className="text-gray-700 text-sm">Overview</p>
                  <div className="flex items-center justify-start  gap-4 hover:bg-slate-100 p-1 px-2 cursor-pointer rounded-md">
                    <span>
                      <HomeIcon className="size-5" />
                    </span>
                    <span>Dashboard</span>
                  </div>
                </div>
                {/* 2nd */}
                <div className="flex flex-col gap-2 ">
                  <p className="text-gray-700 text-sm">Account</p>
                  <div className="flex items-center justify-start  gap-4 hover:bg-slate-100 p-1 px-2 cursor-pointer rounded-md">
                    <span>
                      <Gem className="size-5" />
                    </span>
                    <span>Upgrade</span>
                  </div>
                </div>
                {/* 3rd */}
                <div className="flex flex-col gap-2 ">
                  <p className="text-gray-700 text-sm">Settings</p>
                  <div className="flex items-center justify-start  gap-4 hover:bg-slate-100 p-1 px-2 cursor-pointer rounded-md">
                    <span>
                      <Key className="size-5" />
                    </span>
                    <span>Api Key</span>
                  </div>
                  <div className="flex items-center justify-start  gap-4 hover:bg-slate-100 p-1 px-2 cursor-pointer rounded-md">
                    <span>
                      <Settings className="size-5" />
                    </span>
                    <span>Account Settings</span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div className="pt-8 flex-col gap-8 hidden md:flex">
        {/* !st */}
        <div className="flex flex-col gap-4 ">
          <p className="text-gray-700 font-medium">Overview</p>
          <div className="flex items-center justify-start  gap-4 hover:bg-slate-100 p-1 px-2 cursor-pointer rounded-md">
            <span>
              <HomeIcon className="size-5" />
            </span>
            <span>Dashboard</span>
          </div>
        </div>
        {/* 2nd */}
        <div className="flex flex-col gap-4">
          <p className="text-gray-700 font-medium">Account</p>
          <div
            className="flex items-center justify-start  gap-4 hover:bg-slate-100 p-1 px-2 cursor-pointer rounded-md"
            onClick={() => router.push("/dashboard/upgrade")}
          >
            <span>
              <Gem className="size-5" />
            </span>
            <span>Upgrade</span>
          </div>
        </div>

        {/* 3rd */}

        <div className="flex flex-col gap-4 ">
          <p className="text-gray-700 font-medium">Settings</p>
          <div className="flex items-center justify-start  gap-4 hover:bg-slate-100 p-1 px-2 cursor-pointer rounded-md">
            <span>
              <Key className="size-5" />
            </span>
            <span>Api Key</span>
          </div>
          <div className="flex items-center justify-start  gap-4 hover:bg-slate-100 p-1 px-2 cursor-pointer rounded-md">
            <span>
              <Settings className="size-5" />
            </span>
            <span>Account Settings</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 hidden md:flex  items-center flex-col justify-around gap-4 text-xl text-gray-800 md:w-[150px] lg:w-[250px] ">
        <div className="border border-black/20  w-full" />
        <div className="flex justify-start items-center  w-full p-2 gap-4 text-sm lg:text-lg leading-tight tracking-wide hover:bg-slate-200 cursor-pointer  rounded-md">
          <UserButton />
          {user?.fullName}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
