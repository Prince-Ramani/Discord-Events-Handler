"use client";

import { ArrowLeft } from "lucide-react";
import Heading from "../../../components/Heading";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
interface BarProps {
  title: string;
  backButton?: boolean;
  cta?: React.ReactNode;
}

const Bar = ({ title, backButton = true, cta }: BarProps) => {
  const router = useRouter();
  return (
    <div className="border bg-slate-200 p-2 sm:p-3 lg:p-4 flex items-center gap-5 sm:gap-7 md:gap-9 lg:gap-10">
      {backButton ? (
        <div>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
        </div>
      ) : null}
      <Heading className=" text-xl sm:text-3xl">{title}</Heading>
      {cta}
    </div>
  );
};

export default Bar;
