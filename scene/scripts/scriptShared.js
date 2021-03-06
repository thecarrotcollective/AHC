console.log("sharedScript.js loaded");

var copyJSON;
var languageID = 0;

var url = window.location.href;
var selectedLanguage = url.substr(url.indexOf('#')+1, 2);
var url_params = url.substr(url.indexOf('#')+1)
var selectedPersonality = url_params.substr(url_params.indexOf('-')+1, 2);
var muted = url_params[url_params.length-1].indexOf('m') === 0 ||  url_params[url_params.length-1].indexOf('M') === 0

var CHINA = 0
var KOREA = 1
var TAIWAN = 2
var JAPAN = 3

var region =  CHINA;

var therapyOption = 0

fetch('https://extreme-ip-lookup.com/json/')
    .then(res => res.json())
    .then(response => {
      code =  response.countryCode
      console.log("Country: ", response.countryCode);
      if (code.localeCompare('CN') === 0) {
        region =  CHINA;
      } else if (code.localeCompare('KR') === 0) {
        region =  KOREA;
      } else if (code.localeCompare('TW') === 0) {
        region =  TAIWAN;
      } else if (code.localeCompare('JP') === 0) {
        region =  JAPAN;
      } else {
        region =  CHINA;
      }
      console.log("region set to " + region);
    })
    .catch((data, status) => {
      console.log('Request failed');
      region =  CHINA;
      console.log("region set failed");
    })

document.getElementById('mute-unmute-btn').addEventListener('click', function(e) {
  muted = !muted;
});

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', '../shared/copy.json', true);
  xobj.onreadystatechange = function (){
    console.log('xobj ready');
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
      copyJSON = JSON.parse(xobj.responseText);
      console.log('JSON parse begun');
    }
  };
  xobj.send(null);
}

var leadingURL = ""
// if(region === CHINA){
//   leadingURL = "https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/"
// }

document.getElementById('selfie-btn').addEventListener("click", openSelfie);
console.log(url_params);

function openSelfie(){
  if(url_params[url_params.length-1] === 'u' || url_params[url_params.length-1] === 'm' || url_params[url_params.length-1] === 'M' || url_params[url_params.length-1] === 'U'){
    // muted = url_params[url_params.length-1].indexOf('m') === 0 ||  url_params[url_params.length-1].indexOf('M') === 0
    console.log(muted);
    if(muted){
      url_params = url_params.substr(0, url_params.length-1) + "m"
    } else {
      url_params = url_params.substr(0, url_params.length-1) + "u"
    }
  }
  window.location.href="../selfie/camera.html#"+url_params
}


function setLang(id){
  document.getElementById('share-btn').innerHTML = copyJSON.ShareWithFriend[id]
  if(selectedPersonality.localeCompare("th") === 0 || selectedPersonality.localeCompare("in") === 0){
    therapyOption = 1;
    document.getElementById('pool-btn').innerHTML = copyJSON.SensorialCTAIntrovertThinker[id] +' '+ copyJSON.StartTherapyButton[id]
  } else {
    therapyOption = 0;
    document.getElementById('pool-btn').innerHTML = copyJSON.SensorialCTAExtrovertFeeler[id] +' '+ copyJSON.StartTherapyButton[id]
  }
  document.getElementById('selfie-btn').innerHTML = copyJSON.TakeSelfieCTA[id]
  document.getElementById('beauty-btn').innerHTML = copyJSON.WatchAHCKBeauty[id]
  document.getElementById('orb-btn').innerHTML = copyJSON.FindOutMore[id]
  document.getElementById('productButton-1').innerHTML = copyJSON.FindOutMore[id]
  document.getElementById('productButton-2').innerHTML = copyJSON.FindOutMore[id]
  document.getElementById('productButton-3').innerHTML = copyJSON.FindOutMore[id]
  document.getElementById('prod1-title').innerHTML = copyJSON.Product1[id]
  document.getElementById('prod2-title').innerHTML = copyJSON.Product2[id]
  document.getElementById('prod3-title').innerHTML = copyJSON.Product3[id]
  document.getElementById('beauty-video-title').innerHTML = copyJSON.ChooseKoreanAesthetic[id]
  document.getElementById('privacy-link-start').innerHTML = copyJSON.PrivacyPolicyStart[id]

  document.getElementById('privacy-link').innerHTML = copyJSON.PrivacyPolicy2[id]
  document.getElementById('privacy-btn').addEventListener('click', handlePrivacyPolicyPopUp);
  document.getElementById('privacy-btn-start').addEventListener('click', handlePrivacyPolicyPopUp);

  function handlePrivacyPolicyPopUp(){
    if(languageID == 2){
      document.getElementById('privacy-cn').style.display = "block"
      document.getElementById('back-cn').addEventListener('click', function(e) {
        document.getElementById('privacy-cn').style.display = "none"
      })
    } else if(languageID == 1){
      document.getElementById('privacy-kr').style.display = "block"
      document.getElementById('back-kr').addEventListener('click', function(e) {
        document.getElementById('privacy-kr').style.display = "none"
      })
    } else {
      document.getElementById('privacy-en').style.display = "block"
      document.getElementById('back-en').addEventListener('click', function(e) {
        document.getElementById('privacy-en').style.display = "none"
      })
    }
  }
  var prodImageURL = ""
  if(languageID == 2){
    prodImageURL = "ZH"
  } else if (languageID == 1){
    prodImageURL = "KO"
  }

  document.getElementById('beauty-vid-1').innerHTML = "<img class=\"beauty-thumbnails\" src=\"images/treatment1" + prodImageURL+ ".jpg\">"
  document.getElementById('beauty-vid-2').innerHTML = "<img class=\"beauty-thumbnails\" src=\"images/treatment2" + prodImageURL+ ".jpg\">"
  document.getElementById('beauty-vid-3').innerHTML = "<img class=\"beauty-thumbnails\" src=\"images/treatment3" + prodImageURL+ ".jpg\">"
  document.getElementById('back-btn').innerHTML = "<img id=\"back-btn-img\" src=\"UIAssets/arrow_white_rotated" + prodImageURL+ ".png\">"

  if(region === CHINA){
    document.getElementById('share-experience-title').innerHTML = copyJSON.SharePopUp[id]
    document.getElementById('enter-phone').innerHTML = copyJSON.EnterPhone[id]
  } else {
    document.getElementById('share-experience-title').innerHTML = ""
    document.getElementById('enter-phone').innerHTML = copyJSON.SharePopUp[id]
    document.getElementById('phone').style.display = 'none'
  }
  document.getElementById('share-submit').innerHTML = copyJSON.ShareButton[id]

  document.documentElement.lang = copyJSON.code[id];

  console.log("language set to " + document.documentElement.lang);
}


