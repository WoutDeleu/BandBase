const cookiecontainer = document.querySelector(".cookie-container");
const cookieButton = document.querySelector(".cookie-Button");

cookieButton.addEventListener("click", () => {
    localStorage.setItem("cookieBannerDisplayed", "true");
});
