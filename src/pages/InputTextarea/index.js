import classNames from 'classnames/bind';
import styles from './InputTextarea.module.css';
import { useState } from 'react';
import { useModal } from '../../Context/ModalContext';

const cx = classNames.bind(styles)

function InputTextarea({ title, idAccount, apiLockAccount }) {
    const { closeModal } = useModal();

    const [valueTextarea, setValueTextarea] = useState('');

    function handleOnChangeTextarea(e) {
        setValueTextarea(e.target.value);
    }


    function handleSubmit() {
        apiLockAccount(idAccount, valueTextarea)
        closeModal()
    }

    return (
        <div className={cx("input_textarea__background")}>
            <div className={cx("input_textarea__container")}>
                <div className={cx("input_textarea__title")}>
                    <span>{title}</span>
                </div>
                <div className={cx("input_textarea__textarea")}>
                    <textarea name="" id="" cols="30" rows="10" placeholder={title+'...'} value={valueTextarea} onChange={handleOnChangeTextarea} />
                </div>
                <div className={cx("input_textarea__submit", valueTextarea !== '' ? "active" : "")}>
                    <button onClick={handleSubmit}>Gửi</button>
                </div>
            </div>
        </div>
    );
}

export default InputTextarea;