import { verifyGuest } from "@/lib/auth/dal";

export default async function Login() {
    await verifyGuest();
    return <div>INI LOGIN</div>;
}
