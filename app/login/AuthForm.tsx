import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AuthForm() {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div className="mt-10 border-2 border-black w-full max-w-md px-4 sm:px-8 py-10 sm:py-14 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <div className="text-2xl sm:text-xl font-mono font-semibold mb-4">
          {!openLoginModal ? "Sign Up Form" : "Login"}
        </div>

        <input
          className="border-2 border-black my-3 w-full rounded-md p-2"
          placeholder="Email"
        />
        <input
          className="border-2 border-black my-3 w-full rounded-md p-2"
          placeholder="Password"
          type="password"
        />
        {!openLoginModal && (
          <input
            className="border-2 border-black my-3 w-full rounded-md p-2"
            placeholder="Confirm Password"
            type="password"
          />
        )}
        <button
          className="border-2 border-black my-4 px-5 py-2 bg-black text-white rounded-lg w-full"
          onClick={() => {
            if (!openLoginModal) router.push("/details");
            else router.push("/home")
          }}
        >
          Submit
        </button>

        <div className="text-center mt-2">
          {!openLoginModal
            ? `Already have an Account?`
            : `Don't have an Account?`}
        </div>
        <button
          className="underline cursor-pointer mt-1"
          onClick={() => {
            setOpenLoginModal(!openLoginModal);
          }}
        >
          {!openLoginModal ? `Sign Up` : `Sign in`}
        </button>
      </div>
    </div>
  );
}
