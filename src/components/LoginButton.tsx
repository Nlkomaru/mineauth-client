import {auth, ExtendedSession, signIn, signOut} from "~/auth";
import Image from "next/image";
import React from "react";
import {css} from "@/styled-system/css";
import * as Menu from "@/src/components/ui/menu"
import SettingsIcon from '@mui/icons-material/Settings';
import {HStack} from "@/styled-system/jsx";
import {
    ChevronRightIcon,
    CreditCardIcon,
    LogOutIcon,
    MessageSquareIcon,
    PlusCircleIcon,
    UserIcon,
    UserPlusIcon
} from "lucide-react";
import {props} from "@zag-js/menu";

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
                        src={sessionData.user?.image ?? "https://crafthead.net/avatar/Steave" + "/128.png"}
                        width="50"
                        height="50"
                        alt="logo"
                    />
                </Menu.Trigger>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.ItemGroup>
                            <Menu.ItemGroupLabel>My Account</Menu.ItemGroupLabel>
                            <Menu.Separator/>
                            <Menu.Item value="profile">
                                <HStack gap="6" justify="space-between" flex="1">
                                    <HStack gap="2">
                                        <UserIcon/>
                                        Profile
                                    </HStack>
                                </HStack>
                            </Menu.Item>
                            <Menu.Item value="billing">
                                <HStack gap="2">
                                    <CreditCardIcon/> Billing
                                </HStack>
                            </Menu.Item>
                            <Menu.Item value="settings">
                                <HStack gap="6" justify="space-between" flex="1">
                                    <HStack gap="2">
                                        <SettingsIcon/> Settings
                                    </HStack>
                                </HStack>
                            </Menu.Item>
                            <Menu.Root positioning={{placement: 'right-start', gutter: -2}} {...props}>
                                <Menu.TriggerItem>
                                    <HStack gap="2">
                                        <UserPlusIcon/>
                                        Invite member
                                    </HStack>
                                    <ChevronRightIcon/>
                                </Menu.TriggerItem>
                                <Menu.Positioner>
                                    <Menu.Content>
                                        <Menu.Item value="message">
                                            <HStack gap="2">
                                                <MessageSquareIcon/> Message
                                            </HStack>
                                        </Menu.Item>
                                        <Menu.Separator/>
                                        <Menu.Item value="other">
                                            <HStack gap="2">
                                                <PlusCircleIcon/>
                                                More Options...
                                            </HStack>
                                        </Menu.Item>
                                    </Menu.Content>
                                </Menu.Positioner>
                            </Menu.Root>
                            <Menu.Separator/>
                            <Menu.Item value="logout">


                                    <form
                                        action={async (formData) => {
                                            "use server"
                                            await signOut()
                                        }}
                                    >
                                        <button type="submit">
                                            <HStack gap="2">
                                                <LogOutIcon/>
                                                <div>Sign out</div>
                                            </HStack>
                                        </button>
                                    </form>

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


const headImage = css({
    borderRadius: "12%",
    margin:
        "10px",
});

// ssr ssg isr .
// global function.
export default LoginButton;