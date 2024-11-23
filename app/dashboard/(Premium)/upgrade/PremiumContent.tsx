"use client";
import { createCheckoutSession } from "@/lib/stripe";
import { trpc } from "@/server/client";
import { plan } from "@prisma/client";
import { endOfMonth, formatDate } from "date-fns";
import { BarChart } from "lucide-react";
import { useRouter } from "next/navigation";

let globalDate: Date | null;

const PremiumContent = ({ plan }: { plan: plan }) => {
  const router = useRouter();
  const { data } = trpc.premium.createCheckoutSession.useMutation({
    onSuccess: ({ url }) => {
      if (url) router.push(url);
    },
  });

  const { data: usageInfo } = trpc.usageInfo.getUsageInfo.useQuery();

  if (usageInfo?.resetDate) {
    const dd = new Date(usageInfo.resetDate);
    globalDate = endOfMonth(dd);
  }

  return (
    <div className=" p-4 md:p-6 lg:p-8 flex flex-col gap-2">
      <div>Plan: {plan}</div>
      <div className="text-gray-500 text-sm leading-tight ">
        {plan === "FREE"
          ? "Get access to more events, categories and premium support."
          : "Thank you for supporting Zeno. Find your increased usage limits below."}
      </div>
      <div>
        <div className=" rounded-md max-w-3xl grid grid-cols-1 md:grid-cols-2 p-3 gap-4">
          <div className="flex flex-col  bg-white p-4 gap-2 border-2 rounded-md border-purple-600/40">
            <div className="flex justify-between items-center  ">
              <h1 className="font-medium">Total Events</h1>
              <BarChart className="size-5 text-gray-700" />
            </div>
            <div>
              <h1 className="font-bold text-xl p-1">
                {usageInfo?.eventsUsed || 0}{" "}
                <span className="font-semibold">of</span>{" "}
                {usageInfo?.eventsLimit || 100}
              </h1>
              <p className="text-gray-600 text-sm">Events this period</p>
            </div>
          </div>
          {/* 2nd */}
          <div className="flex flex-col  bg-white p-4 gap-2 rounded-md ">
            <div className="flex justify-between items-center  ">
              <h1 className="font-medium">Event Categories</h1>
              <BarChart className="size-5 text-gray-700" />
            </div>
            <div>
              <h1 className="font-bold text-xl p-1">
                {usageInfo?.categoriesUsed || 0}{" "}
                <span className="font-semibold">of</span>{" "}
                {usageInfo?.categoriesLimit || 3}
              </h1>
              <p className="text-gray-600 text-sm">Active categories</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>
          {" "}
          Usage will reset{" "}
          {usageInfo?.resetDate ? (
            formatDate(usageInfo.resetDate, "MMM d, yyyy")
          ) : (
            <span className="animate-pulse w-8 h-4 bg-gray-200"></span>
          )}
          {plan !== "PAID" ? (
            <span
              onClick={() => createCheckoutSession()}
              className="inline cursor-pointer underline text-blue-600"
            >
              {" "}
              or upgrade now to increase your limit &rarr;
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default PremiumContent;
