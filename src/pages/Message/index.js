import { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import defaultAvatar from '~/assets/images/default_avatar.jpg';

import {over} from 'stompjs';
import SockJS from 'sockjs-client';

import classNames from 'classnames/bind';

import styles from './Message.module.css';

import { AppContext } from '~/Context/AppContext';
import * as http from '~/utils/http';

const cx = classNames.bind(styles)

var stompClient = null;
function Message() {
    const {
        idUser,
        quantityMessageNotCheck, setQuantityMessageNotCheck
    } = useContext(AppContext)

    const navigate = useNavigate();

    const { params } = useParams();

    const [userTargetMessage, setUserTargetMessage] = useState('')

    const getUserById = (idUser) => {
        http.get(`api/users/${idUser}`)
        .then((res) => {
            console.log(res);
            setUserTargetMessage(res.result)
        })
        .catch(() => {
            navigate('/')
            return;
        })
    }

    useEffect(() => {
        if (params !== 'inbox')
            getUserById(params)
    }, [params])



    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    useEffect(() => {
        if (idUser !== '')
            connect()
    }, [idUser])

    const onConnected = () => {
        stompClient.subscribe(`/user/${idUser}/private`, onPrivateMessage);
    }

    const onError = () => {

    }

    const onPrivateMessage = (payload) => {
        console.log(payload)
        var payloadData = JSON.parse(payload.body);
        getMessagesWithOtherUser(payloadData.senderName, payloadData.receiverName)
        getRecentUserMessagesWithOtherUsers()
        getQuantityMessageNotCheck()
    }







    const { setIsLoadingLine } = useContext(AppContext);
    useEffect(() => {
        setIsLoadingLine(true);
    }, [])
    //
    useEffect(() => {
        setTimeout(() => {
            setIsLoadingLine(false);
        }, 500)
    }, [])

    useEffect(() => {
        document.title = 'Tin nhắn | Instagram';
    }, [])

    
    const [inputValue, setInputValue] = useState('')

    const submitInputRef = useRef()

    const handleEventInput = (e) => {
        setInputValue(e.target.value)

        if (e.target.value !== '') {
            submitInputRef.current.style.display = 'block'
        }
        else {
            submitInputRef.current.style.display = 'none'
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue !== '') {
            handleSubmitMessage();
        }
    }

    const handleSubmitMessage = () => {
        setInputValue('')
        submitInputRef.current.style.display = 'none'

        if (idUser !== '') {
            http.post(`api/user_message`, {
                message: inputValue,
                user1: idUser,
                user2: userTargetMessage.idUser,
            })
            .then((res) => {
                getMessagesWithOtherUser(idUser, userTargetMessage.idUser)
                updateMessageIsCheck(userTargetMessage.idUser, idUser)

                if (stompClient) {
                    var chatMessage = {
                        senderName: idUser,
                        receiverName: userTargetMessage.idUser,
                        message: inputValue
                    }
                    stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
                }
            })
        }
    }

    const [recentUserMessagesWithOtherUsers, setRecentUserMessagesWithOtherUsers] = useState([])
    
    const getRecentUserMessagesWithOtherUsers = () => {
        http.get(`api/user_message/all_latest_message_by_user_1/${idUser}`)
        .then((res) => {
            console.log(res);
            setRecentUserMessagesWithOtherUsers(res.result)
        })
    }

    useEffect(() => {
        if (idUser !== '')
            getRecentUserMessagesWithOtherUsers()
    }, [idUser])

    const activeDetailInbox = () => {
        not_select_inboxRef.current.style.display = 'none'
        detail_inboxRef.current.classList.add(cx('active'))
    }


    const not_select_inboxRef = useRef()
    const detail_inboxRef = useRef()

    const [activeItemMessage, setActiveItemMessage] = useState(null);
    const [hoveredMessage, setHoveredMessage] = useState(null)
    const [isOptionsMessageCLicked, setIsOptionsMessageClicked] = useState(null)
    const [activeOptionsMessage, setActiveOptionsMessage] = useState(null)

    const [messagesWithOtherUser, setMessagesWithOtherUser] = useState([])

    const handleClickItemMessage = (idUserMessage, idUser1, idUser2) => {
        getMessagesWithOtherUser(idUser1, idUser2)
        updateMessageIsCheck(idUser1, idUser2)
        setActiveItemMessage(idUserMessage)
        getUserById(idUser === idUser1 ? idUser2 : idUser1)
        window.history.pushState({}, "", idUser === idUser1 ? idUser2 : idUser1)
        activeDetailInbox()
    }

    const updateMessageIsCheck = (idUser1, idUser2) => {
        http.put(`api/user_message/is_check`, {
            user1: idUser1,
            user2: idUser2
        })
        .then((res) => {
            getRecentUserMessagesWithOtherUsers()
            getQuantityMessageNotCheck()
        })
    }

    const getMessagesWithOtherUser = (idUser1, idUser2) => {
        http.get(`api/user_message/${idUser1}/${idUser2}`)
        .then((res) => {
            console.log(res)
            setMessagesWithOtherUser(res.result)
        })
    }

    useEffect(() => {
        if (params !== 'inbox' && idUser !== '') {
            getMessagesWithOtherUser(idUser, params)
            activeDetailInbox()
            updateMessageIsCheck(params, idUser)
        }
    }, [idUser])

    const recallMessage = (idUserMessage) => {
        http.del(`api/user_message/${idUserMessage}`)
        .then((res) => {
            getRecentUserMessagesWithOtherUsers()
            getMessagesWithOtherUser(idUser, userTargetMessage.idUser)
            if (stompClient) {
                var chatMessage = {
                    senderName: idUser,
                    receiverName: userTargetMessage.idUser,
                    message: inputValue
                }
                stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            }
        })
    }

    const getQuantityMessageNotCheck = () => {
        http.get(`api/user_message/count_message_not_check_by_user_1/${idUser}`)
        .then((res) => {
            console.log(res);
            setQuantityMessageNotCheck(res.result)
        })
    }

    useEffect(() => {
        if (idUser !== '')
            getQuantityMessageNotCheck()
    }, [idUser])

    return (
        <div className={cx("main", "page-message")}>
            <div className={cx("list_inbox")}>
                <div className={cx("list_inbox__name_user_and_new_inbox")}>
                    <div className={cx("list_inbox__name_user")}>
                        <span>{idUser}</span>
                    </div>
                    {/* <div className={cx("list_inbox__new_inbox")}>
                        <svg aria-label="Tin nhắn mới" className={cx("x1lliihq x1n2onr6 x5n08af")} fill="currentColor" height="24"
                            role="img" viewBox="0 0 24 24" width="24">
                            <title>Tin nhắn mới</title>
                            <path d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"
                                fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2"></path>
                            <path
                                d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
                                fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2"></path>
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line>
                        </svg>
                    </div> */}
                </div>
                <div className={cx("list_inbox__title")}>
                    <span>Tin nhắn</span>
                </div>
                <div className={cx("list_inbox__content")}>
                    <ul>
                        {recentUserMessagesWithOtherUsers.slice().reverse().map((res) => {
                            const isActive = activeItemMessage === res.idUserMessage;

                            return (
                                <li key={res.idUserMessage} className={cx("list_inbox__content__ul__li", isActive ? "active" : "")} onClick={() => handleClickItemMessage(res.idUserMessage, res.user1.idUser, res.user2.idUser)}>
                                    <div className={cx("list_inbox__content__ul__li-img")}>
                                        <img src={idUser === res.user1.idUser ? res.user2.avatar === null ? defaultAvatar : res.user2.avatar : res.user1.avatar === null ? defaultAvatar : res.user1.avatar} alt="" />
                                        <div className={cx("list_inbox__content__ul__li-icon_activing")}></div>
                                    </div>
                                    <div className={cx("list_inbox__content__ul__li-name_user_and_active_state_or_new_inbox")}>
                                        <div className={cx("list_inbox__content__ul__li-name_user")}>
                                            <span>{idUser === res.user1.idUser ? res.user2.name : res.user1.name}</span>
                                        </div>
                                        <div className={cx("list_inbox__content__ul__li-inbox_and_time")}>
                                            <span className={cx((idUser !== res.user1.idUser) && (res.isCheck === false) ? "list_inbox__content__ul__li-inbox_has_been_no_read" : "list_inbox__content__ul__li-inbox_has_been_read")}>
                                                {res.message}
                                            </span>
                                            {/* <span className={cx("list_inbox__content__ul__li-time_inbox")}> · {new Date(res.dateTimeMessage).toLocaleString()}</span> */}
                                        </div>
                                    </div>
                                    <div className={cx("list_inbox__content__ul__li-icon_turn_off_notification_message")}>
                                        <svg aria-label="Đã tắt tiếng" className={cx("x1lliihq x1n2onr6 x1roi4f4")} fill="currentColor"
                                            height="15" role="img" viewBox="0 0 24 24" width="15">
                                            <title>Đã tắt tiếng</title>
                                            <path
                                                d="M15.209 18.294a1 1 0 0 0-.707-.293H6.184a2.002 2.002 0 0 1-1.74-2.993l.47-.822a8.34 8.34 0 0 0 1.093-4.174c0-.159.005-.316.017-.471a1 1 0 1 0-1.994-.15 8.093 8.093 0 0 0-.023.63 6.341 6.341 0 0 1-.83 3.175l-.47.822a4.001 4.001 0 0 0 3.477 5.983h1.944a4 4 0 0 0 7.827-.382 1 1 0 0 0-.282-.86Zm-3.207 2.708a2 2 0 0 1-1.732-1.001h3.463a2.017 2.017 0 0 1-1.731 1.001Zm11.205.291-2.521-2.521a4.04 4.04 0 0 0 .976-1.629 3.957 3.957 0 0 0-.356-3.123l-.484-.853A6.358 6.358 0 0 1 20 9.997a7.953 7.953 0 0 0-4.745-7.302 3.972 3.972 0 0 0-6.51.002 8.011 8.011 0 0 0-2.438 1.697L2.707.793a1 1 0 0 0-1.414 1.414l20.5 20.5a1 1 0 0 0 1.414-1.414Zm-3.46-4.728a2.042 2.042 0 0 1-.468.8L7.72 5.805a6.004 6.004 0 0 1 2.068-1.377.998.998 0 0 0 .494-.426 1.976 1.976 0 0 1 3.439 0 1 1 0 0 0 .494.425 5.989 5.989 0 0 1 3.786 5.634 8.303 8.303 0 0 0 1.082 4.094l.483.852a1.975 1.975 0 0 1 .181 1.558Z">
                                            </path>
                                        </svg>
                                    </div>
                                    <div className={cx("list_inbox__content__ul__li-icon_notification_new_message", ((idUser !== res.user1.idUser) && (res.isCheck === false) ? "active" : ""))}></div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className={cx("not_select_inbox")} ref={not_select_inboxRef}>
                <div className={cx("not_select_inbox__svg")}>
                    <svg aria-label="" className={cx("x1lliihq x1n2onr6 x5n08af")} fill="currentColor" height="96" role="img"
                        viewBox="0 0 96 96" width="96">
                        <title></title>
                        <path
                            d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z">
                        </path>
                    </svg>
                </div>
                <span className={cx("not_select_inbox__title")}>Tin nhắn của bạn</span>
                <span className={cx("not_select_inbox__describe")}>Gửi tin nhắn riêng tư cho bạn bè</span>
                {/* <div className={cx("not_select_inbox__button")}>
                    <span>Gửi tin nhắn</span>
                </div> */}
            </div>
            <div className={cx("detail_inbox")} ref={detail_inboxRef}>
                <div className={cx("detail_inbox__header")}>
                    <div className={cx("detail_inbox__header__user")}>
                        <div className={cx("detail_inbox__header__user-img")} onClick={() => window.location.href = `/${userTargetMessage.idUser}`}>
                            <img src={userTargetMessage.avatar === null ? defaultAvatar : userTargetMessage.avatar} alt="" />
                            <div className={cx("list_inbox__content__ul__li-icon_activing")}></div>
                        </div>
                        <div className={cx("detail_inbox__header__user-name_user_and_active_state")}>
                            <div className={cx("detail_inbox__header__user-name_user")} onClick={() => window.location.href = `/${userTargetMessage.idUser}`}>
                                <span>{userTargetMessage.name}</span>
                            </div>
                            {/* <div className={cx("detail_inbox__header__user-active_state")}>
                                <span>Hoạt động 33 phút trước</span>
                            </div> */}
                        </div>
                    </div>
                    {/* <div className={cx("detail_inbox__header__icon_option")}>
                        <div className={cx("detail_inbox__header__icon_option-voice_call")}>
                            <svg aria-label="Gọi thoại" className={cx("x1lliihq x1n2onr6 x5n08af")} fill="currentColor" height="24"
                                role="img" viewBox="0 0 24 24" width="24">
                                <title>Gọi thoại</title>
                                <path
                                    d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z">
                                </path>
                            </svg>
                        </div>
                        <div className={cx("detail_inbox__header__icon_option-video_call")}>
                            <svg aria-label="Gọi video" className={cx("x1lliihq x1n2onr6 x5n08af")} fill="currentColor" height="24"
                                role="img" viewBox="0 0 24 24" width="24">
                                <title>Gọi video</title>
                                <rect fill="none" height="18" rx="3" stroke="currentColor" strokeLinecap="round"
                                    strokeLinejoin="round" strokeWidth="2" width="16.999" x="1" y="3"></rect>
                                <path
                                    d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854"
                                    fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2"></path>
                            </svg>
                        </div>
                        <div className={cx("detail_inbox__header__icon_option-information_inbox")}>
                            <svg aria-label="Thông tin về cuộc trò chuyện" className={cx("x1lliihq x1n2onr6 x5n08af")}
                                fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <title>Thông tin về cuộc trò chuyện</title>
                                <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                                <circle cx="11.819" cy="7.709" r="1.25"></circle>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2" x1="10.569" x2="13.432" y1="16.777" y2="16.777"></line>
                                <polyline fill="none" points="10.569 11.05 12 11.05 12 16.777" stroke="currentColor"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                            </svg>
                        </div>
                    </div> */}
                </div>
                <div className={cx("detail_inbox__body")}>
                    <div className={cx("detail_inbox__body__message__container")}>
                        {/* <div className={cx("detail_inbox__body__time_message")}>
                            <span className={cx("detail_inbox__body__time_message-day_of_week")}>T3</span>
                            <span className={cx("detail_inbox__body__time_message-hour_and_minute")}>18:03</span>
                        </div> */}
                        {messagesWithOtherUser.slice().reverse().map((res) => {
                            if (res.user1.idUser === idUser) {
                                return (
                                    <div key={res.idUserMessage} className={cx("detail_inbox__body__message__item")} onMouseEnter={() => isOptionsMessageCLicked === null && setHoveredMessage(res.idUserMessage)}>
                                        <div className={cx("detail_inbox__body__message__item__message", "detail_inbox__body__message__item__message-me")}>
                                            <span>{res.message}</span>
                                            <div className={cx("detail_inbox__body__message__item__options_message", hoveredMessage === res.idUserMessage ? "active" : "")} onClick={() => {
                                                                                                                                                                                if (isOptionsMessageCLicked === null) {      
                                                                                                                                                                                    setActiveOptionsMessage(res.idUserMessage)
                                                                                                                                                                                    setIsOptionsMessageClicked(res.idUserMessage)
                                                                                                                                                                                }
                                                                                                                                                                                else {
                                                                                                                                                                                    setActiveOptionsMessage(null)
                                                                                                                                                                                    setIsOptionsMessageClicked(null)
                                                                                                                                                                                }
                                                                                                                                                                            }}>
                                                <svg aria-label="Xem thêm" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Xem thêm</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="12" cy="6" r="1.5"></circle><circle cx="12" cy="18" r="1.5"></circle></svg>
                                                <div className={cx("detail_inbox__body__message__item__options_message__container", activeOptionsMessage === res.idUserMessage ? "active" : "")} onClick={(e) => {
                                                                                                                                                                                                    e.stopPropagation()
                                                                                                                                                                                                }}>
                                                    <div className={cx("detail_inbox__body__message__item__options_message__item", "detail_inbox__body__message__item__options_message__item-time")}>
                                                        <span>{new Date(res.dateTimeMessage).toLocaleString()}</span>
                                                    </div>
                                                    <div className={cx("detail_inbox__body__message__item__options_message__item", "detail_inbox__body__message__item__options_message__item-recall")} onClick={() => {
                                                                                                                                                                                                            setIsOptionsMessageClicked(null)
                                                                                                                                                                                                            recallMessage(res.idUserMessage)
                                                                                                                                                                                                        }}>
                                                        <span>Thu hồi</span>
                                                        <svg aria-label="Thu hồi" className="x1lliihq x1n2onr6 xkmlbd1" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Thu hồi</title><path d="M12 .5C5.659.5.5 5.66.5 12S5.659 23.5 12 23.5c6.34 0 11.5-5.16 11.5-11.5S18.34.5 12 .5Zm0 21c-5.238 0-9.5-4.262-9.5-9.5S6.762 2.5 12 2.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5Z"></path><path d="M14.5 10H9.414l1.293-1.293a1 1 0 1 0-1.414-1.414l-3 2.999a1 1 0 0 0 0 1.414l3 3.001a.997.997 0 0 0 1.414 0 1 1 0 0 0 0-1.414L9.415 12H14.5c.827 0 1.5.674 1.5 1.501 0 .395-.157.794-.431 1.096-.227.249-.508.403-.735.403L14 14.999a1 1 0 0 0-.001 2l.833.001h.002c.796 0 1.604-.386 2.215-1.059a3.625 3.625 0 0 0 .951-2.44C18 11.571 16.43 10 14.5 10Z"></path></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div key={res.idUserMessage} className={cx("detail_inbox__body__message__item")}>
                                        <div className={cx("detail_inbox__body__message__item__message", "detail_inbox__body__message__item__message-you")}>
                                            <span>{res.message}</span>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
                <div className={cx("detail_inbox__footer")}>
                    <div className={cx("detail_inbox__footer__input_inbox")}>
                        {/* <div className={cx("detail_inbox__footer__input_inbox__icon_option-select_emoji")}>
                            <svg aria-label="Chọn biểu tượng cảm xúc" className={cx("x1lliihq x1n2onr6 x5n08af")} fill="currentColor"
                                height="24" role="img" viewBox="0 0 24 24" width="24">
                                <title>Chọn biểu tượng cảm xúc</title>
                                <path
                                    d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z">
                                </path>
                            </svg>
                        </div> */}
                        <div className={cx("detail_inbox__footer__input_inbox__input")}>
                            <input type="text" placeholder="Nhắn tin..." value={inputValue} onChange={handleEventInput} onKeyDown={handleKeyDown} />
                        </div>
                        <div className={cx("detail_inbox__footer__input_inbox__icon_option__group_right")}>
                            {/* <div className={cx("detail_inbox__footer__input_inbox__icon_option-audio_clip")}>
                                <svg aria-label="Clip âm thanh" className={cx("x1lliihq x1n2onr6 x5n08af")} fill="currentColor"
                                    height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Clip âm thanh</title>
                                    <path d="M19.5 10.671v.897a7.5 7.5 0 0 1-15 0v-.897" fill="none" stroke="currentColor"
                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                    <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="12"
                                        x2="12" y1="19.068" y2="22"></line>
                                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2" x1="8.706" x2="15.104" y1="22" y2="22"></line>
                                    <path d="M12 15.745a4 4 0 0 1-4-4V6a4 4 0 0 1 8 0v5.745a4 4 0 0 1-4 4Z" fill="none"
                                        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2">
                                    </path>
                                </svg>
                            </div> */}
                            {/* <div className={cx("detail_inbox__footer__input_inbox__icon_option-add_photo_or_video")}>
                                <svg aria-label="Thêm ảnh hoặc video" className={cx("x1lliihq x1n2onr6 x5n08af")} fill="currentColor"
                                    height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Thêm ảnh hoặc video</title>
                                    <path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z"
                                        fillRule="evenodd"></path>
                                    <path
                                        d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905"
                                        fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                                    <path
                                        d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z"
                                        fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2"></path>
                                </svg>
                            </div> */}
                            {/* <div className={cx("detail_inbox__footer__input_inbox__icon_option-like")}>
                                <svg aria-label="Thích" className={cx("x1lliihq x1n2onr6 x5n08af")} fill="currentColor" height="24"
                                    role="img" viewBox="0 0 24 24" width="24">
                                    <title>Thích</title>
                                    <path
                                        d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z">
                                    </path>
                                </svg>
                            </div> */}
                        </div>
                        <div className={cx("detail_inbox__footer__input_inbox__button_submit")} onClick={handleSubmitMessage} ref={submitInputRef}>
                            <span>Gửi</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("information_detail_inbox")}>
                <div className={cx("information_detail_inbox__title")}>
                    <span>Chi tiết</span>
                </div>
                <div className={cx("information_detail_inbox__body")}>
                    <div className={cx("information_detail_inbox__body__turn_off_ring_inbox")}>
                        <span>Tắt thông báo về tin nhắn</span>
                        <label className={cx("information_detail_inbox__body__turn_off_ring_inbox__switch_button")}>
                            <input type="checkbox" />
                            <span className={cx("information_detail_inbox__body__turn_off_ring_inbox__switch_button-slider")}></span>
                        </label>
                    </div>
                    {/* information_detail_inbox__body__list_member--group */}
                    <div className={cx("information_detail_inbox__body__list_member")}>

                    </div>
                    <div className={cx("information_detail_inbox__body__list_button_negative")}>
                        <div className={cx("information_detail_inbox__body__list_button_negative-button")}>
                            <span>Chặn</span>
                        </div>
                        <div className={cx("information_detail_inbox__body__list_button_negative-button")}>
                            <span>Xóa tin nhắn</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message;