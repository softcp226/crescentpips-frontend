// document.querySelector("#successImg").style.display="block"

// let message;
// const params = new URLSearchParams(window.location.search);
// for (const param of params) {
//   message = param[0];
// }

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#successImg").style.display = "block";

  setTimeout(() => {
    document.querySelector("#successImg").style.display = "none";

    window.location.replace("/ke/dashboard.html");
  }, 1700);
});
