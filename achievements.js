document.addEventListener("DOMContentLoaded", () => {
  const typingText = document.getElementById('typing-texter');
  if (typingText) {
    const texts = ['Click on Images'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseBeforeTyping = true;
    let pauseBeforeDeleting = false;

    function type() {
      const current = texts[textIndex];

      typingText.innerHTML = current.substring(0, charIndex) + '<span class="cursor">|</span>';

      if (pauseBeforeTyping) {
        pauseBeforeTyping = false;
        setTimeout(type, 1000); // wait before starting typing
        return;
      }

      if (!isDeleting && charIndex < current.length) {
        charIndex++;
        setTimeout(type, 100);
      } else if (charIndex === current.length && !pauseBeforeDeleting) {
        pauseBeforeDeleting = true;
        setTimeout(type, 1000); // wait before starting to delete
      } else if (isDeleting && charIndex > 0) {
        pauseBeforeDeleting = false;
        charIndex--;
        setTimeout(type, 50);
      } else if (charIndex === 0 && isDeleting) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        pauseBeforeTyping = true;
        setTimeout(type, 500);
      } else {
        isDeleting = true;
        setTimeout(type, 500);
      }
    }

    type();
  }
});
