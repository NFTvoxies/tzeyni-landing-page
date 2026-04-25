import { redirect } from "next/navigation";

export default function ProfessionalLoginPage() {
  redirect("/auth/login?role=professional");
}