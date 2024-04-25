import classNames from 'classnames/bind';
import styles from './Dashboard.module.css';
import defaultAvatar from '../../assets/images/default_avatar.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faLock, faUnlock, faUser, faUserLock, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDebounce } from '~/hooks';
import * as http from '~/utils/http'
import { useNavigate } from 'react-router-dom';
import { useToastMessage } from '../../Context/ToastMessageContext';
import ToastMessage from '../../Components/Layout/DefaultLayout/ToastMessage';
import { useModalConfirm } from '../../Context/ModalConfirmContext';
import ModalConfirm from '../../Components/Layout/DefaultLayout/ModalConfirm';

const cx = classNames.bind(styles)

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Trang quản trị';
    }, [])

    const [listAllAccount, setListAllAccount] = useState([])

    function getAllAccount() {
        http.get(`api/accounts`)
            .then((res) => {
                console.log(res)
                setListAllAccount(res.result)
            })
    }

    useEffect(() => {
        getAllAccount();
    }, [])


    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounced) {
            setSearchResult([])
            return;
        }

        http.get(`api/accounts/by_user/${encodeURIComponent(debounced)}`)
            .then((res) => {
                console.log(res);
                setSearchResult(res.result)
            })
    }, [debounced])


    const [allRoles, setAllRoles] = useState([])

    function getAllRoles() {
        http.get(`/api/roles`)
            .then((res) => {
                setAllRoles(res.result)
            })
    }

    useEffect(() => {
        getAllRoles();
    }, [])


    function putAccountRole(idAccocunt, nameRole) {
        http.put(`api/accounts/role/${idAccocunt}`, {
            "roles": [
                nameRole
            ]
        })
        .then((res) => {
            getAllAccount();
            showToastSuccess();
        })
    }

    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleAppearSelect = (idAccount) => {
        setActiveDropdown(activeDropdown === idAccount ? null : idAccount);
    };

    const { setToastMessage } = useToastMessage();

    function showToastSuccess() {
        setToastMessage({
            title: "Thành công!",
            message: "Update vai trò người dùng thành công.",
            type: "success",
            duration: 3000
        })
    }

    let index = 1;

    const { setIsMouthModalConfirm, setMouthedContent } = useModalConfirm();

    const handleOpenModalConfirm = (content) => {
        setIsMouthModalConfirm(true);
        setMouthedContent(content);
    };

    return (
        <>
        <div className={cx("table")}>
            <div className={cx("table_header")}>
                <p>Danh sách tất cả người dùng</p>
                <div>
                    <input type="search" placeholder="Tìm kiếm" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                    <button className={cx("redirect")} onClick={() => { navigate('/') }}>Quay về trang chủ</button>
                </div>
            </div>
            <div className={cx("table_section")}>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Ảnh đại diện</th>
                            <th>Id</th>
                            <th>Tên</th>
                            <th>Giới tính</th>
                            <th>Vai trò</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(searchValue.length <= 0 ? listAllAccount : searchResult).map((res) => {
                            const isDropdownActive = activeDropdown === res.idAccount;
                            const shouldDisplayDropdown = res.user.idUser !== 'admin';
                            return (
                                <tr key={res.idAccount}>
                                    <td>{index++}</td>
                                    <td><img src={res.user.avatar === null ? defaultAvatar : res.user.avatar} alt="" /></td>
                                    <td>{res.user.idUser}</td>
                                    <td>{res.user.name}</td>
                                    <td>
                                        {res.user.gender === true ? 'Nam' : res.user.gender === false ? 'Nữ' : 'Không muốn tiết lộ'}
                                    </td>
                                    <td>
                                        {shouldDisplayDropdown && (
                                            <div className={cx("dropdown", { active: isDropdownActive })} onClick={() => handleAppearSelect(res.idAccount)}>
                                                <input type="text" className={cx("textBox")} placeholder={res.roles[0].name} readOnly />
                                                <div className={cx("option")}>
                                                    {allRoles.map((allRoles) => {
                                                        return (
                                                            <div key={allRoles.name} onClick={() => putAccountRole(res.idAccount, allRoles.name)}>
                                                                {
                                                                    allRoles.name === "ADMIN" ? <FontAwesomeIcon icon={faUserTie} /> :
                                                                        allRoles.name === "USER" ? <FontAwesomeIcon icon={faUser} /> : ''
                                                                }
                                                                <span>{allRoles.name}</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                        {!shouldDisplayDropdown && (
                                            <div className={cx("displayRoleForADMIN")}>
                                                <FontAwesomeIcon icon={faUserTie} />
                                                <span>{res.roles[0].name}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        {res.logLockAccounts.length > 0 && (
                                            <>
                                                {res.logLockAccounts[0].stateLock === false && (
                                                    <button onClick={() => handleOpenModalConfirm("InputTextarea")}>
                                                        <FontAwesomeIcon icon={faLock} />
                                                    </button>
                                                )}
                                                {res.logLockAccounts[0].stateLock === true && (
                                                    <button>
                                                        <FontAwesomeIcon icon={faUnlock} />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                        {res.logLockAccounts.length <= 0 && (
                                            <button onClick={() => handleOpenModalConfirm("InputTextarea")}>
                                                <FontAwesomeIcon icon={faLock} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className={cx("pagination")}>
                <div><FontAwesomeIcon icon={faAnglesLeft} /></div>
                <div><FontAwesomeIcon icon={faChevronLeft} /></div>
                <div>1</div>
                <div><FontAwesomeIcon icon={faAnglesRight} /></div>
                <div><FontAwesomeIcon icon={faChevronRight} /></div>
            </div>
        </div>
        <ModalConfirm />
        <ToastMessage />
        </>
    );
}

export default Dashboard;