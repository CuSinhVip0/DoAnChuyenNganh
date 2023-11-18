import "../styles/index.css";
export default function MyApp({ Component, pageProps, example }) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}
