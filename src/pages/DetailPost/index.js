import classNames from 'classnames/bind';
import styles from './DetailPost.module.css';
import defaultAvatar from '../../assets/images/default_avatar.jpg';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles)

function DetailPost() {
    const submitInputRef = useRef();
    const inputIputRef = useRef();

    const [inputValue, setInputValue] = useState('');
    const [statusLike, setStatusLike] = useState(false);

    function handleClickCommentButton() {
        inputIputRef.current.focus();
    }

    function handleStatusLike() {
        setStatusLike(!statusLike);
    }

    function handleEventInput(e) {
        setInputValue(e.target.value)

        if (e.target.value !== '') {
            submitInputRef.current.classList.add(cx('active'))
        }
        else {
            submitInputRef.current.classList.remove(cx('active'))
        }
    }

    function handleSubmitValue() {
        setInputValue('')

        submitInputRef.current.classList.remove(cx('active'))

        if (inputValue !== '')
        console.log(inputValue);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter' && inputValue !== '') {
            handleSubmitValue();
        }
    }

    return (
        <div className={cx("container_detail_post")}>
            <div className={cx("detail_post__img")}>
                <img src='https://instagram.fhan14-5.fna.fbcdn.net/v/t39.30808-6/437348921_17998072601550354_3725095069031096879_n.jpg?stp=dst-jpg_e35_p720x720&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fhan14-5.fna.fbcdn.net&_nc_cat=106&_nc_ohc=9wTQ4oaPiFYAb4frsKr&edm=AI8qBrIAAAAA&ccb=7-5&ig_cache_key=MzM1MDA4ODM4ODMyNDYwNzA4Nw%3D%3D.2-ccb7-5&oh=00_AfC6pHKL-ddmU6cwakJrMmUa9ECUsnLSY3YuOI-LID6IYA&oe=662ADB61&_nc_sid=469e9a' alt='' />
            </div>
            <div className={cx("detail_post__engagement")}>
                <div className={cx("detail_post__engagement__header")}>
                    <div className={cx("detail_post__engagement__avatar_and_name")}>
                        <div className={cx("detail_post__engagement__avatar")}>
                            <img src={defaultAvatar} alt='' />
                        </div>
                        <div className={cx("detail_post__engagement__name")}>
                            <span>tp_khanh</span>
                        </div>
                    </div>
                    <div className={cx("detail_post__engagement__options")}>
                        <svg aria-label="Tùy chọn khác" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Tùy chọn khác</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                    </div>
                </div>
                <div className={cx("detail_post__engagement__list_comment")}>
                    <div className={cx("detail_post__engagement__comment_container")}>
                        <div className={cx("detail_post__engagement__avatar")}>
                            <img src={defaultAvatar} alt='' />
                        </div>
                        <div className={cx("detail_post__engagement__content_comment")}>
                            <div className={cx("detail_post__engagement__id_and_comment")}>
                                <span className={cx("detail_post__engagement__id")}>trang23_10</span>
                                <span className={cx("detail_post__engagement__comment")}>Biển không cô đơn, người cô đơn là người ngắm biển 🌊</span>
                            </div>
                            <span className={cx("detail_post__engagement__time_create_comment")}>
                                6 ngày
                            </span>
                        </div>
                    </div>
                    <div className={cx("detail_post__engagement__comment_container")}>
                        <div className={cx("detail_post__engagement__avatar")}>
                            <img src={defaultAvatar} alt='' />
                        </div>
                        <div className={cx("detail_post__engagement__content_comment")}>
                            <div className={cx("detail_post__engagement__id_and_comment")}>
                                <span className={cx("detail_post__engagement__id")}>trang23_10</span>
                                <span className={cx("detail_post__engagement__comment")}>Biển không cô đơn, người cô đơn là người ngắm biển 🌊</span>
                            </div>
                            <span className={cx("detail_post__engagement__time_create_comment")}>
                                6 ngày
                            </span>
                        </div>
                    </div>
                    <div className={cx("detail_post__engagement__comment_container")}>
                        <div className={cx("detail_post__engagement__avatar")}>
                            <img src={defaultAvatar} alt='' />
                        </div>
                        <div className={cx("detail_post__engagement__content_comment")}>
                            <div className={cx("detail_post__engagement__id_and_comment")}>
                                <span className={cx("detail_post__engagement__id")}>trang23_10</span>
                                <span className={cx("detail_post__engagement__comment")}>Biển không cô đơn, người cô đơn là người ngắm biển 🌊</span>
                            </div>
                            <span className={cx("detail_post__engagement__time_create_comment")}>
                                6 ngày
                            </span>
                        </div>
                    </div>
                    <div className={cx("detail_post__engagement__comment_container")}>
                        <div className={cx("detail_post__engagement__avatar")}>
                            <img src={defaultAvatar} alt='' />
                        </div>
                        <div className={cx("detail_post__engagement__content_comment")}>
                            <div className={cx("detail_post__engagement__id_and_comment")}>
                                <span className={cx("detail_post__engagement__id")}>trang23_10</span>
                                <span className={cx("detail_post__engagement__comment")}>Biển không cô đơn, người cô đơn là người ngắm biển 🌊</span>
                            </div>
                            <span className={cx("detail_post__engagement__time_create_comment")}>
                                6 ngày
                            </span>
                        </div>
                    </div>
                    <div className={cx("detail_post__engagement__comment_container")}>
                        <div className={cx("detail_post__engagement__avatar")}>
                            <img src={defaultAvatar} alt='' />
                        </div>
                        <div className={cx("detail_post__engagement__content_comment")}>
                            <div className={cx("detail_post__engagement__id_and_comment")}>
                                <span className={cx("detail_post__engagement__id")}>trang23_10</span>
                                <span className={cx("detail_post__engagement__comment")}>Biển không cô đơn, người cô đơn là người ngắm biển 🌊</span>
                            </div>
                            <span className={cx("detail_post__engagement__time_create_comment")}>
                                6 ngày
                            </span>
                        </div>
                    </div>
                    <div className={cx("detail_post__engagement__comment_container")}>
                        <div className={cx("detail_post__engagement__avatar")}>
                            <img src={defaultAvatar} alt='' />
                        </div>
                        <div className={cx("detail_post__engagement__content_comment")}>
                            <div className={cx("detail_post__engagement__id_and_comment")}>
                                <span className={cx("detail_post__engagement__id")}>trang23_10</span>
                                <span className={cx("detail_post__engagement__comment")}>Biển không cô đơn, người cô đơn là người ngắm biển 🌊</span>
                            </div>
                            <span className={cx("detail_post__engagement__time_create_comment")}>
                                6 ngày
                            </span>
                        </div>
                    </div>
                    <div className={cx("detail_post__engagement__comment_container")}>
                        <div className={cx("detail_post__engagement__avatar")}>
                            <img src={defaultAvatar} alt='' />
                        </div>
                        <div className={cx("detail_post__engagement__content_comment")}>
                            <div className={cx("detail_post__engagement__id_and_comment")}>
                                <span className={cx("detail_post__engagement__id")}>trang23_10</span>
                                <span className={cx("detail_post__engagement__comment")}>Biển không cô đơn, người cô đơn là người ngắm biển 🌊</span>
                            </div>
                            <span className={cx("detail_post__engagement__time_create_comment")}>
                                6 ngày
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx("detail_post__engagement__button_engagement")}>
                    <div className={cx("detail_post__engagement__like")} style={{display: statusLike === true ? 'none' : 'block'}} onClick={handleStatusLike}>
                        <svg aria-label="Thích" className="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Thích</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                    </div>
                    <div className={cx("detail_post__engagement__un_like")} style={{display: statusLike === true ? 'block' : 'none'}} onClick={handleStatusLike}>
                        <svg aria-label="Bỏ thích" className="x1lliihq x1n2onr6 xxk16z8" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Bỏ thích</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                    </div>
                    <div className={cx("detail_post__engagement__comment")} onClick={handleClickCommentButton}>
                        <svg aria-label="Bình luận" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Bình luận</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                    </div>
                </div>
                <div className={cx("detail_post__engagement__total_like")}>
                    <span>5.922 lượt thích</span>
                </div>
                <div className={cx("detail_post__engagement__time_create")}>
                    <span>6 ngày trước</span>
                </div>
                <div className={cx("detail_post__engagement__footer")}>
                    <div className={cx("detail_post__engagement__icon")}>
                        <svg aria-label="Biểu tượng cảm xúc" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Biểu tượng cảm xúc</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                    </div>
                    <input type="search" placeholder="Thêm bình luận..." value={inputValue} onChange={handleEventInput} onKeyDown={handleKeyDown} ref={inputIputRef} />
                    <span ref={submitInputRef} onClick={handleSubmitValue}>Đăng</span>
                </div>
            </div>
        </div>
    );
}

export default DetailPost;