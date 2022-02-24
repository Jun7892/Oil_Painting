var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('div_YouTube', {
        videoId: 'nDgvmyBnrp0',   // The video id.
        playerVars: {
            'autoplay': 1,		// Autoplay when page loads.
            'controls': 0,
            'showinfo': 0,
            'modestbranding': 1,
            'loop': 0,
            'fs': 0,
            'cc_load_policty': 0,
            'iv_load_policy': 3,
            'rel': 0,
            'autohide':1,
            //'playlist': 'nDgvmyBnrp0'
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
function onPlayerReady(event) {
        event.target.mute();
        event.target.setVolume(50);
        event.target.playVideo();
    }

function onPlayerStateChange(event) {
    if (event.data === 0) {
        // 종료 후 작업을 여기에 코딩
        window.location.href='http://127.0.0.1:8000/second/';
    }
}

function toggleSound() {
  if (player.isMuted()) {
    player.unMute()
  } else {
    player.mute()
  }
}