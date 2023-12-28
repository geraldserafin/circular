"use client"

import { useFormState } from "react-dom";
import { createWorkspace } from "@/lib/workspaces/createWorkspace";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function CreateWorkspaceForm() {
  const [state, action] = useFormState(createWorkspace, {});

  return (
    <form action={action}>
      <Card className="p-6 mb-6 flex flex-col gap-6">
        <div className="flex flex-col w-full max-w-sm gap-1.5">
          <Label htmlFor="workspaceName" className="text-left">Workspace name</Label>
          <Input type="text" name="workspaceName" id="workspaceName" required />
        </div>

        <div className="flex flex-col w-full max-w-sm gap-1.5">
          <Label htmlFor="workspaceUrl" className="text-left">Workspace URL</Label>
          <Input type="text" name="workspaceUrl" id="workspaceUrl" required />
        </div>

        {state.error && <p className="text-xs text-red-500">{state.workspace_url_error}</p>}
      </Card>

      <Button role="submit">Create workspace</Button>
    </form>
  )
}