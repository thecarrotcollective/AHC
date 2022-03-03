import {
	Euler,
	EventDispatcher,
	MathUtils,
	Quaternion,
	TOUCH,
	Vector2,
	Vector3
} from './three.module.js';

/**
 * W3C Device Orientation control (http://w3c.github.io/deviceorientation/spec-source-orientation.html)
 */

var DeviceOrientationControls = function ( object, domElement ) {
	// console.log("loaded Dev Orientation with Orb");
	if ( window.isSecureContext === false ) {

		console.error( 'THREE.DeviceOrientationControls: DeviceOrientationEvent is only available in secure contexts (https)' );

	}
	if ( domElement === undefined ) console.warn( 'THREE.OrbitControls: The second parameter "domElement" is now mandatory.' );
	if ( domElement === document ) console.error( 'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.' );


	var scope = this;
	var changeEvent = { type: 'change' };
	var EPS = 0.000001;

	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };

	this.object = object;
	this.object.rotation.reorder( 'YXZ' );
	this.domElement = domElement;

	var rotateStart = new Vector2();
	var rotateEnd = new Vector2();
	var rotateDelta = new Vector2();

	var lastX = 0;
	var diffX = 0;

	var STATE = {
		NONE: - 1,
		ROTATE: 0,
		DOLLY: 1,
		PAN: 2,
		TOUCH_ROTATE: 3,
		TOUCH_PAN: 4,
		TOUCH_DOLLY_PAN: 5,
		TOUCH_DOLLY_ROTATE: 6
	};

	var state = STATE.NONE;

	this.enabled = true;

	this.target = new Vector3();

	this.deviceOrientation = {};
	this.screenOrientation = 0;

	this.alphaOffset = 0; // radians

	var onDeviceOrientationChangeEvent = function ( event ) {

		scope.deviceOrientation = event;

	};

	var onScreenOrientationChangeEvent = function () {

		scope.screenOrientation = window.orientation || 0;

	};

	// The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

	var setObjectQuaternion = function () {

		var zee = new Vector3( 0, 0, 1 );

		var euler = new Euler();

		var q0 = new Quaternion();

		var q1 = new Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

		return function ( quaternion, alpha, beta, gamma, orient ) {

			euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us

			quaternion.setFromEuler( euler ); // orient the device

			quaternion.multiply( q1 ); // camera looks out the back of the device, not the top

			quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation

		};

	}();

	this.connect = function () {

		onScreenOrientationChangeEvent(); // run once on load

		// iOS 13+

		if ( window.DeviceOrientationEvent !== undefined && typeof window.DeviceOrientationEvent.requestPermission === 'function' ) {

			window.DeviceOrientationEvent.requestPermission().then( function ( response ) {

				if ( response == 'granted' ) {

					window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent );
					window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent );

				}

			} ).catch( function ( error ) {

				console.error( 'THREE.DeviceOrientationControls: Unable to use DeviceOrientation API:', error );

			} );

		} else {

			window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent );
			window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent );

		}

		scope.enabled = true;

	};

	this.disconnect = function () {

		window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent );
		window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent );

		scope.enabled = false;

	};

	this.update = ( function () {

		var lastQuaternion = new Quaternion();

		return function () {

			if ( scope.enabled === false ) return;

			var device = scope.deviceOrientation;

			if ( device ) {

				var alpha = device.alpha ? MathUtils.degToRad( device.alpha ) + scope.alphaOffset: 0; // Z

				var beta = device.beta ? MathUtils.degToRad( device.beta ) : 0; // X'

				var gamma = device.gamma ? MathUtils.degToRad( device.gamma) : 0; // Y''

				var orient = scope.screenOrientation ? MathUtils.degToRad( scope.screenOrientation) : 0; // O

				// console.log('a ' + device.alpha)
				// console.log('b ' + device.beta)
				// console.log('g ' + device.gamma)
				// console.log('o ' + scope.screenOrientation)

				setObjectQuaternion( scope.object.quaternion, alpha, beta, gamma, orient );

				if ( 8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

					lastQuaternion.copy( scope.object.quaternion );
					scope.dispatchEvent( changeEvent );
				}
			}
		};
	} )();

	function rotateLeft( angle ) {
		// console.log('angle : ' + angle);
		// sphericalDelta.theta -= angle;
	}

	function handleTouchStartRotate( event ) {
		lastX = event.touches[ 0 ].pageX
		// if ( event.touches.length == 1 ) {
		// 	rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
		// } else {
		// 	var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
		// 	var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );
		// 	rotateStart.set( x, y );
		// }
	}

	function handleTouchMoveRotate( event ) {
		diffX = lastX - event.touches[ 0 ].pageX
		// console.log(diffX);
		var deltaAmt = (2 * Math.PI * diffX) / (scope.domElement.clientHeight)
		// console.log(deltaAmt);
		// console.log(scope.domElement.clientHeight);
		scope.alphaOffset -= deltaAmt
		// var element = scope.domElement;
		// rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

		lastX = event.touches[ 0 ].pageX
	}

	function onTouchStart( event ) {
		if ( scope.enabled === false ) return;
		event.preventDefault(); // prevent scrolling
		if ( event.touches.length === 1) {
			if ( scope.enableRotate === false ) return;
			handleTouchStartRotate( event );
			state = STATE.TOUCH_ROTATE;
		}

		/* TODO - not sure if the below lines are needed  */
		if ( state !== STATE.NONE ) {
			scope.dispatchEvent( startEvent );
		}
	}

	function onTouchMove( event ) {
		if ( scope.enabled === false ) return;
		event.preventDefault(); // prevent scrolling

		if ( state ===  STATE.TOUCH_ROTATE) {
				if ( scope.enableRotate === false ) return;
				handleTouchMoveRotate( event );
				scope.update();
		}
	}

	function onTouchEnd( event ) {
		if ( scope.enabled === false ) return;
		// handleTouchEnd( event );
		scope.dispatchEvent( endEvent );
		state = STATE.NONE;
		diffX = 0;
	}

	this.dispose = function () {
		scope.domElement.removeEventListener( 'touchstart', onTouchStart );
		scope.domElement.removeEventListener( 'touchend', onTouchEnd );
		scope.domElement.removeEventListener( 'touchmove', onTouchMove );
		scope.disconnect();

	};

	scope.domElement.addEventListener( 'touchstart', onTouchStart );
	scope.domElement.addEventListener( 'touchend', onTouchEnd );
	scope.domElement.addEventListener( 'touchmove', onTouchMove );

	this.connect();

};

DeviceOrientationControls.prototype = Object.create( EventDispatcher.prototype );
DeviceOrientationControls.prototype.constructor = DeviceOrientationControls;

export { DeviceOrientationControls };
