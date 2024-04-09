export function appearPageSearch() {
    const navigationSearch = document.querySelector('.navigation__item-search');
    const pageSearch = document.querySelector('.page-search');

    window.addEventListener('resize', function() {
        if (this.window.innerWidth <= 766)
            pageSearch.style.display = 'none';
    });

    navigationSearch.addEventListener('click', function() {
        solveActive();
    });
    function solveActive() {
        pageSearch.style.display = 'block';
        pageSearch.classList.toggle('animationAppearPageSearch');
        document.querySelector('.navigation__item-search').classList.toggle('active');
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