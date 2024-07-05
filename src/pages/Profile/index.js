import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import defaultAvatar from "~/assets/images/default_avatar.jpg";

import classNames from "classnames/bind";

import styles from "./Profile.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faComment,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import DetailPost from "~/pages/DetailPost";
import OptionsAvatar from "~/Components/OptionsAvatar";
import { useModal } from "~/Context/ModalContext";
import { AppContext } from "~/Context/AppContext";
import { useToastMessage } from "~/Context/ToastMessageContext";
import * as http from "~/utils/http";

const cx = classNames.bind(styles);

function Profile() {
  const { setIsLoadingLine } = useContext(AppContext);
  useEffect(() => {
    setIsLoadingLine(true);
  }, []);

  const navigate = useNavigate();
  //
  useEffect(() => {
    setTimeout(() => {
      setIsLoadingLine(false);
    }, 500);
  }, []);

  const {
    idUser,
    nameUser,
    descriptionUser,
    avatar,
    setAvatar,

    isReloadPostProfile,
    setIsReloadPostProfile,
    isReloadQuantityPost,
    setIsReloadQuantityPost,
  } = useContext(AppContext);

  const { "id-user": userId } = useParams();

  useEffect(() => {
    document.title = `${userId} | Instagram`;
  }, []);

  const [idUserOther, setIdUserOther] = useState(null);
  const [nameUserOther, setNameUserOther] = useState(null);
  const [descriptionUserOther, setDescriptionUserOther] = useState(null);
  const [avatarUserOther, setAvatarUserOther] = useState(null);

  const getUserById = () => {
    http.get(`api/users/${userId}`).then((res) => {
      setIdUserOther(res.result.idUser);
      setNameUserOther(res.result.name);
      setDescriptionUserOther(res.result.description);
      setAvatarUserOther(res.result.avatar);
    });
  };

  useEffect(() => {
    if (idUser !== userId) {
      getUserById();
    }
  }, [userId]);

  function handleEditProfile() {
    navigate("/accounts/edit");
  }

  const [width, setWidth] = useState(
    window.innerWidth <= 1263 ? 309 - (1263 - window.innerWidth) / 10 : 309
  );
  const [widthTabBar, setWidthTabBar] = useState(
    window.innerWidth <= 1263
      ? 935 - ((1263 - window.innerWidth) / 10) * 3
      : 935
  );

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1263) {
        setWidth(309 - (1263 - window.innerWidth) / 10);
        setWidthTabBar(935 - ((1263 - window.innerWidth) / 10) * 3);
      } else {
        setWidth(309);
        setWidthTabBar(935);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const inputSetAvatarRef = useRef();

  function handleClickSetAvatar() {
    inputSetAvatarRef.current.click();
  }

  function handleSetAvatar(e) {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);

    fetch(`http://localhost:8080/api/users/avatar/${idUser}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setAvatar(data.result.avatar);
        showToastSuccess();
      })
      .catch((error) => {
        showToastError();
        console.error("Error uploading avatar:", error);
      });
  }

  const { openModal } = useModal();

  const handleOpenOptionsAvatar = () => {
    // Truyền Component B vào modal
    openModal(<OptionsAvatar />);
  };

  const handleOpenDetailPost = (
    idPost,
    idUser,
    avatar,
    idUserOther,
    captionPost,
    timeCreatePost
  ) => {
    openModal(
      <DetailPost
        idPost={idPost}
        idUser={idUser}
        avatar={avatar}
        idUserOther={idUserOther}
        captionPost={captionPost}
        timeCreatePost={timeCreatePost}
      />
    );
  };

  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = () => {
    http.get(`api/posts/by_user/${idUser}`).then((res) => {
      console.log(res);
      setAllPosts(res.result);
    });
  };

  useEffect(() => {
    if (idUser !== "") getAllPosts();
  }, [idUser]);

  useEffect(() => {
    if (isReloadPostProfile) getAllPosts();
    setIsReloadPostProfile(false);
  }, [isReloadPostProfile]);

  const [allPostsOtherUser, setAllPostsOtherUser] = useState();

  const getAllPostsByOtherUser = () => {
    http.get(`api/posts/by_user/${userId}`).then((res) => {
      console.log(res);
      setAllPostsOtherUser(res.result);
    });
  };

  useEffect(() => {
    getAllPostsByOtherUser();
  }, []);

  const [quantityLike, setQuantityLike] = useState(0);
  const [quantityComment, setQuantityComment] = useState(0);

  const getCountUserLikeAndComment = (idPost) => {
    http.get(`api/user_like_post/count_user/${idPost}`).then((res) => {
      setQuantityLike(res.result);
    });

    http.get(`api/user_comment_post/count_user/${idPost}`).then((res) => {
      setQuantityComment(res.result);
    });
  };

  const [quantityPost, setQuantityPost] = useState(0);

  const getCountPostByUser = () => {
    http.get(`api/posts/count_post/${userId}`).then((res) => {
      setQuantityPost(res.result);
      setIsReloadQuantityPost(false);
    });
  };

  useEffect(() => {
    console.log("abc");
    getCountPostByUser();
  }, [isReloadQuantityPost]);

  const { setToastMessage } = useToastMessage();

  function showToastSuccess(message) {
    setToastMessage({
      title: "Thành công!",
      message: message ? message : "Update avatar thành công.",
      type: "success",
      duration: 3000,
    });
  }

  function showToastError(message) {
    setToastMessage({
      title: "Thất bại!",
      message: message ? message : "Có lỗi.",
      type: "error",
      duration: 3000,
    });
  }

  return (
    <div className={cx("main", "page-profile")}>
      <div className={cx("info_user")} style={{ width: `${widthTabBar}px` }}>
        <div className={cx("info_user-img_container")}>
          <div className={cx("info_user-img")}>
            {userId === idUser ? (
              avatar === "" || avatar === null ? (
                <>
                  <img src={defaultAvatar} alt='' />
                  <div
                    className={cx("info_user-img__iconSetImage")}
                    onClick={handleClickSetAvatar}
                  >
                    <svg
                      viewBox='0 0 24 24'
                      width='44'
                      height='44'
                      fill='currentColor'
                      className='x10l6tqk xtzzx4i xwa60dl x11lhmoz'
                    >
                      <path d='M12 9.652a3.54 3.54 0 1 0 3.54 3.539A3.543 3.543 0 0 0 12 9.65zm6.59-5.187h-.52a1.107 1.107 0 0 1-1.032-.762 3.103 3.103 0 0 0-3.127-1.961H10.09a3.103 3.103 0 0 0-3.127 1.96 1.107 1.107 0 0 1-1.032.763h-.52A4.414 4.414 0 0 0 1 8.874v9.092a4.413 4.413 0 0 0 4.408 4.408h13.184A4.413 4.413 0 0 0 23 17.966V8.874a4.414 4.414 0 0 0-4.41-4.41zM12 18.73a5.54 5.54 0 1 1 5.54-5.54A5.545 5.545 0 0 1 12 18.73z'></path>
                    </svg>
                  </div>
                  <input
                    type='file'
                    onChange={handleSetAvatar}
                    ref={inputSetAvatarRef}
                    style={{ display: "none" }}
                  />
                </>
              ) : (
                <img src={avatar} alt='' onClick={handleOpenOptionsAvatar} />
              )
            ) : (
              <img
                src={avatarUserOther === null ? defaultAvatar : avatarUserOther}
                alt=''
              />
            )}
          </div>
        </div>
        <div className={cx("info_user-text")}>
          <div className={cx("info_user-text__line1")}>
            <div className={cx("info_user-text__name")}>
              {userId !== idUser ? idUserOther : idUser}
            </div>
            <div
              className={cx("info_user-text__edit_profile")}
              onClick={handleEditProfile}
              style={{ display: userId === idUser ? "block" : "none" }}
            >
              Chỉnh sửa trang cá nhân
            </div>
            <div
              className={cx("info_user-text__edit_profile")}
              style={{ display: userId !== idUser ? "block" : "none" }}
              onClick={() => navigate(`/message/${idUserOther}`)}
            >
              Nhắn tin
            </div>
          </div>
          <div className={cx("info_user-text__line2")}>
            <div
              className={cx(
                "info_user-text__amount",
                "info_user-text__amount_post"
              )}
            >
              <span
                className={cx(
                  "info_user-text__amount-number",
                  "info_user-text__amount_post-number"
                )}
              >
                {quantityPost}
              </span>
              <span
                className={cx(
                  "info_user-text__amount-post",
                  "info_user-text__amount_post-post"
                )}
              >
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
              {userId !== idUser ? nameUserOther : nameUser}
            </div>
          </div>
          <div className={cx("info_user-text__line4")}>
            <div className={cx("info_user-text__description")}>
              {userId !== idUser ? descriptionUserOther : descriptionUser}
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
      <div
        className={cx("navbar_post_page_profile")}
        style={{ width: `${widthTabBar}px` }}
      >
        <div
          className={cx(
            "navbar_post_page_profile__tab",
            "navbar_post_page_profile__tab-post",
            "active"
          )}
        >
          <div className={cx("navbar_post_page_profile__tab__icon")}>
            <svg
              aria-label=''
              className={cx("x1lliihq x1n2onr6 x5n08af")}
              fill='currentColor'
              height='12'
              role='img'
              viewBox='0 0 24 24'
              width='12'
            >
              <title></title>
              <rect
                fill='none'
                height='18'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                width='18'
                x='3'
                y='3'
              ></rect>
              <line
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='9.015'
                x2='9.015'
                y1='3'
                y2='21'
              ></line>
              <line
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='14.985'
                x2='14.985'
                y1='3'
                y2='21'
              ></line>
              <line
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='21'
                x2='3'
                y1='9.015'
                y2='9.015'
              ></line>
              <line
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='21'
                x2='3'
                y1='14.985'
                y2='14.985'
              ></line>
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
        <div
          className={cx("content_post_container__pane", "active")}
          style={{ width: `${widthTabBar + 4}px` }}
        >
          {userId === idUser ? (
            Array.isArray(allPosts) && allPosts.length > 0 ? (
              allPosts.map((res) => (
                <div
                  key={res.idPost}
                  className={cx("post_no_detail")}
                  style={{ width: `${width}px`, height: `${width}px` }}
                  onClick={() =>
                    handleOpenDetailPost(
                      res.idPost,
                      idUser,
                      avatar,
                      undefined,
                      res.caption,
                      res.dateTimeCreate
                    )
                  }
                >
                  {Array.isArray(res.mediaPosts) &&
                    res.mediaPosts.length > 0 &&
                    res.mediaPosts[0].url && (
                      <img src={res.mediaPosts[0].url} alt='' />
                    )}
                  <div
                    className={cx("post_no_detail__hover")}
                    style={{ width: `${width}px`, height: `${width}px` }}
                    onMouseEnter={() => getCountUserLikeAndComment(res.idPost)}
                  >
                    <div
                      className={cx(
                        "post_no_detail__hover__li",
                        "post_no_detail__hover__li-heart"
                      )}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                      <span>{quantityLike}</span>
                    </div>
                    <div
                      className={cx(
                        "post_no_detail__hover__li",
                        "post_no_detail__hover__li-comment"
                      )}
                    >
                      <FontAwesomeIcon icon={faComment} />
                      <span>{quantityComment}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={cx("no_post")}>
                <div className={cx("no_post__icon")}>
                  <FontAwesomeIcon icon={faCamera} />
                </div>
                <div className={cx("no_post__text")}>
                  <span>Chưa có bài viết</span>
                </div>
              </div>
            )
          ) : Array.isArray(allPostsOtherUser) &&
            allPostsOtherUser.length > 0 ? (
            allPostsOtherUser.map((res) => (
              <div
                key={res.idPost}
                className={cx("post_no_detail")}
                style={{ width: `${width}px`, height: `${width}px` }}
                onClick={() =>
                  handleOpenDetailPost(
                    res.idPost,
                    idUser,
                    avatarUserOther,
                    idUserOther,
                    res.caption,
                    res.dateTimeCreate
                  )
                }
              >
                {Array.isArray(res.mediaPosts) &&
                  res.mediaPosts.length > 0 &&
                  res.mediaPosts[0].url && (
                    <img src={res.mediaPosts[0].url} alt='' />
                  )}
                <div
                  className={cx("post_no_detail__hover")}
                  style={{ width: `${width}px`, height: `${width}px` }}
                  onMouseEnter={() => getCountUserLikeAndComment(res.idPost)}
                >
                  <div
                    className={cx(
                      "post_no_detail__hover__li",
                      "post_no_detail__hover__li-heart"
                    )}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                    <span>{quantityLike}</span>
                  </div>
                  <div
                    className={cx(
                      "post_no_detail__hover__li",
                      "post_no_detail__hover__li-comment"
                    )}
                  >
                    <FontAwesomeIcon icon={faComment} />
                    <span>{quantityComment}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={cx("no_post")}>
              <div className={cx("no_post__icon")}>
                <FontAwesomeIcon icon={faCamera} />
              </div>
              <div className={cx("no_post__text")}>
                <span>Chưa có bài viết</span>
              </div>
            </div>
          )}
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
  );
}

export default Profile;
