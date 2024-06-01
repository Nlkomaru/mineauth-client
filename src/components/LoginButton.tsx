'use client';
import {useSession} from "next-auth/react";
import Link from "next/link";
import {ExtendedSession} from "@/auth";
import Image from "next/image";
import React from "react";
import {css} from "../../styled-system/css";

function LoginButton() {
    const {data: session} = useSession();
    if (!session) {
        return (
            <Link href="/auth/login">
                <div className={LoginBoxStyle}>ログイン</div>
            </Link>
        );
    } else {
        return <PlayerHead/>;
    }
}

function PlayerHead() {
    const {data: session} = useSession();
    const sessionData = session as ExtendedSession;
    return (
        <Link href="/my-page">
            <div className={headStyle}>
                <Image
                    className={headImage}
                    src={sessionData.user?.image ?? "https://crafthead.net/avatar/Steave" + "/64.png"}
                    width="45"
                    height="45"
                    alt="logo"
                />
            </div>
        </Link>
    );
}

// components.
// type interface.
// extend function.
// function.
// recoil.
// selector.
// style.
const LoginBoxStyle = css({
    textAlign: "center",
    justifyContent: "center",
    paddingLeft: "25px",
    paddingRight: "25px",
    paddingBottom: "10px",
    paddingTop: "10px",
    marginLeft: "25px",
    color: "#ffffff",
    borderRadius: "10px",
    fontSize: "17px",
    background: "#0066ff",
});

const headStyle = css({
    marginLeft: "25px",
});

const headImage = css({
    borderRadius: "12%",
});



const header = css({
    display: "flex",
    paddingTop: "25px",
    paddingBottom: "40px",
    background: "#82e477",
});
// ssr ssg isr .
// global function.
export default LoginButton;