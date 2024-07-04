import classNames from "classnames/bind";
import styles from "./ConfirmUnLockAccount.module.css";

import { useModal } from "~/Context/ModalContext";

const cx = classNames.bind(styles);

function ConfirmUnLockAccount({ title, idAccount, apiUnLockAccount }) {
  const { closeModal } = useModal();

  function handleSubmit() {
    apiUnLockAccount(idAccount);
    closeModal();
  }

  return (
    <div className={cx("confirm_container")}>
      <div className={cx("confirm_container__title")}>
        <span>{title}</span>
      </div>
      <div className={cx("confirm_container__button")}>
        <div className={cx("confirm_item")} onClick={handleSubmit}>
          <span>Xác nhận</span>
        </div>
        <div className={cx("confirm_item")} onClick={closeModal}>
          <span>Hủy</span>
        </div>
      </div>
    </div>
  );
}

export default ConfirmUnLockAccount;
