// import Image from "next/image";
import TimeHome from "@/components/TimeHome/TimeHome";
import Socials from "@/components/SignupForm/Socials/Socials";

export default async function Home() {
  return (
    <div className="">
      <main>
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