loadJSON(function(response) {
  console.log("started loading JSON");
  // Parse JSON string into object
  copyJSON = JSON.parse(response);
//    console.log(copyJSON);
  console.log("language is "+selectedLanguage);
  if(selectedLanguage.localeCompare("zh") === 0){
    // document.getElementsByTagName("BODY")[0].style.fontFamily = "Noto-CN-Regular  !important";
    languageID = 2
  } else if (selectedLanguage.localeCompare("ko") === 0){
    // document.getElementsByTagName("BODY")[0].style.fontFamily = "Noto-KR-Regular  !important"
    languageID = 1
  } else {
    // document.getElementsByTagName("BODY")[0].style.fontFamily = "Pangram-Regular  !important";
    languageID = 0
  }
  setLang(languageID)

  LoadPage();

});

var skipped = false;

function LoadPage() {
  if(selectedPersonality === 'fe'){

    imageurl ="../personalitytest/images/opt/arch5.webp";
    spaText=copyJSON.Feeler[languageID]
    personiltyType = copyJSON.FeelerHeadline[languageID]
    infoText=copyJSON.FeelerExplanation[languageID]

  }else if(selectedPersonality === 'in'){
    imageurl ="../personalitytest/images/opt/arch4.webp";
    spaText=copyJSON.Introvert[languageID]
    infoText=copyJSON.IntrovertExplanation[languageID]
    personiltyType = copyJSON.IntrovertHeadline[languageID]
  }
  else if(selectedPersonality === 'th'){
    imageurl ="../personalitytest/images/opt/arch3.webp";
    spaText=copyJSON.Thinker[languageID]
    infoText=copyJSON.ThinkerExplanation[languageID]
    personiltyType = copyJSON.ThinkerHeadline[languageID]
  }else if(selectedPersonality === 'ex'){
    imageurl ="../personalitytest/images/opt/arch2.webp";
    spaText=copyJSON.Extrovert[languageID]
    personiltyType = copyJSON.ExtrovertHeadline[languageID]
    spaText=copyJSON.Extrovert[languageID]
    infoText=copyJSON.ExtrovertExplanation[languageID]
  } else {
    imageurl ="../personalitytest/images/opt/arch5.webp";
    spaText=copyJSON.Feeler[languageID]
    personiltyType = copyJSON.FeelerHeadline[languageID]
    infoText=copyJSON.FeelerExplanation[languageID]
    skipped = true;
  }
  var personiltyTypeHtml = personiltyType;
  var element2 = document.getElementById("question")
  element2.innerHTML = personiltyTypeHtml;
  // document.getElementById('archid').style.display = 'flex';
  // document.getElementById('infoText').style.display = 'flex';
  // document.getElementById('middleText').style.display = 'flex';
  // document.getElementById('controls_id').style.display = 'flex';
  // document.getElementById('questionDiv').style.display = 'flex';
  var spaText = "<h1 >"+spaText+"</h1>";
  var element = document.getElementById("personality");
  // element.style.display = "flex"
  element.innerHTML = spaText;

  var buttonText = copyJSON.GoToSpa[languageID];
  var element3 = document.getElementById("start-btn")
  element3.innerHTML = buttonText;

  var resultImg = "<img id=\"arch-image\" src="+ imageurl +" style=\" max-width: 80%;  height: 100%; object-fit: contain; object-position: center center;\" "+ ">";
  var element4 = document.getElementById("archid");
  element4.innerHTML = resultImg

  var infoTextHtml = infoText;
  var element5 = document.getElementById("infoText")
  element5.innerHTML = infoTextHtml;
  if(skipped){
    document.getElementById('question').style.display = "none"
    document.getElementById('middleText').style.display = "none"
    document.getElementById('start-btn').style.bottom = "45%"
  }
  // document.getElementById("video2").innerHTML= "<source src=\"video/AHC-SPA-VIDEO.mp4\" type=\"video/mp4\" />"

}


