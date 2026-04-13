import { redirect } from "next/navigation";

export default function ClientLoginPage() {
  redirect("/auth/login?role=client");
}