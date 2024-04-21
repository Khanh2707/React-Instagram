import classNames from 'classnames/bind';
import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultAvatar from '../../assets/images/default_avatar.jpg'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

function Profile() {
    const [width, setWidth] = useState(window.innerWidth <= 1263 ? 309 - (1263 - window.innerWidth) / 10 : 309);
    const [widthTabBar, setWidthTabBar] = useState(window.innerWidth <= 1263 ? 935 - ((1263 - window.innerWidth) / 10) * 3 : 935)

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 1263) {
                setWidth(309 - (1263 - window.innerWidth) / 10)
                setWidthTabBar(935 - ((1263 - window.innerWidth) / 10) * 3)
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
            <div className={cx("info_user")}  style={{ width: `${widthTabBar}px` }}>
                <div className={cx("info_user-img_container")}>
                    <div className={cx("info_user-img")}>
                        <img src={defaultAvatar} />
                        <div className={cx("info_user-img__iconSetImage")}>
                            <svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor" className="x10l6tqk xtzzx4i xwa60dl x11lhmoz"><path d="M12 9.652a3.54 3.54 0 1 0 3.54 3.539A3.543 3.543 0 0 0 12 9.65zm6.59-5.187h-.52a1.107 1.107 0 0 1-1.032-.762 3.103 3.103 0 0 0-3.127-1.961H10.09a3.103 3.103 0 0 0-3.127 1.96 1.107 1.107 0 0 1-1.032.763h-.52A4.414 4.414 0 0 0 1 8.874v9.092a4.413 4.413 0 0 0 4.408 4.408h13.184A4.413 4.413 0 0 0 23 17.966V8.874a4.414 4.414 0 0 0-4.41-4.41zM12 18.73a5.54 5.54 0 1 1 5.54-5.54A5.545 5.545 0 0 1 12 18.73z"></path></svg>
                        </div>
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
                    <div className={cx("info_user-text__line2")}>
                        <div className={cx("info_user-text__amount", "info_user-text__amount_post")}>
                            <span className={cx("info_user-text__amount-number", "info_user-text__amount_post-number")}>
                                4
                            </span>
                            <span className={cx("info_user-text__amount-post", "info_user-text__amount_post-post")}>
                                bài viết
                            </span>
                        </div>
                        {/* <div className={cx("info_user-text__amount", "info_user-text__amount_follower")}>
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
                        </div> */}
                    </div>
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
            <div className={cx("navbar_post_page_profile")} style={{ width: `${widthTabBar}px` }}>
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
                <div className={cx("content_post_container__pane", "active")} style={{ width: `${widthTabBar + 4}px` }}>
                    <div className={cx("post_no_detail")} style={{ width: `${width}px`, height: `${width}px` }}>
                        <img src="https://scontent.cdninstagram.com/v/t39.30808-6/430818351_1034560898030450_5363521448821745273_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDI3eDE0Mjcuc2RyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=wUG0gSfyfJsAb5hVvS_&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzMxNzcwOTkwMTI1NjkxNzE3OA%3D%3D.2-ccb7-5&oh=00_AfDdZx5VohMsOsg58RqPEuk_8ocbQWsueRxINay3rDeQTg&oe=6628AEAE&_nc_sid=10d13b"
                            alt="" />
                        <div className={cx("post_no_detail__hover")} style={{ width: `${width}px`, height: `${width}px` }}>
                            <div className={cx("post_no_detail__hover__li", "post_no_detail__hover__li-heart")}>
                                <FontAwesomeIcon icon={faHeart} />
                                <span>0</span>
                            </div>
                            <div className={cx("post_no_detail__hover__li", "post_no_detail__hover__li-comment")}>
                                <FontAwesomeIcon icon={faComment} />
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx("post_no_detail")} style={{ width: `${width}px`, height: `${width}px` }}>
                        <img src="https://scontent.cdninstagram.com/v/t39.30808-6/366922313_18496898416056421_952713132011449003_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTkuc2RyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=101&_nc_ohc=n53fEqZR8ZgAb6qa-PK&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzE2ODAwNTkyMzg4MDA5NzU4Ng%3D%3D.2-ccb7-5&oh=00_AfCJsWxr6URi4F1_RxvFpDMx822lmrPipGrB8L0Cuk7KTA&oe=662AC6CA&_nc_sid=10d13b"
                            alt="" />
                        <div className={cx("post_no_detail__hover")} style={{ width: `${width}px`, height: `${width}px` }}>
                            <div className={cx("post_no_detail__hover__li", "post_no_detail__hover__li-heart")}>
                                <FontAwesomeIcon icon={faHeart} />
                                <span>0</span>
                            </div>
                            <div className={cx("post_no_detail__hover__li", "post_no_detail__hover__li-comment")}>
                                <FontAwesomeIcon icon={faComment} />
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx("post_no_detail")} style={{ width: `${width}px`, height: `${width}px` }}>
                        <img src="https://scontent.cdninstagram.com/v/t39.30808-6/421120358_18527565418056421_4962572587029728222_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDY1eDcxMC5zZHIuZjMwODA4In0&_nc_ht=scontent.cdninstagram.com&_nc_cat=101&_nc_ohc=yRkpg1zYzOQAb4gAlrp&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzI4Mzk0MjA4MjM0NTc4ODgwNw%3D%3D.2-ccb7-5&oh=00_AfA5gE_rQE4c0SiDndNyBVYfcyO3zIyoFFzWwprIU9lzGw&oe=662AB2A8&_nc_sid=10d13b"
                            alt="" />
                        <div className={cx("post_no_detail__hover")} style={{ width: `${width}px`, height: `${width}px` }}>
                            <div className={cx("post_no_detail__hover__li", "post_no_detail__hover__li-heart")}>
                                <FontAwesomeIcon icon={faHeart} />
                                <span>0</span>
                            </div>
                            <div className={cx("post_no_detail__hover__li", "post_no_detail__hover__li-comment")}>
                                <FontAwesomeIcon icon={faComment} />
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx("post_no_detail")} style={{ width: `${width}px`, height: `${width}px` }}>
                        <img src="https://scontent.cdninstagram.com/v/t39.30808-6/434173184_18544005880056421_4321319277059046051_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzc1eDEzNzUuc2RyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=kmyIGCxY7_QAb5wAix3&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzMzNjA4Mzg4Mzc4OTYyNTY3OA%3D%3D.2-ccb7-5&oh=00_AfAgokXuT0271My8TiC--KbhPil_AwTrlmRtwJTxSZQ9HQ&oe=6628A980&_nc_sid=10d13b"
                            alt="" />
                        <div className={cx("post_no_detail__hover")} style={{ width: `${width}px`, height: `${width}px` }}>
                            <div className={cx("post_no_detail__hover__li", "post_no_detail__hover__li-heart")}>
                                <FontAwesomeIcon icon={faHeart} />
                                <span>0</span>
                            </div>
                            <div className={cx("post_no_detail__hover__li", "post_no_detail__hover__li-comment")}>
                                <FontAwesomeIcon icon={faComment} />
                                <span>0</span>
                            </div>
                        </div>
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