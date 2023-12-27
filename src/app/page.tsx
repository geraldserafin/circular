import { Highlighted } from '@/components/theme/highlighted';
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
      <div className="min-h-screen flex flex-col p-8 dark:bg-neutral-900 dark:text-neutral-200">
        <nav className="flex justify-between text-sm">
          <Highlighted>
            <a href="/api/auth/logout" className="font-semibold">Log out</a>
          </Highlighted>


          <div>
            <span className="text-xs dark:text-neutral-400">Logged in as:</span>
            <br />
            <p className="font-semibold">
              {session!.user.email}
            </p>
          </div>
        </nav>

        <main className="max-w-md text-center m-auto">
          <h1 className="text-2xl font-semibold mb-4">Create a new workspace</h1>
          <p className="text-neutral-400 mb-8">Workspaces are shared enviroments where teams can work on projects, cycles and tasks.</p>
          <CreateWorkspaceForm />
        </main>
      </div>
    )
  }

  redirect(`/${workspaces[0].url}`);
}
