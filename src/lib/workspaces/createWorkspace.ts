"use server";

import { getSession } from "@auth0/nextjs-auth0";
import { randomBytes } from "crypto";
import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function generateInviteCode(): string {
  return randomBytes(32).toString("hex").slice(0, 32);
}

type CreateWorkspaceForm = {
  workspace_name_error?: string;
  workspace_url_error?: string;
  error?: string;
};

export async function createWorkspace(
  prevState: CreateWorkspaceForm,
  formData: FormData
): Promise<CreateWorkspaceForm> {
  const session = await getSession();

  const raw_form_data = {
    workspace_name: formData.get("workspace_name"),
    workspace_url: formData.get("workspace_url"),
  };

  const schema = z.object({
    workspace_name: z.string().trim().min(3).max(32),
    workspace_url: z
      .string()
      .regex(/^[a-zA-Z0-9-_]+$/)
      .min(3)
      .max(32),
  });

  try {
    const { workspace_name, workspace_url } = schema.parse(raw_form_data);
    const invite_code = generateInviteCode();
    const workspace = await prisma.workspace.create({
      data: {
        name: workspace_name,
        url: workspace_url,
        invite_code,
        members: {
          create: [
            {
              user: { connect: { email: session!.user.email } },
              role: "ADMIN",
            },
          ],
        },
      },
    });
    redirect(`/workspaces/${workspace.id}`);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const workspace_name_error = error.issues.find(
        (issue) => issue.path[0] === "workspace_name"
      )?.message;

      const workspace_url_error = error.issues.find(
        (issue) => issue.path[0] === "workspace_url"
      )?.message;

      return { ...prevState, workspace_name_error, workspace_url_error };
    }

    return { error: "Could not create a form" };
  }
}
