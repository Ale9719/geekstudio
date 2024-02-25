
const cursor = document.querySelector(".cursor");

//follow cursor on mousemove
document.addEventListener("mousemove", (e) => {
   let x = e.pageX;
   let y = e.pageY;

   cursor.style.top = y + "px";
   cursor.style.left = x + "px";
   cursor.style.display = "block";
});

//cursor effects on mouseout
document.addEventListener("mouseout", () => {
   cursor.style.display = "none";
});

document.onclick = function(e) {
   let x = e.pageX;
   let y = e.pageY;

   let span = document.createElement("span");
   span.classList.add("click-effect");
   span.style.top = y + "px";
   span.style.left = x + "px";
   document.appendChild(span);

   setTimeout(() => {
      span.remove();
   }, 600);
}