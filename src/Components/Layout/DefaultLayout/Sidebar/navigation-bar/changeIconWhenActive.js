import classNames from 'classnames/bind';
import styles from '../Sidebar.module.css';

export function changeIconWhenActive() {
    const cx = classNames.bind(styles)

    const navigation__items = document.querySelectorAll('.'+cx('navigation__item'));

    let noActiveElement = null;
    let activeElement = null;

    const classSearch_input_in_page_search = cx('search_input_in_page_search')
    const classNavigation__itemProfile = cx('navigation__item-profile')

    const classActive = cx('active')

    const classNavigation__itemLogoNo_active = cx('navigation__item-logo--no_active')
    const navigation__itemLogoActive = cx('navigation__item-logo--active')

    navigation__items.forEach(function(item) {
        if (!(item.classList.contains(classSearch_input_in_page_search) || item.classList.contains(classNavigation__itemProfile))) {
            if (item.classList.contains(classActive)) {
                noActiveElement = item.querySelector('.'+classNavigation__itemLogoNo_active);
                activeElement = item.querySelector('.'+navigation__itemLogoActive);
                noActiveElement.style.display = 'none';
                activeElement.style.display = 'block';
            }
            else {
                noActiveElement = item.querySelector('.'+classNavigation__itemLogoNo_active);
                activeElement = item.querySelector('.'+navigation__itemLogoActive);
                noActiveElement.style.display = 'block';
                activeElement.style.display = 'none';
            }
        }
    });
}