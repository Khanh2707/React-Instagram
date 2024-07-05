import { useEffect, useState } from "react";

import classNames from "classnames/bind";

import styles from "./ListUserLikePost.module.css";

import defaultAvatar from "~/assets/images/default_avatar.jpg";
import * as http from "~/utils/http";

const cx = classNames.bind(styles);

function ListUserLikePost({ idPost }) {
  const [listUserLikePostByPost, setListUserLikePostByPost] = useState([]);

  const getAllUserLikePostByPost = () => {
    http.get(`api/user_like_post/by_post/${idPost}`).then((res) => {
      console.log(res.result);
      setListUserLikePostByPost(res.result);
    });
  };

  useEffect(() => {
    getAllUserLikePostByPost();
  }, []);

  return (
    <div className={cx("list_user_like_post__container")}>
      <div className={cx("list_user_like_post__title")}>
        <span>Lượt thích</span>
      </div>
      <div className={cx("list_user_like_post__list__container")}>
        {listUserLikePostByPost.map((res) => {
          return (
            <div
              key={res.user.idUser}
              className={cx("list_user_like_post__list__item")}
            >
              <div
                className={cx("list_user_like_post__list__item__avatar")}
                onClick={() => (window.location.href = `/${res.user.idUser}`)}
              >
                <img
                  src={
                    res.user.avatar === null || res.user.avatar === ""
                      ? defaultAvatar
                      : res.user.avatar
                  }
                  alt=''
                />
              </div>
              <div
                className={cx("list_user_like_post__list__item__id_and_name")}
              >
                <div
                  className={cx("list_user_like_post__list__item__id")}
                  onClick={() => (window.location.href = `/${res.user.idUser}`)}
                >
                  <span>{res.user.idUser}</span>
                </div>
                <div className={cx("list_user_like_post__list__item__name")}>
                  <span>{res.user.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListUserLikePost;
