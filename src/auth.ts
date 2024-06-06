import {JWT} from "next-auth/jwt";
import NextAuth, {Session, User} from "next-auth";

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
        async jwt({token, account, profile}) {
            // 初回サインイン時に accessToken をトークンに保存
            if (account) {
                // First login, save the `access_token`, `refresh_token`, and other
                // details into the JWT
                console.log("account is", token)

                const userProfile: User = {
                    id: profile!.id as string,
                    name: profile!.username as string,
                    email: "",
                    image: "https://crafthead.net/avatar/" + profile!.id as string,
                }


                return {
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    refresh_token: account.refresh_token,
                    user: userProfile,
                }
            } else if (Date.now() < (token.expires_at! as number) * 1000) {
                // Subsequent logins, if the `access_token` is still valid, return the JWT
                // let format = "YYYY-MM-DD HH:mm:ss";
                // let currentTime = Date.now();
                // let tokenExp = token.expires_at! as number * 1_000;
                //
                // // Unix時間をDateオブジェクトに変換
                // let currentDate = new Date(currentTime);
                // let tokenExpDate = new Date(tokenExp);
                //
                // // Dateオブジェクトを指定した形式の文字列に変換
                // let currentDateString = currentDate.toLocaleString('ja-JP').replace(/\//g, '-');
                // let tokenExpDateString = tokenExpDate.toLocaleString('ja-JP').replace(/\//g, '-');
                //
                // console.log("current time is", currentDateString);
                // console.log("token exp    is", tokenExpDateString);
                return token
            } else {
                // Subsequent logins, if the `access_token` has expired, try to refresh it
                if (!token.refresh_token) throw new Error("Missing refresh token")
                console.log("refreshing token")
                try {
                    // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
                    // at their `/.well-known/openid-configuration` endpoint.
                    // i.e. https://accounts.google.com/.well-known/openid-configuration
                    const response = await fetch(process.env.SERVER_URL + "/oauth2/token", {
                        headers: {"Content-Type": "application/x-www-form-urlencoded"},
                        body: new URLSearchParams({
                            grant_type: "refresh_token",
                            client_id: process.env.CLIENT_ID!,
                            redirect_uri: process.env.SELF_URL!,
                            refresh_token: token.refresh_token as string, // 型アサーションを使用してstring型として扱う
                        }),
                        method: "POST",
                    })

                    const responseTokens = await response.json()

                    if (!response.ok) throw responseTokens

                    console.log("refreshed token", responseTokens)
                    return {
                        // Keep the previous token properties
                        ...token,
                        access_token: responseTokens.access_token,
                        expires_at: Math.floor(Date.now() / 1000 + (responseTokens.expires_in as number)),
                        // Fall back to old refresh token, but note that
                        // many providers may only allow using a refresh token once.
                        refresh_token: responseTokens.refresh_token ?? token.refresh_token,
                    }
                } catch (error) {
                    console.error("Error refreshing access token", error)
                    // The error property can be used client-side to handle the refresh token error
                    return {...token, error: "RefreshAccessTokenError" as const}
                }
            }
        },
        async session({session, token}: { session: ExtendedSession; token: MyToken }) {
            if (token.user) {
                session.user = token.user as User
                session.accessToken = token.access_token as string
            }

            return session
        },
    },
});