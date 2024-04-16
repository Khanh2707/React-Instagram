import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles)

function Login() {
    const idContainerRef = useRef()

    function handleLogin() {
        const container = idContainerRef.current;
        container.classList.remove(cx('active'));
    }

    function handleRegister() {
        const container = idContainerRef.current;
        container.classList.add(cx('active'));
    }

    return (
        <div className={cx("background")}>
            <div className={cx("container")} id="container" ref={idContainerRef}>
                <div className={cx("form-container", "sign-up")}>
                    <form>
                        <h1>Tạo tài khoản</h1>
                        <div className={cx("social-icons")}>
                            <a className={cx("icon")}><FontAwesomeIcon icon={faGooglePlusG} /></a>
                        </div>
                        {/* <span>or use your email for registeration</span> */}
                        <input type="text" placeholder="Tên người dùng" />
                        <input type="text" placeholder="Id người dùng" />
                        <input type="text" placeholder="Email" />
                        <input type="text" placeholder="Password" />
                        <button>Đăng ký</button>
                    </form>
                </div>
                <div className={cx("form-container", "sign-in")}>
                    <form>
                        <h1>Đăng nhập</h1>
                        <div className={cx("social-icons")}>
                            <a className={cx("icon")}><FontAwesomeIcon icon={faGooglePlusG} /></a>
                        </div>
                        {/* <span>or use your email password</span> */}
                        <input type="text" placeholder="Email" />
                        <input type="text" placeholder="Password" />
                        <a>Quên mật khẩu?</a>
                        <button>Đăng nhập</button>
                    </form>
                </div>
                <div className={cx("toggle-container")}>
                    <div className={cx("toggle")}>
                        <div className={cx("toggle-panel", "toggle-left")}>
                            <h1>Chào mừng trở lại</h1>
                            <p>Đăng nhập để truy cập Instagram</p>
                            <button className={cx("hidden")} id="login" onClick={handleLogin}>Đăng nhập</button>
                        </div>
                        <div className={cx("toggle-panel", "toggle-right")}>
                            <h1>Chào bạn!</h1>
                            <p>Đăng ký để sử dụng Instagram</p>
                            <button className={cx("hidden")} id="register" onClick={handleRegister}>Đăng ký</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;