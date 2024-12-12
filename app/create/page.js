"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CreateUserForm from "../components/createform";
import { useAuth } from "../context/AuthUserContext";
import Header from "../components/Header";

export default function CreateUser() {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser) router.push("/dashboard");
  }, [authUser, router]);

  return (
    <div>
      <CreateUserForm />
    </div>
  );
}
