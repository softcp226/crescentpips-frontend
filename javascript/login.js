


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
  return "";
  // window.location.href = "/login.html";
};





function setCookie(user, token) {
  // alert("called")
  console.log(user);
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  // document.cookie=`email=${email} ; ${expires}`
  document.cookie = `user=${user} ; ${expires}`;
  document.cookie = `token=${token} ; ${expires}`;
  // let navigate;
  // const params = new URLSearchParams(window.location.search);
  // for (const param of params) {
  //   navigate = param[0];
  // }
  // if (navigate) return window.location.replace(navigate);
  // window.location.replace("/dashboard.html");
}




function setCookie_01(data) {
  // alert("called")
  // console.log(user);
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  // document.cookie=`email=${email} ; ${expires}`
  document.cookie = `user=${data.user} ; ${expires}`;
  document.cookie = `token_01=${data.token} ; ${expires}`;
  // let navigate;
  // const params = new URLSearchParams(window.location.search)
  // for (const param of params) {
  //     navigate=param[0]
  // }
  // if(navigate)return window.location.replace(navigate)
  if(data.country =="Kenya")return window.location.replace("/ke/complete-registration.html");
  window.location.replace("/complete-registration.html");
}

const loginUser = async (email, password) => {
  try {
    document.querySelector("#login").innerHTML = "proccessing...";
    const response = await fetch(
      "https://crescentpips-backend.glitch.me/api/user/login",
      // "http://localhost:5000/api/user/login",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#login").innerHTML = "try again";
      return;
    }
    document.querySelector("#login").innerHTML = "success";
    setCookie(result.message.user, result.token);
    // result.message.user_last_login =='real_account' ?window.location.replace("/dashboard.html"):window.location.replace("/demo")
    // let demo=getCookie("demo")
    // demo == 'true' ? window.location.replace("/demo"): window.location.replace("/dashboard.html")
console.log(result)
if ( result.message.user_last_login =='real_account') {
  result.message.account_type =="KES" ? window.location.replace("/ke/dashboard.html"):window.location.replace("/dashboard.html")
} else {
  window.location.replace("/demo")
}

  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#login").innerHTML = "try again";
  }
};

const getReferral = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

const registerUser = async (email, phone_number, country) => {
  try {
    document.querySelector("#next").innerHTML = "proccessing...";
    const response = await fetch(
      "https://crescentpips-backend.glitch.me/api/newuser/register",
      // "http://localhost:5000/api/newuser/register",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          phone_number,
          country,
          referral: getReferral() || "",
        }),
      },
    );
    const result = await response.json();
    
    if (result.error) {
      document.querySelector(".errmessage2").innerHTML = result.errMessage;
      document.querySelector("#next").innerHTML = "try again";
      return;
    }
    document.querySelector("#next").innerHTML = "success";
    return setCookie_01({user:result.message.user,country:result.message.country,token:result.token});
  } catch (err) {
    document.querySelector(".errmessage2").innerHTML = err.message;
    document.querySelector("#next").innerHTML = "try again";
  }
};
//response gotten

// loginUser("email@gmail.com","password")

// function getCookie(cname) {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == ' ') {
//           c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//           return c.substring(name.length, c.length);
//       }
//   }
//   return "";
// }

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#login").onclick = () => {
    event.preventDefault();
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    if (!email.value)
      return (document.querySelector(".errMessage").innerHTML =
        "Email is required");
    if (!password.value)
      return (document.querySelector(".errMessage").innerHTML =
        "Password is required");
    if (password.value.length < 8)
      return (document.querySelector(".errMessage").innerHTML =
        "Password must be greater than 8 characters");

    document.querySelector(".errMessage").innerHTML = "";

    loginUser(email.value, password.value);
  };

  document.querySelector("#next").onclick = () => {
    let errorColor = "2px solid red";
    event.preventDefault();
    const email = document.querySelector("#registerEmail");
    const phoneNumber = document.querySelector("#registerNumber");
    const country = document.querySelector("select");
    if (!email.value) return (email.style.border = errorColor);
    if (!phoneNumber.value) return (phoneNumber.style.border = errorColor);
    if (!country.value) return (country.style.border = errorColor);

    document.querySelector(".errmessage2").innerHTML = "";

    document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "is_active=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  
    registerUser(email.value, phoneNumber.value, country.value);
  };

  document.querySelectorAll("input").forEach((input) => {
    document.querySelector(".errmessage2").innerHTML = "";
    input.onkeyup = () => (input.style.border = "0.1px solid #fff");
  });
  document.querySelector("select").onchange = () =>
    (document.querySelector("select").style.border = "0.1px solid #fff");
});

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("login");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

// signInButton.addEventListener("click", () => {
//   container.classList.remove("right-panel-active");
// });

// document.addEventListener("DOMContentLoaded",()=>{
document.querySelector(".ghost").onclick = () =>
  container.classList.remove("right-panel-active");

// })


// (() => {
//   document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//   document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//   document.cookie = "is_active=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
// //  alert("logged out")
// })()
