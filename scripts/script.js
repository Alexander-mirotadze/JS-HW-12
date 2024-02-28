// ! searchBar
let unhidden_search_bar = document.getElementById("search-bar");
let hidden_search_bar = document.getElementById("search-icon");

hidden_search_bar.addEventListener("click", function () {
  unhidden_search_bar.classList.toggle("unhidden-search");
});
// ! burgerBar
let burger_bar = document.getElementById("burger-bar");
let navigation_bar = document.getElementById("nav-bar");

burger_bar.addEventListener("click", function () {
  navigation_bar.classList.toggle("nav-bar-burger");
});
// ! userr from server
const activeUserdiv = document.getElementById("active-User");
const usersPage = document.getElementById("UsersPageDiv");
const usersWraper = document.getElementById("users-wraper");
const closeIcon = document.getElementById("closeIcon");
const input = document.getElementById("filter-input");
const ulUsers = document.createElement("ul");
const listOfUsers = [];


activeUserdiv.addEventListener("click", function () {
  usersPage.classList.add("changeing-user-page");
  ulUsers.innerHTML = "";

  function getUsers() {
    fetch("https://reqres.in/api/users?page=1")
      .then(function (response) {
        if (response.status != 200) {
          throw response.status;
        }
        return response.json();
      })
      .then(function (responsData) {
        responsData.data.forEach((element) => {
          const liUsers = document.createElement("li");
          liUsers.textContent = `${element.first_name} ${element.last_name}`;
          const usersImg = document.createElement("img");
          usersImg.setAttribute("src", element.avatar);
          usersImg.setAttribute("alt", "User-image");

          
          liUsers.addEventListener("click", function () {
            activeUserdiv.innerHTML = "";
            activeUserdiv.appendChild(usersImg);
            usersPage.classList.remove("changeing-user-page");
            ulUsers.innerHTML = "";
          });


          listOfUsers.push(liUsers);
          ulUsers.appendChild(liUsers);
          usersWraper.appendChild(ulUsers);

        });

        // filter
        function filterUsers(searchInpuTValue) {
          listOfUsers.forEach(function (eachLiUser) {
            if (
              eachLiUser.textContent
                .toLowerCase()
                .includes(searchInpuTValue.toLowerCase().trim())
            ) {
              eachLiUser.classList.remove("hide-user");
            } else {
              eachLiUser.classList.add("hide-user");
            }
          });
        }

        input.addEventListener("keyup", function () {
          filterUsers(this.value);
        });
      })

      .catch(function (error) {
        if (error == 404) {
          console.log("Page Not Found");
        }
      });
  }

  getUsers();
});

closeIcon.addEventListener("click", function () {
  usersPage.classList.remove("changeing-user-page");
  ulUsers.innerHTML = "";
});

//! slider
// ---banner
var splide = new Splide("#banner-slider", {
  type: "loop",
  padding: "5rem",
  perPage: 2,
  breakpoints: {
    1200: { arrows: true },
    800: { perPage: 1 },
    640: {},
  },
  // wheel: true,
  autoplay: true,
  interval: 5000,
  speed: 3000,
  classes: {
    // Add classes for arrows.
    arrows: "splide__arrows alex-class-arrows",
    arrow: "splide__arrow alex-class-arrow",
    prev: "splide__arrow--prev alex-class-arrows",
    next: "splide__arrow--next alex-class-arrows",

    // Add classes for pagination.
    pagination: "splide__pagination alex-class-pagination", // container
    page: "splide__pagination__page alex-class-page", // each button
  },
});

splide.mount();

// --- body

var splide = new Splide("#body-slider", {
  direction: 'ttb',
  height   : '400px',
  type: "slide",
  perPage: 1,
  rewind: true,
  autoplay: true,
  interval: 5000,
  classes: {
    // Add classes for arrows.
    arrows: "splide__arrows alex2-class-arrows",
    arrow: "splide__arrow alex2-class-arrow",
    prev: "splide__arrow--prev alex2-class-arrows",
    next: "splide__arrow--next alex2-class-arrows",

    // Add classes for pagination.
    pagination: "splide__pagination alex2-class-pagination", // container
    page: "splide__pagination__page alex2-class-page", // each button
  },
});

splide.mount();

// ! form validation

