/* jshint esversion: 6 */

class VideoPlayer {
  constructor(id = 0) {
    this.startDuration = null;
    this.widthClientBrowser = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    this.initDOMElements(id);
    this.beginEvent();
    this.trackTimeElapsedVideo = this.trackTimeElapsedVideo.bind(this);
  }

  initDOMElements(id) {
    this.video = document.getElementsByClassName('video-player__source')[id];
    this.duration = document.getElementsByClassName('video-player__slider')[id];
    this.playPause = document.getElementsByClassName('video-player__play')[id];
    this.posterText = document.getElementsByClassName('video-player__poster')[id];
    this.buttonFullScreen = document.getElementsByClassName('video-player__fullscreen-video')[id];
  }

  /**/

  setDurationStartValue(durationValue) {
    this.startDuration = durationValue;
  }

  setDurationValue(durationValue) {
    this.duration.value = durationValue;
  }

  setVideoCurrentTime(currentTime) {
    this.video.currentTime = currentTime;
  }

  setDurationMin(durationMin) {
    this.duration.min = durationMin;
  }

  /**
   * set the max value that will be played (...359)
   */
  setDurationMax(durationMax) {
    this.duration.max = durationMax;
  }

  setPlayPauseImagePos(position) {
    this.playPause.style.backgroundPosition = position;
  }

  setPosterTextStyle(display) {
    this.posterText.style.display = display;
  }

  /**/

  playPauseVideo() {
    if (this.video.paused) {
      this.video.play();
      this.setDurationStartValue(setInterval(this.trackTimeElapsedVideo, 1000));
      this.setPlayPauseImagePos('-90px -14px');
      this.setPosterTextStyle('none');
      this.setDurationMax(Math.round(this.video.duration));
    } else {
      this.video.pause();
      clearInterval(this.startDuration);
      this.setPlayPauseImagePos('-46px -14px');

      if (this.widthClientBrowser >= 450) {
        this.setPosterTextStyle('block');
      }
    }
  }

  trackTimeElapsedVideo() {
    this.setDurationValue(this.video.currentTime);

    console.log('video.currentTime: ' + this.video.currentTime);
    console.log('duration.value: ' + this.duration.value);
    console.log('video.duration: ' + this.video.duration);
  }

  /**
   * to change the status of the slider
   */
  clearAnimateRangeVideo() {
    clearInterval(this.startDuration);

    // to start the video when rewinding
    if (!this.video.paused) {
      this.playPauseVideo();
    }
  }

  rewindVideoBySlider() {
    this.setVideoCurrentTime(this.duration.value);
    this.playPauseVideo();
  }

  fullScreenVideoMode() {
    if (this.video.requestFullscreen) {
      this.video.requestFullscreen();
    } else if (this.video.msRequestFullscreen) {
      this.video.msRequestFullscreen();
    } else if (this.video.mozRequestFullScreen) {
      this.video.mozRequestFullScreen();
    } else if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen();
    }
  }

  /**/

  beginEvent() {
    this.setDurationValue(0);
    this.setDurationMin(0);

    this.video.onclick = () => {
      this.playPauseVideo();
    };

    this.playPause.onclick = () => {
      this.playPauseVideo();
    };

    this.duration.onmousedown = () => {
      this.clearAnimateRangeVideo();
    };

    this.duration.onmouseup = () => {
      this.rewindVideoBySlider();
    };

    this.buttonFullScreen.onclick = () => {
      this.fullScreenVideoMode();
    };
  }
}

new VideoPlayer();
