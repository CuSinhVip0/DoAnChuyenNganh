import title from '@/styles/component/title.module.css';

import {useState, useEffect, useRef} from 'react';
function Title() {
    const texts = ['Đặt Khám', 'Tìm Kiếm Chuyên Khoa', 'Tìm Kiếm Bác Sĩ'];

    const [index, setIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [detal, setDetal] = useState(75);
    const [predetal, setPreDetal] = useState(50);
    useEffect(() => {
        const x = setInterval(() => {
            tick();
        }, detal);
        return () => {
            clearInterval(x);
        };
    }, [text]);

    const tick = () => {
        var i = index % texts.length;
        var fullText = texts[i];
        var updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);
        if (isDeleting) {
            setDetal(predetal);
        }
        if (!isDeleting && updatedText == fullText) {
            setIsDeleting(true);
            setDetal(1000);
        } else if (isDeleting && updatedText == '') {
            setIsDeleting(false);
            setIndex(index + 1);
            setDetal(75);
            setPreDetal(detal);
        }
    };
    return <div className={title.text}>Cùng với chúng tôi để {text}</div>;
}

export default Title;
