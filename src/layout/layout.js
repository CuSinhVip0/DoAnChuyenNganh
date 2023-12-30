import Nav from '@/component/nav';
import Footer from '@/component/footer';

export default function Layout(props) {
    return (
        <>
            <Nav />
            <main>{props.children}</main>
            <Footer />
        </>
    );
}
