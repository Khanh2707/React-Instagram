import classNames from 'classnames/bind';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const cx = classNames.bind(styles)

function ResetPass() {
    const navigate = useNavigate()

    function handleNavigateLogin() {
        navigate('/login')
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
                Validator.isRequired('#'+cx('code'), 'Vui lòng nhập Mã xác nhận'),
            ],
            onSubmit: function(data) {
                console.log(data)
            }
        })
    }, []);

    return (
        <div className={cx("main")}>

            <form action="" method="POST" className={cx("form")} id="form-1">
                <h3 className={cx("heading")}>Quên mật khẩu</h3>
                <p className={cx("desc")}>Kết nối với mọi người qua Instagram ❤️</p>

                <div className={cx("spacer")}></div>

                <div className={cx("form-group")}>
                    <label htmlFor="email" className={cx("form-label")}>Email</label>
                    <input id="email" name="email" type="text" placeholder="VD: email@domain.com" className={cx("form-control")} />
                    <span className={cx("form-message")}></span>
                </div>

                <div className={cx("form-group")}>
                    <label htmlFor="code" className={cx("form-label")}>Mã xác nhận</label>
                    <input id="code" name="code" type="text" placeholder="VD: 123456" className={cx("form-control")} />
                    <span className={cx("send_code")}>Gửi mã</span>
                    <span className={cx("form-message")}></span>
                </div>

                <button className={cx("form-submit")}>Gửi</button>

                <div className={cx("spacer")}></div>

                <div className={cx("swap")}>
                    <span className={cx("swap__title")}>Bạn đã có tài khoản?</span>
                    <span className={cx("swap__button")} onClick={handleNavigateLogin}>Đăng nhập</span>
                </div>

            </form>

        </div>
    )
}

export default ResetPass;