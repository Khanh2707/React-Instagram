import { useState } from 'react';
import { useParams } from 'react-router-dom';

import classNames from 'classnames/bind';

import styles from './SettingAccount.module.css';

import EditAccount from '~/pages/EditAccount';
import ChangePassword from '~/pages/ChangePassword';

const cx = classNames.bind(styles)

function SettingAccount() {
    const { 'params': param } = useParams();

    const [tabActiveCurrent, setTabActiveCurrent] = useState(param);

    function handleTabActive(value) {
        setTabActiveCurrent(value)
        window.history.pushState({}, '', `/accounts/${value}`);
    }

    return (
        <div className={cx("setting_account__background")}>
            <div className={cx("setting_account__background__sidebar")}>
                <div className={cx("setting_account__background__sidebar__title")}>
                    <span>Cài đặt</span>
                </div>
                <div className={cx("setting_account__background__sidebar__container_group")}>
                    <div className={cx("setting_account__background__sidebar__group")}>
                        <div className={cx("setting_account__background__sidebar__group_title")}>
                            <span>Cách bạn dùng instagram</span>
                        </div>
                        <div className={cx("setting_account__background__sidebar__list_group_item")}>
                            <div className={cx("setting_account__background__sidebar__group_item", tabActiveCurrent === 'edit' ? "active" : "")} onClick={() => handleTabActive('edit')}>
                                <div className={cx("setting_account__background__sidebar__group_item__icon")}>
                                    <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title></title><circle cx="12.004" cy="12.004" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></circle><path d="M18.793 20.014a6.08 6.08 0 0 0-1.778-2.447 3.991 3.991 0 0 0-2.386-.791H9.38a3.994 3.994 0 0 0-2.386.791 6.09 6.09 0 0 0-1.779 2.447" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></path><circle cx="12.006" cy="9.718" fill="none" r="4.109" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></circle></svg>
                                </div>
                                <div className={cx("setting_account__background__sidebar__group_item__text")}>
                                    <span>Chỉnh sửa trang cá nhân</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx("setting_account__background__sidebar__group")}>
                        <div className={cx("setting_account__background__sidebar__group_title")}>
                            <span>Mật khẩu và bảo mật</span>
                        </div>
                        <div className={cx("setting_account__background__sidebar__list_group_item")}>
                            <div className={cx("setting_account__background__sidebar__group_item", tabActiveCurrent === 'password' ? "active" : "")} onClick={() => handleTabActive('password')}>
                                <div className={cx("setting_account__background__sidebar__group_item__icon")}>
                                    <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title></title><path d="M6.71 9.555h10.581a2.044 2.044 0 0 1 2.044 2.044v8.357a2.044 2.044 0 0 1-2.043 2.043H6.71a2.044 2.044 0 0 1-2.044-2.044V11.6A2.044 2.044 0 0 1 6.71 9.555Zm1.07 0V6.222a4.222 4.222 0 0 1 8.444 0v3.333" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                </div>
                                <div className={cx("setting_account__background__sidebar__group_item__text")}>
                                    <span>Đổi mật khẩu</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("setting_account__background__content")}>
                {tabActiveCurrent === 'edit' && <EditAccount />}
                {tabActiveCurrent === 'password' && <ChangePassword />}
            </div>
        </div>
    );
}

export default SettingAccount;