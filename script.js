// For custom cursor
const cursor = document.querySelector(".cursor");

// Follow cursor on mouse move
document.addEventListener("mousemove", (e) => {
   let x = e.pageX;
   let y = e.pageY;

   cursor.style.top = y + "px";
   cursor.style.left = x + "px";
   cursor.style.display = "block";
});

// Cursor effects on mouse out
document.addEventListener("mouseout", () => {
   cursor.style.display = "none";
});

// Add click effect on click
document.addEventListener("click", function(e) {
   let x = e.pageX;
   let y = e.pageY;

   let cursorPosX = parseInt(cursor.style.left.replace("px", ""));
   let cursorPosY = parseInt(cursor.style.top.replace("px", ""));
   let cursorWidth = cursor.offsetWidth;
   let cursorHeight = cursor.offsetHeight;

   // Calcoliamo l'offset tra il punto di clic e la posizione del cursore
   let offsetX = x - (cursorPosX + cursorWidth / 2);
   let offsetY = y - (cursorPosY + cursorHeight / 2);

   // Aggiungiamo l'offset per centrare correttamente l'effetto di clic
   x -= offsetX;
   y -= offsetY;

   let span = document.createElement("span");
   span.classList.add("click-effect");
   span.style.top = y + "px";
   span.style.left = x + "px";
   document.body.appendChild(span);

   setTimeout(() => {
      span.remove();
   }, 600);
});

// Animation text skills
class TextScramble {
   constructor(el) {
     this.el = el;
     this.chars = "!<>-_\\/[]{}—=+*^?#________";
     this.update = this.update.bind(this);
   }
   setText(newText) {
     const oldText = this.el.innerText;
     const length = Math.max(oldText.length, newText.length);
     const promise = new Promise((resolve) => (this.resolve = resolve));
     this.queue = [];
     for (let i = 0; i < length; i++) {
       const from = oldText[i] || "";
       const to = newText[i] || "";
       const start = Math.floor(Math.random() * 40);
       const end = start + Math.floor(Math.random() * 40);
       this.queue.push({
         from,
         to,
         start,
         end
       });
     }
     cancelAnimationFrame(this.frameRequest);
     this.frame = 0;
     this.update();
     return promise;
   }
   update() {
     let output = "";
     let complete = 0;
     for (let i = 0, n = this.queue.length; i < n; i++) {
       let { from, to, start, end, char } = this.queue[i];
       if (this.frame >= end) {
         complete++;
         output += to;
       } else if (this.frame >= start) {
         if (!char || Math.random() < 0.28) {
           char = this.randomChar();
           this.queue[i].char = char;
         }
         output += `<span class="dud">${char}</span>`;
       } else {
         output += from;
       }
     }
     this.el.innerHTML = output;
     if (complete === this.queue.length) {
       this.resolve();
     } else {
       this.frameRequest = requestAnimationFrame(this.update);
       this.frame++;
     }
   }
   randomChar() {
     return this.chars[Math.floor(Math.random() * this.chars.length)];
   }
 }
 
 const phrases = [
   "Microsoft Office",
   "AWS Web Services",
   "HTML/CSS/SASS/SCSS/JS",
   "Wordpress",
   "SQL/PHP basic"
 ];
 
 const el = document.querySelector(".codedText");
 const fx = new TextScramble(el);
 
 let counter = 0;
 const next = () => {
   fx.setText(phrases[counter]).then(() => {
     setTimeout(next, 2200);
   });
   counter = (counter + 1) % phrases.length;
 };
 
 next();
