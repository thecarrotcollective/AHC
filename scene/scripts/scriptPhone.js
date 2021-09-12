import * as THREE from './three.module.js';
import { DeviceOrientationControls } from './DeviceOrientationWithOrbit.js';

//DELETE AFTER CSS FIX
import {OrbitControls} from './Orbit.js';

var copyJSON;
var languageID = 0;

var url = window.location.href;
var selectedLanguage = url.substr(url.indexOf('#')+1, 2);
var url_params = url.substr(url.indexOf('#')+1)
var selectedPersonality = url_params.substr(url_params.indexOf('-')+1, 2);
// console.log("local? " + url.includes("localh"));
var clickAllowed = true;
var prevDirVector = new THREE.Vector3();

var CHINA = 0
var KOREA = 1
var TAIWAN = 2
var JAPAN = 3

var region =  CHINA;

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



// function loadJSON(callback) {
//    var xobj = new XMLHttpRequest();
//    xobj.overrideMimeType("application/json");
//    xobj.open('GET', '../shared/copy.json', true);
//    xobj.onreadystatechange = function () {
//          if (xobj.readyState == 4 && xobj.status == "200") {
//            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//            callback(xobj.responseText);
// 		   copyJSON = JSON.parse(xobj.responseText);
//          }
//    };
//    xobj.send(null);
// }
//
// function setLang(id){
//   document.getElementById('share-btn').innerHTML = copyJSON.ShareWithFriend[id]
// 	if(selectedPersonality.localeCompare("fe") === 0 || selectedPersonality.localeCompare("ex") === 0){
// 		document.getElementById('pool-btn').innerHTML = copyJSON.SensorialCTAExtrovertFeeler[id] +' '+ copyJSON.StartTherapyButton[id]
// 	} else {
// 		document.getElementById('pool-btn').innerHTML = copyJSON.SensorialCTAIntrovertThinker[id] +' '+ copyJSON.StartTherapyButton[id]
// 	}
// 	document.getElementById('selfie-btn').innerHTML = copyJSON.TakeSelfieCTA[id]
// 	document.getElementById('beauty-btn').innerHTML = copyJSON.WatchAHCKBeauty[id]
// 	document.getElementById('orb-btn').innerHTML = copyJSON.FindOutMore[id]
// 	document.getElementById('productButton-1').innerHTML = copyJSON.FindOutMore[id]
// 	document.getElementById('productButton-2').innerHTML = copyJSON.FindOutMore[id]
// 	document.getElementById('productButton-3').innerHTML = copyJSON.FindOutMore[id]
// 	document.getElementById('share-experience-title').innerHTML = copyJSON.SharePopUp[id]
// 	document.getElementById('enter-phone').innerHTML = copyJSON.EnterPhone[id]
// 	document.getElementById('share-submit').innerHTML = copyJSON.ShareButton[id]
// 	document.documentElement.lang = copyJSON.code[id];
//
// }
//
// loadJSON(function(response) {
//
//  // Parse JSON string into object
//    copyJSON = JSON.parse(response);
//    console.log(copyJSON);
//    console.log("language is "+selectedLanguage);
//    if(selectedLanguage.localeCompare("zh") === 0){
//      languageID = 2
//    } else if (selectedLanguage.localeCompare("ko") === 0){
//      languageID = 1
//    } else {
//      languageID = 0
//    }
//    setLang(languageID)
//    LoadPage();
//
// });

var imageurl,personiltyType,infoText

//
// function LoadPage() {
//
// 	// console.log(copyJSON['Feeler'])
// 	if(selectedPersonality === 'fe'){
//
// 	imageurl ="../personalitytest/images/opt/arch5.webp";
// 	spaText=copyJSON.Feeler[languageID]
// 	personiltyType = copyJSON.FeelerHeadline[languageID]
// 	infoText=copyJSON.FeelerExplanation[languageID]
//
// 	}else if(selectedPersonality === 'in'){
// 		imageurl ="../personalitytest/images/opt/arch4.webp";
// 		spaText=copyJSON.Introvert[languageID]
// 		infoText=copyJSON.IntrovertExplanation[languageID]
// 		personiltyType = copyJSON.IntrovertHeadline[languageID]
// 	}
// 	else if(selectedPersonality === 'th'){
// 		imageurl ="../personalitytest/images/opt/arch3.webp";
// 		spaText=copyJSON.Thinker[languageID]
// 		infoText=copyJSON.ThinkerExplanation[languageID]
// 		personiltyType = copyJSON.ThinkerHeadline[languageID]
// 	}else{
// 		imageurl ="../personalitytest/images/opt/arch2.webp";
// 		spaText=copyJSON.Extrovert[languageID]
// 		personiltyType = copyJSON.ExtrovertHeadline[languageID]
// 		spaText=copyJSON.Extrovert[languageID]
// 		infoText=copyJSON.ExtrovertExplanation[languageID]
// 	}
//
// 	// document.getElementById('archid').style.display = 'flex';
// 	// document.getElementById('infoText').style.display = 'flex';
// 	// document.getElementById('middleText').style.display = 'flex';
// 	// document.getElementById('controls_id').style.display = 'flex';
// 	// document.getElementById('quesitonDiv').style.display = 'flex';
// 	var spaText = "<h1 >"+spaText+"</h1>";
// 	var element = document.getElementById("personality");
// 	// element.style.display = "flex"
// 	element.innerHTML = spaText;
//
// 	var buttonText = copyJSON.GoToSpa[languageID];
// 	var element3 = document.getElementById("start-btn")
// 	element3.innerHTML = buttonText;
//
// 	var resultImg = "<img id=\"arch-image\" src="+ imageurl +">";
// 	var element4 = document.getElementById("archid");
// 	element4.innerHTML = resultImg
//
// 	var personiltyTypeHtml = personiltyType;
// 	var element2 = document.getElementById("question")
// 	element2.innerHTML = personiltyTypeHtml;
// 	var infoTextHtml = infoText;
// 	var element5 = document.getElementById("infoText")
// 	element5.innerHTML = infoTextHtml;
// }


var orbVideoUrl,sceneUrl0,sceneUrl1,sceneUrl2,sceneUrl3,sceneUrl4,sceneUrl5,sceneUrl6,sceneUrl7,sceneUrl8,sceneUrl9,sceneUrl10
console.log("language is " + selectedLanguage);
console.log("personality is " + selectedPersonality);
if(selectedPersonality === 'fe'){
	// if(region === CHINA || )
	// orbVideoUrl = "video/orb/Feeler.V5.mp4"
	orbVideoUrl = "https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/video/orb/Feeler.V5.mp4"
	sceneUrl0 ="scenes/FEELER/FEELER_CUBEMAP_0000.jpg"
	sceneUrl1 ="scenes/FEELER/FEELER_CUBEMAP_0010.jpg"
	sceneUrl2 ="scenes/FEELER/FEELER_CUBEMAP_0001.jpg"
	sceneUrl3 ="scenes/FEELER/FEELER_CUBEMAP_0002.jpg"
	sceneUrl4 ="scenes/FEELER/FEELER_CUBEMAP_0003.jpg"
	sceneUrl5 ="scenes/FEELER/FEELER_CUBEMAP_0004.jpg"
	sceneUrl6 ="scenes/FEELER/FEELER_CUBEMAP_0005.jpg"
	sceneUrl7 ="scenes/FEELER/FEELER_CUBEMAP_0006.jpg"
	sceneUrl8 ="scenes/FEELER/FEELER_CUBEMAP_0007.jpg"
	sceneUrl9 ="scenes/FEELER/FEELER_CUBEMAP_0008.jpg"
	sceneUrl10 ="scenes/FEELER/FEELER_CUBEMAP_0009.jpg"

}else if(selectedPersonality === 'in'){
	// orbVideoUrl = "video/orb/Introvert.V5.mp4"
	orbVideoUrl = "https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/video/orb/Introvert.V5.mp4"
	sceneUrl0 ="scenes/INTROVERT/INTRO_CUBEMAP_0000.jpg"
	sceneUrl1 ="scenes/INTROVERT/INTRO_CUBEMAP_0010.jpg"
	sceneUrl2 ="scenes/INTROVERT/INTRO_CUBEMAP_0001.jpg"
	sceneUrl3 ="scenes/INTROVERT/INTRO_CUBEMAP_0002.jpg"
	sceneUrl4 ="scenes/INTROVERT/INTRO_CUBEMAP_0003.jpg"
	sceneUrl5 ="scenes/INTROVERT/INTRO_CUBEMAP_0004.jpg"
	sceneUrl6 ="scenes/INTROVERT/INTRO_CUBEMAP_0005.jpg"
	sceneUrl7 ="scenes/INTROVERT/INTRO_CUBEMAP_0006.jpg"
	sceneUrl8 ="scenes/INTROVERT/INTRO_CUBEMAP_0007.jpg"
	sceneUrl9 ="scenes/INTROVERT/INTRO_CUBEMAP_0008.jpg"
	sceneUrl10 ="scenes/INTROVERT/INTRO_CUBEMAP_0009.jpg"
}
else if(selectedPersonality === 'th'){

	// orbVideoUrl = "video/orb/Thinker.V5.mp4"
	orbVideoUrl = "https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/video/orb/Thinker.V5.mp4"
	sceneUrl0 ="scenes/THINKER/THINKER_CUBEMAP_0000.jpg"
	sceneUrl1 ="scenes/THINKER/THINKER_CUBEMAP_0010.jpg"
	sceneUrl2 ="scenes/THINKER/THINKER_CUBEMAP_0001.jpg"
	sceneUrl3 ="scenes/THINKER/THINKER_CUBEMAP_0002.jpg"
	sceneUrl4 ="scenes/THINKER/THINKER_CUBEMAP_0003.jpg"
	sceneUrl5 ="scenes/THINKER/THINKER_CUBEMAP_0004.jpg"
	sceneUrl6 ="scenes/THINKER/THINKER_CUBEMAP_0005.jpg"
	sceneUrl7 ="scenes/THINKER/THINKER_CUBEMAP_0006.jpg"
	sceneUrl8 ="scenes/THINKER/THINKER_CUBEMAP_0007.jpg"
	sceneUrl9 ="scenes/THINKER/THINKER_CUBEMAP_0008.jpg"
	sceneUrl10 ="scenes/THINKER/THINKER_CUBEMAP_0009.jpg"
}else{
	// orbVideoUrl = "video/orb/Extrovert.V5.mp4"
	orbVideoUrl = "https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/video/orb/Extrovert.V5.mp4"
	sceneUrl0 ="scenes/EXTROVERT/EXTRO_CUBEMAP_0000.jpg"
	sceneUrl1 ="scenes/EXTROVERT/EXTRO_CUBEMAP_0010.jpg"
	sceneUrl2 ="scenes/EXTROVERT/EXTRO_CUBEMAP_0001.jpg"
	sceneUrl3 ="scenes/EXTROVERT/EXTRO_CUBEMAP_0002.jpg"
	sceneUrl4 ="scenes/EXTROVERT/EXTRO_CUBEMAP_0003.jpg"
	sceneUrl5 ="scenes/EXTROVERT/EXTRO_CUBEMAP_0004.jpg"
	sceneUrl6 ="scenes/EXTROVERT/EXTRO_CUBEMAP_0005.jpg"
	sceneUrl7 ="scenes/EXTROVERT/EXTRO_CUBEMAP_0006.jpg"
	sceneUrl8 ="scenes/EXTROVERT/EXTRO_CUBEMAP_0007.jpg"
	sceneUrl9 ="scenes/EXTROVERT/EXTRO_CUBEMAP_0008.jpg"
	sceneUrl10 ="scenes/EXTROVERT/EXTRO_CUBEMAP_0009.jpg"
}

