import classNames from "classnames/bind";
import styles from "./Modal.module.css";
import React from "react";
import { useModalTwo } from "../../Context/ModalTwoContext";

const cx = classNames.bind(styles);

function ModalTwo() {
  const { isModalTwoOpen, modalTwoContent, closeModalTwo } = useModalTwo();

  return (
    <>
      {isModalTwoOpen && (
        <div className={cx("modal")}>
          <div className={cx("modal__overlay")} onClick={closeModalTwo}></div>
          <div className={cx("modal__xmark")} onClick={closeModalTwo}>
            <svg
              aria-label='Đóng'
              className={cx("x1lliihq x1n2onr6 x9bdzbf")}
              fill='currentColor'
              height='18'
              role='img'
              viewBox='0 0 24 24'
              width='18'
            >
              <title>Đóng</title>
              <polyline
                fill='none'
                points='20.643 3.357 12 12 3.353 20.647'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='3'
              ></polyline>
              <line
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='3'
                x1='20.649'
                x2='3.354'
                y1='20.649'
                y2='3.354'
              ></line>
            </svg>
          </div>
          <div className={cx("modal__body")}>{modalTwoContent}</div>
        </div>
      )}
    </>
  );
}

export default ModalTwo;
