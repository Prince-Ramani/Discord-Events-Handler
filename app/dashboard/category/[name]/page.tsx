import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/app/prisma";
import { notFound } from "next/navigation";

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

  return <div>{category.name}</div>;
};

export default Page;