// TODO - check if some of these can be lists / arrays + use as state machine?
let camera, controls,videoMat,ProductIcon1,ProductIcon2,ProductIcon3,ProductIconScene1,ProductIconScene2,ProductIconScene3,video3,videoMask,videoMask2,videoTexture;
let renderer,video,skydome,BottleRoomVideoPlayScene,SelfiePlane,SelfiePlaneScene,video2;
let videoMeshBottleScene,selfieScene,VideoRoomScene, BottleRoomScene, videoRoomArrow, BottleRoomArrow,MainRoomScene,MainRoomArrow,PoolRoomArrow,PoolRoomScene,CoachRoomScene,CoachRoomArrow;
let scene,materials,skyBox,ProductRoomScene,ProductRoomArrow,MiddleRoomScene,MiddleRoomArrow;
let RoomVideoPlay,RoomVideoPlayScene,filterScene,SceneObjectVideo1,videoPlane,selfieRoomArrow;
let OrbVideoScene,orbVideoPlane, orbVideo, orbVideoMask,orbVideoTex, orbVideoMaskTex, orbVideoMat, orbVideoMesh;
let videoMatBottleScene,VideoPlayBottleScene,firtVideoChecker,secondVideoChecker,selfieSceneClick;
let orbProductVideo,orbProductVideoMask,orbProductVideoTex,orbProductVideoMaskTex,orbGlowScene
let bilboardVideo, bilboardVideoTex,orbProductPlane, orbProductTex,orbProductAlpha,orbProductMat,orbProduct;
let PoolEntranceArrow, ProcuctBaseArrow ,PoolEntranceScene, ProcuctBaseScene
let orbGlowPlane, orbGlowVideo, orbGlowVideoMask,orbGlowVideoTex,orbGlowVideoMaskTex,orbGlowMat,orbGlow
let orbPlusScene,orbPlus,orbPlusMat,orbProductScene,bilboardClickable,orbClickable;
var selfieLoad,poolLoad, beautyLoad, productBaseLoad, procutLoad
const mouse = new THREE.Vector2();
var clickableVideo,manager,videoManager,arrowMat,glow,glowMat,glowScene,videoManager
var loaderCheck = false;
var arrowDist = 25
var arrowHeight = -12
let arrowUrl ="UIAssets/arrow_white_v3.png";
let ProductIconUrl ="UIAssets/plus_v1.png";
let glowUrl ="UIAssets/glow.png";
var bool = false
var currState = -1 // use this for statemachine
var ProductMat,orbVideoFinished ;
var orbVideoPlayCheck = false
let glowMain, glowMiddle, glowPoolEntracen, glowSlefie, glowPool,glowCoach,glowBeauty, glowEntrace, glowBaseProduct,glowProduct
let productGlow1, productGlow2,productGlow3
// Please reorder this to match the assets
var INTRO = 0
var MAIN = 1
var POOL = 2
var SELFIE = 3
var COUCH = 4
var PRODUCTS = 5
var BEAUTY = 6
var PRODENTRANCE = 7
var MIDDLE = 8
var POOLENTRACE =9
var PRODUCTBASE = 10

var startScenePos = 0
var dragOrb,dragBilboard, dragTherapy
if(url_params[url_params.length-1].indexOf('M') ===0 || url_params[url_params.length-1].indexOf('U') === 0){
	console.log("starting at selfie");

  document.getElementById('question').style.display = "none"
  document.getElementById('middleText').style.display = "none"
  document.getElementById('start-btn').style.bottom = "45%"
	startScenePos = 2
}

document.getElementById("start-btn").addEventListener("click", function() {
  document.getElementById("mute-unmute-btn").style.display="block"
  document.getElementById("look-around").style.display="block"
  document.getElementById("phone-icon").style.opacity=1

  setTimeout(function(){
    document.getElementById("phone-icon").style.opacity=0
  }, 5000)

  setTimeout(function(){
    document.getElementById("look-around").style.display="none"
  }, 6000)

	console.log("clicked")

	if(selectedPersonality == 'fe'){

		// playAudio('sounds/sfx/feeler.mp3')
		playAudio('https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/sounds/sfx/feeler.mp3')



	}else if(selectedPersonality == 'in'){
		// playAudio('sounds/sfx/introvert.mp3')
		playAudio('https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/sounds/sfx/introvert.mp3')

	}
	else if(selectedPersonality == 'th'){
		// playAudio('sounds/sfx/thinker.mp3')
		playAudio('https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/sounds/sfx/thinker.mp3')

	}else{
		// playAudio('sounds/sfx/extrovert.mp3')
		playAudio('https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/sounds/sfx/extrovert.mp3')

	}

	init();
	animate();

	if(startScenePos == 0){
		currState = INTRO
		envLoad(sceneUrl0)
	}else if(startScenePos == 1){
		currState = MAIN
		envLoad(sceneUrl1)
	}else{
		currState = SELFIE
		envLoad(sceneUrl10)
	}


	renderer.autoclear = false;
	// TweenFadeInForVideos(videoMat)
	// checkTheVideoLoad()
	document.getElementById('main').style.display = 'block'
	document.getElementById('IntroDiv').style.display = 'none';
	// document.getElementById('productIntro1').style.display = 'none'
	document.getElementById('ui-container').style.display = 'block'
	document.getElementById('archid').style.display = 'none';
	document.getElementById('infoText').style.display = 'none';
	document.getElementById('middleText').style.display = 'none';
	document.getElementById('start-btn').style.display = 'none';
	// document.getElementById('questionDiv').style.display = 'none';
	loadSounds()
});



var sound;
var volume;
var muted = (url_params[url_params.length-1].indexOf('m')===0 || url_params[url_params.length-1].indexOf('M')===0 )
console.log(muted);
var mainVolumeMultiplier = muted?0:1
document.getElementById("mute-unmute-btn").src=muted?"../shared/images/Mute_Icon.svg":"../shared/images/Speaker_Icon.svg";

document.getElementById('mute-unmute-btn').addEventListener('click', function(e) {
	muted = !muted;
	console.log(muted);
	if(muted){
		document.getElementById("mute-unmute-btn").src="../shared/images/Mute_Icon.svg";
		mainVolumeMultiplier = 0;
	} else {
		document.getElementById("mute-unmute-btn").src="../shared/images/Speaker_Icon.svg";
		mainVolumeMultiplier = 1;
	}
	sound.setVolume( volume * mainVolumeMultiplier);
	flashSound.setVolume( volume * mainVolumeMultiplier);

	console.log(volume * mainVolumeMultiplier);
	// sound.gain = volume * mainVolumeMultiplier
});

function playAudio(audioUrl){
	volume = 0.65
	console.log("play audio")
	const listener = new THREE.AudioListener();
	// camera.add( listener );

	// create a global audio source
	sound = new THREE.Audio( listener );

	// load a sound and set it as the Audio object's buffer
	const audioLoader = new THREE.AudioLoader();
	audioLoader.load( audioUrl, function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop( true );
		sound.setVolume( volume * mainVolumeMultiplier);
		sound.play();

	});
}

const shareLinkBtn = document.getElementById('share-btn');
shareLinkBtn.addEventListener('click', sharePopup);
const shareSubmit = document.getElementById('share-submit');
shareSubmit.addEventListener('click', sendUser)
const shareContainer = document.getElementById('share-container')
const shareClose = document.getElementById('share-close')


const navArrowScale = new THREE.Vector3(4,2,4)

const navVideoScale = new THREE.Vector3(9,16,1)

function toRadians(degrees) {
	var pi = Math.PI;
	return degrees * (pi/180);
}
var flashSound, listener, audioLoader;

// document.getElementById('container_2').addEventListener('click', loadSounds)

function loadSounds(){
	audioLoader = new THREE.AudioLoader();
	flashSound = new THREE.Audio(listener);
	// audioLoader.load('sounds/sfx/flash.mp3', function( buffer ) {
	audioLoader.load('https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/sounds/sfx/flash.mp3', function( buffer ) {
		flashSound.setBuffer( buffer );
		flashSound.setLoop( false );
		flashSound.setVolume( 0.5 * mainVolumeMultiplier);
		// flashSound.play();
	});
	// document.getElementById('container_2').removeEventListener('touchend', loadSounds)

}


var flashHasPlayed = false;

