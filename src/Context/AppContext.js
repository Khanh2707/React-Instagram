import { createContext, useEffect, useState } from "react";
import * as http from '~/utils/http';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [isLoadingLine, setIsLoadingLine] = useState(false);
    const [isReloadPostProfile, setIsReloadPostProfile] = useState(false);

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

    return (
        <AppContext.Provider value={{ 
            isLoadingLine, setIsLoadingLine,
            isReloadPostProfile, setIsReloadPostProfile,
            
            idUser, setIdUser,
            nameUser, setNameUser,
            descriptionUser, setDescriptionUser,
            genderUser, setGenderUser,
            avatar, setAvatar,
            idAccount, setIdAccount,
            account, setAccount,
            roles, setRoles,
        }}>
            {children}
        </AppContext.Provider>
    )
}