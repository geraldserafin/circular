"use server";

import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type JoinWorkspaceForm = {
  workspace_invite_code_error?: string;
  workspace_url_error?: string;
  error?: string;
};

export async function joinWorkspace(
  _: JoinWorkspaceForm,
  formData: FormData
): Promise<JoinWorkspaceForm> {
  const session = await getSession();

  const { workspace_url, workspace_invite_code } = {
    workspace_invite_code: formData.get("workspace_invite_code"),
    workspace_url: formData.get("workspace_url"),
  };

  if (!workspace_invite_code) {
    return { workspace_invite_code_error: "Invite code is required" };
  }

  if (!workspace_url) {
    return { workspace_url_error: "Workspace URL is required" };
  }

  let workspace = null;

  try {
    workspace = await prisma.workspace.update({
      where: {
        url: workspace_url.toString(),
        invite_code: workspace_invite_code.toString(),
        members: { none: { user: { email: session?.user.email } } },
      },
      data: {
        members: {
          create: {
            role: "MEMBER",
            user: { connect: { email: session?.user.email } },
          },
        },
      },
    });
  } catch (error) {
    return { error: "Could not join workspace" };
  }

  redirect(`/${workspace.url}`);
}
