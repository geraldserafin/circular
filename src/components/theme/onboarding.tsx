import { getSession } from "@auth0/nextjs-auth0";
import { Highlighted } from "./highlighted";
import CreateWorkspaceForm from "../workspaces/CreateWorkspaceForm";

export async function Onboarding() {
  const session = await getSession();

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

