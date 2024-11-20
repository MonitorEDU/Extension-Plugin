function resetView() {
  if (document.hasFocus()) {
    const overlay = document.getElementById("overlay-monitoredu");
    if (overlay) {
      overlay.remove();
    }

    resetClipBoard();
  }
}

function hideView() {
  if (!document.hasFocus()) {
    // create logo element to append to overlay
    const logo = document.createElement("div");
    logo.style.width = "400px";
    logo.style.height = "400px";
    logo.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 561.37 128"><defs><style>.cls-1{fill:none;}.cls-2{fill:#231f20;}.cls-3{fill:#c5283d;}.cls-4{fill:#262626;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><rect class="cls-1" width="561.37" height="128"/><path class="cls-2" d="M524.73,36.79a5.09,5.09,0,0,1,3.68,1.45,5,5,0,0,1,0,7.1,5.36,5.36,0,0,1-7.35,0,5,5,0,0,1,0-7.1A5.06,5.06,0,0,1,524.73,36.79Zm0,9.27a4.34,4.34,0,0,0,3.13-1.25,4.11,4.11,0,0,0,1.25-3,4.16,4.16,0,0,0-1.25-3.06,4.58,4.58,0,0,0-6.25,0,4.07,4.07,0,0,0-1.27,3.06,4,4,0,0,0,1.27,3A4.33,4.33,0,0,0,524.73,46.06Zm2.12-2.3a1.3,1.3,0,0,0,.25.76h-.72a1.63,1.63,0,0,1-.21-.76l0-.72a1,1,0,0,0-.26-.7,1.1,1.1,0,0,0-.71-.19h-1.71v2.37h-.68V39h2.3a2.13,2.13,0,0,1,1.37.39,1.35,1.35,0,0,1,.49,1.13,1.27,1.27,0,0,1-.91,1.33,1.07,1.07,0,0,1,.76,1.08Zm-1.74-2.24c.74,0,1.1-.33,1.1-1s-.38-1-1.14-1h-1.62v1.94Z"/><path class="cls-3" d="M67.63,36.86,79,76.36l11.83-39.5h23.1V98.72H99.21V48.79L83.56,98.72H71.83L56.73,49.07V98.72H44V36.86Z"/><path class="cls-3" d="M141.42,99.65q-10.81,0-17.15-6.29t-6.33-16.53q0-10.26,6.47-16.63t17.28-6.38q10.81,0,17.24,6.38t6.43,16.63q0,10.15-6.57,16.49T141.42,99.65Zm.09-10.25a8.28,8.28,0,0,0,6.94-3.17c1.64-2.11,2.47-5.12,2.47-9v-.65q0-6.06-2.42-9.27a8.12,8.12,0,0,0-6.9-3.22,8,8,0,0,0-6.8,3.22c-1.62,2.14-2.42,5.23-2.42,9.27v.65q0,6,2.37,9.08A8,8,0,0,0,141.51,89.4Z"/><path class="cls-3" d="M183.43,54.75v7a13.94,13.94,0,0,1,5-6,14.32,14.32,0,0,1,8-2.14q7.28,0,11.32,4.8t4.05,13.83V98.72H197.68V73.19a10,10,0,0,0-1.58-6.1C195,65.69,193.33,65,191,65a6.37,6.37,0,0,0-5.44,2.74c-1.34,1.84-2,4.46-2,7.88v23.1H169.36v-44Z"/><rect class="cls-3" x="217.15" y="54.75" width="14.16" height="43.97"/><path class="cls-3" d="M261.77,98.72H251.34q-6.79-.47-8.9-3.64t-2.19-9V64.72h-5.86v-10h5.86V46.18l13.88-6.8V54.75h7.92v10h-8V85.49a2.78,2.78,0,0,0,.7,2.14,3.44,3.44,0,0,0,2.19.75h4.84Z"/><path class="cls-3" d="M286.37,99.65q-10.81,0-17.14-6.29t-6.34-16.53q0-10.26,6.48-16.63t17.28-6.38q10.8,0,17.23,6.38t6.43,16.63q0,10.15-6.57,16.49T286.37,99.65Zm.09-10.25a8.28,8.28,0,0,0,6.94-3.17q2.48-3.17,2.47-9v-.65q0-6.06-2.42-9.27a8.11,8.11,0,0,0-6.9-3.22,8,8,0,0,0-6.8,3.22q-2.42,3.21-2.42,9.27v.65q0,6,2.38,9.08A8,8,0,0,0,286.46,89.4Z"/><path class="cls-3" d="M328.57,54.75v7.64a10.47,10.47,0,0,1,3.91-5.78q2.88-2.14,8.48-2.14h1V67.23h-5.21q-4.84,0-6.53,2.28c-1.11,1.53-1.67,3.93-1.67,7.22v22H314.31v-44Z"/><path class="cls-4" d="M382.32,60.71V74.22h-17.7v11h30.46V98.72H345.89V36.86h48.45V50.09H364.62V60.71Z"/><path class="cls-4" d="M399.55,98.72V36.86h27.3a47.62,47.62,0,0,1,12.95,1.68,27.12,27.12,0,0,1,10.34,5.4A25.19,25.19,0,0,1,457,53.58,37.55,37.55,0,0,1,459.45,68a34.3,34.3,0,0,1-2.6,14,25.94,25.94,0,0,1-7.13,9.55A28.78,28.78,0,0,1,439.05,97a48.84,48.84,0,0,1-13.13,1.72Zm19.1-49.19V86.14h6.52q7.83,0,11.23-4.1t3.4-14V67.7q0-10-3.36-14.07t-11.08-4.1Z"/><path class="cls-4" d="M491.31,100q-14.9,0-21.61-6.52T463,73.66V36.86h19.1V74q0,6.43,2.42,9.22t7.92,2.8c3.6,0,6.17-.87,7.69-2.61s2.28-4.62,2.28-8.66V36.86h15V74.78q0,12.77-6.52,19T491.31,100Z"/><path class="cls-4" d="M224.11,15.91a13.33,13.33,0,1,0,13.32,13.32A13.32,13.32,0,0,0,224.11,15.91Zm0,21.38a8.06,8.06,0,1,1,8.06-8.06A8.06,8.06,0,0,1,224.11,37.29Z"/><path class="cls-4" d="M224.11,33.61a4.38,4.38,0,1,1,4.38-4.38A4.38,4.38,0,0,1,224.11,33.61Z"/><path class="cls-4" d="M230.71,41.89l-6.25,6a.34.34,0,0,1-.46,0l-6.25-6a.32.32,0,0,0-.46,0l-6.88,6.6a.33.33,0,0,0,.23.58h27.19a.34.34,0,0,0,.23-.58l-6.89-6.6A.32.32,0,0,0,230.71,41.89Z"/></g></g></svg>';

    // create text element to append to overlay
    const text = document.createElement("span");
    // wrap long text
    text.style.width = "80%";
    text.innerText =
      "Please stay on the exam page, do not switch tabs or windows, and do not open any new tabs or windows. Click on this page to regain focus, and the exam will resume.";

    // create overlay element
    const overlay = document.createElement("div");
    overlay.id = "overlay-monitoredu";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "white";
    overlay.style.zIndex = "999999";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.fontSize = "2rem";
    overlay.style.color = "black";
    overlay.style.fontWeight = "bold";
    overlay.style.textAlign = "center";
    overlay.style.flexDirection = "column";

    // append logo and text to overlay

    overlay.appendChild(logo);
    overlay.appendChild(text);

    // append overlay to body

    document.body.appendChild(overlay);
  }
}

function resetClipBoard() {
  if (document.hasFocus()) {
    try {
      navigator.clipboard.writeText("MonitorEDU");
    } catch (error) {
      console.error(error.message);
    }
  }
}

window.addEventListener("blur", hideView);

window.addEventListener("focus", () => {
  setTimeout(resetView, 2000);
});

setInterval(resetClipBoard, 5000);
