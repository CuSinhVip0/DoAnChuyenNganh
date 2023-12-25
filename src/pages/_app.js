import '../styles/index.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';

import '@fortawesome/fontawesome-svg-core/styles.css';

library.add(fas);

export default function MyApp({Component, pageProps, example}) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}
