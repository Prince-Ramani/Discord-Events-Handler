"use client";

import { trpc } from "@/server/client";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface NoCategoryEventsProps {
  categoryName: string;
}

const NoCategoryEvents = ({ categoryName }: NoCategoryEventsProps) => {
  const router = useRouter();
  const { data } = trpc.category.pollCategory.useQuery(
    { name: categoryName },
    {
      refetchInterval: (query) => {
        return query.state.data?.hasEvents ? false : 2000;
      },
    }
  );

  const hasEvents = data?.hasEvents;

  useEffect(() => {
    if (hasEvents) router.refresh();
  }, [router, hasEvents]);

  const codeSnippet = `await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
          category: '${categoryName}',
          fields: {
            field1: 'value1', // for example: user id
            field2: 'value2' // for example: user email
          }
        })
      })`;
  return (
    <div className="flex flex-1 flex-col min-h-full w-full   justify-start items-center p-2 sm:p-6 lg:p-10 ">
      <div className="bg-white h-full w-full rounded-md shadow-sm shadow-gray-500/35 flex flex-col items-center  p-4">
        <div className="flex flex-col items-center gap-2 ">
          <h1 className="font-semibold text-xl sm:text-2xl tracking-tight">
            Create your first Bug event
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 tracking-wider">
            Get started by sending a request to our tracking API.
          </p>
        </div>

        <div className="flex justify-center items-center h-full  w-full  ">
          <div className="w-full  max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden  ">
            <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="size-3 rounded-full bg-red-500" />
                <div className="size-3 rounded-full bg-yellow-500" />
                <div className="size-3 rounded-full bg-green-500" />
              </div>

              <span className="text-gray-400 text-sm">your-first-event.js</span>
            </div>

            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={{
                borderRadius: "0px",
                margin: 0,
                padding: "1rem",
                fontSize: "0.875rem",
                lineHeight: "1.5",
              }}
            >
              {codeSnippet}
            </SyntaxHighlighter>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-sm sm:text-base">
          <h1 className="animate-pulse duration-900 flex gap-1 items-center">
            <ArrowBigRight className="fill-green-400  text-transparent size-7" />
            Listening to incoming events...
          </h1>
          <h1>
            Need help? Check out our{" "}
            <a href="#" className="text-blue-600 ">
              documentation
            </a>{" "}
            or{" "}
            <a href="#" className="text-blue-600 ">
              contact support.
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NoCategoryEvents;
