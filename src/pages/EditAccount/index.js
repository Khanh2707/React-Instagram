import { useContext, useRef, useState, useEffect } from 'react';

import classNames from 'classnames/bind';

import styles from './EditAccount.module.css';

import OptionsAvatar from '~/Components/OptionsAvatar';
import { AppContext } from '~/Context/AppContext';
import { useModal } from '~/Context/ModalContext';
import defaultAvatar from '~/assets/images/default_avatar.jpg'
import { useToastMessage } from '~/Context/ToastMessageContext';
import * as http from '~/utils/http';

const cx = classNames.bind(styles)

function EditAccount() {
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
        document.title = 'Chỉnh sửa trang cá nhân | Instagram';
    }, [])

    const {
        idUser,
        nameUser, setNameUser,
        descriptionUser, setDescriptionUser,
        genderUser, setGenderUser,
        avatar, setAvatar,
    } = useContext(AppContext)

    const inputSetAvatarRef = useRef();

    function handleClickSetAvatar() {
        inputSetAvatarRef.current.click();
    }

    function handleSetAvatar(e) {
        const file = e.target.files[0]

        const formData = new FormData();
        formData.append('avatar', file);

        fetch(`http://localhost:8080/api/users/avatar/${idUser}`, {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            setAvatar(data.result.avatar)
            showToastSuccess("Update avatar thành công.")
        })
        .catch((error) => {
            showToastError("Có lỗi khi thiết lập ảnh đại diện.")
            console.error('Error uploading avatar:', error);
        });
    }

    const { openModal } = useModal();

    const handleOpenOptionsAvatar = () => {
        // Truyền Component B vào modal
        openModal(<OptionsAvatar />);
    };

    
    const updateInfoUser = async (data) => {
        try {
            const res = await http.put(`api/users/${idUser}`, data)
            setNameUser(res.result.name)
            setDescriptionUser(res.result.description)
            setGenderUser(res.result.gender)
            showToastSuccess("Update thông tin thành công.")
        } catch (error) {

        }
    }


    const [genderUserCopy, setGenderUserCopy] = useState(genderUser);
    useEffect(() => {
        setGenderUserCopy(genderUser);
    }, [genderUser])

    function handleCheckedGender(value) {
        setGenderUserCopy(value)
    }

    const edit_account__description__text_area__current_numberRef = useRef();
    function handleOnChangeDescription(e) {
        edit_account__description__text_area__current_numberRef.current.innerText = e.target.value.length
    }


    const edit_account__gender__input_options__list_radioRef = useRef();
    //
    function handleAppearOptionsGender() {
        if (edit_account__gender__input_options__list_radioRef.current.style.display === 'none')
            edit_account__gender__input_options__list_radioRef.current.style.display = 'block';
        else
            edit_account__gender__input_options__list_radioRef.current.style.display = 'none';
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
                formElement.onsubmit = function (e) {
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

                            var formValues = Array.from(enableInputs).reduce(function (values, input) {

                                switch (input.type) {
                                    case 'radio':
                                        values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
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

                    Array.from(inputElements).forEach(function (inputElement) {
                        inputElement.onblur = function () {
                            validate(inputElement, rule)
                        }

                        inputElement.oninput = function () {
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

        Validator.maxLength = function (selector, max, message) {
            return {
                selector: selector,
                test: function (value) {
                    return value.length <= max ? undefined : message || `Tiểu sử không được vượt quá ${max} ký tự !`
                }
            }
        }

        Validator.isConfirmed = function (selector, getConfirmValue, message) {
            return {
                selector: selector,
                test: function (value) {
                    return value === getConfirmValue() ? undefined : message || 'Giá trị không chính xác'
                }
            }
        }

        Validator({
            form: '#' + cx('form-1'),
            formGroupSelector: '.' + cx('form-group'),
            errorSelector: '.' + cx('form-message'),
            rules: [
                Validator.isRequired('#' + cx('name'), 'Vui lòng nhập Tên người dùng'),
            ],
            onSubmit: function (data) {
                console.log(data)
                updateInfoUser(data)
            }
        })
    }, [idUser]);

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
        <div className={cx("edit_account__background")}>
            <div className={cx("edit_account__container")}>
                <div className={cx("edit_account__title")}>
                    <span>Chỉnh sửa trang cá nhân</span>
                </div>
                <form action="" method="POST" className={cx("form")} id="form-1">
                    <div className={cx("edit_account__set_avatar")}>
                        <div className={cx("edit_account__set_avatar__avatar_and_name_and_id")}>
                            <div className={cx("edit_account__set_avatar__avatar")}>
                                {avatar === '' || avatar === null ? (
                                    <>
                                        <img src={defaultAvatar} alt='' />
                                        <input type='file' onChange={handleSetAvatar} ref={inputSetAvatarRef} style={{display: 'none'}} />
                                    </>
                                ) : (
                                    <img src={avatar} alt='' onClick={handleOpenOptionsAvatar} />
                                )}
                            </div>
                            <div className={cx("edit_account__set_avatar__name_and_id")}>
                                <span className={cx("edit_account__set_avatar__name")}>{idUser}</span>
                                <span className={cx("edit_account__set_avatar__id")}>{nameUser}</span>
                            </div>
                        </div>
                        <div className={cx("edit_account__set_avatar__set_avatar_button")} onClick={handleOpenOptionsAvatar}>
                            Đổi ảnh
                        </div>
                    </div>
                    <div className={cx("form-group")}>
                        <label htmlFor="name" className={cx("form-label")}>Tên người dùng</label>
                        <input id="name" name="name" type="text" placeholder="Tên người dùng" className={cx("form-control")} defaultValue={nameUser} />
                        <span className={cx("form-message")}></span>
                    </div>
                    <div className={cx("edit_account__description")}>
                        <div className={cx("edit_account__description__title")}>
                            <span>Tiểu sử</span>
                        </div>
                        <div className={cx("edit_account__description__text_area", "form-group")}>
                            <textarea name="description" id="description" cols="30" rows="10" placeholder='Tiểu sử' className={cx("form-control")} onChange={handleOnChangeDescription} defaultValue={descriptionUser}></textarea>
                            <div className={cx("edit_account__description__text_area__limit_text")}>
                                <span className={cx("edit_account__description__text_area__current_number")} ref={edit_account__description__text_area__current_numberRef}>{descriptionUser === null ? 0 : descriptionUser.length}</span>
                                <span className={cx("edit_account__description__text_area__slash")}>/</span>
                                <span className={cx("edit_account__description__text_area__limit_number")}>150</span>
                            </div>
                            <span className={cx("form-message")}></span>
                        </div>
                    </div>
                    <div className={cx("edit_account__gender")}>
                        <div className={cx("edit_account__gender__title")}>
                            <span>Giới tính</span>
                        </div>
                        <div className={cx("edit_account__gender__input_options")} onClick={handleAppearOptionsGender}>
                            <div className={cx("edit_account__gender__input_options__value_selected")}>
                            <span>
                                {genderUserCopy === true && "Nam"}
                                {genderUserCopy === false && "Nữ"}
                                {genderUserCopy === null && "Không muốn tiết lộ"}
                            </span>
                            </div>
                            <div className={cx("edit_account__gender__input_options__icon_select")}>
                                <svg aria-label="Mũi tên xuống" className="x1lliihq x1n2onr6 x10xgr34" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Mũi tên xuống</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
                            </div>
                            <div className={cx("form-group", "edit_account__gender__input_options__list_radio")} ref={edit_account__gender__input_options__list_radioRef}>
                                <div className={cx("edit_account__gender__input_options__radio_item")}>
                                    <span>Nam</span>
                                    <input name='gender' type='radio' value='true' checked={genderUserCopy === true} onChange={() => handleCheckedGender(true)} className={cx("form-control")} />
                                </div>
                                <div className={cx("edit_account__gender__input_options__radio_item")}>
                                    <span>Nữ</span>
                                    <input name='gender' type='radio' value='false' checked={genderUserCopy === false} onChange={() => handleCheckedGender(false)} className={cx("form-control")} />
                                </div>
                                <div className={cx("edit_account__gender__input_options__radio_item")}>
                                    <span>Không muốn tiết lộ</span>
                                    <input name='gender' type='radio' value='null' checked={genderUserCopy === null} onChange={() => handleCheckedGender(null)} className={cx("form-control")} />
                                </div>
                            </div>
                        </div>
                        <div className={cx("edit_account__gender__description")}>
                            <span>Thông tin này sẽ không xuất hiện trên trang cá nhân công khai của bạn</span>
                        </div>
                    </div>

                    <div className={cx("edit_account__submit")}>
                        <button className={cx("edit_account__submit__submit_button", "form-submit", "active")}>
                            Gửi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditAccount;