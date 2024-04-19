import classNames from 'classnames/bind';
import styles from './Login.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastMessage } from '../../Context/ToastMessageContext';
import ToastMessage from '../../Components/Layout/DefaultLayout/ToastMessage';

const cx = classNames.bind(styles)

function Login() {
    useEffect(() => {
        document.title = 'Đăng nhập';
    }, [])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isDataReady, setIsDataReady] = useState(false)

    const data = {
        account: username,
        password: password
    }

    const navigate = useNavigate()

    function handleNavigateResgister() {
        navigate('/register')
    }

    function handleNavigateResetPass() {
        navigate('/reset-pass')
    }

    useEffect(() => {
        function Validator(options) {

            function getParent(element, selector) {
                while (element.parentElement) {
                    if (element.parentElement.matches(selector)) {
                        return element.parentElement;
                    }
                    element = element.parentElement;
                }
            }
        
            var selectorRules = {}
        
            function validate(inputElement, rule) {
                var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                var errorMessage;
        
                var rules = selectorRules[rule.selector]
        
                for (var i = 0; i < rules.length; ++i) {
                    switch (inputElement.type) {
                        case 'radio':
                        case 'checkbox':
                            errorMessage = rules[i](
                                formElement.querySelector(rule.selector + ':checked')
                            );
                            break;
                        default:
                            errorMessage = rules[i](inputElement.value);
                    }
                    if (errorMessage)
                        break;
                }
        
                if (errorMessage) {
                    errorElement.innerText = errorMessage;
                    getParent(inputElement, options.formGroupSelector).classList.add(cx('invalid'));
                }
                else {
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove(cx('invalid'));
                }
        
                return !errorMessage;
            }
        
            var formElement = document.querySelector(options.form);
        
            if (formElement) {
                formElement.onsubmit = function(e) {
                    e.preventDefault();
        
                    var isFormValid = true;
        
                    options.rules.forEach(function (rule) {
                        var inputElement = formElement.querySelector(rule.selector);
                        var isValid = validate(inputElement, rule);
                        if (!isValid) {
                            isFormValid = false;
                        }
                    });
        
                    if (isFormValid) {
                        if (typeof options.onSubmit === 'function') {
        
                            var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
        
                            var formValues = Array.from(enableInputs).reduce(function(values, input) {
                                
                                switch(input.type) {
                                    case 'radio':
                                        values[input.name] = formElement.querySelector('input[name="' +input.name+ '"]:checked');
                                        break;
                                    case 'checkbox':
                                        if (!input.matches(':checked')) {
                                            values[input.name] = '';
                                            return values;
                                        }
        
                                        if (!Array.isArray(values[input.name])) {
                                            values[input.name] = [];
                                        }
        
                                        values[input.name].push(input.value);
        
                                        break;
                                    case 'file':
                                        values[input.name] = input.files;
                                        break;
                                    default:
                                        values[input.name] = input.value;
                                }
        
                                return values;
                            }, {});
        
                            options.onSubmit(formValues);
                        }
                        else {
                            formElement.submit();
                        }
                    }
        
                }
        
                options.rules.forEach(function (rule) {
        
                    if (Array.isArray(selectorRules[rule.selector])) {
                        selectorRules[rule.selector].push(rule.test);
                    }
                    else {
                        selectorRules[rule.selector] = [rule.test];
                    }
        
                    var inputElements = formElement.querySelectorAll(rule.selector);
        
                    Array.from(inputElements).forEach(function(inputElement) {
                        inputElement.onblur = function () {
                            validate(inputElement, rule)
                        }
        
                        inputElement.oninput = function() {
                            var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                            errorElement.innerText = '';
                            getParent(inputElement, options.formGroupSelector).classList.remove(cx('invalid'));
                        }
                    });
        
                });
            }
        
        }
        
        Validator.isRequired = function (selector, message) {
            return {
                selector: selector,
                test: function (value) {
                    return value ? undefined : message || 'Vui lòng nhập trường này';
                }
            }
        }
        
        Validator.isEmail = function (selector, message) {
            return {
                selector: selector,
                test: function (value) {
                    var regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
                    return regex.test(value) ? undefined : message || 'Trường này phải là email !'
                }
            }
        }
        
        Validator.minLength = function (selector, min, message) {
            return {
                selector: selector,
                test: function (value) {
                    return value.length >= min ? undefined : message || `Mật khẩu tối thiểu ${min} ký tự !`
                }
            }
        }
        
        Validator.isConfirmed = function(selector, getConfirmValue, message) {
            return {
                selector: selector,
                test: function(value) {
                    return value === getConfirmValue() ? undefined : message || 'Giá trị không chính xác'
                }
            }
        }
        
        Validator({
            form: '#'+cx('form-1'),
            formGroupSelector: '.'+cx('form-group'),
            errorSelector: '.'+cx('form-message'),
            rules: [
                Validator.isRequired('#'+cx('email'), 'Vui lòng nhập Email'),
                Validator.isRequired('#'+cx('password'), 'Vui lòng nhập Password'),
            ],
            onSubmit: function(data) {
                setUsername(data.email)
                setPassword(data.password)
                setIsDataReady(true)
            }
        });
    }, []);

    useEffect(() => {
        if (isDataReady) {
            login();
        }
    }, [isDataReady])

    function login() {
        fetch('http://localhost:8080/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Unauthenticated');
            }
            return res.json()
        })
        .then(res => {
            if (res.code === 1) {
                console.log(res)
                localStorage.setItem('token', res.result.token)

                setTimeout(() => refreshToken(), 50 * 60 * 1000)

                showToastSuccess();

                setTimeout(() => {
                    window.location.replace('/');
                }, 2000)
            }
            setIsDataReady(false);
        })
        .catch(error => {
            showToastError();
            setIsDataReady(false);
        });
    }

    function refreshToken() {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/auth/refreshToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Unauthenticated');
            }
            res.json()
        })
        .then((res) => {
            if (res.code === 1) {
                localStorage.setItem('token', res.result.token)
                setTimeout(() => refreshToken(), 50 * 60 * 1000)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    const { setToastMessage } = useToastMessage();

    function showToastSuccess() {
        setToastMessage({
            title: "Thành công!",
            message: "Chào mừng bạn đến với Instagram.",
            type: "success",
            duration: 3000
        })
    }

    function showToastError() {
        setToastMessage({
            title: "Thất bại!",
            message: "Thông tin đăng nhập không đúng.",
            type: "error",
            duration: 3000
        })
    }

    return (
        <>
        <div className={cx("main")}>

            <form action="" method="POST" className={cx("form")} id="form-1">
                <h3 className={cx("heading")}>Đăng nhập</h3>
                <p className={cx("desc")}>Kết nối với mọi người qua Instagram ❤️</p>

                <div className={cx("spacer")}></div>

                <div className={cx("form-group")}>
                    <label htmlFor="email" className={cx("form-label")}>Email</label>
                    <input id="email" name="email" type="text" placeholder="VD: email@domain.com" className={cx("form-control")} />
                    <span className={cx("form-message")}></span>
                </div>

                <div className={cx("form-group")}>
                    <label htmlFor="password" className={cx("form-label")}>Mật khẩu</label>
                    <input id="password" name="password" type="password" placeholder="Nhập mật khẩu" className={cx("form-control")} />
                    <span className={cx("form-message")}></span>
                </div>

                <button className={cx("form-submit")}>Đăng nhập</button>

                <div className={cx("spacer")}></div>

                <div className={cx("swap")}>
                    <span className={cx("swap__title")}>Bạn chưa có tài khoản?</span>
                    <span className={cx("swap__button")} onClick={handleNavigateResgister}>Đăng ký</span>
                </div>

                <div className={cx("or")}>hoặc</div>

                <span className={cx("swap__button")} onClick={handleNavigateResetPass}>Quên mật khẩu?</span>

            </form>

        </div>
        <ToastMessage />
        </>
    )
}

export default Login;