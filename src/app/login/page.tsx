import Image from "next/image";

import SignupForm from "@/components/SignupForm/SignupForm";
import Socials from "@/components/SignupForm/Socials/Socials";

const SignupPage = () => {
  return (
    <>
      <div className="w-full px-6 flex items-center justify-center h-screen">
        <div className="w-full md:w-1/2 flex items-center justify-center flex-col relative">
          <SignupForm />
          <span
            className="absolute inset-x-50 bottom-[4.8rem] px-2"
            style={{ background: "white" }}
          >
            Or Sign in With
          </span>
          <Socials />
        </div>
        <div className="hidden md:flex  lg:w-1/3 xl:w-1/2 justify-center items-center">
          <Image
            src="/signin/signin_right.png"
            alt="Login Side Image"
            priority
            width={400}
            height={90}
          />
        </div>
      </div>
    </>
  );
};

export default SignupPage;
