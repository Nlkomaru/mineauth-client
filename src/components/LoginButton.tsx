import {auth, ExtendedSession, signIn, signOut} from "@/auth";
import Image from "next/image";
import React from "react";
import {css} from "../../styled-system/css";
import {Menu} from '@ark-ui/react'
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';

async function LoginButton() {
    const session = await auth();
    if (!session) {
        return (
            <form
                action={async () => {
                    "use server"
                    await signIn("MineAuth")

                }}
            >
                <button className={loginBoxStyle} type="submit">
                    <span>ログイン</span>
                </button>
            </form>
        );
    } else {
        return <PlayerHead/>;
    }
}

async function PlayerHead() {
    const session = await auth();
    const sessionData = session as ExtendedSession;
    return (
        <div>
            <Menu.Root>
                <Menu.Trigger>
                    <Image
                        className={headImage}
                        src={sessionData.user?.image ?? "https://crafthead.net/avatar/Steave" + "/64.png"}
                        width="45"
                        height="45"
                        alt="logo"
                    />
                </Menu.Trigger>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.ItemGroup className={menuStyle}>
                            <Menu.ItemGroupLabel className={menuItems}>My Account</Menu.ItemGroupLabel>
                            <Menu.Separator/>
                            <Menu.Item className={menuItems} value="profile">
                                <PersonIcon className={css({marginRight: "10px"})}/>
                                Profile
                            </Menu.Item>
                            <Menu.Item className={menuItems} value="add">
                                <div>
                                    <form
                                        action={async (formData) => {
                                            "use server"
                                            await signOut()
                                        }}
                                    >
                                        <button type="submit">
                                            <PersonAddIcon className={css({marginRight: "10px"})}/>
                                            Add account
                                        </button>
                                    </form>
                                </div>
                            </Menu.Item>
                            <Menu.Item className={menuItems} value="logout">
                                <div>
                                    <form
                                        action={async (formData) => {
                                            "use server"
                                            await signOut()
                                        }}
                                    >
                                        <button type="submit">
                                            <LogoutIcon className={css({marginRight: "10px"})}/>
                                            Sign out
                                        </button>
                                    </form>
                                </div>
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.Content>
                </Menu.Positioner>
            </Menu.Root>
        </div>

    );
}

// components.
// type interface.
// extend function.
// function.
// recoil.
// selector.
// style.
const loginBoxStyle = css({
    textAlign: "center",
    justifyContent:
        "center",
    paddingLeft:
        "25px",
    paddingRight:
        "25px",
    paddingBottom:
        "10px",
    paddingTop:
        "10px",
    marginLeft:
        "25px",
    color:
        "#ffffff",
    borderRadius:
        "10px",
    fontSize:
        "17px",
    background:
        "#0066ff",
});

const headStyle = css({
    marginLeft: "25px",
});

const headImage = css({
    borderRadius: "12%",
    margin:
        "10px",
});

const menuStyle = css({
    backgroundColor: "rgba(100,166,223,0.5)",
    borderRadius:
        "5px",
    padding:
        "10px",
    margin:
        "10px",
    border: "1px solid #000000",
});


const menuItems = css({
    padding: "15px",
    paddingRight:
        "40px",
    fontSize:
        "0.9rem",
});


const header = css({
    display: "flex",
    paddingTop:
        "25px",
    paddingBottom:
        "40px",
    background:
        "#82e477",
});
// ssr ssg isr .
// global function.
export default LoginButton;