import { getAllItems } from "@/lib/utils";
import DBDashboard from "./dashboard";
import { verifySession } from "@/lib/auth/dal";

export default async function Page() {
    await verifySession();

    let respondent = [];

    try {
        respondent = await getAllItems();
    } catch (error) {
        console.warn("Gagal mengambil data dashboard dari database:", error);
    }

    return <DBDashboard respondent={respondent} />;
}
