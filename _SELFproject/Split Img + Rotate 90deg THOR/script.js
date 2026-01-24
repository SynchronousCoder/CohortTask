var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sticky",
    start: "top 0%",
    end: "top -130%",
    // markers: true,
    pin: true,
    scrub: 1,
    pinSpacing: true,
  },
});

tl.to(".card-container", {
    scale: 0.85,
})
tl.to("#card-1", { x: -20, scale: 1, duration: 1 });
tl.to("#card-3", { x: 20, scale: 1, duration: 1 }, "-=1");
tl.to("#card-2", { x: 0, scale: 1, duration: 1 }, "-=1");

tl.to(".card", {
    rotationY: 180,
    duration: 1,
    ease: "power3.inOut",
    stagger: 0.1
})

for(let i = 1; i < 4; i++){
    if(i % 2 !== 0){
        tl.to(`#card-${i}`, {
            y: 30,
            rotationZ: (i < 2 ? -10 : 10),
            ease: "power3.inOut",
            duration: 1.2
        }, "-=1.2");  
    }
}


