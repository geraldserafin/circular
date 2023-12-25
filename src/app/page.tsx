import { db } from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import { Onboarding } from '@/lib/features/onboarding';
import { log } from 'console';

export default async function Home() {
  const session = await getSession();

  if (!session?.user) {
    return (
      <main className="flex flex-col gap-2">
        <a href="/api/auth/login">Login</a>
      </main>
    );
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { member: true }
  });

  if (user?.member.length === 0) {
    return <Onboarding />;
  }

  return (
    <main className="flex flex-col gap-2">
      <a href="/api/auth/logout">Logout</a>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </main>
  )
}