document.getElementById('question').style.opacity = 1;
document.getElementById('questionDiv').style.top = '12%';
document.getElementById('content').style.opacity = 1;

var url = window.location.href;
var selectedLanguage = url.substr(url.indexOf('#')+1, 2);

document.getElementById('pool-btn').addEventListener("click", openTherapy);
document.getElementById('beauty-btn').addEventListener("click", openBeauty);
document.getElementById('orb-btn').addEventListener("click", openOrbVideo);

function openOrbVideo(){
  document.getElementById('orb-vid').style.display = 'block';
  document.getElementById('beauty-treatment-overlay').style.display = "none"
  document.getElementById('vid-2').style.display = "none"
  document.getElementById('vid-1').style.display = "none"
  document.getElementById('vid-3').style.display = "none"
  document.getElementById('video2').style.display = 'none';
  document.getElementById('video_id').style.display = 'block';
  document.getElementById('blackScreen').style.display = 'block';
  document.getElementById('close-btn').style.display = 'block';
  document.getElementById('blackScreen').style.animation = " opacityAnim2 1.5s ease-in-out forwards";
  var player = videojs('#orb-vid');

  //MITHRU DIFFERENT LANGUAGE FOR DIFFERENT VIDEO STATEMENT IS WORKING
  if(selectedLanguage == "en"){
    // player.src('video/orb/orbvideo_en.mp4')
    player.src(leadingURL+'video/orb/orbvideo_en.mp4')
  } else if (selectedLanguage == "ko"){
    // player.src('video/orb/orbvideo_ko.mp4')
    player.src(leadingURL+'video/orb/orbvideo_ko.mp4')
  } else {
    // player.src('video/orb/orbvideo.mp4')
    player.src(leadingURL+'video/orb/orbvideo.mp4')
  }

  var video = document.getElementById('orb-vid');
  // video.requestFullscreen();
  player.muted(muted);
  player.play();

  document.getElementById("mute-unmute-btn").style.display = "none"

  document.getElementById('orb-text').style.opacity = 0;
  document.getElementById('orb-btn').style.opacity = 0;
  document.getElementById('orb-btn').style.pointerEvents = "none";

  document.getElementById('close-btn').addEventListener("click", function(e){
    document.getElementById('orb-text').style.opacity = 1;
    document.getElementById('orb-btn').style.opacity = 1;
    document.getElementById('orb-btn').style.pointerEvents = "auto";
  });
  document.getElementById('close-btn').addEventListener("click", function(e){
    closeVideo();
    document.getElementById('blackScreen').style.display = 'none';
    document.getElementById('blackScreen').style.animation = " opacityAnim2 1.5s ease-in-out forwards";
  });

  player.on('ended', function () {
    // document.getElementById('close-btn').addEventListener("click", function(e){

    // });
    closeVideo();
    document.getElementById('blackScreen').style.display = 'none';
    document.getElementById('blackScreen').style.animation = " opacityAnim2 1.5s ease-in-out forwards";
    if (this.isFullscreen()){
      player.exitFullscreen();
      console.log("fullScreenClosed")
    }
    //
    // if(player.isFullscreen(true)){

    // }
    document.getElementById('orb-text').style.opacity = 1;
    document.getElementById('orb-btn').style.opacity = 1;
    document.getElementById('orb-btn').style.pointerEvents = "auto";
  })

}

