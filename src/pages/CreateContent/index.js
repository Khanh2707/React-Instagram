import { useContext, useRef, useState } from 'react';

import classNames from 'classnames/bind';

import styles from './CreateContent.module.css';

import ImageCropper from '~/Components/ImageCropper';
import { AppContext } from '~/Context/AppContext';
import { useToastMessage } from '~/Context/ToastMessageContext';
import { useModal } from '~/Context/ModalContext';
import * as http from '~/utils/http';

const cx = classNames.bind(styles)

function CreateContent() {
    const {
        idUser,
        avatar,

        isReloadPostProfile, setIsReloadPostProfile,
        isReloadQuantityPost, setIsReloadQuantityPost
    } = useContext(AppContext)

    const { closeModal } = useModal();

    const [typeMedia, setTypeMedia] = useState()

    const [image, setImage] = useState('')

    const inputSelectMediaRef = useRef();

    function handleClickSelectMedia() {
        inputSelectMediaRef.current.click();
    }

    const modal__create_contentRef = useRef()
    const crop_imageRef = useRef()
    const confirm_postRef = useRef()

    function handleSelectMedia(e) {
        if (e.target.files[0].type.includes('image')) {
            setTypeMedia('image')
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function(e) {
                setImage(reader.result)
            }
            modal__create_contentRef.current.classList.remove(cx('active'))
            crop_imageRef.current.classList.add(cx('active'))
        }
        else if (e.target.files[0].type.includes('video')) {
            setTypeMedia('video')
        }
    }

    const backToSelectMedia = () => {
        setImage("");

        modal__create_contentRef.current.classList.add(cx('active'))
        crop_imageRef.current.classList.remove(cx('active'))
    }

    const crop_image__image__set_ratio__selectRef = useRef();

    const handleClickSetRatioIcon = () => {
        crop_image__image__set_ratio__selectRef.current.classList.toggle(cx('active'))
    }

    const [selectedRatio, setSelectedRatio] = useState(1 / 1);

    const handleSelectRatio = (ratio) => {
        setSelectedRatio(ratio);
    }

    const [isConfirmCrop, setIsConfirmCrop] = useState(false);

    const [imgAfterCrop, setImgAfterCrop] = useState('');

    const handleConfirmEdit = () => {
        if (typeMedia === 'image')
            setIsConfirmCrop(true)
    }

    const onCropDone = (imgCroppedArea) => {
        if (typeMedia === 'image') {
            const canvasEle = document.createElement('canvas');
            canvasEle.width = imgCroppedArea.width;
            canvasEle.height = imgCroppedArea.height;

            const context = canvasEle.getContext('2d');

            let imageObj1 = new Image();
            imageObj1.src = image;
            imageObj1.onload = function() {
                context.drawImage(
                    imageObj1,
                    imgCroppedArea.x,
                    imgCroppedArea.y,
                    imgCroppedArea.width,
                    imgCroppedArea.height,
                    0,
                    0,
                    imgCroppedArea.width,
                    imgCroppedArea.height
                );

                const dataURL = canvasEle.toDataURL('image/jpeg');

                setImgAfterCrop(dataURL);
            }

            crop_imageRef.current.classList.remove(cx('active'))
            confirm_postRef.current.classList.add(cx('active'))
        }

        setIsConfirmCrop(false)
    }

    const backToCropImage = () => {
        crop_imageRef.current.classList.add(cx('active'))
        confirm_postRef.current.classList.remove(cx('active'))
    }

    const [valueTextarea, setValueTextarea] = useState('')

    const handleLimitInput = (e) => {
        if (e.target.value.length <= 255) {
            setValueTextarea(e.target.value)
        }
    }

    const handlePreventInput = (e) => {
        if (e.target.value.length >= 255 && e.key !== "Backspace") {
            e.preventDefault();
        }
    }

    function generateRandomFileName() {
        // Tạo một chuỗi ngẫu nhiên từ timestamp để đảm bảo tên tệp không trùng lặp
        const randomString = Math.random().toString(36).substring(7);
        // Kết hợp chuỗi ngẫu nhiên với một hậu tố để tạo tên tệp
        const fileName = `image_${randomString}`;
        return fileName;
    }
    
    function dataURLtoFile(dataURL) {
        // Tạo một chuỗi base64 từ data URL bằng cách loại bỏ tiền tố (data:image/jpeg;base64,) và giải mã
        const base64String = atob(dataURL.split(',')[1]);
        const byteArray = new Uint8Array(base64String.length);
        // Tạo một mảng byte từ chuỗi base64
        for (let i = 0; i < base64String.length; i++) {
            byteArray[i] = base64String.charCodeAt(i);
        }
        // Tạo một blob từ mảng byte
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        // Tạo một tên tệp ngẫu nhiên
        const randomFileName = generateRandomFileName();
        // Chuyển blob thành file bằng cách tạo một File mới với tên tệp ngẫu nhiên
        const file = new File([blob], randomFileName, { type: 'image/jpeg' });
        return file;
    }

    const handleSubmitPost = () => {
        http.post('api/posts', {
            caption: valueTextarea,
            user: idUser
        })
        .then((res) => {
            return res.result;
        })
        .then((res) => {
            const formData = new FormData();
            const file = dataURLtoFile(imgAfterCrop);
            formData.append('fileMedia', file);
            formData.append('type', 'image');
            formData.append('post', res.idPost);
            http.post(`api/media_posts`, formData)
                .then((data) => {
                    setIsReloadPostProfile(true)
                    setIsReloadQuantityPost(true)
                    confirm_postRef.current.classList.remove(cx('active'))
                    closeModal()
                    showToastSuccess('Đăng tải bài viết thành công.')
                })
                .catch((error) => {
                    showToastError('Đăng tải bài viết thất bại.')
                });
        })
    }

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
        <>
        <div className={cx("modal__create_content", "active")} ref={modal__create_contentRef}>
            <div className={cx("modal__create_content-title")}>
                <span>Tạo bài viết mới</span>
            </div>
            <div className={cx("modal__create_content-body")}>
                <div className={cx("modal__create_content-body__svg")}>
                    <svg aria-label="Biểu tượng thể hiện file phương tiện, chẳng hạn như hình ảnh hoặc video"
                        className={cx("x1lliihq x1n2onr6 x5n08af")} fill="currentColor" height="77" role="img"
                        viewBox="0 0 97.6 77.3" width="96">
                        <title>Biểu tượng thể hiện file phương tiện, chẳng hạn như hình ảnh hoặc video</title>
                        <path
                            d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                            fill="currentColor"></path>
                        <path
                            d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                            fill="currentColor"></path>
                        <path
                            d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                            fill="currentColor"></path>
                    </svg>
                </div>
                <div className={cx("modal__create_content-body__text")}>
                    <span>Chọn ảnh ở đây</span>
                </div>
                <div className={cx("modal__create_content-body__button_choose_file")}>
                    <button onClick={handleClickSelectMedia} ><span>Chọn từ máy tính</span></button>
                </div>
                <input type='file' onChange={handleSelectMedia} ref={inputSelectMediaRef} style={{display: 'none'}} />
            </div>
        </div>
        <div className={cx("crop_image")} ref={crop_imageRef}>
            <div className={cx("crop_image__header")}>
                <div className={cx("crop_image__back")} onClick={backToSelectMedia}>
                    <svg aria-label="Quay lại" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Quay lại</title><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>
                </div>
                <div className={cx("crop_image__title")}>
                    <span>Cắt</span>
                </div>
                <div className={cx("crop_image__next")} onClick={handleConfirmEdit}>
                    <span>Tiếp</span>
                </div>
            </div>
            <div className={cx("crop_image__image")}>
                <ImageCropper
                    image={image}
                    onCropDone={onCropDone}
                    selectedRatio={selectedRatio}
                    isConfirmCrop={isConfirmCrop}
                />
                <div className={cx("crop_image__image__set_ratio")}>
                    <div className={cx("crop_image__image__set_ratio__select")} ref={crop_image__image__set_ratio__selectRef}>
                        <div className={cx("crop_image__image__set_ratio__select__item")} onClick={() => handleSelectRatio(1 / 1)}>
                            <div className={cx("crop_image__image__set_ratio__select__item__text")}>
                                <span>1:1</span>
                            </div>
                            <div className={cx("crop_image__image__set_ratio__select__item__icon")}>
                                <svg aria-label="Biểu tượng cắt theo khung hình vuông" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Biểu tượng cắt theo khung hình vuông</title><path d="M19 23H5a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h14a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM5 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h14a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"></path></svg>
                            </div>
                        </div>
                        <div className={cx("crop_image__image__set_ratio__select__item")} onClick={() => handleSelectRatio(4 / 5)}>
                            <div className={cx("crop_image__image__set_ratio__select__item__text")}>
                                <span>4:5</span>
                            </div>
                            <div className={cx("crop_image__image__set_ratio__select__item__icon")}>
                                <svg aria-label="Biểu tượng cắt theo khung hình dọc" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Biểu tượng cắt theo khung hình dọc</title><path d="M16 23H8a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h8a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM8 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h8a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"></path></svg>
                            </div>
                        </div>
                        <div className={cx("crop_image__image__set_ratio__select__item")} onClick={() => handleSelectRatio(16 / 9)}>
                            <div className={cx("crop_image__image__set_ratio__select__item__text")}>
                                <span>16:9</span>
                            </div>
                            <div className={cx("crop_image__image__set_ratio__select__item__icon")}>
                                <svg aria-label="Biểu tượng cắt theo khung hình ngang" className="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Biểu tượng cắt theo khung hình ngang</title><path d="M19 20H5a4.004 4.004 0 0 1-4-4V8a4.004 4.004 0 0 1 4-4h14a4.004 4.004 0 0 1 4 4v8a4.004 4.004 0 0 1-4 4ZM5 6a2.002 2.002 0 0 0-2 2v8a2.002 2.002 0 0 0 2 2h14a2.002 2.002 0 0 0 2-2V8a2.002 2.002 0 0 0-2-2Z"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div className={cx("crop_image__image__set_ratio__icon")} onClick={handleClickSetRatioIcon}>
                        <svg aria-label="Chọn kích thước cắt" className="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Chọn kích thước cắt</title><path d="M10 20H4v-6a1 1 0 0 0-2 0v7a1 1 0 0 0 1 1h7a1 1 0 0 0 0-2ZM20.999 2H14a1 1 0 0 0 0 2h5.999v6a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1Z"></path></svg>
                    </div>
                </div>
            </div>
        </div>
        <div className={cx("confirm_post")} ref={confirm_postRef}>
            <div className={cx("confirm_post__header")}>
                <div className={cx("confirm_post__back")} onClick={backToCropImage}>
                    <svg aria-label="Quay lại" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Quay lại</title><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>
                </div>
                <div className={cx("confirm_post__title")}>
                    <span>Tạo bài viết mới</span>
                </div>
                <div className={cx("confirm_post__submit")} onClick={handleSubmitPost}>
                    <span>Chia sẻ</span>
                </div>
            </div>
            <div className={cx("confirm_post__body")}>
                <div className={cx("confirm_post__image")}>
                    <img src={imgAfterCrop} alt='' />
                </div>
                <div className={cx("confirm_post__info_post")}>
                    <div className={cx("confirm_post__user")}>
                        <div className={cx("confirm_post__user__image")}>
                            <img src={avatar} alt='' />
                        </div>
                        <div className={cx("confirm_post__user__id")}>
                            <span>{idUser}</span>
                        </div>
                    </div>
                    <div className={cx("confirm_post__caption")}>
                        <div className={cx("confirm_post__caption__textarea")}>
                            <textarea name="" id="" cols="30" rows="7" placeholder='Viết chú thích...' onChange={handleLimitInput} onKeyDown={handlePreventInput} ></textarea>
                        </div>
                        <div className={cx("confirm_post__caption__emoji_and_limit_textarea")}>
                            <div className={cx("confirm_post__caption__emoji")} style={{display: 'none'}}>
                                <svg aria-label="Biểu tượng cảm xúc" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Biểu tượng cảm xúc</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                            </div>
                            <div className={cx("confirm_post__caption__limit_textarea")}>
                                <span>{valueTextarea.length ? valueTextarea.length : 0}/255</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CreateContent;