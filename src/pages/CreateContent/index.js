import classNames from 'classnames/bind';
import styles from './CreateContent.module.css';
import { useRef, useState } from 'react';
import ImageCropper from '../ImageCropper';

const cx = classNames.bind(styles)

function CreateContent() {
    const [image, setImage] = useState('')

    const inputSelectMediaRef = useRef();

    function handleClickSelectMedia() {
        inputSelectMediaRef.current.click();
    }

    const modal__create_contentRef = useRef()
    const crop_imageRef = useRef()

    function handleSelectMedia(e) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function(e) {
                setImage(reader.result)
            }
        }

        modal__create_contentRef.current.classList.remove(cx('active'))
        crop_imageRef.current.classList.add(cx('active'))
    }

    const backToSelectMedia = () => {
        setCurrentPage("choose-img");
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

    const [currentPage, setCurrentPage] = useState("choose-img");

    const onCropDone = (imgCroppedArea) => {
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

            setCurrentPage("img-cropped")
        }

        setIsConfirmCrop(false)
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
                    <span>Kéo ảnh và video vào đây</span>
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
                <div className={cx("crop_image__next")} onClick={() => setIsConfirmCrop(true)}>
                    <span>Tiếp</span>
                </div>
            </div>
            <div className={cx("crop_image__image")}>
            {currentPage === "choose-img" ? (
                <>
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
                </>
                ) : (
                    <img src={imgAfterCrop} alt='' />
                )}
            </div>
        </div>
        </>
    )
}

export default CreateContent;