function init() {

	const container = document.getElementById( 'container_2' );

	renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	renderer.autoclear = false

	/* Custom variables */

	scene = new THREE.Scene();
	CoachRoomScene = new THREE.Scene()
	selfieScene = new THREE.Scene()
	PoolRoomScene = new THREE.Scene()
	MainRoomScene = new THREE.Scene()
	ProductRoomScene = new THREE.Scene()
	VideoRoomScene = new THREE.Scene()
	BottleRoomScene = new THREE.Scene()
	SceneObjectVideo1 = new THREE.Scene()
	RoomVideoPlayScene = new THREE.Scene();
	OrbVideoScene = new THREE.Scene();
	filterScene = new THREE.Scene();
	BottleRoomVideoPlayScene = new THREE.Scene();
	ProductIconScene1 = new THREE.Scene();
	ProductIconScene2 = new THREE.Scene();
	ProductIconScene3 = new THREE.Scene();
	SelfiePlaneScene =  new THREE.Scene();
	MiddleRoomScene =  new THREE.Scene();
	PoolEntranceScene =  new THREE.Scene();
	ProcuctBaseScene =  new THREE.Scene();
	orbProductScene = new THREE.Scene();
	orbGlowScene = new THREE.Scene();
	orbPlusScene = new THREE.Scene();
	glowScene = new THREE.Scene();
	scene.add(glowScene)
	scene.add(orbPlusScene)
	scene.add(orbGlowScene)
	scene.add(orbProductScene)
	scene.add(PoolEntranceScene)
	scene.add(ProcuctBaseScene)
	scene.add(OrbVideoScene)
	scene.add(SelfiePlaneScene)
	scene.add(MiddleRoomScene)
	scene.add(ProductIconScene1)
	scene.add(ProductIconScene2)
	scene.add(ProductIconScene3)
	scene.add(MainRoomScene)
	scene.add(CoachRoomScene)
	scene.add(VideoRoomScene)
	scene.add(BottleRoomScene)
	scene.add(selfieScene)
	scene.add(PoolRoomScene)
	scene.add(RoomVideoPlayScene)

	scene.add(ProductRoomScene)
	scene.add(filterScene)
	scene.add(SceneObjectVideo1)
	scene.add(BottleRoomVideoPlayScene)



	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 3000 );

	skydome = {
		scene: new THREE.Scene(),
		camera : new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 3000 ),
	};
	camera.rotation.z = 0
	skydome.camera.position.z =0.0000000000001;
	// controls = new DeviceOrientationControls( skydome.camera );
	// controls = new OrbitControls( skydome.camera, renderer.domElement );

	controls = new DeviceOrientationControls( skydome.camera, renderer.domElement );



	// controls.target.set(0, 0, 0);
	// controls.rotateSpeed = - 0.25;
	// controls.enableZoom = false;
	// controls.enablePan = false;
	// controls.enableDamping = true;
	// controls.rotateSpeed = - 0.25;
	// controls.update();



	listener = new THREE.AudioListener();
	camera.add(listener)

	videoManager = new THREE.LoadingManager();
	manager = new THREE.LoadingManager();
	manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

		console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

	};


	var sceneVideoBool = false
	var sceneVideoAlphaBooo = false
	function sceneVideo(){
		video.onloadeddata  = function() {
			console.log("played")
			sceneVideoBool = true

		}
		return true;
	}
	function sceneAlphaVideo(){
		video2.onloadeddata  = function() {
			sceneVideoAlphaBooo = true

		}
		return true;
	}
	// function productVideoFunc (){
	// 	orbProductVideo.onloadeddata  = function() {
	// 	}
	// 	orbProductVideoMask.onloadeddata  = function() {
	// 	}
	// 	return true;
	// }
	function calculateScale(glowScale,x,y,z){
		var sx = x + x*0.125
		var sy = y + y*0.125
		var sz = z + z*0.125
		glowScale.scale.set(sx,sy,sz)
	}


	manager.onLoad = function ( ) {
		document.getElementById("lds-ring").style.display = "none";
		for ( let i = 0; i < 6; i ++ ) {
			new TWEEN.Tween(materials[i]).to( { opacity: 1 }, 500 ).start();

			runTween()
		}
		console.log( 'Loading complete!');

		if(currState === INTRO){
			video.currentTime = 0;
			video2.currentTime = 0;
			video3.currentTime = 0;
			orbVideo.play()
			orbVideoMask.play()

			// orbProductVideo.play()
			// orbProductVideoMask.play()
			console.log("intro scene runned")
			async function playSceneVideo(){
				let played = await sceneVideo()
				let playedAlpha = await sceneAlphaVideo()
				console.log(played)
				if(played == true && playedAlpha == true){
					video.play()
					video2.play()
					console.log("viode is playing")
				}
			}
			playSceneVideo()
			RoomVideoPlayScene.add(RoomVideoPlay);
			RoomVideoPlay.position.set(101.4,-11.5,-176)
			RoomVideoPlay.rotation.set(0,-1.58,-0.01)
			RoomVideoPlay.scale.set(3.1,3,2.1)


			MainRoomScene.add(MainRoomArrow);
			glowScene.add(glow);
			glowScene.add(glowMiddle);
			MiddleRoomScene.add(MiddleRoomArrow)
			glow.position.set(arrowDist * Math.sin(toRadians(0)) , arrowHeight, -arrowDist * Math.cos(toRadians(0)));
			MainRoomArrow.position.set(arrowDist * Math.sin(toRadians(0)) , arrowHeight, -arrowDist * Math.cos(toRadians(0)));
			MiddleRoomArrow.position.set(1.8*arrowDist * Math.sin(toRadians(80)) , arrowHeight, -arrowDist* 1.8 * Math.cos(toRadians(80)));
			glowMiddle.position.set(1.8*arrowDist * Math.sin(toRadians(80)) , arrowHeight, -arrowDist* 1.8 * Math.cos(toRadians(80)));
			// MiddleRoomArrow.scale.copy(navArrowScale)
			MiddleRoomArrow.scale.set(5,2.5,5)

			calculateScale(glow,4,2,4)
			calculateScale(glowMiddle,5,2.5,5)
			MainRoomArrow.scale.copy(navArrowScale)
			TweenFadeInForVideos(videoMat)
			TweenFadeInForArrow()
			tweenScaleForArrows()
			// tweenScaleForArrows(MainRoomArrow,4,2,4)
			// tweenScaleForArrows(MiddleRoomArrow,5,2.5,5)
		}
		if(currState === POOL){
			video.currentTime = 0;
			video2.currentTime = 0;
			console.log("pool scene runned")
			document.getElementById('pool-text').style.display = 'block';
			document.getElementById('pool-btn').style.display = 'block';
			document.getElementById('pool-btn').style.pointerEvents = "auto";

			// const alphaMaskPool = new THREE.TextureLoader().load( "UIAssets/alphaMasks/poolSceneAlpha.png" );
			// videoMat.alphaMap = alphaMaskPool
			PoolEntranceScene.add(PoolEntranceArrow);
			selfieScene.add(selfieRoomArrow);
			RoomVideoPlayScene.add(RoomVideoPlay);
			PoolEntranceArrow.position.set(2.5*arrowDist * Math.sin(toRadians(-146)) , arrowHeight, -arrowDist*2.5 * Math.cos(toRadians(-146)));
			selfieRoomArrow.position.set(3*arrowDist * Math.sin(toRadians(-103)) , arrowHeight, -arrowDist *3* Math.cos(toRadians(-103)));
			PoolEntranceArrow.scale.set(6,3,6)
			selfieRoomArrow.scale.set(7,3.4,7)

			glowScene.add(glowPoolEntracen);
			glowScene.add(glowSlefie);
			// PoolEntranceArrow.scale.copy(navArrowScale)
			// selfieRoomArrow.scale.copy(navArrowScale)
			glowPoolEntracen.position.set(2.5*arrowDist * Math.sin(toRadians(-146)) , arrowHeight, -arrowDist*2.5 * Math.cos(toRadians(-146)));
			glowSlefie.position.set(3*arrowDist * Math.sin(toRadians(-103)) , arrowHeight, -arrowDist *3* Math.cos(toRadians(-103)));

			RoomVideoPlay.position.set(100,-20.5,52.5)
			RoomVideoPlay.rotation.set(0,4.7,0)
			RoomVideoPlay.scale.set(7.2,6.9,1)
			TweenFadeInForVideos(videoMat)
			video.play()
			video2.play()
			TweenFadeInForArrow()

			clickableVideo = true
			calculateScale(glowPoolEntracen,6,3,6)
			calculateScale(glowSlefie,7,3.4,7)
			//*************NOTE MY SELF DONT FORGET THE CHANGE SCALE */
			// tweenScaleForArrows(PoolEntranceArrow,6,3,6)
			// tweenScaleForArrows(selfieRoomArrow,7,3.4,7)
			poolLoad = true
			document.getElementById('close-btn').addEventListener("click", function(e){
				console.log(" pool btn worked")
				hoverButtonChecker = false
				volumeUp()
				clickableVideo = true

			});
		}

		if(currState === SELFIE){
			video.currentTime = 0;
			video2.currentTime = 0;
			console.log("selfie scene runned")
			document.getElementById('selfie-text').style.display = 'block';
			document.getElementById('selfie-btn').style.display = 'block';
			document.getElementById('selfie-btn').style.pointerEvents = "auto";

			PoolEntranceScene.add(PoolEntranceArrow)
			PoolRoomScene.add(PoolRoomArrow);
			SelfiePlaneScene.add(SelfiePlane)

			glowScene.add(glowPoolEntracen);
			glowScene.add(glowPool);

			SelfiePlane.position.set(-1,0,1)
			SelfiePlane.rotation.set(0,-1,0)
			SelfiePlane.scale.set(2,1.5,1)

			PoolEntranceArrow.position.set(1.5*arrowDist * Math.sin(toRadians(-210)) , arrowHeight, -arrowDist*1.5 * Math.cos(toRadians(-210)));
			PoolRoomArrow.position.set(1.65*arrowDist * Math.sin(toRadians(65)) , arrowHeight, -arrowDist *1.65* Math.cos(toRadians(65)));

			glowPoolEntracen.position.set(1.5*arrowDist * Math.sin(toRadians(-210)) , arrowHeight, -arrowDist*1.5 * Math.cos(toRadians(-210)));
			glowPool.position.set(1.65*arrowDist * Math.sin(toRadians(65)) , arrowHeight, -arrowDist *1.65* Math.cos(toRadians(65)));


			PoolEntranceArrow.scale.set(4.5,2.1,4.5)
			PoolRoomArrow.scale.set(4.5,2.1,4.5)
			// PoolRoomArrow.scale.copy(navArrowScale)
			// PoolEntranceArrow.scale.copy(navArrowScale)
			calculateScale(glowPoolEntracen,4.5,2.1,4.5)
			calculateScale(glowPool,4.5,2.1,4.5)
			RoomVideoPlayScene.add(RoomVideoPlay);
			RoomVideoPlay.position.set(200,-21,2)
			RoomVideoPlay.rotation.set(0,4.7,0)
			RoomVideoPlay.scale.set(4.3,4.1,1)
			video.play()
			video2.play()
			TweenFadeInForVideos(videoMat)
			TweenFadeInForArrow()
			selfieSceneClick = true

			// tweenScaleForArrows(PoolEntranceArrow,4.5,2.1,4.5)
			// tweenScaleForArrows(PoolRoomArrow,4.5,2.1,4.5)
			runTween()
			selfieLoad = true
		}
		if(currState === COUCH){
			bilboardVideo.currentTime = 0;
			console.log("couch scene runned")
			ProductRoomScene.add(ProductRoomArrow);
			MiddleRoomScene.add(MiddleRoomArrow);

			glowScene.add(glowMiddle);
			glowScene.add(glowEntrace);

			BottleRoomVideoPlayScene.add(VideoPlayBottleScene)
			VideoPlayBottleScene.position.set(-342,26,-450);


			VideoPlayBottleScene.rotation.set(0,1.5,0)
			VideoPlayBottleScene.scale.set(7.2,7.5,1)
			bilboardVideo.play();

			ProductRoomArrow.position.set(1.25*arrowDist * Math.sin(toRadians(-40)) , arrowHeight, -arrowDist*1.25 * Math.cos(toRadians(-40)));
			MiddleRoomArrow.position.set(3*arrowDist * Math.sin(toRadians(-90)) , arrowHeight, -arrowDist *3* Math.cos(toRadians(-90)));
			MiddleRoomArrow.scale.set(6,3,6)
			glowEntrace.position.set(1.25*arrowDist * Math.sin(toRadians(-40)) , arrowHeight, -arrowDist*1.25 * Math.cos(toRadians(-40)));
			glowMiddle.position.set(3*arrowDist * Math.sin(toRadians(-90)) , arrowHeight, -arrowDist *3* Math.cos(toRadians(-90)));
			calculateScale(glowEntrace,5,2.4,5)
			calculateScale(glowMiddle,6,3,6)
			// MiddleRoomArrow.scale.copy(navArrowScale)
			ProductRoomArrow.scale.set(5,2.4,5)
			// ProductRoomArrow.scale.copy(navArrowScale)
			TweenFadeInForArrow()
			TweenFadeInForBilboardVideos()

			// tweenScaleForArrows(MiddleRoomArrow,6,3,6)
			// tweenScaleForArrows(ProductRoomArrow,5,2.4,5)
		}
		if(currState === PRODENTRANCE){

			bilboardVideo.currentTime = 0;
			console.log("product scene runned")
			VideoRoomScene.add(videoRoomArrow)
			BottleRoomScene.add(BottleRoomArrow)
			CoachRoomScene.add(CoachRoomArrow)
			MiddleRoomScene.add(MiddleRoomArrow);

			BottleRoomVideoPlayScene.add(VideoPlayBottleScene)
			VideoPlayBottleScene.position.set(-20,1.4,-31.5);
			VideoPlayBottleScene.rotation.set(0,1.5,0)
			VideoPlayBottleScene.scale.set(0.75,0.81,1)


			VideoPlayBottleScene.scale.set(0.75,0.81,1)

			glowScene.add(glowCoach);
			glowScene.add(glowMiddle);
			glowScene.add(glowBeauty);
			glowScene.add(glowProduct);

			bilboardVideo.play();
			videoRoomArrow.position.set(1.5*arrowDist * Math.sin(toRadians(-20)) , arrowHeight, -arrowDist *1.5* Math.cos(toRadians(-20)));
			BottleRoomArrow.position.set(2*arrowDist * Math.sin(toRadians(20)) , arrowHeight, -arrowDist *2* Math.cos(toRadians(20)));
			CoachRoomArrow.position.set(arrowDist * Math.sin(toRadians(120)) , arrowHeight, -arrowDist * Math.cos(toRadians(120)));
			MiddleRoomArrow.position.set(1.8* arrowDist * Math.sin(toRadians(-110)) , arrowHeight, -arrowDist*1.8 * Math.cos(toRadians(-110)));


			glowBeauty.position.set(1.5*arrowDist * Math.sin(toRadians(-20)) , arrowHeight, -arrowDist *1.5* Math.cos(toRadians(-20)));
			glowProduct.position.set(2*arrowDist * Math.sin(toRadians(20)) , arrowHeight, -arrowDist *2* Math.cos(toRadians(20)));
			glowCoach.position.set(arrowDist * Math.sin(toRadians(120)) , arrowHeight, -arrowDist * Math.cos(toRadians(120)));
			glowMiddle.position.set(1.8* arrowDist * Math.sin(toRadians(-110)) , arrowHeight, -arrowDist*1.8 * Math.cos(toRadians(-110)));


			videoRoomArrow.scale.set(5.5,2.8,5.5)
			BottleRoomArrow.scale.set(6,3,6)
			MiddleRoomArrow.scale.set(5,2.4,5)
			CoachRoomArrow.scale.copy(navArrowScale)

			calculateScale(glowBeauty,5.5,2.8,5.5)
			calculateScale(glowProduct,6,3,6)
			calculateScale(glowCoach,4,2,4)
			calculateScale(glowMiddle,5,2.4,5)
			// MiddleRoomArrow.scale.copy(navArrowScale)
			// videoRoomArrow.scale.copy(navArrowScale)
			// BottleRoomArrow.scale.copy(navArrowScale)
			TweenFadeInForArrow()
			TweenFadeInForBilboardVideos()
			// tweenScaleForArrows(videoRoomArrow,5.5,2.8,5.5)
			// tweenScaleForArrows(BottleRoomArrow,6,3,6)
			// tweenScaleForArrows(MiddleRoomArrow,5,2.4,5)
			// tweenScaleForArrows(CoachRoomArrow,4,2,4)

		}
		if(currState === BEAUTY){
			bilboardVideo.currentTime = 0;
			console.log("beauty scene runned")
			document.getElementById('beauty-text').style.display = 'block';
			document.getElementById('beauty-btn').style.display = 'block';
			document.getElementById('beauty-btn').style.pointerEvents = "auto";
			ProductRoomScene.add(ProductRoomArrow)

			glowScene.add(glowEntrace);
			glowScene.add(glowBaseProduct);

			ProductRoomArrow.position.set(0.6*arrowDist * Math.sin(toRadians(180)) , arrowHeight, -arrowDist *0.6* Math.cos(toRadians(180)));
			glowEntrace.position.set(0.6*arrowDist * Math.sin(toRadians(180)) , arrowHeight, -arrowDist *0.6* Math.cos(toRadians(180)));

			ProductRoomArrow.scale.set(3,1.5,3)
			calculateScale(glowEntrace,3,1.5,3)
			// ProductRoomArrow.scale.copy(navArrowScale)

			ProcuctBaseScene.add(ProcuctBaseArrow)
			ProcuctBaseArrow.position.set( arrowDist * Math.sin(toRadians(45)) , arrowHeight, -arrowDist* 0.5 * Math.cos(toRadians(45)));
			glowBaseProduct.position.set( arrowDist * Math.sin(toRadians(45)) , arrowHeight, -arrowDist* 0.5 * Math.cos(toRadians(45)));
			ProcuctBaseArrow.scale.copy(navArrowScale)
			bilboardVideo.play()
			BottleRoomVideoPlayScene.add(VideoPlayBottleScene)
			calculateScale(glowBaseProduct,4,2,4)

			VideoPlayBottleScene.position.set(-22,-1.75,-19.8);

			VideoPlayBottleScene.rotation.set(0.01,1.4,0)
			VideoPlayBottleScene.scale.set(0.88,1.03,1)
			TweenFadeInForArrow()
			TweenFadeInForBilboardVideos()
			bilboardClickable = true
			// tweenScaleForArrows(ProductRoomArrow,3,1.5,3)
			// tweenScaleForArrows(ProcuctBaseArrow,4,2,4)
			beautyLoad = true
			document.getElementById('close-btn').addEventListener("click", function(e){
				hoverButtonChecker = true
				volumeUp()
			});

		}
		if(currState === PRODUCTS){
			bilboardVideo.currentTime = 0;
			console.log("product scene runned")
			ProductRoomScene.add(ProductRoomArrow)
			ProductRoomArrow.position.set(1.2*arrowDist * Math.sin(toRadians(210)) , arrowHeight, -arrowDist *1.2* Math.cos(toRadians(210)));
			ProductRoomArrow.scale.copy(navArrowScale)
			glowEntrace.position.set(1.2*arrowDist * Math.sin(toRadians(210)) , arrowHeight, -arrowDist *1.2* Math.cos(toRadians(210)));
			calculateScale(glowEntrace,4,2,4)
			glowScene.add(glowEntrace);
			glowScene.add(glowBaseProduct);
			// glowScene.add(productGlow1);
			// glowScene.add(productGlow2);
			// glowScene.add(productGlow3);

			bilboardVideo.play()
			BottleRoomVideoPlayScene.add(VideoPlayBottleScene)

			VideoPlayBottleScene.position.set(-50,-0.8,-11.1);

			VideoPlayBottleScene.rotation.set(0,1.5,0)
			VideoPlayBottleScene.scale.set(	1.14,1.22,1)

			ProductIconScene1.add(ProductIcon1)
			ProductIcon1.position.set(-3.8,0,-2)
			ProductIcon1.scale.set(0.4,0.4,0.4)
			ProductIcon1.rotation.set(0,-5,0)

			ProductIconScene2.add(ProductIcon2)
			ProductIcon2.position.set(-2.8,0.2,-2)
			ProductIcon2.scale.set(0.3,0.3,0.3)
			ProductIcon2.rotation.set(0,-5,0)

			ProductIconScene3.add(ProductIcon3)
			ProductIcon3.position.set(-1.7,0.2,-2)
			ProductIcon3.scale.set(0.28,0.28,0.28)
			ProductIcon3.rotation.set(0,-5,0)


			// productGlow1.rotation.set(0,-5.7,0)
			// productGlow2.rotation.set(0,-5.7,0)
			// productGlow3.rotation.set(0,-5.7,0)
			// productGlow1.position.set(-3.801,0,-2.035)
			// productGlow2.position.set(-2.801,0.2,-2.035)
			// productGlow3.position.set(-1.701,0.2,-2.035)
			// calculateScale(productGlow1,0.4,0.4,0.4)
			// calculateScale(productGlow2,0.3,0.3,0.3)
			// calculateScale(productGlow3,0.28,0.28,0.28)

			ProcuctBaseScene.add(ProcuctBaseArrow)
			ProcuctBaseArrow.position.set(0.65*arrowDist * Math.sin(toRadians(-110)) , arrowHeight, -arrowDist *0.65* Math.cos(toRadians(-110)));
			glowBaseProduct.position.set(0.65*arrowDist * Math.sin(toRadians(-110)) , arrowHeight, -arrowDist *0.65* Math.cos(toRadians(-110)));
			calculateScale(glowBaseProduct,4,2,4)
			ProcuctBaseArrow.scale.copy(navArrowScale)
			TweenFadeInForArrow()
			TweenFadeInForBilboardVideos()
			// RoomVideoPlayScene.add(RoomVideoPlay);
			// tweenScaleForArrows(ProductRoomArrow,4,2,4)
			// tweenScaleForArrows(ProcuctBaseArrow,4,2,4)
			procutLoad = true
		}
		if(currState === PRODUCTBASE){
			bilboardVideo.currentTime = 0;
			BottleRoomVideoPlayScene.add(VideoPlayBottleScene)

			VideoPlayBottleScene.position.set(-50,-5.8,-23.2);

			VideoPlayBottleScene.rotation.set(0,1.5,0)
			VideoPlayBottleScene.scale.set(1.68,1.77,1)
			bilboardVideo.play()
			VideoRoomScene.add(videoRoomArrow)
			BottleRoomScene.add(BottleRoomArrow)

			glowScene.add(glowEntrace);
			glowScene.add(glowBeauty);
			glowScene.add(glowProduct);

			// glowScene.add(productGlow1);
			// glowScene.add(productGlow2);
			// glowScene.add(productGlow3);

			BottleRoomArrow.position.set(arrowDist * Math.sin(toRadians(30)) , arrowHeight, -arrowDist*0.5 * Math.cos(toRadians(30)));
			videoRoomArrow.position.set(0.6*arrowDist * Math.sin(toRadians(-90)) , arrowHeight, -arrowDist *0.6* Math.cos(toRadians(-90)));
			BottleRoomArrow.scale.copy(navArrowScale)
			videoRoomArrow.scale.copy(navArrowScale)
			ProductRoomScene.add(ProductRoomArrow)
			ProductRoomArrow.position.set(arrowDist * Math.sin(toRadians(190)) , arrowHeight, -arrowDist *0.8* Math.cos(toRadians(190)));
			ProductRoomArrow.scale.copy(navArrowScale)
			ProductIconScene1.add(ProductIcon1)

			glowProduct.position.set(arrowDist * Math.sin(toRadians(30)) , arrowHeight, -arrowDist*0.5 * Math.cos(toRadians(30)));
			glowBeauty.position.set(0.6*arrowDist * Math.sin(toRadians(-90)) , arrowHeight, -arrowDist *0.6* Math.cos(toRadians(-90)));
			glowEntrace.position.set(arrowDist * Math.sin(toRadians(190)) , arrowHeight, -arrowDist *0.8* Math.cos(toRadians(190)));
			calculateScale(glowProduct,4,2,4)
			calculateScale(glowEntrace,4,2,4)
			calculateScale(glowBeauty,4,2,4)

			ProductIcon1.position.set(0,-0.25,-1)
			ProductIcon1.scale.set(0.1,0.1,0.1)
			ProductIcon1.rotation.set(0,0,0)

			ProductIconScene2.add(ProductIcon2)
			ProductIcon2.position.set(-0.3,-0.28,-1)
			ProductIcon2.scale.set(0.085,0.085,0.085)
			ProductIcon2.rotation.set(0,0,0)

			// productGlow1.position.set(0,-0.25,-1.01)
			// productGlow2.position.set(-0.3,-0.28,-1.01)
			// productGlow3.position.set(0.225,-0.28,-1.01)
			// calculateScale(productGlow1,0.1,0.1,0.1)
			// calculateScale(productGlow2,0.085,0.085,0.085)
			// calculateScale(productGlow3,0.09,0.09,0.09)

			ProductIconScene3.add(ProductIcon3)
			ProductIcon3.position.set(0.225,-0.28,-1)
			ProductIcon3.scale.set(0.09,0.09,0.09)
			ProductIcon3.rotation.set(0,0,0)
			TweenFadeInForArrow()
			TweenFadeInForBilboardVideos()
			// tweenScaleForArrows(BottleRoomArrow,4,2,4)
			// tweenScaleForArrows(videoRoomArrow,4,2,4)
			// tweenScaleForArrows(ProductRoomArrow,4,2,4)
			productBaseLoad =true
		}
		if(currState === POOLENTRACE){
			video.currentTime = 0;
			video3.currentTime = 0;


			selfieScene.add(selfieRoomArrow)
			PoolRoomScene.add(PoolRoomArrow)
			MainRoomScene.add(MainRoomArrow)
			RoomVideoPlayScene.add(RoomVideoPlay);

			MiddleRoomScene.add(MiddleRoomArrow)

			glowScene.add(glowMiddle);
			glowScene.add(glow);
			glowScene.add(glowSlefie);
			glowScene.add(glowPool);


			calculateScale(glowSlefie,6,3,6)
			calculateScale(glowPool,6.2,3.1,6.2)
			calculateScale(glowMiddle,5,2.5,5)
			calculateScale(glow,4,2,4)


			selfieRoomArrow.scale.set(6,3,6)
			PoolRoomArrow.scale.set(6.2,3.1,6.2)
			MiddleRoomArrow.scale.set(5,2.5,5)
			// selfieRoomArrow.scale.copy(navArrowScale)
			// PoolRoomArrow.scale.copy(navArrowScale)
			MainRoomArrow.scale.copy(navArrowScale)
			// MiddleRoomArrow.scale.copy(navArrowScale)
			selfieRoomArrow.position.set(2.3*arrowDist * Math.sin(toRadians(-40)) , arrowHeight, -arrowDist *2.3* Math.cos(toRadians(-40)));
			PoolRoomArrow.position.set(3.3*arrowDist * Math.sin(toRadians(15)) , arrowHeight, -arrowDist *3.3* Math.cos(toRadians(15)));
			MiddleRoomArrow.position.set(1.8*arrowDist * Math.sin(toRadians(135)) , arrowHeight, -arrowDist *1.8* Math.cos(toRadians(135)));
			MainRoomArrow.position.set(arrowDist * Math.sin(toRadians(190)) , arrowHeight, -arrowDist * Math.cos(toRadians(190)));


			glowSlefie.position.set(2.3*arrowDist * Math.sin(toRadians(-40)) , arrowHeight, -arrowDist *2.3* Math.cos(toRadians(-40)));
			glowPool.position.set(3.3*arrowDist * Math.sin(toRadians(15)) , arrowHeight, -arrowDist *3.3* Math.cos(toRadians(15)));
			glowMiddle.position.set(1.8*arrowDist * Math.sin(toRadians(135)) , arrowHeight, -arrowDist *1.8* Math.cos(toRadians(135)));
			glow.position.set(arrowDist * Math.sin(toRadians(190)) , arrowHeight, -arrowDist * Math.cos(toRadians(190)));



			RoomVideoPlay.position.set(120,-9,-100)
			RoomVideoPlay.rotation.set(0,-1.5,-0.01)
			RoomVideoPlay.scale.set(3.6,3.6,2.1)
			video.play()
			video2.play()

			TweenFadeInForArrow()
			TweenFadeInForVideos(videoMat)

			// tweenScaleForArrows(MainRoomArrow,4,2,4)
			// tweenScaleForArrows(selfieRoomArrow,6,3,6)
			// tweenScaleForArrows(PoolRoomArrow,6.2,3.1,6.2)
			// tweenScaleForArrows(MiddleRoomArrow,5,2.5,5)
			runTween()
		}
		if(currState === MAIN){
			videoManager.itemStart(orbVideoUrl);
			video.currentTime = 0;
			video3.currentTime = 0;
			orbVideo.currentTime = 0;
			orbVideoMask.currentTime = 0;
			// orbProductVideo.currentTime = 0;
			// orbProductVideoMask.currentTime = 0;
			// orbGlowVideo.currentTime = 0;
			// orbGlowVideoMask.currentTime = 0;
			document.getElementById('orb-text').style.display = 'block';
			document.getElementById('orb-btn').style.display = 'block';
			document.getElementById('orb-btn').style.pointerEvents = "auto";
			console.log("MAIN scene runned")

			glowScene.add(glowPoolEntracen);
			glowScene.add(glowMiddle);
			// orbGlowScene.add(orbGlow)
			OrbVideoScene.add(orbVideoMesh)
			// orbProductScene.add(orbProduct)
			MiddleRoomScene.add(MiddleRoomArrow)
			PoolEntranceScene.add(PoolEntranceArrow);
			RoomVideoPlayScene.add(RoomVideoPlay);




			//   orbProduct.position.set(-8.2,1.75,1.1)
			//   orbProduct.rotation.set(0,2,0)
			//   orbGlow.position.set(-8.3,1.75,1.1)
			//   orbGlow.rotation.set(0,1.9,0)

			orbVideoMesh.position.set(-8,1.75,1.01)
			orbVideoMesh.rotation.set(0,2,0)
			RoomVideoPlay.position.set(88,-8.5,-118)
			RoomVideoPlay.rotation.set(0,-1.5,-0.01)
			RoomVideoPlay.scale.set(2.4,2.5,2.1)
			// RoomVideoPlay.rotation.set(0,90,0)
			MiddleRoomArrow.position.set(1.8*arrowDist * Math.sin(toRadians(95)) , arrowHeight, -arrowDist*1.8 * Math.cos(toRadians(95)));
			MiddleRoomArrow.scale.set(5,2.5,5)
			//   MiddleRoomArrow.scale.copy(navArrowScale)
			PoolEntranceArrow.position.set(1.2*arrowDist * Math.sin(toRadians(15)) , arrowHeight, -arrowDist*1.2 * Math.cos(toRadians(15)));
			PoolEntranceArrow.scale.copy(navArrowScale)

			glowMiddle.position.set(1.8*arrowDist * Math.sin(toRadians(95)) , arrowHeight, -arrowDist*1.8 * Math.cos(toRadians(95)));
			glowPoolEntracen.position.set(1.2*arrowDist * Math.sin(toRadians(15)) , arrowHeight, -arrowDist*1.2 * Math.cos(toRadians(15)));
			calculateScale(glowMiddle,5,2.5,5)
			calculateScale(glowPoolEntracen,4,2,4)
			//   orbVideoMask.play()
			//   orbVideo.play()

			// playProductVideo()
			video.play()
			video3.play()


			//   orbProductVideo.play()
			// 	orbProductVideoMask.play()
			// setTimeout(function(){
			// 	if(orbProductVideo.currentTime != orbProductVideoMask.currentTime){
			// 		console.log("RUNNED")
			// 		orbProductVideo.currentTime = 0;
			// 		orbProductVideoMask.currentTime = 0;
			// 	}
			// }, 2500);






			videoMat.alphaMap = videoMask2

			TweenFadeInForVideos(videoMat)
			TweenFadeInForArrow()
			//   orbClickable = true
			//   tweenScaleForArrows(PoolEntranceArrow,4,2,4)
			//   tweenScaleForArrows(MiddleRoomArrow,5,2.5,5)
			runTween()
			document.getElementById('close-btn').addEventListener("click", function(e){
				hoverButtonChecker = false
				orbClickable = true
			});

			orbVideo.addEventListener("ended", function () {
				orbVideo.currentTime = 12;
				orbVideoMask.currentTime = 12.2;
				orbVideo.play();
				orbVideoMask.play();
			}, false);
		}
		else{
			video.currentTime = 0;
			video2.currentTime = 0;
			videoMat.alphaMap = videoMask
		}
		if(currState === MIDDLE){
			console.log("middle scene runned")
			MainRoomScene.add(MainRoomArrow)
			PoolEntranceScene.add(PoolEntranceArrow);
			CoachRoomScene.add(CoachRoomArrow)
			ProductRoomScene.add(ProductRoomArrow);

			glowScene.add(glow);
			glowScene.add(glowPoolEntracen);
			glowScene.add(glowCoach);
			glowScene.add(glowEntrace);

			CoachRoomArrow.position.set(3.2*arrowDist * Math.sin(toRadians(82.5)) , arrowHeight, -arrowDist*3.2 * Math.cos(toRadians(82.5)));
			//   CoachRoomArrow.scale.copy(navArrowScale)
			CoachRoomArrow.scale.set(5.5,3,5.5)
			ProductRoomArrow.position.set(2.5*arrowDist * Math.sin(toRadians(52)) , arrowHeight, -arrowDist*2.5 * Math.cos(toRadians(52)));
			//   ProductRoomArrow.scale.copy(navArrowScale)
			ProductRoomArrow.scale.set(5.5,3,5.5)
			MainRoomArrow.position.set(1.9*arrowDist * Math.sin(toRadians(-75)) , arrowHeight, -arrowDist*1.9 * Math.cos(toRadians(-75)));
			//   MainRoomArrow.scale.copy(navArrowScale)
			MainRoomArrow.scale.set(5.5,3,5.5)
			PoolEntranceArrow.position.set(2*arrowDist * Math.sin(toRadians(-30)) , arrowHeight, -arrowDist*2 * Math.cos(toRadians(-30)));
			PoolEntranceArrow.scale.set(6,3,6)

			glowCoach.position.set(3.2*arrowDist * Math.sin(toRadians(82.5)) , arrowHeight, -arrowDist*3.2 * Math.cos(toRadians(82.5)));
			glowEntrace.position.set(2.5*arrowDist * Math.sin(toRadians(52)) , arrowHeight, -arrowDist*2.5 * Math.cos(toRadians(52)));
			glow.position.set(1.9*arrowDist * Math.sin(toRadians(-75)) , arrowHeight, -arrowDist*1.9 * Math.cos(toRadians(-75)));
			glowPoolEntracen.position.set(2*arrowDist * Math.sin(toRadians(-30)) , arrowHeight, -arrowDist*2 * Math.cos(toRadians(-30)));

			//   PoolEntranceArrow.scale.copy(navArrowScale)

			TweenFadeInForArrow()
			calculateScale(glowPoolEntracen,6,3,6)
			calculateScale(glowCoach,5.5,3,5.5)
			calculateScale(glowEntrace,5.5,3,5.5)
			calculateScale(glow,5.5,3,5.5)
			//   tweenScaleForArrows(CoachRoomArrow,5.5,3,5.5)
			//   tweenScaleForArrows(ProductRoomArrow,5.5,3,5.5)
			//   tweenScaleForArrows(MainRoomArrow,5.5,3,5.5)
			//   tweenScaleForArrows(PoolEntranceArrow,6,3,6)

		}
	};







	//***********************CUBE MAP********************
	// envLoad(sceneUrl0)

	//***********************LIGHT********************
	const color = 0xFFFFFF;
	const intensity = 1;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(-1, 2, 4);
	scene.add(light);
	var glowTex = new THREE.TextureLoader().load( glowUrl );
	glowMat = new THREE.SpriteMaterial( { map: glowTex ,rotation:0,transparent: true ,opacity:0.6} );
	glow = new THREE.Sprite( glowMat );

	glowMiddle = new THREE.Sprite( glowMat );
	glowPoolEntracen = new THREE.Sprite( glowMat );
	glowSlefie = new THREE.Sprite( glowMat );
	glowPool = new THREE.Sprite( glowMat );
	glowCoach = new THREE.Sprite( glowMat );
	glowBeauty = new THREE.Sprite( glowMat );
	glowEntrace = new THREE.Sprite( glowMat );
	glowBaseProduct = new THREE.Sprite( glowMat );
	glowProduct = new THREE.Sprite( glowMat );
	productGlow1 = new THREE.Sprite( glowMat );
	productGlow2 = new THREE.Sprite( glowMat );
	productGlow3 = new THREE.Sprite( glowMat );


	glow.scale.copy(navArrowScale)
	glowMiddle.scale.copy(navArrowScale)
	glowSlefie.scale.copy(navArrowScale)
	glowPool.scale.copy(navArrowScale)
	glowCoach.scale.copy(navArrowScale)
	glowBeauty.scale.copy(navArrowScale)
	glowEntrace.scale.copy(navArrowScale)
	glowBaseProduct.scale.copy(navArrowScale)
	glowProduct.scale.copy(navArrowScale)
	glow.scale.copy(navArrowScale)
	//***********************ARROWS********************
	var arrowTexture = new THREE.TextureLoader().load( arrowUrl );
	arrowMat = new THREE.SpriteMaterial( { map: arrowTexture ,rotation:0,transparent: true,opacity:1} );
	CoachRoomArrow = new THREE.Sprite( arrowMat );
	// CoachRoomArrow.position.set(-18,-8,25);
	CoachRoomArrow.scale.copy(navArrowScale)

	glow.scale.copy(navArrowScale)
	PoolRoomArrow = new THREE.Sprite( arrowMat );
	// PoolRoomArrow.position.set(9,-4,4);
	PoolRoomArrow.scale.copy(navArrowScale)

	MainRoomArrow = new THREE.Sprite( arrowMat );
	// MainRoomArrow.position.set(0,-12,-22);
	// MainRoomArrow.position.set(arrowDist * Math.sin(toRadians(-20)) , arrowHeight, -arrowDist * Math.cos(toRadians(-20)));

	MainRoomArrow.scale.copy(navArrowScale)

	// var spriteTexture4 = new THREE.TextureLoader().load(arrowUrl );
	// var spriteMat4 = new THREE.SpriteMaterial( { map: spriteTexture4,rotation: -0.1 } );
	ProductRoomArrow = new THREE.Sprite( arrowMat );
	// ProductRoomArrow.position.set(-5,-7,-10);
	ProductRoomArrow.scale.copy(navArrowScale)

	// var spriteTexture5 = new THREE.TextureLoader().load(arrowUrl );
	// var spriteMat5 = new THREE.SpriteMaterial( { map: spriteTexture5,rotation: -0.1 } );
	selfieRoomArrow = new THREE.Sprite( arrowMat );
	// selfieRoomArrow.position.set(12,-7,-18);
	selfieRoomArrow.scale.copy(navArrowScale)

	// var spriteTexture6 = new THREE.TextureLoader().load(arrowUrl );
	// var spriteMat6 = new THREE.SpriteMaterial( { map: spriteTexture6,rotation: 0.1 } );
	videoRoomArrow = new THREE.Sprite( arrowMat );
	// videoRoomArrow.position.set(-5,-7,-20);
	videoRoomArrow.scale.copy(navArrowScale)

	// var spriteTexture7 = new THREE.TextureLoader().load( arrowUrl );
	// var spriteMat7 = new THREE.SpriteMaterial( { map: spriteTexture7,rotation: -0.1 } );
	BottleRoomArrow = new THREE.Sprite( arrowMat );
	BottleRoomArrow.scale.copy(navArrowScale)

	MiddleRoomArrow = new THREE.Sprite( arrowMat );
	MiddleRoomArrow.scale.copy(navArrowScale)

	PoolEntranceArrow = new THREE.Sprite( arrowMat );
	PoolEntranceArrow.scale.copy(navArrowScale)

	ProcuctBaseArrow = new THREE.Sprite( arrowMat );
	ProcuctBaseArrow.scale.copy(navArrowScale)

	const ProductMesh = new THREE.PlaneGeometry( 1, 1, 1 );
	var ProductTexture = new THREE.TextureLoader().load( ProductIconUrl );
	ProductMat = new THREE.MeshBasicMaterial( {map: ProductTexture, transparent: true,opacity:1,side: THREE.DoubleSide} );
	orbPlusMat = new THREE.MeshBasicMaterial( {map: ProductTexture, transparent: true,opacity:0,side: THREE.DoubleSide} );


	ProductIcon1 = new THREE.Mesh( ProductMesh, ProductMat );
	ProductIcon2 = new THREE.Mesh( ProductMesh, ProductMat );
	ProductIcon3 = new THREE.Mesh( ProductMesh, ProductMat );
	orbPlus = new THREE.Mesh( ProductMesh, orbPlusMat );
	// ProductIcon1.rotation.set(0,0,90)
	const selfiMesh = new THREE.PlaneGeometry( 1, 1 );
	const selfiMat = new THREE.MeshBasicMaterial( {color: 0xffff00, transparent: true,opacity:0, side: THREE.DoubleSide} );
	SelfiePlane = new THREE.Mesh( selfiMesh, selfiMat );
	//***********************ORB GLOW VIDEO********************
	// orbGlowPlane = new THREE.PlaneGeometry( 4, 4 );
	// orbGlowVideo = document.createElement('video');
	// orbGlowVideo.src = "video/Glitter2.mp4";
	// orbGlowVideo.muted = true;
	// orbGlowVideo.playsInline = true;

	// orbGlowVideoMask = document.createElement('video');
	// orbGlowVideoMask.src = "video/Glitter_Alpha.mp4";
	// orbGlowVideoMask.muted = true;
	// orbGlowVideoMask.playsInline = true;

	// orbGlowVideoTex =  new THREE.VideoTexture(orbGlowVideo)
	// orbGlowVideoMaskTex = new THREE.VideoTexture(orbGlowVideoMask)

	// orbGlowMat = new THREE.MeshBasicMaterial( {map:orbGlowVideoTex , transparent: true,opacity:1,side: THREE.DoubleSide});
	// orbGlowMat.alphaMap = orbGlowVideoMaskTex
	// orbGlow = new THREE.Mesh( orbGlowPlane, orbGlowMat );

	//***********************ORB PRODUCT VIDEO********************
	// orbProductPlane = new THREE.PlaneGeometry( 4, 4 );
	// orbProductVideo = document.createElement('video');
	// orbProductVideo.src = "video/AHC_Cream.mp4";
	// orbProductVideo.playsInline = true;
	// orbProductVideo.muted = true;
	// orbProductVideo.loop = true;

	// orbProductVideoMask = document.createElement('video');
	// orbProductVideoMask.src = "video/AHC_Cream_Alpha.mp4";
	// orbProductVideoMask.playsInline = true;
	// orbProductVideoMask.muted = true;
	// orbProductVideoMask.loop = true
	// orbProductVideoTex =  new THREE.VideoTexture(orbProductVideo)
	// orbProductVideoMaskTex = new THREE.VideoTexture(orbProductVideoMask)


	// orbProductMat = new THREE.MeshBasicMaterial( {map:orbProductVideoTex , transparent: true,opacity:1,side: THREE.DoubleSide});
	// orbProductMat.alphaMap = orbProductVideoMaskTex
	// orbProduct = new THREE.Mesh( orbProductPlane, orbProductMat );
	//***********************ORB VIDEO********************

	//***********************ORB VIDEO********************


	orbVideoPlane = new THREE.PlaneGeometry( 9, 9 );
	orbVideo = document.createElement('video');

	orbVideo.src = orbVideoUrl;
	orbVideo.playsInline = true;
	orbVideo.muted = true;
	orbVideo.loop = false;

	orbVideoMask = document.createElement('video');
	orbVideoMask.setsrc = "https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/video/orb/Orb.Alpha.V8.mp4";
	orbVideoMask.src = "video/orb/Orb.Alpha.V8.mp4";
	orbVideoMask.muted = true;
	orbVideoMask.playsInline = true;
	orbVideoMask.loop = true;
	orbVideo.loop = true;
	orbVideoMask.loop = false
	orbVideoTex =  new THREE.VideoTexture(orbVideo)
	orbVideoMaskTex = new THREE.VideoTexture(orbVideoMask)
	orbVideoMat = new THREE.MeshBasicMaterial( {map: orbVideoTex, transparent: true,opacity:1,side: THREE.DoubleSide} );
	orbVideoMat.alphaMap = orbVideoMaskTex
	orbVideoMesh = new THREE.Mesh( orbVideoPlane, orbVideoMat );

	//***********************VIDEO1********************
	videoPlane = new THREE.PlaneGeometry( 16, 9 );
	video = document.createElement('video');
	video.setsrc = "https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/video/sceneVideo.mp4"; // Set video address
	video.src = "video/sceneVideo.mp4"; // Set video address
	video.setAttribute("id", "videoScene");
	video.preload = true
	video.playsInline = true;
	video.muted = true;
	video.loop = true;

	video2 = document.createElement('video');
	video2.setsrc = "https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/video/sceneVideoAlpha.mp4";
	video2.src = "video/sceneVideoAlpha.mp4";
	video2.setAttribute("id", "videoSceneAlpha1");


	video2.muted = true;
	video2.loop = true;
	video2.playsInline = true;
	video3 = document.createElement('video');
	video3.setsrc = "https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/video/sceneVideoAlpha3.mp4";
	video3.src = "video/sceneVideoAlpha3.mp4";
	video3.setAttribute("id", "videoSceneAlpha2");

	video3.muted = true;
	video3.loop = true;
	video3.playsInline = true;

	// alphaMask = new THREE.TextureLoader().load( "video/10_sec_MP4_Alpha.mp4");
	videoMask = new THREE.VideoTexture(video2)
	videoMask2 = new THREE.VideoTexture(video3)
	videoTexture = new THREE.VideoTexture(video)
	videoMat = new THREE.MeshBasicMaterial( {map: videoTexture, transparent: true,opacity:0,side: THREE.DoubleSide} );
	videoMat.alphaMap = videoMask

	RoomVideoPlay = new THREE.Mesh( videoPlane, videoMat );

	// ***********************VIDEO2********************
	videoMeshBottleScene = new THREE.PlaneGeometry( 9, 16 );
	bilboardVideo  = document.createElement('video');
	bilboardVideo.setsrc = "https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/video/K-BeautyTreatmentAreaKrystalLogo-1.mp4"; // Set video address
	bilboardVideo.src = "video/K-BeautyTreatmentAreaKrystalLogo-1.mp4"; // Set video address
	bilboardVideo.playsInline = true;
	bilboardVideo.muted = true;
	bilboardVideo.loop = true;
	bilboardVideoTex = new THREE.VideoTexture(bilboardVideo)

	videoMatBottleScene = new THREE.MeshBasicMaterial( {map: bilboardVideoTex,opacity:1,side: THREE.DoubleSide} );
	// videoMatBottleScene.alphaMap = alphaMaskBottleScene
	VideoPlayBottleScene = new THREE.Mesh( videoMeshBottleScene, videoMatBottleScene );
	VideoPlayBottleScene.scale.copy(navVideoScale)


	// const hoverTextGeo = new THREE.PlaneGeometry( 1, 1, 1 );
	// const hoverTextTexture = new THREE.TextureLoader().load( "images/text.png" );
	// const hoverTextMat = new THREE.MeshBasicMaterial( {map: hoverTextTexture,transparent:true, opacity: 1} );
	// const hoverText = new THREE.Mesh( hoverTextGeo, hoverTextMat );
	//
	// const selfieTextGeo = new THREE.PlaneGeometry( 1, 1, 1 );
	// const selfieTextTexture = new THREE.TextureLoader().load( "images/text.png" );
	// const selfieTextMat = new THREE.MeshBasicMaterial( {map: selfieTextTexture,transparent:true, opacity: 1} );
	// const selfieText = new THREE.Mesh( selfieTextGeo, selfieTextMat );


	// window.addE999ventListener( 'resize', onWindowResize );
	ProductButtons();
	clickTrigger();
	console.log("v2");
	renderer.autoclear = false;
}

