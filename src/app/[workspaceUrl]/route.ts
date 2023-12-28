import { redirect } from "next/navigation";

export async function GET(
  request: Request,
  { params: { workspaceUrl } }: { params: { workspaceUrl: string } }
) {
  redirect(`/${workspaceUrl}/my-issues`);
}
