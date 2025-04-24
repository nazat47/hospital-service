"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [credentials, setCredentials] = useState<any>({});
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(
       `${process.env.NEXT_PUBLIC_SERVER_URL!}/users/register`,
        credentials,
        { withCredentials: true }
      );
      alert("register success");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 border border-stone-400 rounded-xl p-6"
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          onChange={(e) =>
            setCredentials({ ...credentials, name: e.target.value })
          }
        />
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
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
