import classNames from 'classnames/bind';
import styles from './ToastMessage.module.css';
import { useToastMessage } from '../../../../Context/ToastMessageContext';
import { useEffect } from 'react';

const cx = classNames.bind(styles)

function ToastMessage() {
    const { toastMessage, setToastMessage } = useToastMessage();
    // Toast function
    function toast({ title = "", message = "", type = "info", duration = 3000 }) {
        const main = document.querySelector("."+cx("toast-message"));
        if (main) {
            const toast = document.createElement("div");

            // Auto remove toast
            const autoRemoveId = setTimeout(function () {
                main.removeChild(toast);
            }, duration + 1000);

            // Remove toast when clicked
            toast.onclick = function (e) {
                if (e.target.closest("."+cx("toast__close"))) {
                    main.removeChild(toast);
                    clearTimeout(autoRemoveId);
                }
            };

            const icons = {
                success: "fas fa-check-circle",
                info: "fas fa-info-circle",
                warning: "fas fa-exclamation-circle",
                error: "fas fa-exclamation-circle"
            };
            const icon = icons[type];
            const delay = (duration / 1000).toFixed(2);

            toast.classList.add(cx("toast"), `${cx(`toast--${type}`)}`);
            toast.style.animation = `${cx("slideInLeft")} ease .3s, ${cx("toastFadeOut")} linear 1s ${delay}s forwards`;

            toast.innerHTML = `
                    <div class=${cx("toast__icon")}>
                        <i class="${icon}"></i>
                    </div>
                    <div class=${cx("toast__body")}>
                        <h3 class=${cx("toast__title")}>${title}</h3>
                        <p class=${cx("toast__msg")}>${message}</p>
                    </div>
                    <div class=${cx("toast__close")}>
                        <i class="fas fa-times"></i>
                    </div>
                `;
            main.appendChild(toast);

            setToastMessage(null);
        }
    }

    useEffect(() => {
        if (toastMessage) {
            toast(toastMessage);
        }
    }, [toastMessage]);

    return (
        <div className={cx("toast-message")}></div>
    )
}

export default ToastMessage;