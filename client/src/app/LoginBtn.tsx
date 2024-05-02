"use client";

import { useState } from "react";
import { getAllUsersApi } from "./api";

export async function loginApi(username: string, password: string) {
  try {
    const url = "http:://localhost:3000/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log(data);

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function LoginBtn() {
  const [username, setUsername] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);

  const usernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    const submitData = async () => {
      if (username && password) {
        // const response = await loginApi(username, password);
        const response = await getAllUsersApi();
        console.log(response);
      }
    };
    e.preventDefault();
    submitData();
  };

  return (
    <form className="flex flex-col items-center gap-2" onSubmit={handleSubmit}>
      <input
        className="p-2 bg-red-500"
        type="text"
        placeholder="username"
        onChange={usernameChange}
      />
      <input
        className="p-2 bg-red-500"
        type="password"
        placeholder="password"
        onChange={passwordChange}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Login
      </button>
    </form>
  );
}
