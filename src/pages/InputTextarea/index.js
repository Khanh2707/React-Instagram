import classNames from 'classnames/bind';
import styles from './InputTextarea.module.css';
import { useState } from 'react';

const cx = classNames.bind(styles)

function InputTextarea() {
    const [valueTextarea, setValueTextarea] = useState('');

    function handleOnChangeTextarea(e) {
        setValueTextarea(e.target.value);
    }

    return (
        <div className={cx("input_textarea__background")}>
            <div className={cx("input_textarea__container")}>
                <div className={cx("input_textarea__title")}>
                    <span>Lý do khóa tài khoản người dùng</span>
                </div>
                <div className={cx("input_textarea__textarea")}>
                    <textarea name="" id="" cols="30" rows="10" placeholder='Lý do khóa tài khoản...' value={valueTextarea} onChange={handleOnChangeTextarea} />
                </div>
                <div className={cx("input_textarea__submit", valueTextarea !== '' ? "active" : "")}>
                    <button>Gửi</button>
                </div>
            </div>
        </div>
    );
}

export default InputTextarea;