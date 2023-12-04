import {useState} from 'react';

const insertBMI = ({onSave}) => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    const handleSave = () => {
        if (weight.trim() !== '' && height.trim() !== '') {
            onSave({weight, height});
            setWeight('');
            setHeight('');
        }
    };

    return (
        <div>
            <label></label>
        </div>
    );
};
