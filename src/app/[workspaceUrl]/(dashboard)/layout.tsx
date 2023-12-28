"use server";

import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma"
import { getSession } from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";

export default async function Layout({ children, params }: { children: React.ReactNode, params: { workspaceUrl: string } }) {
  const session = await getSession();
  const workspace = await prisma.workspace.findUnique({
    where: { url: params.workspaceUrl, members: { some: { user: { email: session?.user.email } } } },
  })

  if (!workspace) return notFound();

  return (
    <div className="min-h-screen">
      <Button>
        Button
      </Button>
    </div>
  );
}