function openTherapy(){
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    document.getElementById("video_id").style.height= "50%"
    document.getElementById("video_id").style.width= "90%"
  }else{
    document.getElementById("video_id").style.height= "50%"
    document.getElementById("video_id").style.width= "50%"
  }
  document.getElementById('orb-vid').style.display = 'none';
  document.getElementById('vid-2').style.display = "none"
  document.getElementById('vid-1').style.display = "none"
  document.getElementById('vid-3').style.display = "none"
  document.getElementById('video2').style.display = 'block';
  document.getElementById('video_id').style.display = 'block';
  document.getElementById('blackScreen').style.display = 'block';
  document.getElementById('close-btn').style.display = 'block';
  document.getElementById('beauty-treatment-overlay').style.display = "none"
  document.getElementById('blackScreen').style.animation = " opacityAnim2 1.5s ease-in-out forwards";
  var player = videojs('#video2');


  //MITHRU 2 DIFFERENT VIDEO DIFFERENT & LANGUAGE FOR DIFFERENT VIDEO STATEMENT IS WORKING
  if(therapyOption == 0){
    if(selectedLanguage == "en"){
      // player.src('video/therapy/ext-en.mp4')
      player.src(leadingURL+'video/therapy/ext-en.mp4')
    }else if(selectedLanguage == "ko"){
      // player.src('video/therapy/ext-ko.mp4')
      player.src(leadingURL+'video/therapy/ext-ko.mp4')
    }else{
      // player.src('video/therapy/ext-zh.mp4')
      player.src(leadingURL+'video/therapy/ext-zh.mp4')
    }
  }else{
    if(selectedLanguage == "en"){
      // player.src('video/therapy/int-en.mp4')
      player.src(leadingURL+'video/therapy/int-en.mp4')
    }else if(selectedLanguage == "ko"){
      // player.src('video/therapy/int-ko.mp4')
      player.src(leadingURL+'video/therapy/int-ko.mp4')
    }else{
      // player.src('video/therapy/int-zh.mp4')
      player.src(leadingURL+'video/therapy/int-zh.mp4')
    }
  }

  var video = document.getElementById('video2');
  // video.requestFullscreen();
  player.muted(muted);
  player.play();
  document.getElementById("mute-unmute-btn").style.display = "none"

  document.getElementById('pool-text').style.opacity = 0;
  document.getElementById('pool-btn').style.opacity = 0;
  document.getElementById('pool-btn').style.pointerEvents = "none";

  document.getElementById('close-btn').addEventListener("click", function(e){
    console.log("video is closed")
    document.getElementById('pool-text').style.opacity = 1;
    document.getElementById('pool-btn').style.opacity = 1;
  });


  document.getElementById('close-btn').addEventListener("click", function(e){
    closeVideo();
    document.getElementById('blackScreen').style.display = 'none';
    document.getElementById('blackScreen').style.animation = " opacityAnim2 1.5s ease-in-out forwards";
  });

  player.on('ended', function () {
    closeVideo();
    document.getElementById('blackScreen').style.display = 'none';
    document.getElementById('blackScreen').style.animation = " opacityAnim2 1.5s ease-in-out forwards";
    if (this.isFullscreen()){
      player.exitFullscreen();

    }
    document.getElementById('pool-text').style.opacity = 1;
    document.getElementById('pool-btn').style.opacity = 1;
    document.getElementById('pool-btn').style.pointerEvents = "auto";
  })
}

function makeFullScreen(){
  document.getElementById("video_id").style.height= "100%"
  document.getElementById("video_id").style.width= "100%"
  document.getElementById("video_id").style.transform = `translateX(0%) translateY(0%)`;
}

document.getElementById('back-btn').addEventListener("click", closeBeauty);
document.getElementById('beauty-vid-1').addEventListener("click", playVideo1);
document.getElementById('beauty-vid-2').addEventListener("click", playVideo2);
document.getElementById('beauty-vid-3').addEventListener("click", playVideo3);

