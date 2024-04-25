import classNames from 'classnames/bind';
import styles from './Confirm.module.css';

const cx = classNames.bind(styles)

function Confirm() {
    return (
        <div className={cx("confirm_container")}>
            <div className={cx("confirm_item")}>
                <span>Xác nhận</span>
            </div>
            <div className={cx("confirm_item")}>
                <span>Hủy</span>
            </div>
        </div>
    );
}

export default Confirm;