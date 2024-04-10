// import { appearPageMessage } from './appearPageMessage.js';
// import { appearPageProfile } from './appearPageProfile.js';
// import { appearPageNotification } from './appearPageNotification.js';
// import { appearPageSeeMore } from './appearPageSeeMore.js';
import { changeIconWhenActive } from './changeIconWhenActive.js';

import classNames from 'classnames/bind';
import styles from '../Sidebar.module.css';

export function checkNavigationActive() {
    const cx = classNames.bind(styles)

    const navigation__items = document.querySelectorAll('.'+cx('navigation__item'));

    const content = document.querySelector('#content');

    var previousActiveElement = document.querySelector('.'+cx('navigation__item-profile'));

    const classActive = cx('active')

    var previousActiveElements = [];
    let activeLevel2 = false;

    function getItemLevel(item) {
        return parseInt(item.dataset.level);
    }

    navigation__items.forEach(function(item) {
        item.addEventListener('click', function(event) {
            if (activeLevel2 === false) {
                solve(event, item);
            }
            else
                activeLevel2 = false;
        });
    });

    function solve(event, item) {
        Array.from(navigation__items).forEach(function(navItem) {
            if (navItem.classList.contains(classActive) && previousActiveElement !== item && 'level' in navItem.dataset && 'level' in item.dataset) {
                if (!previousActiveElements.includes(navItem))
                    previousActiveElements.push(navItem);
            }
        });
        previousActiveElement = item;
        if (previousActiveElements.length > 0) {
            removeActiveByLevel(previousActiveElements, item);
        }
    }

    function removeActiveByLevel(previousActiveElements, item) {
        if (getItemLevel(item) === 1) {
            previousActiveElements.forEach(value => {
                if (getItemLevel(value) === 1 && item !== value) {
                    value.classList.remove(classActive);
                }
                else {
                    activeLevel2 = true;
                    value.click();
                }
            });
            previousActiveElements.length = 0;
        }
        if (getItemLevel(item) === 2) {
            previousActiveElements.forEach(value => {
                if (getItemLevel(value) > 1) {
                    if (value !== item) {
                        activeLevel2 = true;
                        value.click();
                    }
                }
            });
            previousActiveElements.splice(1);
        }
        if (getItemLevel(item) === 3) {
            previousActiveElements.forEach(value => {
                if (getItemLevel(value) > 2) {
                    if (value !== item) {
                        activeLevel2 = true;
                        value.click();
                    }
                }
            });
            previousActiveElements.splice(2);
        }
        if (getItemLevel(item) === 4) {
            previousActiveElements.forEach(value => {
                if (getItemLevel(value) > 3) {
                    if (value !== item) {
                        activeLevel2 = true;
                        value.click();
                    }
                }
            });
            previousActiveElements.splice(2);
        }
        // item.classList.add(classActive)
    }

    document.addEventListener('click', function(event) {
        const classNavigation__itemSee_more = cx('navigation__item-see_more')
        navigation__items.forEach(value => {
            if (content.contains(event.target)) {
                if (getItemLevel(value) === 2) {
                    if (value.classList.contains(classActive)) {
                        activeLevel2 = true;
                        value.click();
                    }
                }
            }
            if (!(event.target.classList.contains(classNavigation__itemSee_more) || event.target.closest('.'+classNavigation__itemSee_more))) {
                if (value.classList.contains(classNavigation__itemSee_more) && value.classList.contains(classActive)) {
                    activeLevel2 = true;
                    value.click();
                }
            }
        });
        changeIconWhenActive();
    });


    // appearPageMessage();
    // appearPageNotification();
    // appearPageProfile();
    // appearPageSeeMore();
    // clickInputSearch();

    changeIconWhenActive();
}