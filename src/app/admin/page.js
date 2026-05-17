import { verifySession } from "@/lib/auth/dal";

export default async function Admin() {
    await verifySession();
    return <div>INI ADMIN</div>;
}
