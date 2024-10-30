function resetView(){
    if (document.hasFocus()) {
        document.body.style.display = "";
        resetClipBoard();
    }  
}

function hideView(){
    if (!document.hasFocus()) { 
        document.body.style.display = "none";
    }
}

function resetClipBoard(){
    if (document.hasFocus()) {
        try{
            navigator.clipboard.writeText("MonitorEDU");
        }
        catch (error) {
            console.error(error.message);
        }
    }
}

window.addEventListener("blur", hideView);

window.addEventListener("focus", () => {
    setTimeout(resetView, 2000);  
});

setInterval(resetClipBoard, 5000);