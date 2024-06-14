import Navbar from "@/src/components/Navbar";

export default function Template({children}: { children: React.ReactNode }) {
    return (
        <>
            <Navbar/>
            {children}
        </>
    );
}