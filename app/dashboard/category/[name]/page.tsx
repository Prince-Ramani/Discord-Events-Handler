import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/app/prisma";
import { notFound } from "next/navigation";
import Bar from "../../_components/bar";

interface PageProps {
  params: {
    name: string | string[] | undefined;
  };
}

const Page = async ({ params }: PageProps) => {
  const { name } = params;

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

  return <Bar title={`${category.emoji} ${category.name} events`}></Bar>;
};

export default Page;
