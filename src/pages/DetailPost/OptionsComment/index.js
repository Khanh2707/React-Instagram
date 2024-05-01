import classNames from 'classnames/bind';
import styles from './OptionsComment.module.css';
import { useModalTwo } from '../../../Context/ModalTwoContext';
import * as http from '~/utils/http';

const cx = classNames.bind(styles)

function OptionsComment({ idUser, idCommentPost, idPost, getAllUserCommentPostByPost }) {
    const { closeModalTwo } = useModalTwo();

    const handleDeleteComment = () => {
        http.del(`api/user_comment_post/${idUser}/${idCommentPost}/${idPost}`)
        .then((res) => {
            http.del(`api/comment_post/${idCommentPost}`)
            .then((res) => {
                getAllUserCommentPostByPost()
                closeModalTwo()
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