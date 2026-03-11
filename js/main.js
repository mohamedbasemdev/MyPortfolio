let header = document.querySelector(".hero .header");
let collapse = document.querySelector(".navbar .navbar-collapse");

collapse.addEventListener("shown.bs.collapse", function () {
  header.style.borderBottom = "2px solid #3b82f6";
});

collapse.addEventListener("hidden.bs.collapse", function () {
  header.style.borderBottom = "none";
});
// ########################################################
let links = document.querySelectorAll(".header .navbar-nav .nav-link");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    let targetSection = document.querySelector(e.currentTarget.dataset.link);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
// ########################################################
let cardInfo = document.querySelectorAll(".projects .card-info");
let prev = document.querySelector(".projects .prev");
let next = document.querySelector(".projects .next");
let current = 0;

let mainCard = localStorage.getItem("card-item");
if (mainCard) {
  current = +mainCard;
  showCard(current);
}

function showCard(current) {
  cardInfo.forEach((e) => e.classList.remove("active"));
  cardInfo[current].classList.add("active");
  localStorage.setItem("card-item", current);
}

next.onclick = function () {
  current++;
  if (current >= cardInfo.length) current = 0;
  showCard(current);
};
prev.onclick = function () {
  current--;
  if (current < 0) current = cardInfo.length - 1;
  showCard(current);
};
// ########################################################
let form = document.querySelector(".contact form");
let inputName = document.getElementById("name");
let inputEmail = document.getElementById("email");
let inputMessage = document.getElementById("message");

let nameError = document.getElementById("name-error");
let emailError = document.getElementById("email-error");
let messageError = document.getElementById("message-error");

form.onsubmit = function (e) {
  e.preventDefault();
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  let valid = true;

  if (inputName.value.trim() === "") {
    nameError.textContent = "Please Enter Your Name";
    valid = false;
  }
  if (inputEmail.value.trim() === "") {
    emailError.textContent = "Please Enter Your Email";
    valid = false;
  } else if (!validateEmail(inputEmail.value.trim())) {
    emailError.textContent = "Please Enter a Valid Email";
    valid = false;
  }
  if (inputMessage.value.trim() === "") {
    messageError.textContent = "Please Enter Your Message";
    valid = false;
  }
  if (valid) {
    let whatsAppMsg = `Name: ${inputName.value}%0AEmail: ${inputEmail.value}%0AMessage: ${inputMessage.value}`;
    let whatsAppUrl = `https://wa.me/201223828067?text=${whatsAppMsg}`;
    window.open(whatsAppUrl, "_blank");
  }
};

function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
// ########################################################
let texts = ["Frontend Developer", "Web Designer"];

let currentIndex = 0;
let charIndex = 0;
let deleting = false;

let typeSpeed = 100;
let deleteSpeed = 100;
let afterWord = 1000;

function typeEffect() {
  let currentWord = texts[currentIndex];

  if (!deleting) {
    charIndex++;
    document.querySelector(".multiple-text").textContent =
      currentWord.substring(0, charIndex);
  } else {
    charIndex--;
    document.querySelector(".multiple-text").textContent =
      currentWord.substring(0, charIndex);
  }

  if (!deleting && charIndex === currentWord.length) {
    deleting = true;
    setTimeout(typeEffect, afterWord);
  } else if (deleting && charIndex === 0) {
    deleting = false;
    currentIndex = (currentIndex + 1) % texts.length;
    setTimeout(typeEffect, typeSpeed);
  } else {
    setTimeout(typeEffect, deleting ? deleteSpeed : typeSpeed);
  }
}
typeEffect();
// ########################################################
const reveul = document.querySelectorAll(".reveul, .reveul-img");
let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveul.forEach((el) => observer.observe(el));
// ########################################################

let dark = document.querySelector(".hero .header .dark");

dark.onclick = function () {
  const isLight = dark.classList.contains("fa-moon");

  if (isLight) {
    dark.classList.replace("fa-moon", "fa-sun");
    document.body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
    document.querySelector(".hero .landing .image").classList.add("actiive");
    document.querySelector(".footer").style.color = "#000";
  } else {
    dark.classList.replace("fa-sun", "fa-moon");
    document.body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
  }
};
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    dark.classList.replace("fa-moon", "fa-sun");
    document.body.classList.add("light-mode");
    document.querySelector(".hero .landing .image").classList.add("actiive");
    document.querySelector(".footer").style.color = "#000";
  } else {
    document.body.classList.remove("light-mode");
    dark.classList.replace("fa-sun", "fa-moon");
  }
});
