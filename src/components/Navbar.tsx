import Link from "next/link";
import React from "react";
import {css} from '../../styled-system/css';
import LoginButton from "@/components/LoginButton";

function Header() {
    return (
        <div className={header}>
            <Link href="/">
                <div className={logo}>
                    MineAuth Client
                </div>
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
    paddingRight: "160px",
    paddingLeft: "160px",
    marginBottom: "40px",
    justifyContent: "center"
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
    fontSize: "17px",
});


const linkBox = css({
    display: "flex",
    marginLeft: "auto",
    marginRight: "10px",
});

export default Header;