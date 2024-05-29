import { useContext } from 'react';

import classNames from 'classnames/bind';

import styles from './OptionsPost.module.css';

import { useModalTwo } from '~/Context/ModalTwoContext';
import { useToastMessage } from '~/Context/ToastMessageContext';
import { useModal } from '~/Context/ModalContext';
import { AppContext } from '~/Context/AppContext';
import * as http from '~/utils/http';

const cx = classNames.bind(styles)

function OptionsPost({ idPost, idUser, idUserOther }) {
    const {
        isReloadPostProfile, setIsReloadPostProfile,
        isReloadQuantityPost, setIsReloadQuantityPost
    } = useContext(AppContext)

    const { closeModal } = useModal();
    const { closeModalTwo } = useModalTwo();

    const handleDeletePost = async () => {
        try {
            await http.del(`api/post_notifications/all_by_action/LIKE/${idPost}`)
            await http.del(`api/post_notifications/all_by_action/COMMENT/${idPost}`)
            await http.del(`api/user_comment_post/all_by_post/${idPost}`)
            await http.del(`api/user_like_post/all_by_post/${idPost}`)
            await http.del(`api/media_posts/all_by_post/${idPost}`)
            await http.del(`api/posts/${idPost}`)
            showToastSuccess('Xóa bài viết thành công.')
            setIsReloadPostProfile(true)
            setIsReloadQuantityPost(true)
            closeModalTwo()
            closeModal()
        } catch (error) {

        }
    }

    const { setToastMessage } = useToastMessage();

    function showToastSuccess(message) {
        setToastMessage({
            title: "Thành công!",
            message: message ? message : "Update thông tin thành công.",
            type: "success",
            duration: 3000
        })
    }

    function showToastError(message) {
        setToastMessage({
            title: "Thất bại!",
            message: message ? message : "Có lỗi.",
            type: "error",
            duration: 3000
        })
    }

    return (
        <div className={cx('options_comment__container')}>
            <div className={cx('options_comment__item', 'options_comment__item_red')} onClick={handleDeletePost}>
                <span>Xóa</span>
            </div>
            <div className={cx('options_comment__item')} onClick={closeModalTwo}>
                <span>Hủy</span>
            </div>
        </div>
    );
}

export default OptionsPost;