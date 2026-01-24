document.addEventListener("DOMContentLoaded", () => {

  const clientsPreviews = document.querySelector(".clients-preview");
  const clientNames = document.querySelectorAll(".client-name");

  let activeClientIndex = -1;
  let activeClientImg = null;
  let activeClientImgWrapper = null;

  clientNames.forEach((client, index) => {

    client.addEventListener("mouseover", () => {

      if (activeClientIndex === index) return;

      // remove previous image
      if (activeClientIndex !== -1) {
        let previousClient = clientNames[activeClientIndex];
        previousClient.dispatchEvent(new Event("mouseout"));
      }

      activeClientIndex = index;

      // create wrapper
      const clientImgWrapper = document.createElement("div");
      clientImgWrapper.className = "client-img-wrapper";

      // create image
      const clientImg = document.createElement("img");
      clientImg.src = `img/${index + 1}.jpg`;

      gsap.set(clientImg, { scale: 1.25, opacity: 0 });

      clientImgWrapper.appendChild(clientImg);
      clientsPreviews.appendChild(clientImgWrapper);

      activeClientImgWrapper = clientImgWrapper;
      activeClientImg = clientImg;

      gsap.to(clientImgWrapper, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.5,
        ease: "power4.out"
      });

      gsap.to(clientImg, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out"
      });

      gsap.to(clientImg, {
        scale: 1,
        duration: 1.25,
        ease: "power4.out"
      });

    });

    client.addEventListener("mouseout", (event) => {

      if (event.relatedTarget && client.contains(event.relatedTarget)) return;

      if (activeClientIndex === index) {
        activeClientIndex = -1;
      }

      if (activeClientImg && activeClientImgWrapper) {

        const imgToRemove = activeClientImg;
        const wrapperToRemove = activeClientImgWrapper;

        activeClientImg = null;
        activeClientImgWrapper = null;

        gsap.to(imgToRemove, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
          onComplete: () => wrapperToRemove.remove()
        });
      }
    });

  });

});

// document.addEventListener("DOMContentLoaded", () => {
//   const clientsPreviews = document.querySelector(".clients-preview");
//   const clientNames = document.querySelector(".client-name");

//   let activeClientIndex = -1;

//   clientNames.forEach((client, index) => {
//     let activeClientWrapper = null;
//     let activeClientImg = null;

//     client.addEventListener("mouseover", () => {
//       if (activeClientIndex === index) return;

//       if (activeClientIndex !== index) {
//         let previousClient = client[activeClientIndex];
//         const mouseoutEvent = new Event("mouseout");
//         previousClient.dispatchEvent(mouseoutEvent)
//       }


//       activeClientIndex = index;

//       const clientImgWrapper = document.createElement(div);
//       clientImgWrapper.clientName = "client-img-wrapper";

//       const clientImg = document.createElement(img);
//       clientImg.src = `img${index+1}.jpg`;
//       gsap.set(clientImg, {scale: 1.25, opacity:0});

//       clientImgWrapper.appendChild(clientImg);
//       clientsPreviews.appendChild(clientImgWrapper);

//       activeClientImgWrapper = clientImgWrapper;
//       activeClientImg = clientImg;  

//       gsap.to(clientImgWrapper, {
//         clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//         duration: .5,
//         ease: "power4.out"
//       })
//       gsap.to(clientImg, {
//         opacity: 1,
//         duration: 0.25,
//         ease: "power2.out"
//       })
//       gsap.to(clientImg, {
//         scale: 1,
//         duration: 1.25,
//         ease: "power4.out"
//       })
//     });

//     client.addEventListener("mouseout", (event)=> {
//       if(event.relatedTarget && client.contains(event.relatedTarget)) {
//         return
//       }
//       if(activeClientIndex === index){
//         activeClientIndex= -1;
//       }

//       if(activeClientImg && activeClientImgWrapper){
//         const clientImgToRemove = activeClientImg;
//         const clientImgWrapperToRemove = activeClientImgWrapper;

//         activeClientImg = null;
//         activeClientImgWrapper = null;

//         gsap.to(clientImgToRemove, {
//           opacity: 0,
//           duration: 0.5,
//           ease: "power1.out",

//           onComplete: () => {
//             clientImgWrapperToRemove.remove();
//           }  
//         });
//       }
//     })
//   });
// });
