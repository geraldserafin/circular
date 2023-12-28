"use server"

import JoinWorkspaceForm from "@/components/workspaces/JoinWorkspaceForm";
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation";

export default async function JoinTeam({ params }: { params: { workspaceUrl: string, inviteCode: string } }) {
  const workspace = await prisma.workspace.findUnique({
    where: {
      url: params.workspaceUrl,
      invite_code: params.inviteCode
    }
  });

  if (!workspace) {
    return notFound();
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <JoinWorkspaceForm workspace={workspace} />
    </div>
  );
}