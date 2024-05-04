import classNames from 'classnames/bind';
import styles from './OptionsComment.module.css';
import { useModalTwo } from '../../../Context/ModalTwoContext';
import * as http from '~/utils/http';
import { useContext } from 'react';
import { AppContext } from '../../../Context/AppContext';

const cx = classNames.bind(styles)

function OptionsComment({ idUser, idUserOther, idCommentPost, idPost, getAllUserCommentPostByPost }) {
    const { closeModalTwo } = useModalTwo();

    const {
        sendPostNotification
    } = useContext(AppContext)

    const handleDeleteComment = () => {
        http.del(`api/user_comment_post/${idUser}/${idCommentPost}/${idPost}`)
        .then((res) => {
            http.del(`api/post_notifications/by_action_comment/COMMENT/${idPost}/${idUser}/${idUserOther}/${idCommentPost}`)
            .then((res) => {
                http.del(`api/comment_post/${idCommentPost}`)
                .then((res) => {
                    getAllUserCommentPostByPost()
                    closeModalTwo()
                })

                sendPostNotification(idUser, idUserOther)
            })
        })
    }

    return (
        <div className={cx('options_comment__container')}>
            <div className={cx('options_comment__item', 'options_comment__item_red')} onClick={handleDeleteComment}>
                <span>Xóa comment</span>
            </div>
            <div className={cx('options_comment__item')} onClick={closeModalTwo}>
                <span>Hủy</span>
            </div>
        </div>
    );
}

export default OptionsComment;