function getTexturesFromAtlasFile( atlasImgUrl, tilesNum ) {
	const textures = [];
	for ( let i = 0; i < tilesNum; i ++ ) {
		textures[ i ] = new THREE.Texture();
	}
	new THREE.ImageLoader(manager)
		.load( atlasImgUrl, ( image ) => {

			let canvas, context;
			const tileWidth = image.height;

			for ( let i = 0; i < textures.length; i ++ ) {
				canvas = document.createElement( 'canvas' );
				context = canvas.getContext( '2d' );
				canvas.height = tileWidth;
				canvas.width = tileWidth;
				context.drawImage( image, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
				textures[ i ].image = canvas;
				textures[ i ].needsUpdate = true;
			}
		} );
	return textures;
}

function ProductButtons(){
	document.getElementById('productButton-1').addEventListener("click", function(){
		new TWEEN.Tween( ProductMat ).to( { opacity: 1 }, 500 ).start();
	});
	document.getElementById('productButton-2').addEventListener("click", function(){
		new TWEEN.Tween( ProductMat ).to( { opacity: 1 }, 500 ).start();
	});
	document.getElementById('productButton-3').addEventListener("click", function(){
		new TWEEN.Tween( ProductMat ).to( { opacity: 1 }, 500 ).start();
	});
	document.getElementById('close-product').addEventListener("click", function(){
		new TWEEN.Tween( ProductMat ).to( { opacity: 1 }, 500 ).start();
	});
	document.getElementById('close-product2').addEventListener("click", function(){
		new TWEEN.Tween( ProductMat ).to( { opacity: 1 }, 500 ).start();
	});
	document.getElementById('close-product3').addEventListener("click", function(){
		new TWEEN.Tween( ProductMat ).to( { opacity: 1 }, 500 ).start();
	});

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
var endbool;
function onVideoLoad() {

	orbVideo.removeEventListener( 'loadedmetadata', onVideoLoad, false );
	// videoManager.itemEnd( "video/Ahc.Reveal.v5.BASE.mp4" ); // notifying about end of loading process
	videoManager.itemEnd( "https://d2c33fbhlldtf9.cloudfront.net/QReal-AHC-tests/scene/video/Ahc.Reveal.v5.BASE.mp4" ); // notifying about end of loading process
	orbVideo.play();
	orbVideoMask.play()
	console.log("LOADED")
}


var hoverButtonChecker = false
document.getElementById('pool-btn').addEventListener("click", function(e){
	hoverButtonChecker = true
	clickableVideo = false
	volumeDown()
	runTween()
});
document.getElementById('orb-btn').addEventListener("click", function(e){
	hoverButtonChecker = true
	orbClickable = false

});
document.getElementById('beauty-btn').addEventListener("click", function(e){
	console.log("clicked")
	hoverButtonChecker = true
	bilboardClickable = false

});
document.getElementById('beauty-vid-1').addEventListener("click", function(e){
	volumeDown()
});
document.getElementById('beauty-vid-2').addEventListener("click", function(e){
	volumeDown()
});
document.getElementById('beauty-vid-3').addEventListener("click", function(e){
	volumeDown()
});

if( currState === MAIN){
	document.getElementById('close-btn').addEventListener("click", function(e){
		hoverButtonChecker = false
	});
}


document.getElementById('back-btn').addEventListener("click", function(e){
	hoverButtonChecker = false
	bilboardClickable = true
	document.getElementById('beauty-treatment-overlay').style.display = "none"
	volumeUp()
});
var player = videojs('#video2');
player.on('ended', function () {
	hoverButtonChecker = false
	volumeUp()
})


var player1 = videojs('#vid-1');
player1.on('ended', function () {
  volumeUp()
})
var player2 = videojs('#vid-2');
player2.on('ended', function () {
  volumeUp()
})
var player4 = videojs('#vid-3');
player4.on('ended', function () {
  volumeUp()
})
var player3 = videojs('#orb-vid');
player3.on('ended', function () {
	orbClickable = true
	hoverButtonChecker = false
})

var orbVideoPlayed = false
var flagOrb = false
var orbVidBool = false
var orbVidMaskBool = false

function loadOrbVide(){
	orbVideo.onloadeddata  = function() {
		orbVidBool = true
		console.log("video Loaded")
	}
	orbVideoMask.onloadeddata  = function() {
		orbVidMaskBool = true
		console.log("video Loaded")
	}
	return true;

}

var setonetime = false
var videoClickfalse = false
function animate() {
	// if ((orbVideo.currentTime < 12.5|| orbVideo.currentTime >= 17.95) && orbVideoFinished == true ) {
	// 	orbVideo.currentTime =12.5;
	// 	orbVideoMask.currentTime =12.5;

	// }


	//***********************TWEEN********************

	var testBool = false



	var dirVector = new THREE.Vector3();
	camera.getWorldDirection(dirVector)


	if(dirVector.distanceTo(prevDirVector) > 0.005){
		dragOrb = false;
		dragBilboard = false
		dragTherapy =false
	} else {
		dragOrb = true;
		dragBilboard = true
		dragTherapy =true
	}
	camera.getWorldDirection(prevDirVector)

	if(currState === SELFIE){
		camera.getWorldDirection(dirVector)
		// console.log(dirVector.x +', '+dirVector.y +', '+dirVector.z);

		if(selfieLoad == true && dirVector.z > 0.25 && dirVector.z < 0.75 && dirVector.y > -0.3 && dirVector.x < 0 ){ // need to stress test
			document.getElementById('selfie-text').style.opacity = 1;
			document.getElementById('selfie-btn').style.opacity = 1;
			document.getElementById('selfie-btn').style.pointerEvents = "auto";
			document.getElementById('whiteScreen').style.display = 'block';
			if(!flashHasPlayed){
				flashSound.play();
				flashHasPlayed = true;
			}

		} else {
			flashHasPlayed = false;

			document.getElementById('selfie-text').style.opacity = 0;
			document.getElementById('selfie-btn').style.opacity = 0;
			document.getElementById('selfie-btn').style.pointerEvents = "none";
			document.getElementById('whiteScreen').style.display = 'none';

		}
	}
	else if(currState === POOL){
		camera.getWorldDirection(dirVector)
		// console.log(dirVector.x +', '+dirVector.y +', '+dirVector.z);

		if(poolLoad == true && hoverButtonChecker === false && dirVector.z > -0.4 && dirVector.z < 0.9 && dirVector.y > -0.3 && dirVector.x > 0 && dirVector.x < 1   ){ // need to stress test
			document.getElementById('pool-text').style.opacity = 1;
			document.getElementById('pool-btn').style.opacity = 1;
			document.getElementById('pool-btn').style.pointerEvents = "auto";
		} else {
			document.getElementById('pool-text').style.opacity = 0;
			document.getElementById('pool-btn').style.opacity = 0;
			document.getElementById('pool-btn').style.pointerEvents = "none";
		}
	} else if(currState === BEAUTY){
		camera.getWorldDirection(dirVector)
		// console.log(dirVector.x +', '+dirVector.y +', '+dirVector.z);

		if(beautyLoad == true && hoverButtonChecker === false && dirVector.z > -0.95 && dirVector.z < 0 && dirVector.y > -0.3 && dirVector.x < -0.35 ){ // need to stress test
			document.getElementById('beauty-text').style.opacity = 1;
			document.getElementById('beauty-btn').style.opacity = 1;
			document.getElementById('beauty-btn').style.pointerEvents = "auto";
		} else {
			document.getElementById('beauty-text').style.opacity = 0;
			document.getElementById('beauty-btn').style.opacity = 0;
			document.getElementById('beauty-btn').style.pointerEvents = "none";
		}
	}else if(currState === MAIN){
		camera.getWorldDirection(dirVector)

		// console.log(dirVector.x +', '+dirVector.y +', '+dirVector.z);
		if(hoverButtonChecker == false && dirVector.z > -0.8 && dirVector.z < 0.8 && dirVector.y > -0.3 && dirVector.x < 0 ){ // need to stress test

			// async function playVideo(){
			// 	let played = await loadOrbVide()
			// 	console.log(played)
			// 	if(played === true){
			// 		orbVideo.currentTime = 0;
			// 		orbVideoMask.currentTime = 0;
			// 		orbVideo.play();
			// 		orbVideoMask.play()
			// 	}
			// }

			if(orbVideoPlayed == false){


				// orbVideo.addEventListener("ended",function(){

				// 	if(orbProductVideo.currentTime != orbProductVideoMask.currentTime){
				// 		orbProductVideo.currentTime = 2;
				// 		orbProductVideoMask.currentTime = 2;
				// 	}
				// 	// orbGlowVideo.play()
				// 	// orbGlowVideoMask.play()



				// })
				orbVideo.currentTime = 0;
				orbVideoMask.currentTime = 0;
				onVideoLoad()
				if(orbVideo.currentTime != orbVideoMask.currentTime){
					orbVideo.currentTime = 0;
					orbVideoMask.currentTime = 0;
				}

				orbVideoPlayed = true


			}

			if(orbVideo.currentTime >7 &&orbVideo.currentTime <7.1){
				orbClickable = true
				flagOrb = true
				document.getElementById('orb-text').style.opacity = 1;
				document.getElementById('orb-btn').style.opacity = 1;
				document.getElementById('orb-btn').style.pointerEvents = "auto";
			}
			if(flagOrb ===true){
				document.getElementById('orb-text').style.opacity = 1;
				document.getElementById('orb-btn').style.opacity = 1;
				document.getElementById('orb-btn').style.pointerEvents = "auto";
			}



		} else {
			document.getElementById('orb-text').style.opacity = 0;
			document.getElementById('orb-btn').style.opacity = 0;
			document.getElementById('orb-btn').style.pointerEvents = "none";


		}
	}


	requestAnimationFrame( animate );
	renderer.autoClear = true;
	controls.update();
	camera.quaternion.copy( skydome.camera.quaternion );

	renderer.render(skydome.scene, skydome.camera);

	renderer.autoClear = false;

	renderer.render(scene, camera );


	// Hover Text
	var vector = camera.position.clone();
	var testBool = false

	if (vector.x > 0.0005 && vector.x <0.013 && testBool == false){
		new TWEEN.Tween( text.material ).to( { opacity: 1 }, 1000 ).start();
		runTween()
		console.log("tween started")
		testBool = true;
	} if(vector.x >0.013 || vector.x <0){
		new TWEEN.Tween( text.material ).to( { opacity: 0 }, 500 ).start();
		testBool = false;
	}

	runTween()
}

function clickTrigger(){
	const raycaster = new THREE.Raycaster();
	console.log("clickTrigger is run");
	renderer.domElement.addEventListener("touchstart", event => {
		console.log("touch event registered");
		// })
		// document.addEventListener("click", event => {
		console.log(event);
		mouse.x = event.touches[0].pageX / window.innerWidth * 2 - 1;
		mouse.y = -(event.touches[0].pageY / window.innerHeight) * 2 +1 ;
		raycaster.setFromCamera( mouse, camera );
		console.log(mouse)

		var intersectsPoolRoom = raycaster.intersectObjects( PoolRoomScene.children, false );
		var intersectsMainRoom = raycaster.intersectObjects( MainRoomScene.children, false );
		var intersectsCoachRoom = raycaster.intersectObjects( CoachRoomScene.children, false );
		var intersectsProductRoom = raycaster.intersectObjects( ProductRoomScene.children, false );
		var intersectsRoomVideoPlay = raycaster.intersectObjects( RoomVideoPlayScene.children, false );
		var intersectsSelfie = raycaster.intersectObjects( selfieScene.children, false );
		var intersectsVideoRoom = raycaster.intersectObjects( VideoRoomScene.children, false );
		var intersectsBottleRoom = raycaster.intersectObjects( BottleRoomScene.children, false );
		var intersectsProductPlusIcon1 = raycaster.intersectObjects( ProductIconScene1.children, false );
		var intersectsProductPlusIcon2 = raycaster.intersectObjects( ProductIconScene2.children, false );
		var intersectsProductPlusIcon3 = raycaster.intersectObjects( ProductIconScene3.children, false );
		var intersectsMultipleVideo = raycaster.intersectObjects( BottleRoomVideoPlayScene.children, false );
		var intersectsSelfieClick = raycaster.intersectObjects( SelfiePlaneScene.children, false );
		var intersectsPoolEntrance = raycaster.intersectObjects( PoolEntranceScene.children, false );
		var intersectsProductBase = raycaster.intersectObjects( ProcuctBaseScene.children, false );
		var intersectsMiddleRoom = raycaster.intersectObjects( MiddleRoomScene.children, false );
		var intersectsOrbPlus = raycaster.intersectObjects( orbPlusScene.children, false );
		var intersectsorbProductScene = raycaster.intersectObjects( OrbVideoScene.children, false );
		if ( intersectsOrbPlus.length > 0 ) {


		}

		//***********************POOL SCENE**************************
		if ( intersectsPoolRoom.length > 0 ) {
			setTimeout(function(){
				envLoad(sceneUrl9)
				currState = POOL

			}, 500)

			DisableEverything()

			// POOL SCENE - HOVER TEXT
			// console.log("campos X= " +  camera.position.x + "Y= " + camera.position.y)

			// hoverText.position.set(90, -25, 65)
			// hoverText.rotation.set(0,-1.5,-0.01)
			// hoverText.scale.set(20,20,6)
			// scene.add(hoverText);


		}
		//***********************SELFIE SCENE**************************
		if ( intersectsSelfie.length > 0 ) {

			setTimeout(function(){
				envLoad(sceneUrl10)
				currState = SELFIE;
			}, 500);
			console.log("SELFIE SCENE - 1")
			DisableEverything()



			// videoMesh.position.set(135, 15, -15);


			// SELFIE SCENE - HOVER TEXT
			// console.log("campos X= " +  camera.position.x + "Y= " + camera.position.y)

			// selfieText.position.set(90, 0, 65)
			// selfieText.rotation.set(0,-1.5,-0.01)
			// selfieText.scale.set(20,20,6)
			// scene.add(selfieText);



		}
		//***********************POOL ENTRANCE SCENE**************************
		if ( intersectsPoolEntrance.length > 0 ) {

			setTimeout(function(){
				envLoad(sceneUrl2)
				currState = POOLENTRACE;
			}, 500);
			console.log("POOL ENTRANCE SCENE - 1")
			DisableEverything()



		}
		//***********************PRODUCT BASE SCENE**************************
		if ( intersectsProductBase.length > 0 ) {

			setTimeout(function(){
				envLoad(sceneUrl8)
				currState = PRODUCTBASE;
			}, 500);
			console.log("PRODUCT BASE SCENE")
			DisableEverything()



		}
		//***********************MIDDLE SCENE**************************
		if ( intersectsMiddleRoom.length > 0 ) {

			setTimeout(function(){
				envLoad(sceneUrl3)
				currState = MIDDLE;
			}, 500);
			console.log("MIDDLE SCENE - 1")
			DisableEverything()



		}
		//***********************COACH SCENE**************************
		if ( intersectsCoachRoom.length > 0 ) {
			console.log("COACH SCENE - 1")

			setTimeout(function(){
				envLoad(sceneUrl4)
				currState = COUCH
			}, 500);


			DisableEverything()


		}

		//***********************PRODUCT ROOOM SCENE********************Arrow4******
		if(intersectsProductRoom.length > 0  ) {
			console.log("ROOM ENTREANCE SCENE - 1")


			setTimeout(function(){
				envLoad(sceneUrl5)

				currState = PRODENTRANCE
			}, 500);

			DisableEverything()

		}

		//***********************Video ROOM SCENE**************************
		if(intersectsVideoRoom.length > 0  ) {
			console.log("VIDEO ROOM SCENE - 1")

			setTimeout(function(){
				envLoad(sceneUrl6)
				currState = BEAUTY
			}, 500);

			DisableEverything()
		}

		//***********************BOTTLE ROOOM SCENE**************************
		if(intersectsBottleRoom.length > 0  ) {
			console.log("BOTTLE ROOM SCENE - 1")


			setTimeout(function(){
				envLoad(sceneUrl7)
				currState = PRODUCTS
				// skyBox.rotation.y =0
			}, 500);



			DisableEverything()
		}




		//***********************BACK TO MAIN SCENE*************************
		if(intersectsMainRoom.length > 0  ) {
			console.log("MAIN SCENE - 1")


			setTimeout(function(){
				envLoad(sceneUrl1)
				currState = MAIN
				// skyBox.rotation.y = -1.7
			}, 500);
			// TweenForVideos(videoMat)
			DisableEverything()

		}
		// if(intersectsMultipleVideo.length > 0 ) {
		// 	alert("Video Clicked");
		// }
		var productbool;
		if((productBaseLoad == true ||procutLoad == true) && intersectsProductPlusIcon1.length > 0 ) {
			productbool = true
			console.log("video clicked")
			document.getElementById('product1').style.display = 'block';
			document.getElementById('productButton-1').style.display = 'block';
			new TWEEN.Tween( ProductMat ).to( { opacity: 0 }, 250 ).start();

			//window.open('https://us.ahcbeauty.com/')
		}
		if((productBaseLoad == true ||procutLoad == true) && intersectsProductPlusIcon2.length > 0) {
			productbool = true
			console.log("video clicked")
			document.getElementById('product2').style.display = 'block';
			document.getElementById('productButton-2').style.display = 'block';
			new TWEEN.Tween( ProductMat ).to( { opacity: 0 }, 250 ).start();
			//window.open('https://us.ahcbeauty.com/')
		}
		if((productBaseLoad == true ||procutLoad == true) && intersectsProductPlusIcon3.length > 0 ) {
			productbool = true
			console.log("video clicked")
			document.getElementById('product3').style.display = 'block';
			document.getElementById('productButton-3').style.display = 'block';
			new TWEEN.Tween( ProductMat ).to( { opacity: 0 }, 250 ).start();


			//window.open('https://us.ahcbeauty.com/')
		}
		if(intersectsSelfieClick.length > 0 && selfieSceneClick == true) {
			// alert("Selfie Clicked")
		}

		//***********************PLAY VIDEO ON PRODUCT SCENE**************************
		if (poolLoad == true && intersectsRoomVideoPlay.length > 0 && clickableVideo == true && dragTherapy == true) {
			if(clickAllowed){
				document.getElementById('pool-btn').click();
				clickableVideo = false
			}
		}
		if (beautyLoad == true && intersectsMultipleVideo.length > 0 && bilboardClickable == true && dragBilboard == true) {
			if(clickAllowed){
				document.getElementById('beauty-btn').click();
				bilboardClickable = false
			}
		}
		if ( intersectsorbProductScene.length > 0 && orbClickable == true && dragOrb == true) {
			if(clickAllowed){
				document.getElementById('orb-btn').click();
				orbClickable = false
			}
		}
	});
}

function envLoad(textureUrl){
	const textures = getTexturesFromAtlasFile( textureUrl, 6 );
	materials = [];


	for ( let i = 0; i < 6; i ++ ) {
		materials.push( new THREE.MeshBasicMaterial( { map: textures[ i ] ,opacity: 0, transparent: true, depthWrite:false, depthTest :false} ) );
	}

	skyBox = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), materials );



	skyBox.geometry.scale( 1, 1, -1 );
	// for ( let i = 0; i < 6; i ++ ) {
	// 	new TWEEN.Tween(materials[i]).to( { opacity: 1 }, 500 ).start();
	// 	runTween()
	// }

	setTimeout(function(){
		for ( let i = 0; i < 6; i ++ ) {
			materials[i].transparent = true
		}
	}, 500);
	// manager.onLoad = function ( ) {

	// 	console.log( 'Loading complete!');

	// };

	skydome.scene.add( skyBox );

}

