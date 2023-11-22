import Head from "next/head";
import Link from "next/link";

export default function Page({ repo }) {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <h1>Home</h1>
            <Link href={"/login"}>Login</Link>
            <Link href={"/register"}>Register</Link>
        </>
    );
}