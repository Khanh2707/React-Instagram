import classNames from 'classnames/bind';
import styles from './Notification.module.css';
import { useState } from 'react';
import * as http from '~/utils/http'
import { useContext } from 'react';
import { AppContext } from '../../../../../../Context/AppContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)

function Notification({ notificationIsActive }) {
    const [isFirstActive, setIsFirstActive] = useState(false)
    
    if (notificationIsActive === true && isFirstActive === false)
        setIsFirstActive(true);

    const { 
        idUser,
        quantityPostNotificationCheck, setQuantityPostNotificationCheck
    } = useContext(AppContext)

    const navigate = useNavigate();

    const updateIsCheckPostNotification = () => {
        http.put(`api/post_notifications/is_check`, {
            user2: idUser
        })
        .then((res) => {
            http.get(`api/post_notifications/count_by_user/${idUser}`)
            .then((res) => {
                setQuantityPostNotificationCheck(res.result)
            })
        })
    }

    useEffect(() => {
        if (idUser !== '' && notificationIsActive === true)
            updateIsCheckPostNotification()
    }, [idUser && notificationIsActive])

    const [listPostNotification, setListPostNotification] = useState([])
    
    const getListPostNotification = () => {
        http.get(`api/post_notifications/by_user/${idUser}`)
        .then((res) => {
            console.log(res);
            setListPostNotification(res.result)
        })
    }

    useEffect(() => {
        if (idUser !== '') {
            getListPostNotification()
        }
    }, [idUser])

    useEffect(() => {
        if (idUser !== '') {
            getListPostNotification()
        }
    }, [notificationIsActive])

    return (
        <div className={cx("page-notification", { 'animationAppearPageSearch': notificationIsActive })} style={{display: isFirstActive ? 'block' : ''}}>
            <div className={cx("page-notification__title")}>
                <span>Thông báo</span>
            </div>
            <div className={cx("page-notification__container_notification")}>
                <div className={cx("page-notification__container_notification__title")}>
                    <span>Gần đây</span>
                </div>
                {listPostNotification.map((res) => {
                    return (
                        <div key={res.idPostNotification} className={cx("page-notification__container_notification__content")} onClick={() => window.location.href = `/p/${res.post.idPost}`}>
                            <ul className={cx("page-notification__container_notification__content__ul")}>
                                <li>
                                    <div className={cx("page-notification__container_notification__content__ul__li-img_user", "centerImg")}>
                                        <img src={res.user1.avatar} alt="" />
                                    </div>
                                    <div
                                        className={cx("page-notification__container_notification__content__ul__li-message_notification")}>
                                        <span className={cx("page-notification__container_notification__content__ul__li-message_notification-name_user")} onClick={() => window.location.href = `/${res.user1.idUser}`}>
                                            {res.user1.idUser}
                                        </span>
                                        <span className={cx("page-notification__container_notification__content__ul__li-message_notification-message_action")}>
                                            {res.action === 'LIKE' ? 'đã thích bài viết của bạn' : `đã comment bài viết của bạn: "${res.commentPost.content}"`}
                                        </span>
                                        <br />
                                        <span className={cx("page-notification__container_notification__content__ul__li-message_notification-message_time")}>
                                            {new Date(res.dateTimeNotification).toLocaleString()}
                                        </span>
                                    </div>
                                    <div
                                        className={cx("page-notification__container_notification__content__ul__li-img_post", "centerImg")}>
                                        <img src={res.post.mediaPosts[0].url} alt="" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Notification;