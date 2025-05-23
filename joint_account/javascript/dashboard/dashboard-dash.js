const setText = (user) => {
  document.querySelectorAll("#user_passport").forEach((passport) => {
    passport.src = user.passport;
  });
  document.querySelector("#final_balance").innerHTML = `$${user.final_balance
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
  document.querySelector("#profit_loss").innerHTML = `$${user.profit_loss
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
  document.querySelector(
    "#active_investment"
  ).innerHTML = `$${user.active_investment
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;

  document.querySelector("#referral_bonus").innerHTML = `$${user.referral_bonus
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
  // console.log("user", user);
};

// .toString()
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  // return "";
  window.location.href = "login.html";
};

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  try {
    const response = await fetch(
      "https://crescentpips-backend.glitch.me/api/user/find",
      // "http://localhost:5000/api/user/find",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      alert(result.errMessage);
    } else {
      result.message.last_login =='demo_account' ?window.location.replace("/vip"):""

      setText(result.message);
    }
  } catch (error) {
    console.log(error)
    alert(error.message);
  }
})();
