!function(){var t={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]"),body:document.querySelector("body")};t.btnStart.addEventListener("click",(function(){e=setInterval((function(){var e="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));t.body.style.backgroundColor="".concat(e)}),1e3),t.btnStart.setAttribute("disabled",""),t.btnStop.removeAttribute("disabled")})),t.btnStop.addEventListener("click",(function(){clearInterval(e),t.btnStop.setAttribute("disabled",""),t.btnStart.removeAttribute("disabled")}));var e=null;t.btnStop.setAttribute("disabled","")}();
//# sourceMappingURL=01-color-switcher.dc46b12a.js.map