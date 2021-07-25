const form = document.querySelector("form");

form.addEventListener("submit", event => {
  event.preventDefault();
  const word = form.elements.word.value;
  location.href = "/" + word;
});