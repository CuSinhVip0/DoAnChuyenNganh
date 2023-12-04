import {useState} from 'react';
import Link from 'next/link';

const ProfilePage = () => {
    const [bmi, setBMI] = useState(null);

    //Lay thong tin BMI tu API
    const fetchBMI = async () => {};

    return (
        <div>
            <h1>Profile</h1>
            <Link href="/bmi">Xem BMI</Link>
        </div>
    );
};

export default ProfilePage;
