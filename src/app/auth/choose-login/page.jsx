import { redirect } from "next/navigation";

export default function ChooseLoginPage() {
  redirect("/auth/login");
}
