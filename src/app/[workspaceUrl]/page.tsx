import { prisma } from "@/lib/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";

export default async function Workspace({ params }: { params: { workspaceUrl: string } }) {
  const session = await getSession();
  const workspace = await prisma.workspace.findUnique({
    where: {
      url: params.workspaceUrl,
      members: {
        some: {
          user: {
            email: session?.user.email
          }
        }
      }
    }
  });

  if (!workspace) {
    return notFound();
  }

  return (
    <div>
      <h1>{workspace.name}</h1>
      <p>{workspace.url}</p>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}