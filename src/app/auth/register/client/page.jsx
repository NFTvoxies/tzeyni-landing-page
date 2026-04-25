import { redirect } from "next/navigation";

export default function RegisterClientPage() {
  redirect("/auth/register?role=client");
}
