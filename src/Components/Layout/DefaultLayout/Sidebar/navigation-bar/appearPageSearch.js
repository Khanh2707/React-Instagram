import classNames from 'classnames/bind';
import styles from '../Sidebar.module.css';

export function appearPageSearch() {
    const cx = classNames.bind(styles)

    const navigationSearch = document.querySelector('.'+cx('navigation__item-search_account'));
    const pageSearch = document.querySelector('.'+cx('page-search'));

    navigationSearch.addEventListener('click', function() {
        solveActive();
    });
    function solveActive() {
        pageSearch.style.display = 'block';
        pageSearch.classList.toggle(cx('animationAppearPageSearch'));
        navigationSearch.classList.toggle(cx('active'));
            const navigation__itemSpan = document.querySelectorAll('.'+cx('navigation__item-span'));
            navigation__itemSpan.forEach((item) => {
                item.classList.toggle(cx('active'));
            });
            const navigation_bar = document.querySelector('.'+cx('navigation_bar'));
            document.querySelector('.'+cx('navigation_bar')).classList.toggle(cx('active'));
            document.querySelector('.'+cx('logo-web-tablet')).classList.toggle(cx('active'));
            document.querySelector('.'+cx('logo-web-pc')).classList.toggle(cx('active'));
            document.querySelector('.'+cx('logo-web')).classList.toggle(cx('active'));
            if (window.innerWidth > 1263) {
                if (navigation_bar.classList.contains(cx('active'))) {
                    navigation_bar.classList.remove(cx('animationDisappearSideBar'));
                    navigation_bar.classList.add(cx('animationAppearSideBar'));
                }
                else {
                    navigation_bar.classList.remove(cx('animationAppearSideBar'));
                    navigation_bar.classList.add(cx('animationDisappearSideBar'));
                }
            }
        // const navigationMessage = document.querySelector('.navigation__item-message');
        // if (!navigationMessage.classList.contains('active')) {
        //     const navigation__itemSpan = document.querySelectorAll('.navigation__item-span');
        //     navigation__itemSpan.forEach((item) => {
        //         item.classList.toggle('active');
        //     });
        //     const navigation_bar = document.querySelector('.navigation_bar');
        //     document.querySelector('.navigation_bar').classList.toggle('active');
        //     document.querySelector('.logo-web-tablet').classList.toggle('active');
        //     document.querySelector('.logo-web-pc').classList.toggle('active');
        //     document.querySelector('.logo-web').classList.toggle('active');
        //     if (window.innerWidth > 1263) {
        //         if (navigation_bar.classList.contains('active')) {
        //             navigation_bar.classList.remove('animationDisappearSideBar');
        //             navigation_bar.classList.add('animationAppearSideBar');
        //         }
        //         else {
        //             navigation_bar.classList.remove('animationAppearSideBar');
        //             navigation_bar.classList.add('animationDisappearSideBar');
        //         }
        //     }
        // }
    }
}