function playVideo1(){
  document.getElementById('orb-vid').style.display = 'none';
  document.getElementById('vid-2_html5_api').style.display = "none"
  document.getElementById('vid-1_html5_api').style.display = "block"
  document.getElementById('vid-3_html5_api').style.display = "none"
  document.getElementById('beauty-treatment-overlay').style.display = "none"
  document.getElementById('vid-1').style.display = 'block';
  document.getElementById('vid-2').style.display = 'none';
  document.getElementById('vid-3').style.display = 'none';
  document.getElementById('video2').style.display = 'none';
  document.getElementById('video_id').style.display = 'block';
  document.getElementById('blackScreen').style.display = 'block';
  document.getElementById('close-btn').style.display = 'block';
  document.getElementById('blackScreen').style.animation = " opacityAnim2 1.5s ease-in-out forwards";
  var player = videojs('#vid-1');

  //MITHRU DIFFERENT LANGUAGE FOR DIFFERENT VIDEO STATEMENT IS WORKING
  if(selectedLanguage == "en"){
    // player.src('video/beauty/Amp-Eng.mp4')
    player.src(leadingURL+'video/beauty/Amp-Eng.mp4')
  }else if(selectedLanguage == "ko"){
    // player.src('video/beauty/Amp-Kor.mp4')
    player.src(leadingURL+'video/beauty/Amp-Kor.mp4')
  }else{
    // player.src('video/beauty/Amp.mp4')
    player.src(leadingURL+'video/beauty/Amp.mp4')
  }

  var video = document.getElementById('vid-1');
  // video.requestFullscreen();
  player.muted(muted);
  player.play();
  document.getElementById("mute-unmute-btn").style.display = "none"

  // player.volume = muted?0.0:1.0

  document.getElementById('close-btn').addEventListener("click",function(e){
    document.getElementById('close-btn').style.display = 'none'
    document.getElementById('vid-1').style.display = 'none';
    document.getElementById('video_id').style.display = 'none';
    videojs('#vid-1').reset()
  })

  setTimeout(function(){
    document.getElementById('close-btn').addEventListener("click", openBeauty);

  }, 50)
  player.on('ended', function () {
    closeVideo()
    if (this.isFullscreen()){
      player.exitFullscreen();

    }

    //  document.getElementById('close-btn').style.display = 'none'
    // document.getElementById('vid-1').style.display = 'none';
    // document.getElementById('video_id').style.display = 'none';
    document.getElementById('vid-1_html5_api').style.display = "none"
    videojs('#vid-1').reset()
    setTimeout(function(){
      document.getElementById('close-btn').addEventListener("click", openBeauty);
      openBeauty();
    }, 20)
  })
  player.on('closed', function () {
    document.getElementById('close-btn').style.display = 'none'
    document.getElementById('vid-1').style.display = 'none';
    document.getElementById('video_id').style.display = 'none';
    videojs('#vid-1').reset()
  })
}

function playVideo2(){
  document.getElementById('orb-vid').style.display = 'none';
  document.getElementById('vid-2_html5_api').style.display = "block"
  document.getElementById('vid-1_html5_api').style.display = "none"
  document.getElementById('vid-3_html5_api').style.display = "none"
  document.getElementById('beauty-treatment-overlay').style.display = "none"
  document.getElementById('vid-1').style.display = 'none';
  document.getElementById('video2').style.display = 'none';
  document.getElementById('vid-2').style.display = 'block';
  document.getElementById('vid-3').style.display = 'none';
  document.getElementById('video_id').style.display = 'block';
  document.getElementById('blackScreen').style.display = 'block';
  document.getElementById('close-btn').style.display = 'block';
  document.getElementById('blackScreen').style.animation = " opacityAnim2 1.5s ease-in-out forwards";
  var player = videojs('#vid-2');

  //MITHRU DIFFERENT LANGUAGE FOR DIFFERENT VIDEO STATEMENT IS WORKING
  if(selectedLanguage == "en"){
    // player.src('video/beauty/Eff-Eng.mp4')
    player.src(leadingURL+'video/beauty/Eff-Eng.mp4')
  }else if(selectedLanguage == "ko"){
    // player.src('video/beauty/Eff-Kor.mp4')
    player.src(leadingURL+'video/beauty/Eff-Kor.mp4')
  }else{
    // player.src('video/beauty/Eff.mp4')
    player.src(leadingURL+'video/beauty/Eff.mp4')
  }

  var video = document.getElementById('vid-2');
  // video.requestFullscreen();
  player.muted(muted);
  player.play();
  document.getElementById("mute-unmute-btn").style.display = "none"

  document.getElementById('close-btn').addEventListener("click",function(e){
    document.getElementById('close-btn').style.display = 'none'
    document.getElementById('vid-2').style.display = 'none';
    document.getElementById('video_id').style.display = 'none';
    videojs('#vid-2').reset()
  })
  setTimeout(function(){
    document.getElementById('close-btn').addEventListener("click", openBeauty);
  }, 50)

  player.on('ended', function () {
    closeVideo()
    if (this.isFullscreen()){
      player.exitFullscreen();

    }
    // document.getElementById('close-btn').style.display = 'none'
    // document.getElementById('vid-2').style.display = 'none';
    // document.getElementById('video_id').style.display = 'none';
    document.getElementById('vid-2_html5_api').style.display = "none"
    videojs('#vid-2').reset()
    // document.getElementById('blackScreen').style.display = 'block';
    setTimeout(function(){
      document.getElementById('close-btn').addEventListener("click", openBeauty);
      openBeauty();
    }, 20)
  })
  player.on('closed', function () {
    document.getElementById('close-btn').style.display = 'none'
    document.getElementById('vid-2').style.display = 'none';
    document.getElementById('video_id').style.display = 'none';
    videojs('#vid-2').reset()
  })
}