function runTween(){
	requestAnimationFrame(runTween)
	TWEEN.update()
}

function DisableEverything(){
	document.getElementById("lds-ring").style.display = "inline-block";
	firtVideoChecker = false
	secondVideoChecker = false
	clickableVideo = false
	selfieSceneClick = false
	video.pause();
	video2.pause();
	video3.pause();
	orbVideo.pause();
	bilboardVideo.pause();
	orbVideoMask.pause()
	// orbProductVideo.pause()
	// orbProductVideoMask.pause()
	loaderCheck = false
	orbVideoPlayed = false
	bilboardClickable = false
	orbClickable = false
	flagOrb = false
	selfieLoad = false
	poolLoad = false
	beautyLoad = false
	productBaseLoad = false
	procutLoad = false
	orbVideoFinished =false
	orbVideoPlayCheck = false
	orbVideoMask.loop = false;
	orbVideo.loop = false;
	console.log(loaderCheck)
	new TWEEN.Tween( orbPlusMat ).to( { opacity: 0 }, 250 ).start();
	document.getElementById('selfie-text').style.display = 'none';
	document.getElementById('selfie-btn').style.display = 'none';
	document.getElementById('pool-text').style.display = 'none';
	document.getElementById('whiteScreen').style.display = 'none';
	document.getElementById('orb-text').style.display = 'none';
	document.getElementById('orb-btn').style.display = 'none';
	document.getElementById('orb-btn').style.pointerEvents = 'none';
	document.getElementById('pool-btn').style.display = 'none';
	document.getElementById('beauty-text').style.display = 'none';
	document.getElementById('beauty-btn').style.display = 'none';
	document.getElementById('beauty-btn').style.pointerEvents = 'none';
	document.getElementById('pool-btn').style.pointerEvents = 'none';
	document.getElementById('selfie-btn').style.pointerEvents = 'none';

	let ArrowArray = [glowScene,orbPlus,orbProduct,ProcuctBaseArrow,PoolEntranceArrow,orbVideoMesh,MainRoomArrow,PoolRoomArrow,selfieRoomArrow,CoachRoomArrow,videoRoomArrow,ProductRoomArrow,BottleRoomArrow,RoomVideoPlay,VideoPlayBottleScene,ProductIcon1,ProductIcon2,ProductIcon3,VideoPlayBottleScene,SelfiePlane,MiddleRoomArrow]
	let ArrowScene = [glow,orbPlusScene,orbProductScene,ProcuctBaseScene,PoolEntranceScene,OrbVideoScene,MainRoomScene,PoolRoomScene,selfieScene,CoachRoomScene,VideoRoomScene,ProductRoomScene,BottleRoomScene,RoomVideoPlayScene,BottleRoomVideoPlayScene,ProductIconScene1,ProductIconScene2,ProductIconScene3,BottleRoomVideoPlayScene,SelfiePlaneScene,MiddleRoomScene]
	let glowArray = [productGlow1,productGlow2,productGlow3,glow, glowMiddle,glowPoolEntracen,glowSlefie,glowPool,glowCoach,glowBeauty,glowEntrace,glowBaseProduct,glowProduct]
	setTimeout(function(){
		for (var i = 0; i < glowArray.length; i++) {
			glowScene.remove(glowArray[i]);

		}
	}, 200);
	setTimeout(function(){
		for (var i = 0; i < ArrowArray.length; i++) {
			ArrowScene[i].remove(ArrowArray[i]);
			console.log("DISABLE THINGS RUNNED")
		}
	}, 200);
	// TweenFadeOutForVideos(videoMat)
	TweenFadeOutForVideos()
}

