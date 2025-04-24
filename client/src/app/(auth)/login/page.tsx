"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [credentials, setCredentials] = useState<any>({});
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL!}/users/login`,
        credentials,
        { withCredentials: true }
      );
      router.push("/");
    } catch (error: any) {
      console.log(error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 border border-stone-400 rounded-xl p-6"
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <button className="p-3 bg-slate-700 rounded cursor-pointer">
          Login
        </button>
        <p>
          Dont have an account?{" "}
          <Link href="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
