import { Button } from '@/components/ui/button';
import CreateWorkspaceForm from '@/components/workspaces/CreateWorkspaceForm';
import { prisma } from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getSession();

  if (!session?.user) {
    return (
      <main className="flex flex-col gap-2">
        <a href="/api/auth/login">Login</a>
      </main>
    );
  }

  const workspaces = await prisma.workspace.findMany({
    where: { members: { some: { user: { email: session.user.email } } } }
  })

  if (workspaces.length === 0) {
    return (
      <div className="min-h-screen flex flex-col p-8">
        <nav className="flex justify-between text-sm">
          <Button variant="ghost" asChild>
            <a href="/api/auth/logout" className="font-semibold">Log out</a>
          </Button>


          <div>
            <span className="text-xs text-muted-foreground">Logged in as:</span>
            <br />
            <p className="font-semibold">
              {session!.user.email}
            </p>
          </div>
        </nav>

        <main className="max-w-md text-center m-auto">
          <h1 className="text-2xl font-semibold mb-4">Create a new workspace</h1>
          <p className="text-muted-foreground mb-8">Workspaces are shared enviroments where teams can work on projects, cycles and tasks.</p>
          <CreateWorkspaceForm />
        </main>
      </div>
    )
  }

  redirect(`/${workspaces[0].url}`);
}
