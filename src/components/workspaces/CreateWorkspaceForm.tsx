"use client"

import { useFormState } from "react-dom";
import { FormTextField } from "../theme/form-text-field";
import { Button } from "../theme/button";
import { createWorkspace } from "@/lib/workspaces/createWorkspace";

export default function CreateWorkspaceForm() {
  const [state, action] = useFormState(createWorkspace, {});

  return (
    <form action={action}>
      <div className="p-6 bg-neutral-800 shadow-xl rounded mb-4 flex flex-col gap-6">
        <FormTextField error={state.workspace_name_error} name="workspace_name" label="Workspace name" required />
        <FormTextField error={state.workspace_url_error} name="workspace_url" label="Workspace URL" required />
        {state.error && <p className="text-xs text-red-500">{state.workspace_url_error}</p>}
      </div>
      <Button role="submit">Create workspace</Button>
    </form>
  )
}