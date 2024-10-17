import RegisterClient from "@/app/components/registerClient";



export const metadata = {
  title: "Register",
  description: "Register your account",
};

export default async function LoginPage() {
  return <RegisterClient />;
}
