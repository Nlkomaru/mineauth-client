import {auth, ExtendedSession} from "@/auth";

export default async function Home() {
    const session = await auth() as ExtendedSession;

    if (!session?.user) return null

    const bal = await fetch(process.env.SERVER_URL + "/api/v1/plugins/vault/balance/me", {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    }).then(res => res.json()).then(data => data.balance).catch(() => "Error")

    return (
        <div>
            Balance: {bal} <br/>
            Signed in as {session.user.name} <br/>
            
        </div>
    )
}
