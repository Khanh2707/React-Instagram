import { createContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import * as http from '~/utils/http';

export const AppContext = createContext({});

var stompClient = null;
export const AppProvider = ({ children }) => {
    const [isLoadingLine, setIsLoadingLine] = useState(false);
    const [isReloadPostProfile, setIsReloadPostProfile] = useState(false);
    const [isReloadQuantityPost, setIsReloadQuantityPost] = useState(false);

    const [idUser, setIdUser] = useState('');
    const [nameUser, setNameUser] = useState('');
    const [descriptionUser, setDescriptionUser] = useState('');
    const [genderUser, setGenderUser] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [idAccount, setIdAccount] = useState('')
    const [account, setAccount] = useState('')
    const [roles, setRoles] = useState('')
    useEffect(() => {
        const getMyInfo = async () => {
            try {
                const res = await http.get('api/accounts/myAccount')
                setIdUser(res.result.user.idUser)
                setNameUser(res.result.user.name)
                setAvatar(res.result.user.avatar)
                setDescriptionUser(res.result.user.description)
                setGenderUser(res.result.user.gender)

                setIdAccount(res.result.idAccount)
                setAccount(res.result.account)

                setRoles(res.result.roles[0].name)
                console.log(res)
            } catch (error) {

            }
        }
        getMyInfo()
    }, [])


    const [quantityMessageNotCheck, setQuantityMessageNotCheck] = useState(0)

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

    const [quantityPostNotificationCheck, setQuantityPostNotificationCheck] = useState(0)

    const getQuantityPostNotificationCheck = () => {
        http.get(`api/post_notifications/count_by_user/${idUser}`)
        .then((res) => {
            setQuantityPostNotificationCheck(res.result)
        })
    }

    useEffect(() => {
        if (idUser !== '')
            getQuantityPostNotificationCheck()
    }, [idUser])

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
        stompClient.subscribe(`/user/${idUser}/notification`, onNotification)
    }

    const onError = () => {

    }

    const onPrivateMessage = (payload) => {
        console.log(payload)
        var payloadData = JSON.parse(payload.body);
    }

    const onNotification = (payload) => {
        getQuantityPostNotificationCheck()
    }

    const sendPostNotification = (senderName, receiverName) => {
        if (stompClient) {
            var chatMessage = {
                senderName: senderName,
                receiverName: receiverName,
                message: 'Post notification'
            }
            stompClient.send("/app/notification", {}, JSON.stringify(chatMessage));
        }
    }

    

    return (
        <AppContext.Provider value={{ 
            isLoadingLine, setIsLoadingLine,
            isReloadPostProfile, setIsReloadPostProfile,
            isReloadQuantityPost, setIsReloadQuantityPost,
            
            idUser, setIdUser,
            nameUser, setNameUser,
            descriptionUser, setDescriptionUser,
            genderUser, setGenderUser,
            avatar, setAvatar,
            idAccount, setIdAccount,
            account, setAccount,
            roles, setRoles,

            quantityMessageNotCheck, setQuantityMessageNotCheck,
            quantityPostNotificationCheck, setQuantityPostNotificationCheck,

            sendPostNotification
        }}>
            {children}
        </AppContext.Provider>
    )
}