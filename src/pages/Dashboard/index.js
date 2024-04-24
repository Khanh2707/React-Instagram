import classNames from 'classnames/bind';
import styles from './Dashboard.module.css';
import defaultAvatar from '../../assets/images/default_avatar.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faPenToSquare, faUserLock, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDebounce } from '~/hooks';
import * as http from '~/utils/http'
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Trang quản trị';
    }, [])

    const [listAllAccount, setListAllAccount] = useState([])

    useEffect(() => {
        function getAllAccount() {
            http.get(`api/accounts`)
                .then((res) => {
                    console.log(res)
                    setListAllAccount(res.result)
                })
        }
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

        http.get(`api/users/${encodeURIComponent(debounced)}/null`)
            .then((res) => {
                console.log(res);
                setSearchResult(res.result)
            })
    }, [debounced])
    

    return (
        <div className={cx("table")}>
            <div className={cx("table_header")}>
                <p>Danh sách tất cả người dùng</p>
                <div>
                    <input type="search" placeholder="Tìm kiếm" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                    <button className={cx("redirect")} onClick={() => {navigate('/')}}>Quay về trang chủ</button>
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
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchValue.length <= 0 ? (
                            listAllAccount.map((res) => {
                                return (
                                    <tr key={res.idAccount}>
                                        <td>1</td>
                                        <td><img src={res.user.avatar === null ? defaultAvatar : res.user.avatar} alt="" /></td>
                                        <td>{res.user.idUser}</td>
                                        <td>{res.user.name}</td>
                                        <td>
                                            {res.user.gender === true ? 'Nam' : res.user.gender === false ? 'Nữ' : 'Không muốn tiết lộ'}    
                                        </td>
                                        <td>
                                            <button><FontAwesomeIcon icon={faUserPen} /></button>
                                            <button><FontAwesomeIcon icon={faUserLock} /></button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            searchResult.map((res) => {
                                return (
                                    <tr key={res.idUser}>
                                        <td>1</td>
                                        <td><img src={res.avatar === null ? defaultAvatar : res.avatar} alt="" /></td>
                                        <td>{res.idUser}</td>
                                        <td>{res.name}</td>
                                        <td>
                                            {res.gender === true ? 'Nam' : res.gender === false ? 'Nữ' : 'Không muốn tiết lộ'}    
                                        </td>
                                        <td>
                                            <button><FontAwesomeIcon icon={faUserPen} /></button>
                                            <button><FontAwesomeIcon icon={faUserLock} /></button>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
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
    );
}

export default Dashboard;