function TweenFadeOutForVideos(){

	new TWEEN.Tween( videoMat ).to( { opacity: 0 }, 250 ).start();
	new TWEEN.Tween( arrowMat ).to( { opacity: 0 }, 250 ).start();
	new TWEEN.Tween( videoMatBottleScene ).to( { opacity: 0 }, 250 ).start();
}
function TweenFadeInForVideos(VideoOpacityMat){

	new TWEEN.Tween( VideoOpacityMat ).to( { opacity: 1 }, 1000 ).start();

}

function volumeDown(){

	new TWEEN.Tween(sound.gain.gain)
		.to(
			{
				value: 0,
			},
			1500
		).start()
}
function volumeUp(){

	new TWEEN.Tween(sound.gain.gain)
		.to(
			{
				value: 0.65*mainVolumeMultiplier,
			},
			1250
		).start()
}
function tweenScaleForArrows(){
	// var scaleX = sx+sx*0.1;
	// var scaleY = sy + sy*0.1;
	// var scaleZ =  sz + sz*0.1;
	new TweenMax.fromTo(glowMat, 1,{
			opacity:0,
		},
		{ opacity:0.45,
			ease: Sine.easeInOut,
			yoyo: true,

			repeat:-1,

		});
}
function TweenFadeInForArrow(){

	new TWEEN.Tween( arrowMat ).to( { opacity: 1 }, 1000 ).start();

}
function TweenFadeInForBilboardVideos(){

	new TWEEN.Tween( videoMatBottleScene ).to( { opacity: 1 }, 1000 ).start();

}
function checkTheVideoLoad(){

	video.onloadeddata  = function() {

		video.play()
		video2.play()
		video3.play()
		video.currentTime = 0;
		video2.currentTime = 0;
		console.log("LOADED")

	};


}


