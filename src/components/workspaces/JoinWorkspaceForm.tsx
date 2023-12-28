"use client"

import { Workspace } from "@prisma/client"
import { useFormState } from "react-dom";
import { joinWorkspace } from "@/lib/workspaces/joinWorkspace";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function JoinWorkspaceForm({ workspace }: { workspace: Workspace }) {
  const [state, action] = useFormState(joinWorkspace, {});

  return (
    <Card>
      <form action={action} className="p-8 rounded flex flex-col items-center justify-center max-w-md w-full gap-4">
        <div className="rounded p-4 bg-primary uppercase text-2xl text-background text-center">
          {workspace.name.slice(0, 2)}
        </div>

        <h1 className="text-2xl font-semibold">Join {workspace.name}</h1>
        <p className="-mt-2 mb-2 text-muted-foreground">You've been invited to join the {workspace.name} workspace.</p>

        <input type="hidden" name="workspace_invite_code" value={workspace.invite_code} />
        <input type="hidden" name="workspace_url" value={workspace.url} />

        <Button role="submit" className="w-full">
          Join
        </Button>

        {state.error && <p className="text-red-500">{state.error}</p>}
        {state.workspace_invite_code_error && <p className="text-red-500">{state.workspace_invite_code_error}</p>}
        {state.workspace_url_error && <p className="text-red-500">{state.workspace_url_error}</p>}
      </form>
    </Card>
  );
}