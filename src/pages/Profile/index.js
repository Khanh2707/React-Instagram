import classNames from 'classnames/bind';
import styles from './Profile.module.css';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles)

function Profile() {
    const [width, setWidth] = useState(309);
    const [widthTabBar, setWidthTabBar] = useState(935)

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 1263) {
                setWidth(width - (1263 - window.innerWidth) / 10)
                setWidthTabBar(widthTabBar - ((1263 - window.innerWidth) / 10) * 3)
            }
            else {
                setWidth(309)
                setWidthTabBar(935)
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <div className={cx("main", "page-profile")}>
            <div className={cx("info_user")}>
                <div className={cx("info_user-img_container")}>
                    <div className={cx("info_user-img")}>
                        <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                            alt="" />
                    </div>
                </div>
                <div className={cx("info_user-text")}>
                    <div className={cx("info_user-text__line1")}>
                        <div className={cx("info_user-text__name")}>
                            tp_khanh_
                        </div>
                        <div className={cx("info_user-text__edit_profile")}>
                            Chỉnh sửa trang cá nhân
                        </div>
                    </div>
                    {/* <div className={cx("info_user-text__line2")}>
                        <div className={cx("info_user-text__amount", "info_user-text__amount_post")}>
                            <span className={cx("info_user-text__amount-number", "info_user-text__amount_post-number")}>
                                2
                            </span>
                            <span className={cx("info_user-text__amount-post", "info_user-text__amount_post-post")}>
                                bài viết
                            </span>
                        </div>
                        <div className={cx("info_user-text__amount", "info_user-text__amount_follower")}>
                            <span className={cx("info_user-text__amount-number", "info_user-text__amount_follower-number")}>
                                39
                            </span>
                            <span className={cx("info_user-text__amount-post", "info_user-text__amount_follower-post")}>
                                người theo dõi
                            </span>
                        </div>
                        <div className={cx("info_user-text__amount", "info_user-text__amount_follow")}>
                            <span className={cx("info_user-text__amount-post", "info_user-text__amount_follow-post")}>
                                Đang theo dõi
                                <span className={cx("info_user-text__amount-number", "info_user-text__amount_follow-number")}>
                                    11
                                </span>
                                người dùng
                            </span>
                        </div>
                    </div> */}
                    <div className={cx("info_user-text__line3")}>
                        <div className={cx("info_user-text__real_name")}>
                            Trần Khánh
                        </div>
                    </div>
                    <div className={cx("info_user-text__line4")}>
                        <div className={cx("info_user-text__description")}>
                            dwg
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className={cx("post_24h_container")}>
                <div className={cx("add_post_container")}>
                    <div className={cx("add_post_container__icon")}>
                        <div className={cx("add_post_container__icon__background")}>

                        </div>
                        <svg aria-label="Biểu tượng dấu cộng" className={cx("x1lliihq x1n2onr6 x10xgr34")} fill="currentColor"
                            height="44" role="img" viewBox="0 0 24 24" width="44">
                            <title>Biểu tượng dấu cộng</title>
                            <path
                                d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z">
                            </path>
                        </svg>
                    </div>
                    <div className={cx("add_post_container__text")}>
                        Mới
                    </div>
                </div>
            </div> */}
            <div className={cx("navbar_post_page_profile")} style={{width: `${widthTabBar}px`}}>
                <div className={cx("navbar_post_page_profile__tab", "navbar_post_page_profile__tab-post", "active")}>
                    <div className={cx("navbar_post_page_profile__tab__icon")}>
                        <svg aria-label="" className={cx("x1lliihq x1n2onr6 x5n08af")} fill="currentColor" height="12" role="img"
                            viewBox="0 0 24 24" width="12">
                            <title></title>
                            <rect fill="none" height="18" stroke="currentColor" strokeLinecap="round"
                                strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect>
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line>
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line>
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line>
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line>
                        </svg>
                    </div>
                    <div className={cx("navbar_post_page_profile__tab__text")}>
                        Bài viết
                    </div>
                </div>
                {/* <div className={cx("navbar_post_page_profile__tab", "navbar_post_page_profile__tab-post_save")}>
                    <div className={cx("navbar_post_page_profile__tab__icon")}>
                        <svg aria-label="" className={cx("x1lliihq x1n2onr6 x1roi4f4")} fill="currentColor" height="12" role="img"
                            viewBox="0 0 24 24" width="12">
                            <title></title>
                            <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor"
                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
                        </svg>
                    </div>
                    <div className={cx("navbar_post_page_profile__tab__text")}>
                        Đã lưu
                    </div>
                </div>
                <div className={cx("navbar_post_page_profile__tab", "navbar_post_page_profile__tab-post_taged")}>
                    <div className={cx("navbar_post_page_profile__tab__icon")}>
                        <svg aria-label="" className={cx("x1lliihq x1n2onr6 x1roi4f4")} fill="currentColor" height="12" role="img"
                            viewBox="0 0 24 24" width="12">
                            <title></title>
                            <path
                                d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z"
                                fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2"></path>
                            <path
                                d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603"
                                fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2"></path>
                            <circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor"
                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                        </svg>
                    </div>
                    <div className={cx("navbar_post_page_profile__tab__text")}>
                        Được gắn thẻ
                    </div>
                </div> */}
            </div>
            <div className={cx("content_post_container_page_profile")}>
                <div className={cx("content_post_container__pane", "active")} style={{width: `${widthTabBar + 4}px`}}>
                    <div className={cx("post_no_detail")} style={{width: `${width}px`, height: `${width}px`}}>
                        <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                            alt="" />
                    </div>
                    <div className={cx("post_no_detail")} style={{width: `${width}px`, height: `${width}px`}}>
                        <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                            alt="" />
                    </div>
                    <div className={cx("post_no_detail")} style={{width: `${width}px`, height: `${width}px`}}>
                        <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                            alt="" />
                    </div>
                    <div className={cx("post_no_detail")} style={{width: `${width}px`, height: `${width}px`}}>
                        <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                            alt="" />
                    </div>
                </div>
                {/* <div className={cx("content_post_container__pane")}>
                    <div className={cx("content_post_container__pane__post_save")}>
                        <div className={cx("content_post_container__pane__post_save__header")}>
                            <span className={cx("content_post_container__pane__post_save__header__description")}>Chỉ mình bạn có thể
                                xem mục mình đã lưu</span>
                            <span className={cx("content_post_container__pane__post_save__header__add_new_collection")}>+ Bộ sưu tập
                                mới</span>
                        </div>
                        <div className={cx("content_post_container__pane__post_save__body")}>
                            <div className={cx("post_save_no_detail")}>
                                <div className={cx("post_save_no_detail__backgroundImage")}></div>
                                <span>Tất cả bài viết</span>
                            </div>
                            <div className={cx("post_save_no_detail")}>
                                <div className={cx("post_save_no_detail__backgroundImage")}></div>
                                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                                    alt="" />
                                <span>Profile</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx("content_post_container__pane")}>
                </div> */}
            </div>
        </div>
    )
}

export default Profile;