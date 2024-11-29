// Tabs counter
function checktabs(){
  var port = chrome.runtime.connect({name: "tabCounter"});
  const maxTabs = 3;

  port.postMessage({ask: "How Many Tabs?"});

  port.onMessage.addListener(function(msg) {
    if (msg.response > maxTabs) {
      alert("Too many tabs open");
    }  
  });
}

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
    overlay.innerHTML = "MonitorEDU";
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

window.addEventListener("click", checktabs);
