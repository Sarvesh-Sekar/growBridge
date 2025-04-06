"use client";
import { useState } from "react";
import AuthForm from "./AuthForm";
export default function Login() {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  return (
    <div className="p-0 m-0">
      <div className="flex flex-col items-center mx-auto my-[5%] px-4 sm:px-8 md:px-16">
        
        <div className="font-mono animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-black pr-2 md:pr-5 text-2xl md:text-5xl text-black font-bold text-center">
          Welcome to GrowBridge!!
        </div>

        <AuthForm />
      </div>
    </div>
  );
}
