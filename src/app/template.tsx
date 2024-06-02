import Navbar from "@/components/Navbar";
import {css} from "../../styled-system/css";

export default function Template({children}: { children: React.ReactNode }) {
    return (
        <>
            <Navbar/>
            {children}
        </>
    );
}