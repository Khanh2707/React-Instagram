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
                        <h1>Create Account</h1>
                        <div className={cx("social-icons")}>
                            <a className={cx("icon")}><FontAwesomeIcon icon={faGooglePlusG} /></a>
                        </div>
                        <span>or use your email for registeration</span>
                        <input type="text" placeholder="Name" />
                        <input type="text" placeholder="Id" />
                        <input type="text" placeholder="Email" />
                        <input type="text" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className={cx("form-container", "sign-in")}>
                    <form>
                        <h1>Sign In</h1>
                        <div className={cx("social-icons")}>
                            <a className={cx("icon")}><FontAwesomeIcon icon={faGooglePlusG} /></a>
                        </div>
                        <span>or use your email password</span>
                        <input type="text" placeholder="Email" />
                        <input type="text" placeholder="Password" />
                        <a>Forgot Your Password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className={cx("toggle-container")}>
                    <div className={cx("toggle")}>
                        <div className={cx("toggle-panel", "toggle-left")}>
                            <h1>Welcome Back</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className={cx("hidden")} id="login" onClick={handleLogin}>Sign In</button>
                        </div>
                        <div className={cx("toggle-panel", "toggle-right")}>
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className={cx("hidden")} id="register" onClick={handleRegister}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;