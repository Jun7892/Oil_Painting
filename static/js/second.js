            
function charm(sound) {
    let audio = new Audio(sound);
    audio.volume = 0.5;
    audio.play();
    console.log('aaaa');
}

function charm1(sound1) {
    let audio = new Audio(sound1);
    audio.volume = 0.5;
    audio.play();
    console.log('aaaa');
}

function charm2(sound2) {
    let audio = new Audio(sound2);
    audio.volume = 0.5;
    audio.play();
    console.log('aaaa');
}



function charm3(sound3) {
    let audio = new Audio(sound3);
    audio.loop = true;
    audio.volume = 0.5;
    audio.play();
    console.log('aaaa');
}

// let count = 0
// function charm3(sound3) {
//     let audio = new Audio(sound3);
//     if count == 0 {
//         audio.volume = 0.5;
//         audio.play();
//         count += 1
//     } else {
//         audio.muted;
//         count += 1
//     }
// }  


// 버튼 클릭시 display: flex 값 / 닫기 버튼 클릭시 modal display none 값

// const modal = document.getElementById("modal")

function modalOn() {
    const modal = document.getElementById("modal")
    modal.style.display = "flex"
}

function modalOff() {
    const modal = document.getElementById("modal")
    console.log(modal)
    modal.style.display = "none"
}
