import classNames from 'classnames/bind';
import styles from './Notification.module.css';
import { useState } from 'react';

const cx = classNames.bind(styles)

function Notification({ notificationIsActive }) {
    const [isFirstActive, setIsFirstActive] = useState(false)
    
    if (notificationIsActive === true && isFirstActive === false)
        setIsFirstActive(true);


    return (
        <div className={cx("page-notification", { 'animationAppearPageSearch': notificationIsActive })} style={{display: isFirstActive ? 'block' : ''}}>
            <div className={cx("page-notification__title")}>
                <span>Thông báo</span>
            </div>
            <div className={cx("page-notification__container_notification")}>
                <div className={cx("page-notification__container_notification__title")}>
                    <span>Tuần này</span>
                </div>
                <div className={cx("page-notification__container_notification__content")}>
                    <ul className={cx("page-notification__container_notification__content__ul")}>
                        <li>
                            <div
                                className={cx("page-notification__container_notification__content__ul__li-img_user", "centerImg")}>
                                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                                    alt="" />
                            </div>
                            <div
                                className={cx("page-notification__container_notification__content__ul__li-message_notification")}>
                                <span
                                    className={cx("page-notification__container_notification__content__ul__li-message_notification-name_user")}>baby_em_cute</span>
                                <span
                                    className={cx("page-notification__container_notification__content__ul__li-message_notification-message_action")}>đã
                                    thích ảnh của bạn.</span>
                                <span
                                    className={cx("page-notification__container_notification__content__ul__li-message_notification-message_time")}>1
                                    tuần</span>
                            </div>
                            <div
                                className={cx("page-notification__container_notification__content__ul__li-img_post", "centerImg")}>
                                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                                    alt="" />
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={cx("gap")}></div>
                <div className={cx("page-notification__container_notification__title")}>
                    <span>Trước đó</span>
                </div>
                <div className={cx("page-notification__container_notification__content")}>
                    <ul className={cx("page-notification__container_notification__content__ul")}>
                        <li>
                            <div
                                className={cx("page-notification__container_notification__content__ul__li-img_user", "centerImg")}>
                                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                                    alt="" />
                            </div>
                            <div
                                className={cx("page-notification__container_notification__content__ul__li-message_notification")}>
                                <span
                                    className={cx("page-notification__container_notification__content__ul__li-message_notification-name_user")}>baby_em_cute</span>
                                <span
                                    className={cx("page-notification__container_notification__content__ul__li-message_notification-message_action")}>đã
                                    bắt đầu theo dõi bạn.</span>
                                <span
                                    className={cx("page-notification__container_notification__content__ul__li-message_notification-message_time")}>1
                                    tuần</span>
                            </div>
                            <div
                                className={cx("page-notification__container_notification__content__ul__li-button_un_follow")}>
                                <button><span>Theo dõi</span></button>
                            </div>
                        </li>
                        <li>
                            <div
                                className={cx("page-notification__container_notification__content__ul__li-img_user", "centerImg")}>
                                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                                    alt="" />
                            </div>
                            <div
                                className={cx("page-notification__container_notification__content__ul__li-message_notification")}>
                                <span
                                    className={cx("page-notification__container_notification__content__ul__li-message_notification-name_user")}>baby_em_cute</span>
                                <span
                                    className={cx("page-notification__container_notification__content__ul__li-message_notification-message_action")}>đã
                                    bắt đầu theo dõi bạn.</span>
                                <span
                                    className={cx("page-notification__container_notification__content__ul__li-message_notification-message_time")}>1
                                    tuần</span>
                            </div>
                            <div className={cx("page-notification__container_notification__content__ul__li-button_follow")}>
                                <button><span>Đang theo dõi</span></button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Notification;