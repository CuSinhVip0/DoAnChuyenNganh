import Head from 'next/head';
import Link from 'next/link';
import {hasCookie} from 'cookies-next';
import {useState} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';

import Home from '@/styles/home.module.css';

import Title from '@/component/title';

import {MdOutlineSearch} from 'react-icons/md';
import {FaRegCircleXmark} from 'react-icons/fa6';

import hinh1 from '../../public/gif/icons8-stethoscope.gif';
export async function getServerSideProps({req, res}) {
    const hascookie = hasCookie('id_nguoidung', {req, res});
    return {
        props: {hascookie},
    };
}

export default function Page(props) {
    const [valueSearch, setValueSearch] = useState();
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <div className={Home.wrapper}>
                <div className={Home.background}>
                    <div className={Home.container}>
                        <div className={Home.search}>
                            <div className={Home.subtitle}>
                                Nền Tảng Công Nghệ
                            </div>
                            <Title />
                            <div className={Home.input_contaienr}>
                                <div className={Home.input}>
                                    <MdOutlineSearch
                                        className={Home.icon_search}
                                    />
                                    <input
                                        value={valueSearch}
                                        placeholder="Tìm kiếm"
                                        type="text"
                                        className={Home.input_text}
                                        onChange={(e) => {
                                            setValueSearch(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.code == 'Enter') {
                                                router.push({
                                                    pathname: '/search',
                                                    query: {
                                                        q: valueSearch,
                                                    },
                                                });
                                            }
                                        }}
                                    />
                                    {valueSearch && (
                                        <FaRegCircleXmark
                                            className={Home.icon_delete}
                                            onClick={() => {
                                                setValueSearch('');
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={Home.options}>
                            <ul className={Home.items}>
                                <li className={Home.item}>
                                    <img
                                        className={Home.img}
                                        src="data:image/png;base64,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"
                                    />
                                    Kiểm tra chỉ số BMI của bạn
                                </li>
                                <li className={Home.item}>
                                    <img
                                        className={Home.img}
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEHklEQVR4nO2Xb2wTZRzH6yv0jS+UN4a4GDP2wgTDgnHTBNhz7dhd9wc7ywB1bjjHoCBszq2OEUaMZMtV/k0IIjMuIqwLAg5oixOY6SVqBDu2wJxIB0xipqzabu2q29qvuYs0G/1z12s7MOs3+aTJ09wv38/d0+Y5hSKZZJJJJplZHe2mLXgQUcw6gTdNYw8E2v+LQMln/dDUNIMuKoWKzgNFUQK0pij+AuvOjmHfj//ANDAB2x0ffnL6cMPtx7URHy4P+3Dh1wkc6hnHhrMSyp9xQ6PfD6UqO1D6XgpKKpCZmflI3AT44rc8flG+vjUhIuBBwfqGsMWpKRBCHISQNXER+OH3yaCybuXzQWu2YV/k/b2tVVJ5ajobYhbod04Glb/L1PXrrsmwM0rbb0O5jI5agBDioShqnmyBteYx3HT7JT0BHl2Y38HL9S1y7j7+o162wObOMUn7/y6V5uGQc5hX1sUicF62QPXp39B9cwjfdV9EX7cFf149AteVVoz2HBA+nX1H4LhuwYD9Emw3hqD/0h5yjorJly1ACLHLFni9tQ/ZdC5gyRclJ78QxS22kHNiuPsghLjkC3x6BUyOSpLA8rxsFH98Me4CFEVBtkDtFzbUrE6XJPDuq+mob+dCzmnYqpNd/r2yF76RLaA7M4w/Ds6TJOA4+ATeOj0Uco63LR25OSTq8nk0AdrS5G8hnppTv2DEvCpieY9pBfQd/WFnnDq+E29ol0YtsKZwsQ9t87fHJMBzzNweUeCk+bDoDE31bjlbqDls+WgE1prcuGTZEbL8Zct2VJhGRWeUHL4GilJGU95PUdQzcRHgKTd5MGQkwMkMoCMLOJEJh/FFYV3K9Tz55XXRCHRELC9VgD8etPSOC0dnR88h4CNFAIdtH3odPnzSOx72GDGV0qMDUNG5Uv77PUqlMi1mgerzXuGUOe0c1FkslPd8tXraOi+iv+AVlVjZeELK3a8QLS8msKnTi6t/TS/PM+gcgceixaBrNOi7PqcPVefEJaY+RYRAUnkxgQ67tBeZezEPTMy8gHYGWFldi+XbCJa8k4b9e54MWdx/QIH6HSkgdfPdRbsWGvd+Tz963wVWbN4C3e4KNJ4rwKo9C7FofQqe06Wg7P1UWPY+DvuHc/Bz8xwc2zUX2q1PC9/zlLdkgOWYOwZOXQYoHrovAkWVddB//hoMnFqgqYtGYdOzgZKLwvBS4wKwViZwncGqNjZ0LX1YMZPh7xprZY4HSkzhbeMSQSRLn4qMjU8JZNWmQtO0AFXGxWCtwdewVqZ9RgVYjq4MVT4WWI6J/JIfr3zQlTeX5dSjcRewql07v132WMIFDFZ1VbzLGwIwGxMvwDGWhAlY1aaEC7BW5naiBFhOPZh4AU79d+K2kNqbcIFkkkkmmdmRfwHTcFrGrYFslAAAAABJRU5ErkJggg=="
                                    />
                                    Đặt lịch khám với chúng tôi
                                </li>
                            </ul>
                        </div>
                        <Link href={'/dat-lich/chon-khoa'}>Đặt lịch</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
