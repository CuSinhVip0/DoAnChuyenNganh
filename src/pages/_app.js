import '../styles/index.css';
import Nav from '@/component/nav';
import Footer from '@/component/footer';

import {config} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
export default function MyApp({Component, pageProps}) {
    return (
        <>
            {Component.name != 'LoginPage' &&
                Component.name != 'RegisterPage' && (
                    <Nav hascookie={pageProps.hascookie} />
                )}
            <Component {...pageProps} />
            {Component.name != 'LoginPage' &&
                Component.name != 'RegisterPage' && <Footer />}
        </>
    );
}
