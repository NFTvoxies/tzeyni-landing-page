import LoginV2 from "@/app/components/Login";


export const metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage() {
  return <LoginV2 />;
}
