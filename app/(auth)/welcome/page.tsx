"use client";

import Heading from "@/components/Heading";
import LoadingSpinner from "@/components/LoadindSpinner";
import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Welcome = () => {
  const router = useRouter();
  const { data, isError } = trpc.user.getUserSyncStatus.useQuery(undefined, {
    refetchInterval: (query) => {
      console.log(query);
      if (query.state.data?.isSynced) {
        return false;
      } else {
        return 1000;
      }
    },
  });

  if (isError) console.log(isError);

  useEffect(() => {
    if (data?.isSynced) router.push("/dashboard");
  }, [data, router]);

  return (
    <>
      <div className="flex flex-col justify-center items-center border   gap-3">
        <LoadingSpinner />
        <div>
          <Heading>Creating your account...</Heading>
        </div>
        <h1 className=" text-center text-gray-600 text-xs sm:text-sm ">
          Just a moment while we set things up for you.
        </h1>
      </div>
    </>
  );
};

export default Welcome;
