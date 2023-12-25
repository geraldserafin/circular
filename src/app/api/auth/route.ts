import { db } from "@/lib/prisma";
import { log } from "console";

export async function POST(req: Request, res: Response) {
  const { email, secret, nickname, picture } = await req.json();

  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return Response.json({ details: "Invalid Secret" }, { status: 403 });
  }

  if (!email) {
    return Response.json(
      { details: "You must provide an email" },
      { status: 403 }
    );
  }

  await db.user.create({
    data: { email, username: nickname, picture: picture },
  });

  return new Response(undefined, { status: 201 });
}
