

import promiseIpc from 'electron-promise-ipc';



function rrsend(params) {
    promiseIpc.send("rr",params).then(res=>{
        console.log("rrsend res",res);
    })
}

function appQuit() {
    rrsend({action:"quit"});
}

function toggleFullScreen() {
    rrsend({action:"togglefs"});
}
function setFullScreen() {
    rrsend({action:"setfs"});
}
function clearFullScreen() {
    rrsend({action:"clearfs"});
}

function openDevTools() {
    rrsend({action:"devtools"});
}


export {
  appQuit,
  toggleFullScreen,
  setFullScreen,
  clearFullScreen,
  openDevTools
};
