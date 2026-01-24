const words = document.querySelectorAll(".word");
const images = document.querySelectorAll(".img");

// Hide all images on start
gsap.set(images, {
  opacity: 0,
  scale: 1.25,
  zIndex: 0
});

let activeImg = null;

words.forEach(word => {
  word.addEventListener("mouseenter", () => {
    const index = word.dataset.index;
    const img = document.querySelector(`.img[data-index="${index}"]`);

    if (!img) return;

    // Hide previous image
    if (activeImg && activeImg !== img) {
      gsap.to(activeImg, {
        opacity: 0,
        scale: 1.25,
        duration: 0.4,
        ease: "power2.out"
      });
    }

    activeImg = img;

    // Show current image
    gsap.set(img, { zIndex: 1 });
    gsap.fromTo(img,
      { opacity: 0, scale: 1.25 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power4.out"
      }
    );
  });

  word.addEventListener("mouseleave", () => {
    if (!activeImg) return;

    gsap.to(activeImg, {
      opacity: 0,
      scale: 1.25,
      duration: 0.5,
      ease: "power2.out"
    });
  });
});
