import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/app/prisma";
import { notFound } from "next/navigation";
import Bar from "../../_components/bar";
import NoCategoryEvents from "./no_category-events";
import CategoryContent from "./categoy-content";

type tParams = Promise<{ name: string[] | string | undefined }>;

const Page = async ({ params }: { params: tParams }) => {
  const { name } = await params;

  if (!name || typeof name !== "string") {
    return notFound();
  }

  const user = await currentUser();
  if (!user) return notFound();

  const auth = await prisma.user.findFirst({
    where: {
      externalId: user.id,
    },
  });

  if (!auth) return notFound();

  const category = await prisma.eventCategory.findUnique({
    where: {
      userId_name: {
        userId: auth.id,
        name: name,
      },
    },
    include: {
      _count: {
        select: {
          events: true,
        },
      },
    },
  });

  if (!category) return notFound();
  const hasEvents = category._count.events > 0;

  return (
    <div className=" min-h-full  flex flex-col    overflow-y-scroll no-scrollbar  ">
      <Bar
        title={`${category.emoji} ${category.name} events`}
        backButton={true}
        backButtonUrl="/dashboard"
      />
      <div className="flex flex-1  ">
        {hasEvents ? (
          <CategoryContent hasEvents={hasEvents} categoryName={name} />
        ) : (
          <NoCategoryEvents categoryName={category.name} />
        )}
      </div>
    </div>
  );
};

export default Page;
