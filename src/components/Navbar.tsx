import Link from "next/link";
import React from "react";
import {css} from '@/styled-system/css';
import LoginButton from "~/components/LoginButton";

function Header() {
    return (
        <div className={header}>

            <Link className={logo} href="/">
                MineAuth Client
            </Link>

            <div className={linkBox}>
                <Link href="/money">
                    <div className={linkBoxStyle}>おかね</div>
                </Link>
                <LoginButton/>
            </div>
        </div>
    )
}

const header = css({
    display: "flex",
    marginTop: "25px",
    padding: "0px 300px 0px 300px",
    marginBottom: "40px",
    justifyContent: "center",
    alignItems: "center"
});

const logo = css({
    padding: "10px",
    margin: "10px",
});

const linkBoxStyle = css({
    textAlign: "center",
    paddingTop: "20px",
    paddingLeft: "40px",
    paddingRight: "60px",
});


const linkBox = css({
    display: "flex",
    marginLeft: "auto",
    marginRight: "10px",
});

export default Header;