function playVideo3(){
  document.getElementById('orb-vid').style.display = 'none';
  document.getElementById('vid-2_html5_api').style.display = "none"
  document.getElementById('vid-1_html5_api').style.display = "none"
  document.getElementById('vid-3_html5_api').style.display = "block"
  document.getElementById('beauty-treatment-overlay').style.display = "none"
  document.getElementById('vid-1').style.display = 'none';
  document.getElementById('vid-2').style.display = 'none';
  document.getElementById('vid-3').style.display = 'block';
  document.getElementById('video_id').style.display = 'block';
  document.getElementById('blackScreen').style.display = 'block';
  document.getElementById('close-btn').style.display = 'block';
  document.getElementById('blackScreen').style.animation = " opacityAnim2 1.5s ease-in-out forwards";
  var player = videojs('#vid-3');

  //MITHRU DIFFERENT LANGUAGE FOR DIFFERENT VIDEO STATEMENT IS WORKING
  if(selectedLanguage == "en"){
    // player.src('video/beauty/Ton-Eng.mp4')
    player.src(leadingURL+'video/beauty/Ton-Eng.mp4')
  }else if(selectedLanguage == "ko"){
    // player.src('video/beauty/Ton-Kor.mp4')
    player.src(leadingURL+'video/beauty/Ton-Kor.mp4')
  }else{
    // player.src('video/beauty/Ton.mp4')
    player.src(leadingURL+'video/beauty/Ton.mp4')
  }
  // player.src('video/beauty3.mp4')
  var video = document.getElementById('vid-3');
  // video.requestFullscreen();
  player.muted(muted);
  player.play();

  document.getElementById('close-btn').addEventListener("click",function(e){
    document.getElementById('close-btn').style.display = 'none'
    document.getElementById('vid-3').style.display = 'none';
    document.getElementById('video_id').style.display = 'none';
    videojs('#vid-3').reset()
  })
  // document.getElementById('close-btn').addEventListener("click", closeVideo);
  setTimeout(function(){
    document.getElementById('close-btn').addEventListener("click", openBeauty);

  }, 50)
  // document.getElementById('vid-3').addEventListener("ended",closeVideo);
  player.on('ended', function () {
    closeVideo()
    if (this.isFullscreen()){
      player.exitFullscreen();
    }
    // document.getElementById('close-btn').style.display = 'none'
    // document.getElementById('vid-3').style.display = 'none';
    // document.getElementById('video_id').style.display = 'none';
    document.getElementById('vid-3_html5_api').style.display = "none"
    videojs('#vid-3').reset()

    setTimeout(function(){
      document.getElementById('close-btn').addEventListener("click", openBeauty);
      openBeauty();
    }, 20)
  })
  player.on('closed', function () {
    document.getElementById('close-btn').style.display = 'none'
    document.getElementById('vid-3').style.display = 'none';
    document.getElementById('video_id').style.display = 'none';
    videojs('#vid-3').reset()
  })
}

function openBeauty(){
  document.getElementById("mute-unmute-btn").style.display = "none"
  document.getElementById('beauty-treatment-overlay').style.display = "block"
  document.getElementById('blackScreen').style.display = 'block';
  document.getElementById('blackScreen').style.animation = " opacityAnim2 1.5s ease-in-out forwards";
  document.getElementById('blackScreen').style.zIndex = '1';

  document.getElementById('beauty-text').style.opacity = 0;
  document.getElementById('beauty-btn').style.opacity = 0;
  document.getElementById('beauty-btn').style.pointerEvents = "none";
}

document.getElementById('productButton-1').addEventListener("click", productLink1);
document.getElementById('productButton-2').addEventListener("click", productLink2);
document.getElementById('productButton-3').addEventListener("click", productLink3);
document.getElementById('close-product').addEventListener("click", closeProductPreview);
document.getElementById('close-product2').addEventListener("click", closeProductPreview);
document.getElementById('close-product3').addEventListener("click", closeProductPreview);
function productLink1(){

  var producturl;
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    if(region === CHINA){
      producturl = 'https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.76.300f7213tYa0So&id=626005790965&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4605078918517'
      // window.open('https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.76.300f7213tYa0So&id=626005790965&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4605078918517')
    } else if(region === TAIWAN){
      producturl = 'https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=8841698&str_category_code=2148400075&osm=t04&utm_source=BD_017217&utm_medium=ARvirtualspa-0813b&scm_activity=2021081305184iwwgtv3'
      // window.open('https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=8841698&str_category_code=2148400075&osm=t04&utm_source=BD_017217&utm_medium=ARvirtualspa-0813b&scm_activity=2021081305184iwwgtv3')
    } else if(region === KOREA){
      producturl = 'https://www.ahc.co.kr/shop/product/productView?prdIdx=1140'
      // window.open('https://www.ahc.co.kr/shop/product/productView?prdIdx=1140')
    } else {
      producturl = 'https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.76.300f7213tYa0So&id=626005790965&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4605078918517'
      // window.open('https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.76.300f7213tYa0So&id=626005790965&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4605078918517')
    }
    copyToClipboard(producturl)
    // MITHRU IN HERE BUTTON IS NONE TEXT IS BLOCK
    document.getElementById("productButton-1").style.display = 'none'
    document.getElementById("copied-button1").style.display = 'block'
    document.getElementById("copied-button1").innerHTML = copyJSON.LinkCopiedOpenBrowser[languageID]
  } else {
    if(region === CHINA){
      // producturl = 'https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.76.300f7213tYa0So&id=626005790965&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4605078918517'
      window.open('https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.76.300f7213tYa0So&id=626005790965&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4605078918517')
    } else if(region === TAIWAN){
      // producturl = 'https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=8841698&str_category_code=2148400075&osm=t04&utm_source=BD_017217&utm_medium=ARvirtualspa-0813b&scm_activity=2021081305184iwwgtv3'
      window.open('https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=8841698&str_category_code=2148400075&osm=t04&utm_source=BD_017217&utm_medium=ARvirtualspa-0813b&scm_activity=2021081305184iwwgtv3')
    } else if(region === KOREA){
      // producturl = 'https://www.ahc.co.kr/shop/product/productView?prdIdx=1140'
      window.open('https://www.ahc.co.kr/shop/product/productView?prdIdx=1140')
    } else {
      // producturl = 'https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.76.300f7213tYa0So&id=626005790965&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4605078918517'
      window.open('https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.76.300f7213tYa0So&id=626005790965&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4605078918517')
    }
  }

  setTimeout(function(){
    document.getElementById('product1').style.display = 'none';
    document.getElementById("copied-button1").style.display = 'none';
  }, 2200)


}


