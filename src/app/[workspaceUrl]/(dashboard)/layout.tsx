"use server";

import { prisma } from "@/lib/prisma"
import { getSession } from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";
import LayoutPanels from "./layout-panels";

export default async function Layout({ children, params }: { children: React.ReactNode, params: { workspaceUrl: string } }) {
  const session = await getSession();
  const workspace = await prisma.workspace.findUnique({
    where: { url: params.workspaceUrl, members: { some: { user: { email: session?.user.email } } } },
  })

  if (!workspace) return notFound();

  return (
    <LayoutPanels workspace={workspace} >
      {children}
    </LayoutPanels>
  );
}