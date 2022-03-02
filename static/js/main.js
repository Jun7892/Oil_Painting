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
        // $('#list').empty()
        // $('#files').empty()
        location.reload()
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
            $('.blurryText').innerHTML=String(select.length);
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
                let none_jpg = sorted_image[i].split('.')[0]
                let temp_html = `<div class="listbox" style="border-radius: 5%;">
                    <img src=${temp_list[i]} class="listpicone" style="border-radius: 10%;">
                    <div class="edges edgeL"></div>
                    <div class="edges edgeR"></div>
                    <p class="listname" style="font-family: 'Gamja Flower', cursive;">${none_jpg}</p>
                    <p class="listsim">Similarity Percent :  ${similarity_score[i]}%</p>
                    <a href=${temp_list[i]} data-title="Expansion" data-lightbox="example-set">
                        <img src="https://cdn-icons-png.flaticon.com/128/565/565787.png"
                        style="width: 1vw; position: relative; top: -3.8vw; left: 19.85vw;" alt="">
                    </a>
                    <a href=${temp_list[i]}>
                        <img type="button" onclick="(${temp_list[i]})" 
                        src="https://cdn-icons-png.flaticon.com/128/724/724933.png"
                        style="width: 1vw; position: relative; top: -1.5vw; left: 18.70vw;" alt="">
                    </a>
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

setTimeout(() => {
    console.log("첫 번째 메시지")
}, 3000);

setTimeout(() => {
    console.log("두 번째 메시지")
}, 1000);

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
// <a style="display:none;" href="https://opgg-com-image.akamaized.net/attach/images/20200725134328.953680.jpg"
//    data-title="Download" data-lightbox="example-set">
//     <img src="https://placekitten.com/100/99" onClick="location.href" alt="">
// </a>


// 이미지 확대 및 다운로드 js

!function (a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : a.lightbox = b(a.jQuery)
}(this, function (a) {
    function b(b) {
        this.album = [], this.currentImageIndex = void 0, this.init(), this.options = a.extend({}, this.constructor.defaults), this.option(b)
    }

    return b.defaults = {
        albumLabel: "Image %1 of %2",
        alwaysShowNavOnTouchDevices: !1,
        fadeDuration: 600,
        fitImagesInViewport: !0,
        imageFadeDuration: 600,
        positionFromTop: 50,
        resizeDuration: 700,
        showImageNumberLabel: !0,
        wrapAround: !1,
        disableScrolling: !1,
        sanitizeTitle: !1
    }, b.prototype.option = function (b) {
        a.extend(this.options, b)
    }, b.prototype.imageCountLabel = function (a, b) {
        return this.options.albumLabel.replace(/%1/g, a).replace(/%2/g, b)
    }, b.prototype.init = function () {
        var b = this;
        a(document).ready(function () {
            b.enable(), b.build()
        })
    }, b.prototype.enable = function () {
        var b = this;
        a("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function (c) {
            return b.start(a(c.currentTarget)), !1
        })
    }, b.prototype.build = function () {
        if (!(a("#lightbox").length > 0)) {
            var b = this;
            a('<div id="lightboxOverlay" tabindex="-1" class="lightboxOverlay"></div><div id="lightbox" tabindex="-1" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt=""/><div class="lb-nav"><a class="lb-prev" aria-label="Previous image" href="" ></a><a class="lb-next" aria-label="Next image" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(a("body")), this.$lightbox = a("#lightbox"), this.$overlay = a("#lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".lb-outerContainer"), this.$container = this.$lightbox.find(".lb-container"), this.$image = this.$lightbox.find(".lb-image"), this.$nav = this.$lightbox.find(".lb-nav"), this.containerPadding = {
                top: parseInt(this.$container.css("padding-top"), 10),
                right: parseInt(this.$container.css("padding-right"), 10),
                bottom: parseInt(this.$container.css("padding-bottom"), 10),
                left: parseInt(this.$container.css("padding-left"), 10)
            }, this.imageBorderWidth = {
                top: parseInt(this.$image.css("border-top-width"), 10),
                right: parseInt(this.$image.css("border-right-width"), 10),
                bottom: parseInt(this.$image.css("border-bottom-width"), 10),
                left: parseInt(this.$image.css("border-left-width"), 10)
            }, this.$overlay.hide().on("click", function () {
                return b.end(), !1
            }), this.$lightbox.hide().on("click", function (c) {
                "lightbox" === a(c.target).attr("id") && b.end()
            }), this.$outerContainer.on("click", function (c) {
                return "lightbox" === a(c.target).attr("id") && b.end(), !1
            }), this.$lightbox.find(".lb-prev").on("click", function () {
                return 0 === b.currentImageIndex ? b.changeImage(b.album.length - 1) : b.changeImage(b.currentImageIndex - 1), !1
            }), this.$lightbox.find(".lb-next").on("click", function () {
                return b.currentImageIndex === b.album.length - 1 ? b.changeImage(0) : b.changeImage(b.currentImageIndex + 1), !1
            }), this.$nav.on("mousedown", function (a) {
                3 === a.which && (b.$nav.css("pointer-events", "none"), b.$lightbox.one("contextmenu", function () {
                    setTimeout(function () {
                        this.$nav.css("pointer-events", "auto")
                    }.bind(b), 0)
                }))
            }), this.$lightbox.find(".lb-loader, .lb-close").on("click", function () {
                return b.end(), !1
            })
        }
    }, b.prototype.start = function (b) {
        function c(a) {
            d.album.push({
                alt: a.attr("data-alt"),
                link: a.attr("href"),
                title: a.attr("data-title") || a.attr("title")
            })
        }

        var d = this, e = a(window);
        e.on("resize", a.proxy(this.sizeOverlay, this)), this.sizeOverlay(), this.album = [];
        var f, g = 0, h = b.attr("data-lightbox");
        if (h) {
            f = a(b.prop("tagName") + '[data-lightbox="' + h + '"]');
            for (var i = 0; i < f.length; i = ++i) c(a(f[i])), f[i] === b[0] && (g = i)
        } else if ("lightbox" === b.attr("rel")) c(b); else {
            f = a(b.prop("tagName") + '[rel="' + b.attr("rel") + '"]');
            for (var j = 0; j < f.length; j = ++j) c(a(f[j])), f[j] === b[0] && (g = j)
        }
        var k = e.scrollTop() + this.options.positionFromTop, l = e.scrollLeft();
        this.$lightbox.css({
            top: k + "px",
            left: l + "px"
        }).fadeIn(this.options.fadeDuration), this.options.disableScrolling && a("body").addClass("lb-disable-scrolling"), this.changeImage(g)
    }, b.prototype.changeImage = function (b) {
        var c = this, d = this.album[b].link, e = d.split(".").slice(-1)[0], f = this.$lightbox.find(".lb-image");
        this.disableKeyboardNav(), this.$overlay.fadeIn(this.options.fadeDuration), a(".lb-loader").fadeIn("slow"), this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(), this.$outerContainer.addClass("animating");
        var g = new Image;
        g.onload = function () {
            var h, i, j, k, l, m;
            f.attr({
                alt: c.album[b].alt,
                src: d
            }), a(g)
                // , f.width(g.width), f.height(g.height)
                , m = a(window).width(), l = a(window).height(), k = m - c.containerPadding.left - c.containerPadding.right - c.imageBorderWidth.left - c.imageBorderWidth.right - 20, j = l - c.containerPadding.top - c.containerPadding.bottom - c.imageBorderWidth.top - c.imageBorderWidth.bottom - c.options.positionFromTop - 70, "svg" === e && (0 !== g.width && 0 !== g.height || (f.width(k), f.height(j))), c.options.fitImagesInViewport ? (c.options.maxWidth && c.options.maxWidth < k && (k = c.options.maxWidth), c.options.maxHeight && c.options.maxHeight < j && (j = c.options.maxHeight)) : (k = c.options.maxWidth || g.width || k, j = c.options.maxHeight || g.height || j), (g.width > k || g.height > j) && (g.width / k > g.height / j ? (i = k, h = parseInt(g.height / (g.width / i), 10), f.width(i), f.height(h)) : (h = j, i = parseInt(g.width / (g.height / h), 10), f.width(i), f.height(h))), c.sizeContainer(f.width(), f.height())
        }, g.src = this.album[b].link, this.currentImageIndex = b
    }, b.prototype.sizeOverlay = function () {
        var b = this;
        setTimeout(function () {
            b.$overlay.width(a(document).width()).height(a(document).height())
        }, 0)
    }, b.prototype.sizeContainer = function (a, b) {
        function c() {
            d.$lightbox.find(".lb-dataContainer").width(g), d.$lightbox.find(".lb-prevLink").height(h), d.$lightbox.find(".lb-nextLink").height(h), d.$overlay.focus(), d.showImage()
        }

        var d = this, e = this.$outerContainer.outerWidth(), f = this.$outerContainer.outerHeight(),
            g = a + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right,
            h = b + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;
        e !== g || f !== h ? this.$outerContainer.animate({
            width: g,
            height: h
        }, this.options.resizeDuration, "swing", function () {
            c()
        }) : c()
    }, b.prototype.showImage = function () {
        this.$lightbox.find(".lb-loader").stop(!0).hide(), this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav()
    }, b.prototype.updateNav = function () {
        var a = !1;
        try {
            document.createEvent("TouchEvent"), a = !!this.options.alwaysShowNavOnTouchDevices
        } catch (a) {
        }
        this.$lightbox.find(".lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (a && this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"), this.$lightbox.find(".lb-prev, .lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".lb-prev").show(), a && this.$lightbox.find(".lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".lb-next").show(), a && this.$lightbox.find(".lb-next").css("opacity", "1"))))
    }, b.prototype.updateDetails = function () {
        var a = this;
        if (void 0 !== this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title) {
            var b = this.$lightbox.find(".lb-caption");
            this.options.sanitizeTitle ? b.text(this.album[this.currentImageIndex].title) : b.html(this.album[this.currentImageIndex].title), b.fadeIn("fast")
        }
        if (this.album.length > 1 && this.options.showImageNumberLabel) {
            var c = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
            this.$lightbox.find(".lb-number").text(c).fadeIn("fast")
        } else this.$lightbox.find(".lb-number").hide();
        this.$outerContainer.removeClass("animating"), this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration, function () {
            return a.sizeOverlay()
        })
    }, b.prototype.preloadNeighboringImages = function () {
        if (this.album.length > this.currentImageIndex + 1) {
            (new Image).src = this.album[this.currentImageIndex + 1].link
        }
        if (this.currentImageIndex > 0) {
            (new Image).src = this.album[this.currentImageIndex - 1].link
        }
    }, b.prototype.enableKeyboardNav = function () {
        this.$lightbox.on("keyup.keyboard", a.proxy(this.keyboardAction, this)), this.$overlay.on("keyup.keyboard", a.proxy(this.keyboardAction, this))
    }, b.prototype.disableKeyboardNav = function () {
        this.$lightbox.off(".keyboard"), this.$overlay.off(".keyboard")
    }, b.prototype.keyboardAction = function (a) {
        var b = a.keyCode;
        27 === b ? (a.stopPropagation(), this.end()) : 37 === b ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : 39 === b && (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0))
    }, b.prototype.end = function () {
        this.disableKeyboardNav(), a(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), this.options.disableScrolling && a("body").removeClass("lb-disable-scrolling")
    }, new b
});