function productLink2(){
  var producturl2;
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    if(region === CHINA){
      producturl2 = 'https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.6.300f7213tYa0So&id=573553160799&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67'
      // window.open('https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.6.300f7213tYa0So&id=573553160799&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67')
    } else if(region === TAIWAN){
      producturl2 = 'https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=8095641&str_category_code=2148400075&osm=t04&utm_source=BD_017217&utm_medium=ARvirtualspa-0813a&scm_activity=2021081305184iwwgtv3'
      // window.open('https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=8095641&str_category_code=2148400075&osm=t04&utm_source=BD_017217&utm_medium=ARvirtualspa-0813a&scm_activity=2021081305184iwwgtv3')
    } else if(region === KOREA){
      producturl2 = 'https://www.ahc.co.kr/brand/product/productView?prdIdx=462'
      // window.open('https://www.ahc.co.kr/brand/product/productView?prdIdx=462')
    } else {
      producturl2 = 'https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.6.300f7213tYa0So&id=573553160799&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67'
      // window.open('https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.6.300f7213tYa0So&id=573553160799&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67')
    }
    // MITHRU IN HERE BUTTON IS NONE TEXT IS BLOCK
    document.getElementById("productButton-2").style.display = 'none'
    document.getElementById("copied-button2").style.display = 'block'
    document.getElementById("copied-button2").innerHTML = copyJSON.LinkCopiedOpenBrowser[languageID]
    copyToClipboard(producturl2)
  }else{
    if(region === CHINA){
      // producturl2 = 'https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.6.300f7213tYa0So&id=573553160799&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67'
      window.open('https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.6.300f7213tYa0So&id=573553160799&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67')
    } else if(region === TAIWAN){
      // producturl2 = 'https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=8095641&str_category_code=2148400075&osm=t04&utm_source=BD_017217&utm_medium=ARvirtualspa-0813a&scm_activity=2021081305184iwwgtv3'
      window.open('https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=8095641&str_category_code=2148400075&osm=t04&utm_source=BD_017217&utm_medium=ARvirtualspa-0813a&scm_activity=2021081305184iwwgtv3')
    } else if(region === KOREA){
      // producturl2 = 'https://www.ahc.co.kr/brand/product/productView?prdIdx=462'
      window.open('https://www.ahc.co.kr/brand/product/productView?prdIdx=462')
    } else {
      // producturl2 = 'https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.6.300f7213tYa0So&id=573553160799&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67'
      window.open('https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.6.300f7213tYa0So&id=573553160799&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67')
    }
  }
  setTimeout(function(){
    document.getElementById('product2').style.display = 'none';
    document.getElementById("copied-button2").style.display = 'none';
  }, 2200)


}
function productLink3(){
  var producturl3
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    if(region === CHINA){
      producturl3= 'https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.41.300f7213tYa0So&id=610989133474&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4299658944085'
      // window.open('https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.41.300f7213tYa0So&id=610989133474&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4299658944085')
    } else if(region === TAIWAN){
      producturl3 = 'https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=8399533&str_category_code=2148400075&ctype=B&Area=DgrpCategory&osm=t04&utm_source=BD_017217&utm_medium=ARvirtualspa-0813c&scm_activity=2021081305184iwwgtv3'
      // window.open('https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=8399533&str_category_code=2148400075&ctype=B&Area=DgrpCategory&osm=t04&utm_source=BD_017217&utm_medium=ARvirtualspa-0813c&scm_activity=2021081305184iwwgtv3')
    } else if(region === KOREA){
      producturl3 = 'https://www.ahc.co.kr/shop/product/productView?prdIdx=270&prdCategory=0078&skinCategory=0089'
      // window.open('https://www.ahc.co.kr/shop/product/productView?prdIdx=270&prdCategory=0078&skinCategory=0089')
    } else {
      producturl3 = 'https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.41.300f7213tYa0So&id=610989133474&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4299658944085'
      // window.open('https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.41.300f7213tYa0So&id=610989133474&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4299658944085')
    }
    // MITHRU IN HERE BUTTON IS NONE TEXT IS BLOCK
    document.getElementById("productButton-3").style.display = 'none'
    document.getElementById("copied-button3").style.display = 'block'
    document.getElementById("copied-button3").innerHTML = copyJSON.LinkCopiedOpenBrowser[languageID]

    copyToClipboard(producturl3)
  }else{
    if(region === CHINA){
      // producturl3= 'https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.41.300f7213tYa0So&id=610989133474&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4299658944085'
      window.open('https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.41.300f7213tYa0So&id=610989133474&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4299658944085')
    } else if(region === TAIWAN){
      // producturl3 = 'https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=8399533&str_category_code=2148400075&ctype=B&Area=DgrpCategory&osm=t04&utm_source=BD_017217&utm_medium=ARvirtualspa-0813c&scm_activity=2021081305184iwwgtv3'
      window.open('https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=8399533&str_category_code=2148400075&ctype=B&Area=DgrpCategory&osm=t04&utm_source=BD_017217&utm_medium=ARvirtualspa-0813c&scm_activity=2021081305184iwwgtv3')
    } else if(region === KOREA){
      // producturl3 = 'https://www.ahc.co.kr/shop/product/productView?prdIdx=270&prdCategory=0078&skinCategory=0089'
      window.open('https://www.ahc.co.kr/shop/product/productView?prdIdx=270&prdCategory=0078&skinCategory=0089')
    } else {
      // producturl3 = 'https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.41.300f7213tYa0So&id=610989133474&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4299658944085'
      window.open('https://detail.tmall.com/item.htm?spm=a220m.1000862.1000725.41.300f7213tYa0So&id=610989133474&is_b=1&cat_id=2&rn=218e0d3db53bf7935454047221f8ba67&skuId=4299658944085')
    }
  }
  setTimeout(function(){
    document.getElementById('product3').style.display = 'none';
    document.getElementById("copied-button3").style.display = 'none';
  }, 2200)
}
function copyToClipboard(text) {
  var input = document.body.appendChild(document.createElement("input"));
  input.value = text;
  input.focus();
  input.select();
  document.execCommand('copy');
  input.parentNode.removeChild(input);
}
function closeProductPreview(){
  console.log("clicked")
  document.getElementById('product1').style.display = 'none';
  document.getElementById('product2').style.display = 'none';
  document.getElementById('product3').style.display = 'none';
}

