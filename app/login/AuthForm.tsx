import { useState } from "react";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setCookies } from "../helpers/cookieHelper";

export default function AuthForm() {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const router = useRouter();
  const [role, setRole] = useState("");
  const [signup, setSignup] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: role,
  });

  const [passwordMatch, setPasswordMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    console.log("hi");
    const payload = {
      email: signup.email,
      password: signup.password,
      role: role,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/signup",
        payload
      );
      const userId = response.data.userId;
      const token = response.data.token;
      setCookies("userId", userId);
      setCookies("role", role);
      setCookies("details", "false");
      setCookies("token", token);

      toast.success("Signup successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      // Wait for 2 seconds so user can see toast before routing
      setTimeout(() => {
        router.push("/details");
      }, 4000);
    } catch (e) {
      toast.error("Signup failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleLogin = async () => {
    const payload = {
      email: signup.email,
      password: signup.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        payload
      );
      const userId = response.data.userId;
      const token = response.data.token;
      const role = response.data.role;
      setCookies("userId", userId);
      setCookies("role", response.data.role);
      setCookies("token", token);
      setCookies("role", role);
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      // Wait for 2 seconds so user can see toast before routing
      setTimeout(() => {
        router.push("/home");
      }, 4000);
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedSignup = {
      ...signup,
      [name]: value,
    };

    setSignup(updatedSignup);

    if (name === "password" || name === "confirmPassword") {
      setPasswordMatch(
        updatedSignup.password === updatedSignup.confirmPassword
      );
    }
  };

  return (
    <div className="mt-10 border-2 border-black w-full max-w-md px-4 sm:px-8 py-10 sm:py-14 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <div className="text-2xl sm:text-xl font-mono font-semibold mb-4">
          {!openLoginModal ? "Sign Up Form" : "Login"}
        </div>

        <input
          className="border-2 border-black my-3 w-full rounded-md p-2"
          placeholder="Email"
          type="email"
          name="email"
          value={signup.email}
          onChange={handleChange}
        />
        <div className="relative my-3 w-full">
          <input
            className="border-2 border-black w-full rounded-md p-2 pr-10"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={signup.password}
            onChange={handleChange}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "🙈"}
          </span>
        </div>

        {/* Confirm Password Input with Show/Hide + Tick/Cross */}
        {!openLoginModal && (
          <div className="relative my-3 w-full">
            <input
              className="border-2 border-black w-full rounded-md p-2 pr-16" // extra padding because two icons
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={signup.confirmPassword}
              onChange={handleChange}
            />

            {/* Tick/Cross Icon */}
            {signup.confirmPassword && (
              <span
                className={`absolute right-10 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out ${
                  passwordMatch ? "text-green-500" : "text-red-500"
                } text-xl`}
              >
                {passwordMatch ? "✔️" : "❌"}
              </span>
            )}

            {/* Eye Icon for visibility */}
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "👁️" : "🙈"}
            </span>
          </div>
        )}

        {!openLoginModal && (
          <div className="w-full">
            <label className="block mb-2 font-medium">Register as</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  id="startup"
                  name="register"
                  value="startup"
                  onClick={() => setRole("startup")}
                />
                Startup
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  id="investor"
                  name="register"
                  value="investor"
                  onClick={() => setRole("investor")}
                />
                Investor
              </label>
            </div>
          </div>
        )}
        <button
          className="border-2 border-black my-4 px-5 py-2 bg-black text-white rounded-lg w-full"
          onClick={() => {
            if (!openLoginModal) {
              // ✨ For Signup form
              if (
                !signup.email ||
                !signup.password ||
                !signup.confirmPassword
              ) {
                alert("Please fill all the fields!");
                return;
              }

              if (!passwordMatch) {
                alert("Passwords do not match!");
                return;
              }

              if (!role) {
                alert("Please select your role!");
                return;
              }

              handleSignUp();
            } else {
              // ✨ For Login form
              if (!signup.email || !signup.password) {
                alert("Please enter email and password!");
                return;
              }

              handleLogin();
            }
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
