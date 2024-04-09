import classNames from 'classnames/bind';
import styles from '../Sidebar.module.css';

export function changeIconWhenActive() {
    const cx = classNames.bind(styles)

    const navigation__items = document.querySelectorAll('.'+cx('navigation__item'));
    if (navigation__items === null)
        navigation__items = document.querySelectorAll('.navigation__item');

    let noActiveElement = null;
    let activeElement = null;

    const classSearch_input_in_page_search = document.querySelector('.search_input_in_page_search') === null ? cx('search_input_in_page_search') : 'search_input_in_page_search'
    const classNavigation__itemProfile = document.querySelector('.navigation__item-profile') === null ? cx('navigation__item-profile') : 'navigation__item-profile'

    const classActive = cx('active')

    navigation__items.forEach(function(item) {
        if (!(item.classList.contains(classSearch_input_in_page_search) || item.classList.contains(classNavigation__itemProfile))) {
            if (item.classList.contains(classActive)) {
                let classNavigation__itemLogoNo_active = item.querySelector('.navigation__item-logo--no_active') === null ? cx('navigation__item-logo--no_active') : 'navigation__item-logo--no_active'
                let navigation__itemLogoActive = item.querySelector('.navigation__item-logo--active') === null ? cx('navigation__item-logo--active') : 'navigation__item-logo--active'
                noActiveElement = item.querySelector('.'+classNavigation__itemLogoNo_active);
                activeElement = item.querySelector('.'+navigation__itemLogoActive);
                noActiveElement.style.display = 'none';
                activeElement.style.display = 'block';
            }
            else {
                let classNavigation__itemLogoNo_active = item.querySelector('.navigation__item-logo--no_active') === null ? cx('navigation__item-logo--no_active') : 'navigation__item-logo--no_active'
                let navigation__itemLogoActive = item.querySelector('.navigation__item-logo--active') === null ? cx('navigation__item-logo--active') : 'navigation__item-logo--active'
                noActiveElement = item.querySelector('.'+classNavigation__itemLogoNo_active);
                activeElement = item.querySelector('.'+navigation__itemLogoActive);
                noActiveElement.style.display = 'block';
                activeElement.style.display = 'none';
            }
        }
    });
}