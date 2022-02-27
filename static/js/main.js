function shiftLeft() {
    const boxes = document.querySelectorAll(".box");
    const tmpNode = boxes[0];
    boxes[0].className = "box move-out-from-left";

    setTimeout(function () {
        if (boxes.length > 5) {
            tmpNode.classList.add("box--hide");
            boxes[5].className = "box move-to-position5-from-left";
        }
        boxes[1].className = "box move-to-position1-from-left";
        boxes[2].className = "box move-to-position2-from-left";
        boxes[3].className = "box move-to-position3-from-left";
        boxes[4].className = "box move-to-position4-from-left";
        boxes[0].remove();

        document.querySelector(".cards__container").appendChild(tmpNode);

    }, 500);

}

function shiftRight() {
    const boxes = document.querySelectorAll(".box");
    boxes[4].className = "box move-out-from-right";
    setTimeout(function () {
        const noOfCards = boxes.length;
        if (noOfCards > 4) {
            boxes[4].className = "box box--hide";
        }

        const tmpNode = boxes[noOfCards - 1];
        tmpNode.classList.remove("box--hide");
        boxes[noOfCards - 1].remove();
        let parentObj = document.querySelector(".cards__container");
        parentObj.insertBefore(tmpNode, parentObj.firstChild);
        tmpNode.className = "box move-to-position1-from-right";
        boxes[0].className = "box move-to-position2-from-right";
        boxes[1].className = "box move-to-position3-from-right";
        boxes[2].className = "box move-to-position4-from-right";
        boxes[3].className = "box move-to-position5-from-right";
    }, 300);

}


// 모달 창 js

function modal(id) {
    let zIndex = 3;
    let modal = document.getElementById(id);

    // 모달 div 뒤에 희끄무레한 레이어
    var bg = document.createElement('div');
    bg.setStyle({
        position: 'fixed',
        zIndex: zIndex,
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        // 레이어 색갈은 여기서 바꾸면 됨
        backgroundColor: 'rgba(0,0,0,0.4)'
    });
    document.body.append(bg);

    // 닫기 버튼 처리, 시꺼먼 레이어와 모달 div 지우기
    modal.querySelector('.closeBtn').addEventListener('click', function () {
        bg.remove();
        modal.style.display = 'none';
    });

    modal.setStyle({
        position: 'fixed',
        display: 'block',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

        // 시꺼먼 레이어 보다 한칸 위에 보이기
        zIndex: zIndex + 1,

        // div center 정렬
        top: '58%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        msTransform: 'translate(-50%, -50%)',
        webkitTransform: 'translate(-50%, -50%)'
    });
}

// Element 에 style 한번에 오브젝트로 설정하는 함수 추가
Element.prototype.setStyle = function (styles) {
    for (var k in styles) this.style[k] = styles[k];
    return this;
};
document.querySelector('.btn_open_chapter').addEventListener('click', function () {
    // 모달창 띄우기
    modal('my_modal');
});


// jQuery 버전
// function mo;'dal(id) {
//     let zIndex = 9999;
//     let modal = $('#' + id);
//
//     // 모달 div 뒤에 희끄무레한 레이어
//     let bg = $('<div>')
//         .css({
//             position: 'fixed',
//             zIndex: zIndex,
//             left: '0px',
//             top: '0px',
//             width: '100%',
//             height: '100%',
//             overflow: 'auto',
//             // 레이어 색갈은 여기서 바꾸면 됨
//             backgroundColor: 'rgba(0,0,0,0.4)'
//         })
//         .appendTo('body');
//
//     modal
//         .css({
//             position: 'fixed',
//             boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
//
//             // 시꺼먼 레이어 보다 한칸 위에 보이기
//             zIndex: zIndex + 1,
//
//             // div center 정렬
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             msTransform: 'translate(-50%, -50%)',
//             webkitTransform: 'translate(-50%, -50%)'
//         })
//         .show()
//         // 닫기 버튼 처리, 시꺼먼 레이어와 모달 div 지우기
//         .find('.modal_close_btn')
//         .on('click', function() {
//             bg.remove();
//             modal.hide();
//         });
// }
//
// $('.btn_open_chapter').on('click', function() {
//     // 모달창 띄우기
//     modal('my_modal');
// });

// 이미지 드래그 앤 드랍 js

var drop = $("input");
drop.on('dragenter', function (e) {
    $(".drop").css({
        "border": "4px dashed #09f",
        "background": "rgba(0, 153, 255, .05)"
    });
    $(".cont").css({
        "color": "#09f"
    });
}).on('dragleave dragend mouseout drop', function (e) {
    $(".drop").css({
        "border": "3px dashed #DADFE3",
        "background": "transparent"
    });
    $(".cont").css({
        "color": "#8E99A5"
    });
});


function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result,
                    '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('list').insertBefore(span, null);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

$('#files').change(handleFileSelect);

let isPlaying = false;
let audio = document.getElementById("myAudio");
function charm3(sound3) {

    // let audio = new Audio(sound3);
    audio.loop = true;
    audio.volume = 0.5;
    isPlaying ? audio.pause() : audio.play();


audio.onplaying = function () {
    isPlaying = true;
};
audio.onpause = function () {
    isPlaying = false;
};
console.log('aaaa');
}




// ajax통신

// $('.btn_open_chapter').on('click', () => {
//             var img = document.querySelector(".thumb").src;
//             var key = ($('#filename').val() + '.png');
//             console.log(img)
//             console.log(key)

            // var file = files[0];

            // let testset = new FormData();

            // testset.append('file', file);
            // testset.append('img', img);
            // testset.append('key', key);

            // console.log(testset)
            // if (img.length <= 0) {
            //     alert('이미지를 넣어주세요')
            // } else if (key.length <= 0) {
            //     alert('파일 이름을 입력해주세요.')
            // } else {
            //     sendimage(testset);
            //     console.log(files[0])
            // }

//
//             $.ajax({
//                 url: "http://localhost:5000/api/v1/nsts/",
//                 data: {'img':img,'key':key},
//                 method: "POST",
//                 cache: false,
//                 processData: false,
//                 contentType: false,
//                 enctype: 'multipart/form-data',
//                 success: function (data) {
//                     alert('성공')
//                     console.log('성공')
//                 },
//                 error: function (request, status, error) {
//                     alert('error')
//
//                     console.log(request, status, error)
//                 },
//                 complete: function (response) {
//                     alert('끝까지 실행완료')
//                     console.log('끝까지 실행완료됨.')
//
//                     // 모달창에서 완성화면을 보여줘야함 이 부분 아직 안 만들음.
//                     // location.reload()
//                 }
//             })
// });
//


$('.btn_open_chapter').on('click', () => {


    let file = $('#files')[0].files[0];
    let key = ($('#filename').val() + '.png');

    console.log(file)
    console.log(key)


    let form_data = new FormData()

    form_data.append('img', file)
    form_data.append('key', key)

    $.ajax({
        type: "POST",
        url: "http://localhost:5000/api/v1/nsts/",
        data: form_data,
        cache: false,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        success: function (response) {
            alert('성공')
            console.log('성공')
        },
        error: function (request, status, error) {
            alert('error')

            console.log(request, status, error)
        },
        complete: function (response) {
            alert('끝까지 실행완료')
            console.log('끝까지 실행완료됨.')

            // 모달창에서 완성화면을 보여줘야함 이 부분 아직 안 만들음.
            // location.reload()
        }
    });
})
