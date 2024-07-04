export function appearPageSeeMore() {
  const navigationSeeMore = document.querySelector(
    ".navigation__item-see_more"
  );
  const pageSeeMore = document.querySelector(".page-see_more");

  window.addEventListener("resize", function () {
    if (this.window.innerWidth <= 766) pageSeeMore.style.display = "none";
  });

  navigationSeeMore.addEventListener("click", function () {
    navigationSeeMore.classList.toggle("active");
    if (pageSeeMore.classList.contains("active")) {
      pageSeeMore.classList.remove("active");
    } else {
      pageSeeMore.classList.add("active");
    }
  });

  // document.addEventListener('click', function(event) {
  //     console.log(pageSeeMore.classList.contains('active'))
  //     if (pageSeeMore.classList.contains('active')) {
  //         if (event.target !== pageSeeMore) {
  //             navigationSeeMore.click();
  //         }
  //     }
  // });
}
