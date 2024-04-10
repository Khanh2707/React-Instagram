import classNames from 'classnames/bind';
import styles from './Search.module.css';
import { useState } from 'react';

const cx = classNames.bind(styles)

function Search({ isActive }) {
    const [isFirstActive, setIsFirstActive] = useState(false)
    
    if (isActive === true && isFirstActive === false)
        setIsFirstActive(true);
    
    
    return (
        <div className={cx("page-search", { 'animationAppearPageSearch': isActive })} style={{display: isFirstActive ? 'block' : ''}}>
            <div className={cx("page-search__title")}>
                <span>Tìm kiếm</span>
            </div>
            <div className={cx("page-search__input")}>
                <div className={cx("navigation__item", "search_input_in_page_search", "search_input_in_page_search-pc")}
                    data-level="3">
                    <input type="search" placeholder="Tìm kiếm" />
                    <svg aria-label="Tìm kiếm" className={cx("x1lliihq x1n2onr6 x1cp0k07")} fill="currentColor" height="16"
                        role="img" viewBox="0 0 24 24" width="16">
                        <title>Tìm kiếm</title>
                        <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none"
                            stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        </path>
                        <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
                    </svg>
                    <i className={cx("fa-solid fa-circle-xmark")}></i>
                </div>
            </div>
            <div className={cx("page-search__recently")}>
                <div className={cx("page-search__recently__header")}>
                    <div className={cx("page-search__recently__header__title")}>
                        <span>
                            Gần đây
                        </span>
                    </div>
                    <div className={cx("page-search__recently__header__delete_all")}>
                        <span>
                            Xóa tất cả
                        </span>
                    </div>
                </div>
                <div className={cx("page-search__recently__body")}>
                    <ul className={cx("page-search__recently__body__ul")}>
                        <li>
                            <div className={cx("page-search__recently__body__ul__li-img", "centerImg")}>
                                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                                    alt="" />
                            </div>
                            <div className={cx("page-search__recently__body__ul__li-short_infor")}>
                                <div className={cx("page-search__recently__body__ul__li-short_info__name_account")}>
                                    <span>aerichandesu</span>
                                    <svg aria-label="Đã xác minh" className={cx("x1lliihq x1n2onr6")} fill="rgb(0, 149, 246)"
                                        height="12" role="img" viewBox="0 0 40 40" width="12">
                                        <title>Đã xác minh</title>
                                        <path
                                            d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                                            fillRule="evenodd"></path>
                                    </svg>
                                </div>
                                <div
                                    className={cx("page-search__recently__body__ul__li-short_info__name_real_and_amount_follower")}>
                                    <span
                                        className={cx("page-search__recently__body__ul__li-short_info__name_real")}>giselle</span>
                                    <span className={cx("page-search__recently__body__ul__li-short_info__amount_follower")}>•
                                        5,5
                                        triệu người theo dõi</span>
                                </div>
                            </div>
                            <div className={cx("page-search__recently__body__ul__li-cancel")}>
                                <svg aria-label="Đóng" className={cx("x1lliihq x1n2onr6 x1roi4f4")} fill="currentColor"
                                    height="16" role="img" viewBox="0 0 24 24" width="16">
                                    <title>Đóng</title>
                                    <polyline fill="none" points="20.643 3.357 12 12 3.353 20.647"
                                        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="3"></polyline>
                                    <line fill="none" stroke="currentColor" strokeLinecap="round"
                                        strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649"
                                        y2="3.354"></line>
                                </svg>
                            </div>
                        </li>
                        <li>
                            <div className={cx("page-search__recently__body__ul__li-img")}>
                                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                                    alt="" />
                            </div>
                            <div className={cx("page-search__recently__body__ul__li-short_infor")}>
                                <div className={cx("page-search__recently__body__ul__li-short_info__name_account")}>
                                    <span>aerichandesu</span>
                                </div>
                                <div
                                    className={cx("page-search__recently__body__ul__li-short_info__name_real_and_amount_follower")}>
                                    <span
                                        className={cx("page-search__recently__body__ul__li-short_info__name_real")}>giselle</span>
                                    <span className={cx("page-search__recently__body__ul__li-short_info__amount_follower")}>•
                                        5,5 triệu người theo dõi</span>
                                </div>
                            </div>
                            <div className={cx("page-search__recently__body__ul__li-cancel")}>
                                <svg aria-label="Đóng" className={cx("x1lliihq x1n2onr6 x1roi4f4")} fill="currentColor"
                                    height="16" role="img" viewBox="0 0 24 24" width="16">
                                    <title>Đóng</title>
                                    <polyline fill="none" points="20.643 3.357 12 12 3.353 20.647"
                                        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="3"></polyline>
                                    <line fill="none" stroke="currentColor" strokeLinecap="round"
                                        strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649"
                                        y2="3.354"></line>
                                </svg>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Search;