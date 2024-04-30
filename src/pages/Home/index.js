import classNames from 'classnames/bind';
import styles from './Home.module.css';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../Context/AppContext';
import * as http from '~/utils/http';
import DetailPost from '../DetailPost';
import { useModal } from '../../Context/ModalContext';

const cx = classNames.bind(styles)

function Home() {
    
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
        document.title = 'Trang chủ';
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

    return (
        <div className={cx("main", "page-home")}>
            <div className={cx("container_post")} style={{ width: `${widthContainerPost}px` }}>
                <div className={cx("post_no_detail")} style={{ width: `${width}px`, height: `${width}px` }}>
                    <img src="https://scontent.cdninstagram.com/v/t39.30808-6/436953663_979711753513935_5112126198241591345_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4yMDQ4eDIwNDguc2RyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=103&_nc_ohc=3Ar00JOD2jMAb5Onf2u&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzM0NjcyNjAzMzIzNzQ3Mjg1OQ%3D%3D.2-ccb7-5&oh=00_AfBNeukkopLa6jDm4j0p2QRztT50WpqRvEzkbk-xqUAhRA&oe=662AB9B6&_nc_sid=10d13b"
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
                    <svg aria-label="Quay vòng" className="x1lliihq x1n2onr6 x1hfr7tm xq3z1fi" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Quay vòng</title><path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path></svg>
                </div>
                <div className={cx("post_no_detail")} style={{ width: `${width}px`, height: `${width}px` }}>
                    <img src="https://scontent.cdninstagram.com/v/t39.30808-6/436410326_979711756847268_984637446133736974_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4yMDQ4eDIwNDguc2RyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=ZQZYXVAoOXgAb5wWPsU&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzM0NjcyNjAzMzA0NDMyNzU4MA%3D%3D.2-ccb7-5&oh=00_AfD2Ox1q9zW9jFk3bVruT3-SYq4DgjGdFclekxKFoiubQw&oe=662ADF12&_nc_sid=10d13b"
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
                    <svg aria-label="Quay vòng" className="x1lliihq x1n2onr6 x1hfr7tm xq3z1fi" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Quay vòng</title><path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path></svg>
                </div>
                <div className={cx("post_no_detail")} style={{ width: `${width}px`, height: `${width}px` }}>
                    <img src="https://scontent.cdninstagram.com/v/t39.30808-6/436488725_979711760180601_620628453334508027_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4yMDQ4eDIwNDguc2RyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=109&_nc_ohc=fqwIX34a_vEAb7PJm1f&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzM0NjcyNjAzMDU2MTQyMjYyMg%3D%3D.2-ccb7-5&oh=00_AfDUsy1iNMQnJm6g1f1sjlU-Tik9d5hfZXrkOXj5Z4NOtw&oe=662AB0EF&_nc_sid=10d13b"
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
                    <svg aria-label="Quay vòng" className="x1lliihq x1n2onr6 x1hfr7tm xq3z1fi" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Quay vòng</title><path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path></svg>
                </div>
                <div className={cx("post_no_detail")} style={{ width: `${width}px`, height: `${width}px` }}>
                    <img src="https://scontent.cdninstagram.com/v/t39.30808-6/437465079_979711750180602_7772554014564847961_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4yMDQ4eDIwNDguc2RyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&_nc_ohc=C3IQd5bYt7MAb4LD_FB&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzM0NjcyNjAzMjI0NzM5MTg3MA%3D%3D.2-ccb7-5&oh=00_AfAuTAuXaQPDPE7rlkhQo0zM6pNS6fwvoVTG6EZLhHmMdA&oe=662ACFAA&_nc_sid=10d13b"
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
                    <svg aria-label="Quay vòng" className="x1lliihq x1n2onr6 x1hfr7tm xq3z1fi" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Quay vòng</title><path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path></svg>
                </div>
                <div className={cx("post_no_detail")} style={{ width: `${width}px`, height: `${width}px` }}>
                    <img src="https://scontent.cdninstagram.com/v/t39.30808-6/425421557_18076555306445889_2247950475582502195_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3NjEuc2RyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=109&_nc_ohc=0tfVE-Wc3AcAb6evh7N&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzI5NDU2NTk4NTEzODk1ODc4Ng%3D%3D.2-ccb7-5&oh=00_AfDnb8Yd5hIzisnc7Sr4d9MplwaYANZTyBVvOmerz3aKww&oe=6628BC1B&_nc_sid=10d13b"
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
                    <svg aria-label="Quay vòng" className="x1lliihq x1n2onr6 x1hfr7tm xq3z1fi" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Quay vòng</title><path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path></svg>
                </div>
                <div className={cx("post_no_detail")} style={{ width: `${width}px`, height: `${width}px` }}>
                    <img src="https://scontent.cdninstagram.com/v/t39.30808-6/362693522_18054846265445889_4726347187284896745_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTEuc2RyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=109&_nc_ohc=jog0hVcTuLIAb7vM8E_&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzE2MzM5NDczNzI3Nzg1NjE2Ng%3D%3D.2-ccb7-5&oh=00_AfBdK6NW6hbC-pQ3tbvuQ4C_n8y7GIPz6gce26lnGjKfxA&oe=662AAAB2&_nc_sid=10d13b"
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
                    <svg aria-label="Quay vòng" className="x1lliihq x1n2onr6 x1hfr7tm xq3z1fi" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Quay vòng</title><path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path></svg>
                </div>
            </div>
        </div>
    )
}

export default Home;