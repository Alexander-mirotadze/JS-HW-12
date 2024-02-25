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
const usersWraper = document.getElementById("users-wraper")
const closeIcon = document.getElementById("closeIcon")
const ulUsers = document.createElement("ul");


activeUserdiv.addEventListener("click", function () {
  usersPage.classList.add("changeing-user-page");
  ulUsers.innerHTML = "";


  function getUsers(){
    fetch("https://reqres.in/api/users?page=1")
    .then(function (response) {
      if(response.status != 200){
        throw response.status
      }
      return response.json();
    })
    .then(function (responsData) {
      responsData.data.forEach(element => {
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
        })
  
        ulUsers.appendChild(liUsers);
        usersWraper.appendChild(ulUsers);
  
      });
    })
    .catch(function (error) {
      if(error == 404){
        console.log("Page Not Found");
      }
    })
  }
  
  getUsers();

  
});

closeIcon.addEventListener("click", function () {
  usersPage.classList.remove("changeing-user-page");
  ulUsers.innerHTML = "";
});



//! slider
var splide = new Splide(".splide", {
  type: "loop",
  padding: "5rem",
  perPage: 2,
  wheel: true,
//   autoplay: true,
//   interval: 5000,
  classes: {
    // Add classes for arrows.
    arrows: 'splide__arrows alex-class-arrows',
    arrow : 'splide__arrow alex-class-arrow',
    prev  : 'splide__arrow--prev alex-class-back',
    next  : 'splide__arrow--next alex-class-forward',

    // Add classes for pagination.
    pagination: 'splide__pagination alex-class-pagination', // container
    page      : 'splide__pagination__page alex-class-page', // each button
},});

splide.mount();
