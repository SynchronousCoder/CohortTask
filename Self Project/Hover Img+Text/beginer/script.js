const words = document.querySelectorAll('.word');
const imgs = document.querySelectorAll('.img');

// helper to hide all images immediately (setup)
imgs.forEach(img => {
  gsap.set(img, { scale: 0.15, opacity: 0, zIndex: 10 });
});

// on hover — simple, robust logic that prevents flashes when switching quickly
words.forEach(word => {
  const idx = word.dataset.index;
  const target = document.querySelector(`.img[data-index="${idx}"]`);

  let showTween, hideTween;

  word.addEventListener('pointerenter', () => {
    if (!target) return;

    // stop any hideTween running on target and other imgs
    imgs.forEach(i => gsap.killTweensOf(i));

    // bring target visually above other images while animating
    gsap.set(target, { zIndex: 30 });

    // ensure other images are behind (and not visible)
    imgs.forEach(i => {
      if (i !== target) gsap.to(i, { opacity: 0, scale: 0.15, duration: 0.2, ease: 'power2.in' });
    });

    // animate target to visible (15% -> 75%) with fast start, slow end
    showTween = gsap.to(target, {
      scale: 0.75,
      opacity: 1,
      duration: 0.55,
      ease: 'power4.out'
    });
    word.classList.add('active');
  });

  word.addEventListener('pointerleave', () => {
    if (!target) return;

    // stop any show tween for clean exit
    gsap.killTweensOf(target);

    // animate target back to hidden
    hideTween = gsap.to(target, {
      scale: 0.15,
      opacity: 0,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: () => {
        // return zIndex back so stacking stays consistent
        gsap.set(target, { zIndex: 10 });
      }
    });
    word.classList.remove('active');
  });

  // also handle quick switching: when entering another word, ensure previous targets get hidden
  word.addEventListener('pointermove', () => {
    // noop — pointermove keeps pointerenter logic responsive; main switching handled above
  });
});