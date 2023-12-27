"use client"

import { Workspace } from "@prisma/client"
import { Button } from "@/components/theme/button"
import { useFormState } from "react-dom";
import { joinWorkspace } from "@/lib/workspaces/joinWorkspace";

export default function JoinWorkspaceForm({ workspace }: { workspace: Workspace }) {
  const [state, action] = useFormState(joinWorkspace, {});

  return (
    <form action={action} className="p-8 bg-neutral-800 rounded flex flex-col items-center justify-center max-w-md w-full text-neutral-200 gap-4">
      <div className="rounded p-4 bg-green-600 uppercase text-2xl text-center">
        {workspace.name.slice(0, 2)}
      </div>
      <h1 className="text-2xl font-semibold">Join {workspace.name}</h1>
      <p className="-mt-2 mb-2 text-neutral-400">You've been invited to join the {workspace.name} workspace.</p>

      <input type="hidden" name="workspace_invite_code" value={workspace.invite_code} />
      <input type="hidden" name="workspace_url" value={workspace.url} />

      <Button role="submit">
        Join
      </Button>

      {state.error && <p className="text-red-500">{state.error}</p>}
      {state.workspace_invite_code_error && <p className="text-red-500">{state.workspace_invite_code_error}</p>}
      {state.workspace_url_error && <p className="text-red-500">{state.workspace_url_error}</p>}
    </form>
  )
}