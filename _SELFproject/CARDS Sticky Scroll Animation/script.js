document.addEventListener("DOMContentLoaded", () => {
  let h1 = document.querySelector(".heading");

  var boxs = document.querySelectorAll(".box");
  var box1 = document.querySelector(".box1");
  var box2 = document.querySelector(".box2");
  var box3 = document.querySelector(".box3");
  var box4 = document.querySelector(".box4");
  function pause() {
    // Step 1: sab boxes ko ek jagah center par le aao
    tl.to([box1, box2, box3, box4], {
      //   x: 0,
      //   y: 0,
      duration: .5,
      ease: "power2.out",
    });
  }


  // Split text into spans
  let splith1 = h1.textContent.split("");
  let letter = splith1.map((char) => `<span>${char}</span>`).join("");
  h1.innerHTML = letter;

  // Select all spans
  let spans = document.querySelectorAll(".heading span");

  gsap.from(spans, {
    opacity: 0,
    duration: 2.5,
    filter: "blur(2.5px)",
    stagger: {
      grid: [1, 2],
      from: "random",
      amount: 2.5
    },
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#page2",
      // markers: true,
      start: "top 50%",
      end: "top 50%"
    }
  })

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page2",
      // markers: true,
      start: "top 0%",
      end: "top -200%",
      pin: true,
      scrub: true,
      stagger: 1.2,
    },
  });

  boxs.forEach((box, index) => {
    if (index % 2 === 0) {
      tl.from(box, {
        y: 700,
        rotation: 20,
        rotationX: 45,
        scale: 0.85,
        duration: 1.5,
        ease: "power4.out",
      });
    }

    if (index % 2 !== 0) {
      tl.from(box, {
        y: 700,
        rotation: -25,
        rotationX: -30,
        scale: 0.8,
        duration: 1.5,
        ease: "power4.out",
      });
    }
  });

  function renderAnime2() {
    pause();
    tl.to(box1, {
      x: -300,
      y: -100,
      rotation: 0,
      duration: 2.5,
      ease: "expoScale(0.5,7,none)",
    });
    tl.to(
      box2,
      {
        x: 380,
        y: -135,
        rotation: 0,
        duration: 2.5,
        ease: "expoScale(0.5,7,none)",
      },
      "-=2.5"
    );
    tl.to(
      box3,
      {
        x: -400,
        y: 200,
        rotation: 0,
        duration: 2.5,
        ease: "expoScale(0.5,7,none)",
      },
      "-=2.5"
    );
    tl.to(
      box4,
      {
        x: 300,
        y: 180,
        rotation: 0,
        duration: 2.5,
        ease: "expoScale(0.5,7,none)",
      },
      "-=2.5"
    );
    pause();
  }
  renderAnime2();
})