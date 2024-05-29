import { useEffect, useState, useRef, useContext } from 'react';
import classNames from 'classnames/bind';

import styles from './Search.module.css';

import defaultAvatar from '~/assets/images/default_avatar.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import { AppContext } from '~/Context/AppContext';
import { useDebounce } from '~/hooks'
import * as http from '~/utils/http';

const cx = classNames.bind(styles)

function Search({ searchIsActive }) {

    const [isFirstActive, setIsFirstActive] = useState(false)

    if (searchIsActive === true && isFirstActive === false)
        setIsFirstActive(true);

    const {
        idUser,
    } = useContext(AppContext)


    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);

    function reRenderSearchHistory() {
        http.get(`api/search_history/${idUser}`)
            .then((res) => {
                setSearchHistory(res.result)
            })
    }

    useEffect(() => {
        if (!idUser) {
            return;
        }

        reRenderSearchHistory();
    }, [idUser])

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounced) {
            setSearchResult([])
            return;
        }

        http.get(`api/users/${encodeURIComponent(debounced)}/${idUser}`)
            .then((res) => {
                setSearchResult(res.result)
            })
    }, [debounced])

    function handleSearchItemClick(value) {
        http.post(`api/search_history`, {
            id_user_search_history_1: idUser,
            id_user_search_history_2: value
        })
        .then(() => {
            reRenderSearchHistory()
            // window.history.pushState({}, '', `/${value}`)
            window.location.href = `/${value}`
        })
    }

    function handleSearchItemClickRemove(value) {
        http.del(`api/search_history/${idUser}/${value}`)
        .then(() => {
            reRenderSearchHistory()
        })
    }

    function handleSearchItemClickRemoveAll() {
        http.del(`api/search_history`)
        .then(() => {
            reRenderSearchHistory()
        })
    }


    const pageSearch__recentlyRef = useRef()
    const pageSearch__recently__header = useRef()

    function handleClickInputSearch() {
        const search_input_in_page_searchPC = document.querySelector('.' + cx('search_input_in_page_search-pc'));
        const search_input_in_page_searchPC_svg = document.querySelector('.' + cx('search_input_in_page_search-pc') + ' svg');
        const search_input_in_page_searchPC_input = document.querySelector('.' + cx('search_input_in_page_search-pc') + ' input');
        const search_input_in_page_searchPC_i = document.querySelector('.' + cx('search_input_in_page_search-pc') + ' i');


        const pageSearch__recently = pageSearch__recentlyRef.current

        document.addEventListener('click', function (event) {
            if (event.target !== search_input_in_page_searchPC_input) {
                blurInput();
            }
        });

        search_input_in_page_searchPC.addEventListener('click', function (event) {
            search_input_in_page_searchPC_svg.style.display = 'none';
            search_input_in_page_searchPC_input.style.paddingLeft = '0';
            search_input_in_page_searchPC_i.style.display = 'block';
            if (event.target.closest('svg.fa-circle-xmark') !== null || event.target.classList.contains('fa-circle-xmark')) {
                blurInput();
                removeAllCharacter();
            }
        });

        function blurInput() {
            search_input_in_page_searchPC_svg.style.display = 'block';
            search_input_in_page_searchPC_input.style.paddingLeft = '28px';
            search_input_in_page_searchPC_i.style.display = 'none';
        }

        search_input_in_page_searchPC_input.addEventListener('input', function () {
            changeWhenInputCharacter();
        });

        // var typingTimer; // Biến để lưu trữ thời gian đợi
        function changeWhenInputCharacter() {
            // clearTimeout(typingTimer); // Xóa bất kỳ độ trễ nào còn tồn tại

            pageSearch__recently.classList.add(cx('hiddenResultInput'));
            // typingTimer = setTimeout(function () {
                if (search_input_in_page_searchPC_input.value.length > 0) {
                    pageSearch__recently.style.marginTop = '0';
                    pageSearch__recently.style.borderTop = '0';
                    pageSearch__recently__header.style.display = 'none';
                    pageSearch__recently.classList.remove(cx('hiddenResultInput'));
                } else {
                    removeAllCharacter();
                }
            // }, 500);
        }

        function removeAllCharacter() {
            pageSearch__recently.style.marginTop = '24px';
            pageSearch__recently.style.borderTop = '1px solid var(--border-navigation_bar)';
            pageSearch__recently__header.style.display = 'flex';
            pageSearch__recently.classList.remove(cx('hiddenResultInput'));
            setSearchValue('');
        }
    }

    useEffect(() => {
        handleClickInputSearch()
    }, [])


    return (
        <div className={cx("page-search", { 'animationAppearPageSearch': searchIsActive })} style={{ display: isFirstActive ? 'block' : '' }}>
            <div className={cx("page-search__title")}>
                <span>Tìm kiếm</span>
            </div>
            <div className={cx("page-search__input")}>
                <div className={cx("navigation__item", "search_input_in_page_search", "search_input_in_page_search-pc")}
                    data-level="3">
                    <input type="search" placeholder="Tìm kiếm" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                    <svg aria-label="Tìm kiếm" className={cx("x1lliihq x1n2onr6 x1cp0k07")} fill="currentColor" height="16"
                        role="img" viewBox="0 0 24 24" width="16">
                        <title>Tìm kiếm</title>
                        <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none"
                            stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        </path>
                        <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
                    </svg>
                    <i><FontAwesomeIcon icon={faCircleXmark} /></i>
                </div>
            </div>
            <div className={cx("page-search__recently")} ref={pageSearch__recentlyRef}>
                <div className={cx("page-search__recently__header")} ref={pageSearch__recently__header}>
                    <div className={cx("page-search__recently__header__title")}>
                        <span>
                            Gần đây
                        </span>
                    </div>
                    <div className={cx("page-search__recently__header__delete_all")} onClick={handleSearchItemClickRemoveAll}>
                        <span>
                            Xóa tất cả
                        </span>
                    </div>
                </div>
                <div className={cx("page-search__recently__body")}>
                    <ul className={cx("page-search__recently__body__ul")}>
                        {searchValue.length > 0 ? (
                            searchResult.map((result) => {
                                return (
                                    <li key={result.idUser}>
                                        <div className={cx("page-search__recently__body__ul__li-infor")} onClick={() => handleSearchItemClick(result.idUser)}>
                                            <div className={cx("page-search__recently__body__ul__li-img")}>
                                                <img src={(result.avatar === null || result.avatar === '') ? defaultAvatar : result.avatar} alt="" />
                                            </div>
                                            <div className={cx("page-search__recently__body__ul__li-short_infor")}>
                                                <div className={cx("page-search__recently__body__ul__li-short_info__name_account")}>
                                                    <span>{result.idUser}</span>
                                                </div>
                                                <div
                                                    className={cx("page-search__recently__body__ul__li-short_info__name_real_and_amount_follower")}>
                                                    <span
                                                        className={cx("page-search__recently__body__ul__li-short_info__name_real")}>{result.name}</span>
                                                    {/* <span className={cx("page-search__recently__body__ul__li-short_info__amount_follower")}>•
                                                        5,5 triệu người theo dõi</span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        ) : (
                            searchHistory.map((result) => {
                                return (
                                    <li key={result.user2.idUser}>
                                        <div className={cx("page-search__recently__body__ul__li-infor")} onClick={() => handleSearchItemClick(result.user2.idUser)}>
                                            <div className={cx("page-search__recently__body__ul__li-img")}>
                                                <img src={(result.user2.avatar === null || result.user2.avatar === '') ? defaultAvatar : result.user2.avatar} alt="" />
                                            </div>
                                            <div className={cx("page-search__recently__body__ul__li-short_infor")}>
                                                <div className={cx("page-search__recently__body__ul__li-short_info__name_account")}>
                                                    <span>{result.user2.idUser}</span>
                                                </div>
                                                <div
                                                    className={cx("page-search__recently__body__ul__li-short_info__name_real_and_amount_follower")}>
                                                    <span
                                                        className={cx("page-search__recently__body__ul__li-short_info__name_real")}>{result.user2.name}</span>
                                                    {/* <span className={cx("page-search__recently__body__ul__li-short_info__amount_follower")}>•
                                                        5,5 triệu người theo dõi</span> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx("page-search__recently__body__ul__li-cancel")} onClick={() => handleSearchItemClickRemove(result.user2.idUser)}>
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
                                )
                            })
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Search;