var input = document.getElementById('phone');
input.oninvalid = function(event) {
	event.target.setCustomValidity('Phone number is 18 digit maximum');
}

var xmlhttp;
var post_url = 'post_user.php';

$(document).ready(function() {
	const submit = document.getElementById('share-submit');
	submit.addEventListener('click', sendUser);
});

function sendUser() {
	let phoneNumber = document.getElementById('phone').value;
	console.log(phoneNumber)
	if (phoneNumber==null){
		alert("Phone number invalid, try again");

	} else {
		xmlhttp=new XMLHttpRequest();
		xmlhttp.open("POST", post_url, true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		console.log("sendUser phone = " + phoneNumber);
		xmlhttp.send("phone="+phoneNumber);
		xmlhttp.addEventListener("load", transferComplete);
	}
}

function transferComplete(evt) {
	console.log("The transfer is complete.");
	input.value = "";
	shareContainer.style.display = 'none';
	copyLink();
}

// document.getElementById('selfie-btn').addEventListener("click", openSelfie);
// function openSelfie(){
//   window.location.href="../selfie/camera.html#"+url_params
//   // window.open('../selfie/index.html')
// }

function sharePopup() {
	if(region === CHINA){
		shareContainer.style.display = 'block';
		console.log('show share-container')
		// add close button listener
		shareClose.addEventListener('click', closeSharePopup);
	} else {
		copyLink();
	}
}

function closeSharePopup() {
	shareContainer.style.display = 'none'
}

function copyLink() {
	const linkToCopy = "https://ahc-spa.ulcampaign.com/";

	if (navigator.share) {
		navigator.share({
			title: 'AHC You Spa',
			url: linkToCopy
		}).then(() => {

			setTimeout(() => {
				shareContainer.style.display = 'none;'
			}, 2000)
		})
			.catch(console.error);
	} else {
		// TODO Add fallback to copy Link
		navigator.clipboard.writeText(linkToCopy)
			.then(() => {
				console.log("copied");
				var copiedText = "LINK COPIED"
				if(selectedLanguage.localeCompare("zh") === 0){
					copiedText = "链接已复制"
				} else if(selectedLanguage.localeCompare("ko") === 0){
					copiedText = "링크 복사됨"
				}
				shareSubmit.innerText = copiedText
				var tempText = document.getElementById('share-btn').innerHTML
				document.getElementById('share-btn').innerHTML = copiedText
				setTimeout(() => {
					shareSubmit.innerText = tempText
					document.getElementById('share-btn').innerHTML = tempText
					shareContainer.style.display = 'none;'
				}, 2000)

			})
			.catch((error) => {
				alert('Copy failed! ${error}')
			})
	}
}
