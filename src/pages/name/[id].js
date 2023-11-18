export async function getStaticProps(context) {
    const { params } = context;
    const param = params.id.replace(".js", "");
    const res = await fetch("http://localhost:3000/api/" + param);
    const repo = await res.json();
    return { props: { repo } };
}



export async function getStaticPaths() {
    const res = await fetch("http://localhost:3000/api/cate");
    const repo = await res.json();
    const paths = repo.cate.map((cate) => {
        return {
            params: {
                id: cate,
            },
        };
    });
    return {
        paths,
        fallback: false, // false or "blocking"
    };
}
import login from '@/styles/login.module.css';

export default function Page({ repo }) {
    return (
        <div>
            <h1 className={login.title}>{repo.name}</h1>
            <h1 className={login.title}>{repo.text}</h1>
        </div>
    );
}