export function appearPageNotification() {
    const navigationNotification = document.querySelector('.navigation__item-notification');
    const pageNotification = document.querySelector('.page-notification');

    window.addEventListener('resize', function() {
        if (this.window.innerWidth <= 766)
            pageNotification.style.display = 'none';
    });

    navigationNotification.addEventListener('click', function() {
        solveActive();
    });
    function solveActive() {
        pageNotification.style.display = 'block';
        pageNotification.classList.toggle('animationAppearPageSearch');
        document.querySelector('.navigation__item-notification').classList.toggle('active');
        const navigationMessage = document.querySelector('.navigation__item-message');
        if (!navigationMessage.classList.contains('active')) {
            const navigation__itemSpan = document.querySelectorAll('.navigation__item-span');
            navigation__itemSpan.forEach((item) => {
                item.classList.toggle('active');
            });
            const navigation_bar = document.querySelector('.navigation_bar');
            document.querySelector('.navigation_bar').classList.toggle('active');
            document.querySelector('.logo-web-tablet').classList.toggle('active');
            document.querySelector('.logo-web-pc').classList.toggle('active');
            document.querySelector('.logo-web').classList.toggle('active');
            if (window.innerWidth > 1263) {
                if (navigation_bar.classList.contains('active')) {
                    navigation_bar.classList.remove('animationDisappearSideBar');
                    navigation_bar.classList.add('animationAppearSideBar');
                }
                else {
                    navigation_bar.classList.remove('animationAppearSideBar');
                    navigation_bar.classList.add('animationDisappearSideBar');
                }
            }
        }
    }
}