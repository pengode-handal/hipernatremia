import { getAllItems } from "@/lib/utils";
import DBDashboard from "./dashboard";
import { verifySession } from "@/lib/auth/dal";

export default async function Page() {
    // console.log(await getAllItems());
    await verifySession();
    return <DBDashboard respondent={await getAllItems()} />;
}
