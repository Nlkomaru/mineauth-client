"use client";

import React, {useEffect} from "react";

import {redirect} from "next/navigation";
import {signIn, useSession} from "next-auth/react";

const LoginPage = () => {
    const {data: session, status} = useSession();
    useEffect(() => {
        // ログイン済みの場合はTOPページにリダイレクト
        if (status === "authenticated") {
            redirect("/");
        }
    }, [session, status]);

    const handleLogin = (provider: string) => async (event: React.MouseEvent) => {
        event.preventDefault();
        const result = await signIn(provider);

        // ログインに成功したらTOPページにリダイレクト
        if (result) {
            redirect("/");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form className="w-full max-w-xs space-y-6 rounded bg-white p-8 shadow-md">
                <button
                    onClick={handleLogin("MineAuth")}
                    type="button"
                    className="w-full bg-green-600 text-white rounded-lg px-4 py-2"
                >
                    MineAuthでログイン
                </button>
            </form>
        </div>
    );
};

export default LoginPage;