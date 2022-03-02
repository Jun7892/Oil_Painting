function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

let csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


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
        modal.classList.add('fadeout')
        modal.classList.remove('fadein')
        // modal.style.display = 'none';
        // .value = null; 이나 .empty() 2가지 방법으로 비우는 방법이 있어서 2가지 적용해놓음
        document.querySelector('#filename').value = null;
        $('#list').empty()
        $('#files').empty()
        modal.setStyle({
            opacity: 0,
            pointerEvents: 'none',
        });
        // location.reload()
    });
    // modal.style.pointerEvents = 'auto';
    modal.classList.add('fadein')
    modal.classList.remove('fadeout')
    modal.setStyle({
        position: 'fixed',
        overflow: 'hidden',
        display: 'block',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        opacity: 1,
        pointerEvents: 'auto',
        // 시꺼먼 레이어 보다 한칸 위에 보이기
        zIndex: zIndex + 1,
        // div center 정렬
        top: '55%',
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

    // 이미지파일 중복 안들어가게 넣을때마다 비우고 시작
    $('#list').empty()
    $('#files').empty()

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
    $('#list').empty()
    $('#files').empty()
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
async function loading_show() {
    $('#canvas').show();
}


$('.btn_open_chapter').on('click', () => {
    // function sleep (delay) { var start = new Date().getTime();
    //     while (new Date().getTime() < start + delay); }
    loading_show();


    let select = [];
    var sorted_image = [];
    var similarity_score = [];

    $("input[name=check]:checked").each(function (i) {
        select.push($(this).val());
    });

    console.log(select)
    // var first_data = new FormData();
    // first_data.append('select', select);


    $.ajax({
        url: '/main/oil/',
        type: 'POST',
        data: JSON.stringify({'select': select}),
        enctype: 'multipart/form-data',
        async: false,
        datatype: 'json',
        success: function (data) { // AJAX 통신이 성공하면 해당 과일의 영어 단어가 출려되도록
            let result = data.result;
            for (let i = 0; i < result.length; i++) {
                sorted_image.push(result[i][0]);
                similarity_score.push(result[i][1]);
            }
            console.log("success")
        }
    });
    console.log(sorted_image)

    let file = $('#files')[0].files[0];
    let key = ($('#filename').val() + '.png');

    console.log(file)
    console.log(key)


    let form_data = new FormData()

    form_data.append('img', file)
    form_data.append('key', key)
    form_data.append('sorted_image', sorted_image)


    $.ajax({
        type: "POST",
        url: "http://localhost:5000/api/v1/nsts/",
        data: form_data,
        cache: false,
        processData: false,
        contentType: false,
        // async: false,
        enctype: 'multipart/form-data',
        success: function (response) {
            console.log(response.file_url)

            let temp_list = response.file_url
            for (let i = 0; i < temp_list.length; i++) {
                let temp_html = `<div class="listbox" style="border-radius: 5%;">
                    <img src=${temp_list[i]} class="listpicone" style="border-radius: 10%;">
                    <div class="edges edgeL"></div>
                    <div class="edges edgeR"></div>
                    <p class="listname">${sorted_image[i]}</p>
                    <p class="listsim">Similarity Percent :  ${similarity_score[i]}%</p>
                </div>`

                $('#modal_list').append(temp_html)
            }
        },
        error: function (request, status, error) {
            alert('error')

            console.log(request, status, error)
        }
        ,
        complete: function (response) {
        $('#canvas').hide();

            console.log('끝까지 실행완료됨.')



            // 모달창에서 완성화면을 보여줘야함 이 부분 아직 안 만들음.

        }
    })
    ;
})

            setTimeout((
    ) => {console.log("첫 번째 메시지")}, 3000);

setTimeout(() => {console.log("두 번째 메시지")}, 1000);

// $(document).ajaxStart(function() {
//
//     //마우스 커서를 로딩 중 커서로 변경 $('html').css("cursor", "wait");
// });

//로딩바
            function changePet() {
                const animalArray = [
                    '🐱',
                    '🐶',
                    '🐰',
                    '🦊',
                    '🐷',
                    '🐹',
                    '🦁',
                    '🐸',
                    '🐯',
                    '🦄',
                    '🐻',
                    '🐵'];

                const hasSunniesArray = [
                    '🐱',
                    '🐶',
                    '🐰',
                    '🦊',
                    '🐹',
                    '🐯',
                    '🐻',
                    '🐵'];

                const pet = document.querySelector('.pet');

                const arrayIndex = animalArray.findIndex(animal => animal === pet.innerHTML);
                const lastArrayIndex = animalArray.length - 1;
                /* TIL — with Array.prototype.reduce() I could find the last item in my array: animalArray.reduce((acc, curr) => curr, null); */

                const newPet = arrayIndex === lastArrayIndex ? animalArray[0] : animalArray[arrayIndex + 1];

                const sunnies = document.querySelector('.pet-sunnies');
                const petHasSunnies = hasSunniesArray.find(animal => animal === newPet);
                if (typeof petHasSunnies === 'undefined') {
                    sunnies.style.opacity = '0';
                } else {
                    sunnies.style.opacity = '1';
                }

                pet.innerHTML = newPet;
            }

            const canvas = document.querySelector('.canvas');
            canvas.addEventListener('click', changePet, false);

//
// <img type="button" src="https://cdn-icons-png.flaticon.com/128/565/565787.png"
//      style="width: 1vw; position: relative; top: -3.3vw; left: 19.85vw;" alt="">
//     <img type="button" onClick="(${temp_list[i]})" src="https://cdn-icons-png.flaticon.com/128/724/724933.png"
//          style="width: 1vw; position: relative; top: -1.1vw; left: 18.70vw;" alt="">
//         <a href=${temp_list[i]} data-title="Expansion" data-lightbox="example-set"></a>

// 석준님 다운로드 링크 및 이미지 크게보기 아이콘
// <a data-title="Expansion" data-lightbox="example-set"><img src="https://cdn-icons-png.flaticon.com/128/565/565787.png"
//                                                            style="width: 1vw; position: relative; top: -3.3vw; left: 19.85vw;"
//                                                            alt=""></a>
// <a href=${temp_list[i]} data-title="Download" data-lightbox="example-set"><img type="button" onClick="(${temp_list[i]})"
//                                                                                src="https://cdn-icons-png.flaticon.com/128/724/724933.png"
//                                                                                style="width: 1vw; position: relative; top: -1.1vw; left: 18.70vw;"
//                                                                                alt=""></a>