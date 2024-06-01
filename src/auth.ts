import {JWT} from "next-auth/jwt";
import NextAuth, {Session} from "next-auth";

interface MyToken extends JWT {
    accessToken?: string;
}

export interface ExtendedSession extends Session {
    accessToken?: string;
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        uuid?: string | null;
    }
}



// @ts-ignore
export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        {
            id: "MineAuth",
            name: "mineauth",
            type: "oauth",
            authorization: {
                url: process.env.SERVER_URL + "/oauth2/authorize",
                params: {response_type: "code", scope: "openid profile email"},
            },
            // ...他のプロバイダ設定...
            token: {
                url: process.env.SERVER_URL + "/oauth2/token",
            },
            userinfo: {
                url: process.env.SERVER_URL + "/oauth2/userinfo",
            },
            checks: ["pkce", "state"],
            profile: (profile: { id: any; username: any; }) => {
                return {
                    id: profile.id,
                    name: profile.username,
                    image: "https://crafthead.net/avatar/" + profile.id,
                    uuid: profile.id,
                }
            },
            clientId: process.env.CLIENT_ID,
            client: {
                token_endpoint_auth_method: 'none',
            },

        },
    ],
    callbacks: {
        async jwt({ token, account }) {
            // 初回サインイン時に accessToken をトークンに保存
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({session, token}: { session: ExtendedSession; token: MyToken}) {
            session.accessToken = token.accessToken;
            session.user = {
                ...session.user,
            }
            return session;
        },
    },
});