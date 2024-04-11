import classNames from 'classnames/bind';
import styles from './Search.module.css';
import { useState } from 'react';

const cx = classNames.bind(styles)

function Search({ searchIsActive }) {
    const [isFirstActive, setIsFirstActive] = useState(false)
    
    if (searchIsActive === true && isFirstActive === false)
        setIsFirstActive(true);
    
    
    return (
        <div className={cx("page-search", { 'animationAppearPageSearch': searchIsActive })} style={{display: isFirstActive ? 'block' : ''}}>
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
                                </div>
                                <div
                                    className={cx("page-search__recently__body__ul__li-short_info__name_real_and_amount_follower")}>
                                    <span
                                        className={cx("page-search__recently__body__ul__li-short_info__name_real")}>giselle</span>
                                    {/* <span className={cx("page-search__recently__body__ul__li-short_info__amount_follower")}>•
                                        5,5
                                        triệu người theo dõi</span> */}
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
                                    {/* <span className={cx("page-search__recently__body__ul__li-short_info__amount_follower")}>•
                                        5,5 triệu người theo dõi</span> */}
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