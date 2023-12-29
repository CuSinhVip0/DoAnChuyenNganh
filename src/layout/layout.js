import Nav from '@/component/nav';

export default function Layout(props) {
    return (
        <>
            <Nav />
            <main>{props.children}</main>
        </>
    );
}