function closeBeauty(){
  document.getElementById("mute-unmute-btn").style.display = "block"
  document.getElementById('beauty-treatment-overlay').style.display = "none"
  document.getElementById('blackScreen').style.display = 'none';
  document.getElementById('video_id').style.display = 'none';
  document.getElementById('blackScreen').style.zIndex = '';

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    document.getElementById("video_id").style.height= "50%"
    document.getElementById("video_id").style.width= "90%"
  }else{
    document.getElementById("video_id").style.height= "50%"
    document.getElementById("video_id").style.width= "50%"
  }
  // document.getElementById("video_id").style.transform = `translateX(50%) translateY(50%)`;
}

function closeVideo(){
  document.getElementById("mute-unmute-btn").style.display = "block"

  document.getElementById('video_id').style.display = 'none';
  // document.getElementById("video_id").style.height= "50%"
  // document.getElementById("video_id").style.width= "50%"

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    document.getElementById("video_id").style.height= "50%"
    document.getElementById("video_id").style.width= "90%"
  }else{
    document.getElementById("video_id").style.height= "50%"
    document.getElementById("video_id").style.width= "50%"
  }

  // document.getElementById("video_id").style.transform = `translateX(50%) translateY(50%)`;

  document.getElementById('orb-vid').style.display = 'none';
  document.getElementById('video2').style.display = 'none';

  document.getElementById('vid-1').style.display = 'none';
  document.getElementById('vid-2').style.display = 'none';
  document.getElementById('vid-3').style.display = 'none';

  document.getElementById('beauty-treatment-overlay').style.display = "none"
  document.getElementById('close-btn').style.display = 'none';

  // player
  videojs('#video2').reset()
  videojs('#orb-vid').reset()
  videojs('#vid-1').reset()
  videojs('#vid-2').reset()
  videojs('#vid-3').reset()
  console.log('close video');
}
