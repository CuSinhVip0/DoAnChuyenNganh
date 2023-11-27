import '../styles/index.css';
import {Plus_Jakarta_Sans} from 'next/font/google';

const pjs = Plus_Jakarta_Sans({
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    styles: ['normal', 'italic'],
    subsets: ['latin'],
});
export default function MyApp({Component, pageProps, example}) {
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${pjs.style.fontFamily};
                }
            `}</style>
            <Component {...pageProps} />
        </>
    );
}
