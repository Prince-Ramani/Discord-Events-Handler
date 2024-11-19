"use client";

import { ArrowLeft } from "lucide-react";
import Heading from "../../../components/Heading";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
interface BarProps {
  title: string;
  backButton?: boolean;
  backButtonUrl?: string;
  cta?: ReactNode;
}

const Bar = ({ title, backButton = true, backButtonUrl, cta }: BarProps) => {
  const router = useRouter();
  return (
    <>
      <div className="  p-2 sm:p-3 lg:p-4 flex items-center gap-5 sm:gap-7 md:gap-9 lg:gap-10  ">
        {backButton ? (
          <div>
            <Button
              variant="outline"
              onClick={() => router.push(`${backButtonUrl}`)}
            >
              <ArrowLeft />
            </Button>
          </div>
        ) : null}
        <Heading className=" text-xl sm:text-3xl">{title}</Heading>
        {cta}
      </div>
      <div className="border border-gray-500/30  mx-5" />
    </>
  );
};

export default Bar;