const formElement = document.getElementById("form-wraper");
formElement.addEventListener("submit", function (e) {
  e.preventDefault();

  const errors = {};

  let firstNameValue = document.getElementById("firstName").value;
  if (firstNameValue == "") {
    errors.firstName = "Please enter you name";
  }

  let lastNameValue = document.getElementById("lastName").value;
  if (lastNameValue == "") {
    errors.lastName = "Please enter you lastname";
  }

  let passwordValue = document.getElementById("password").value;
  let passwordRepeat = document.getElementById("repeatPassword").value;
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  let passwordLine = document.getElementById("password");
  let repPasswordLine = document.getElementById("repeatPassword");

  if (passwordValue == "") {
    // errors.passw1 = "Please enter you password";
    passwordLine.style.border = "2px solid red";
    return alert("Please enter you password");
  } else if (!passwordValue.match(passwordRegex)) {
    errors.passw1 = "6-20 symbol {A-z & Number(s)}";
    passwordLine.style.border = "2px solid red";
  } else {
    passwordLine.style.border = "2px solid green";
  }

  if (passwordRepeat == "") {
    return alert("Please repeat your password");
  } else if (passwordValue != passwordRepeat) {
    errors.passw2 = "Password is not match";
    repPasswordLine.style.border = "2px solid red";
  } else if (passwordRepeat == "") {
    repPasswordLine.style.border = "2px solid red";
  } else {
    repPasswordLine.style.border = "2px solid green";
  }

  let radio = false;
  formElement.querySelectorAll('[name="radio"]').forEach((gendreItems) => {
    if (gendreItems.checked) {
      radio = true;
    }
  });
  if (radio != true) {
    errors.radio = "Please check you gender";
  }

  let checkBox = document.getElementById("checkBox").checked;
  if (checkBox != true) {
    errors.checkbox = "You need to agree terms";
  }

  formElement.querySelectorAll(".error-text").forEach((formChildeElements) => {
    formChildeElements.textContent = "";
  });

  // console.log(errors);

  for (let errorsKeys in errors) {
    let errorsPelements = document.getElementById("error-" + errorsKeys);
    // console.log(errorsPelements);
    if (errorsPelements) {
      errorsPelements.textContent = errors[errorsKeys];
    }
  }

  if (Object.keys(errors).length == 0) {
    formElement.submit();
  }
});

const showPassword = document.getElementById("password");
const showRepPassword = document.getElementById("repeatPassword");
const showIcon = document.getElementById("showPass1");
const showIconRep = document.getElementById("showPass2");

function ShowHidePassword() {
  if (showPassword.type == "password") {
    showPassword.setAttribute("type", "text");
    showIcon.classList.remove("fa-eye");
    showIcon.classList.add("fa-eye-slash");
  } else {
    showPassword.setAttribute("type", "password");
    showIcon.classList.add("fa-eye");
    showIcon.classList.remove("fa-eye-slash");
  }
}

showIcon.addEventListener("click", ShowHidePassword);

// callback-ით მინდოდა რომ გამეკეთებინა, გამეწერა ერთი საერთო ფუნცქია და ცვლადები შემეცვალა. არ გამომივიდა :(

showIconRep.addEventListener("click", function () {
  if (showRepPassword.type == "password") {
    showRepPassword.setAttribute("type", "text");
    showIconRep.classList.remove("fa-eye");
    showIconRep.classList.add("fa-eye-slash");
  } else {
    showRepPassword.setAttribute("type", "password");
    showIconRep.classList.add("fa-eye");
    showIconRep.classList.remove("fa-eye-slash");
  }
});

let email = document.getElementById("email");

function emailValidation() {
  let emailValue = email.value;
  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let emailPelement = document.getElementById("valiEemail");

  if (emailValue.match(emailRegex)) {
    emailPelement.textContent = "Email is Valid";
    emailPelement.style.color = "green";
    email.style.border = "2px solid green";
  } else {
    emailPelement.textContent = "Email Not Valid";
    emailPelement.style.color = "red";
    email.style.border = "2px solid red";
  }

  if (emailValue == "") {
    emailPelement.innerHTML = "";
    email.style.border = "1px solid #bdbdbd";
  }
}

email.addEventListener("keyup", emailValidation);

// const allInputElements = document.querySelectorAll(".section__2--inputs");
// const reset = document.querySelector(".reset-btn");
// reset.addEventListener("click", function () {
//   // formElement.reset();
//   allInputElements.style.border = "1px solid #bdbdbd";
// });
