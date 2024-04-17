import classNames from 'classnames/bind';
import styles from './Home.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

const cx = classNames.bind(styles)

function Home() {
    const [width, setWidth] = useState(316);
    const [widthContainerPost, setWidthContainerPost] = useState(960)

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 1263) {
                setWidth(width - (1263 - window.innerWidth) / 10)
                setWidthContainerPost(widthContainerPost - ((1263 - window.innerWidth) / 10) * 3)
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
            <div className={cx("container_post")} style={{width: `${widthContainerPost}px`}}>
                <div className={cx("post")} style={{width: `${width}px`, height: `${width}px`}}>
                    <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" alt="" />
                </div>
                <div className={cx("post")} style={{width: `${width}px`, height: `${width}px`}}>
                    <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" alt="" />
                </div>
                <div className={cx("post")} style={{width: `${width}px`, height: `${width}px`}}>
                    <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" alt="" />
                </div>
                <div className={cx("post")} style={{width: `${width}px`, height: `${width}px`}}>
                    <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" alt="" />
                </div>
                <div className={cx("post")} style={{width: `${width}px`, height: `${width}px`}}>
                    <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Home;