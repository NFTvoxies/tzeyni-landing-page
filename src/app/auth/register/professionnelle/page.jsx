import { redirect } from "next/navigation";

export default function RegisterProPage() {
  redirect("/auth/register?role=professional");
}
