// import Image from "next/image";
import TimeHome from "@/components/TimeHome/TimeHome";
import Socials from "@/components/Socials/Socials";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("keeplogin");
  const headersList = await headers();
  const referer = headersList.get("referer");
  const isComingFromLogin = referer?.includes("/login");

  if (!cookie) {
    redirect("/login");
  } else if (cookie?.value === "false" && !isComingFromLogin) {
    redirect("/login");
  }

  return (
    <div className="">
      <main className="w-100 flex justify-center min-h-[80vh]">
        <TimeHome />
      </main>
      <footer className="row-start-3 flex flex-col gap-6 flex-wrap items-center justify-center">
        <Socials home />
        <span>Example@email.com</span>
        <span>
          Copyright © {new Date().getFullYear()} Name. All rights reserverd
        </span>
      </footer>
    </div>
  );
}
