import { useContext, useRef } from "react";

import classNames from "classnames/bind";

import styles from "./OptionsAvatar.module.css";

import { AppContext } from "../../Context/AppContext";
import { useToastMessage } from "../../Context/ToastMessageContext";
import { useModal } from "../../Context/ModalContext";
import * as http from "../../utils/http";

const cx = classNames.bind(styles);

function OptionsAvatar() {
  const { idUser, setAvatar } = useContext(AppContext);

  const { closeModal } = useModal();

  const inputSetAvatarRef = useRef();

  function handleClickSetAvatar() {
    inputSetAvatarRef.current.click();
  }

  function handleSetAvatar(e) {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);

    http
      .put(`api/users/avatar/${idUser}`, formData)
      .then((data) => {
        setAvatar(data.result.avatar);
        showToastSuccess();
        closeModal();
      })
      .catch((error) => {
        showToastError();
        closeModal();
        console.error("Error uploading avatar:", error);
      });
  }

  const deleteAvatar = async () => {
    try {
      await http.del(`api/users/avatar/${idUser}`);
      setAvatar("");
      showToastSuccess("Xóa avatar thành công.");
      closeModal();
    } catch (error) {}
  };

  const { setToastMessage } = useToastMessage();

  function showToastSuccess(message) {
    setToastMessage({
      title: "Thành công!",
      message: message ? message : "Update avatar thành công.",
      type: "success",
      duration: 3000,
    });
  }

  function showToastError(message) {
    setToastMessage({
      title: "Thất bại!",
      message: message ? message : "Có lỗi.",
      type: "error",
      duration: 3000,
    });
  }

  return (
    <div className={cx("optionsAvatar__container")}>
      <div className={cx("optionsAvatar__title")}>
        <span>Thay đổi ảnh đại diện</span>
      </div>
      <div
        className={cx("optionsAvatar__item", "optionsAvatar__upload")}
        onClick={handleClickSetAvatar}
      >
        <span>Tải ảnh lên</span>
        <input
          type='file'
          onChange={handleSetAvatar}
          ref={inputSetAvatarRef}
          style={{ display: "none" }}
        />
      </div>
      <div
        className={cx("optionsAvatar__item", "optionsAvatar__delete")}
        onClick={deleteAvatar}
      >
        <span>Gỡ ảnh hiện tại</span>
      </div>
      <div
        className={cx("optionsAvatar__item", "optionsAvatar__cancel")}
        onClick={closeModal}
      >
        <span>Hủy</span>
      </div>
    </div>
  );
}

export default OptionsAvatar;
