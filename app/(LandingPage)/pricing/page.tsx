"use client";
import Bar from "@/app/dashboard/_components/bar";
import { CustomButton } from "@/components/CustomButton";
import Heading from "@/components/Heading";
import { trpc } from "@/server/client";
import { useUser } from "@clerk/nextjs";
import { Check, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Pricing = () => {
  const { user } = useUser();
  const router = useRouter();

  const { mutate: createCheckoutSession } =
    trpc.premium.createCheckoutSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
    });

  const FEATURES = [
    "10,000 real-time events per month",
    "Advanced analytics and insights",
    "10 event categories",
    "Priority support",
  ];

  const handleClick = () => {
    if (user) createCheckoutSession();

    router.push("/sign-in?intent=upgrade");
  };

  return (
    <div className="bg-slate-200 min-h-full min-w-full p-2">
      <Bar title="Pricing" backButtonUrl="/" />

      <div className="p-2 flex flex-col center items-center gap-10">
        <div className="p-2 flex flex-col gap-4 md:gap-6 lg:gap-7 items-center">
          <Heading className="text-3xl">Simple no-tricks pricing</Heading>
          <p className="text-sm max-w-prose text-center text-gray-600">
            We hate subscriptions. And chances ar you too, you do too. That's
            why we offer lifetime access to Zeno for a one-time payment.
          </p>
        </div>

        <div className="bg-white rounded-md w-full lg:max-w-7xl grid grid-cols-1 md:grid-cols-5  ">
          <div className="col-span-3  p-3  md:p-4 lg:pl-6 mb-10 ">
            <div className="flex flex-col items-start  gap-8">
              <Heading className="text-2xl sm:text-3xl">
                Lifetime access
              </Heading>
              <p className="tracking-wide leading-relaxed text-sm  text-gray-600 max-w-prose ">
                Invest once in Zeno and transform how you monitor your SaaS
                forever. Get instant alerts, track critical metrics and never
                miss a beat in your business growth.
              </p>
              <div className="flex flex-col gap-8 w-full  ">
                <h1 className="text-purple-700 font-medium text-lg/6">
                  What's included
                </h1>
                <ul className=" grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                  {FEATURES.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <CheckIcon className="h-6 w-5 flex-none text-gray-700" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className=" bg-slate-100 rounded-sm m-1 md:col-span-2 p-4 ">
            <div className="flex justify-center items-center h-full w-full flex-col p-6 md:p-0 gap-10 md:gap-6">
              <h1>Pay once, own forever</h1>
              <h1>
                <span className="font-semibold text-5xl text-black">$41</span>
                USD
              </h1>
              <CustomButton
                className="bg-purple-600 p-2 px-16  md:px-12"
                onClick={handleClick}
              >
                Get Zeno
              </CustomButton>
              <p className="text-sm text-gray-600">
                Secure payment. Start monitoring in minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
