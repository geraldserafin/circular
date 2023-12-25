import { getSession } from '@auth0/nextjs-auth0';

export default async function Home() {
  const session = await getSession();

  return (
    <main className="flex flex-col gap-2">
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
      {session?.user?.name}
    </main>
  )
}
