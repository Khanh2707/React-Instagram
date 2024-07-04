export function appearModalCreateContent() {
  const navigationCreateContent = document.querySelector(
    ".navigation__item-create_content"
  );

  navigationCreateContent.addEventListener("click", function () {
    $(".modal__body").load(
      "modal/modal-navigationBar/modalCreateContent.html",
      function () {
        const modal = document.querySelector(".modal");
        const modal__overlay = document.querySelector(".modal__overlay");
        const modal__xmark = document.querySelector(".modal__xmark");

        const modal__create_content = document.querySelector(
          ".modal__create_content"
        );

        modal.style.display = "flex";
        navigationCreateContent.classList.add("active");
        modal__create_content.style.display = "block";

        modal__overlay.addEventListener("click", function (event) {
          navigationCreateContent.classList.remove("active");
          modal.style.display = "none";
        });

        modal__xmark.style.display = "block";
        modal__xmark.addEventListener("click", function (event) {
          navigationCreateContent.classList.remove("active");
          modal.style.display = "none";
        });
      }
    );
  });
}
