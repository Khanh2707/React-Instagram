import { useContext, useState, useEffect } from 'react';

import classNames from 'classnames/bind';

import styles from './Home.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';

import DetailPostInExplore from '~/pages/DetailPostInExplore';
import { AppContext } from '~/Context/AppContext';
import { useModal } from '~/Context/ModalContext';
import * as http from '~/utils/http';

const cx = classNames.bind(styles)

function Home() {

    const {
        idUser
    } = useContext(AppContext)
    
    const { setIsLoadingLine } = useContext(AppContext);

    useEffect(() => {
        setIsLoadingLine(true);
    }, [])
    //
    useEffect(() => {
        setTimeout(() => {
            setIsLoadingLine(false);
        }, 500)
    }, [])

    useEffect(() => {
        document.title = 'Instagram';
    }, [])

    function refreshToken() {
        console.log('abc')
        const token = localStorage.getItem('token');
        http.post('auth/refreshToken', { token })
        .then((res) => {
            localStorage.setItem('token', res.result.token)
            setTimeout(() => {
                refreshToken();
            }, 50 * 60 * 1000)
        })
        .catch((error) => {
            
        })
    }
    useEffect(() => {
        setTimeout(() => {
            refreshToken()
        }, 50 * 60 * 1000)
    }, [])
    

    const [width, setWidth] = useState(window.innerWidth <= 1263 ? 316 - (1263 - window.innerWidth) / 10 : 316);
    const [widthContainerPost, setWidthContainerPost] = useState(window.innerWidth <= 1263 ? 960 - ((1263 - window.innerWidth) / 10) * 3 : 960)

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 1263) {
                setWidth(316 - (1263 - window.innerWidth) / 10)
                setWidthContainerPost(960 - ((1263 - window.innerWidth) / 10) * 3)
            }
            else {
                setWidth(316)
                setWidthContainerPost(960)
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const [allPostRandomExcludingMyUser, setAllPostRandomExcludingMyUser] = useState([]);

    const getAllPostRandomExcludingMyUser = () => {
        http.get(`api/posts/random_excluding_user/${idUser}`)
        .then((res) => {
            console.log(res.result);
            setAllPostRandomExcludingMyUser(res.result)
        })
    }

    useEffect(() => {
        if (idUser !== '')
            getAllPostRandomExcludingMyUser()
    }, [idUser])


    const [quantityLike, setQuantityLike] = useState(0)
    const [quantityComment, setQuantityComment] = useState(0)

    const getCountUserLikeAndComment = (idPost) => {
        http.get(`api/user_like_post/count_user/${idPost}`)
        .then((res) => {
            setQuantityLike(res.result)
        })

        http.get(`api/user_comment_post/count_user/${idPost}`)
        .then((res) => {
            setQuantityComment(res.result)
        })
    }

    const { openModal } = useModal();

    const handleOpenDetailPost = (idUser, idPost, caption, dateTimeCreate, url) => {
        openModal(<DetailPostInExplore idUser={idUser} idPost={idPost} caption={caption} dateTimeCreate={dateTimeCreate} url={url} />)
    }

    return (
        <div className={cx("main", "page-home")}>
            <div className={cx("container_post")} style={{ width: `${widthContainerPost}px` }}>
                {allPostRandomExcludingMyUser.map((res) => {
                    return (
                        <div key={res.idPost} className={cx("post_no_detail")} style={{ width: `${width}px`, height: `${width}px` }} onClick={() => handleOpenDetailPost(idUser, res.idPost, res.caption, res.dateTimeCreate, res.mediaPosts[0].url)}>
                            <img src={res.mediaPosts[0].url} alt="" />
                            <div className={cx("post_no_detail__hover")} style={{ width: `${width}px`, height: `${width}px` }} onMouseEnter={() => getCountUserLikeAndComment(res.idPost)}>
                                <div className={cx("post_no_detail__hover__li", "post_no_detail__hover__li-heart")}>
                                    <FontAwesomeIcon icon={faHeart} />
                                    <span>{quantityLike}</span>
                                </div>
                                <div className={cx("post_no_detail__hover__li", "post_no_detail__hover__li-comment")}>
                                    <FontAwesomeIcon icon={faComment} />
                                    <span>{quantityComment}</span>
                                </div>
                            </div>
                            <svg aria-label="Quay vòng" className="x1lliihq x1n2onr6 x1hfr7tm xq3z1fi" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Quay vòng</title><path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path></svg>
                        </div>
                    )
                })}
                
            </div>
        </div>
    )
}

export default Home;