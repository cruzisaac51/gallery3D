
import * as THREE from 'three';
console.log("three object", THREE)

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );


//controls
document.addEventListener( 'keydown', onKeyDown, false );

//create the floor
const planegeometry = new THREE.PlaneGeometry( 50, 50);
const planematerial = new THREE.MeshBasicMaterial({ color: 'green', side: THREE.DoubleSide});
const plane = new THREE.Mesh( planegeometry, planematerial);
scene.add( plane );

// animation

function animation( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}

//movement

function onKeyDown(event) {
	let keycode = event.which;
	// right arrow
	if ( keycode === 39) {
		camera.translateX(-0.05)
	}
	// left arrow
	else if ( keycode === 37){
		camera.translateX(0.05)
	}
	//up arrow
	else if ( keycode === 38) {
		camera.translateY(-0.05)
	}
	//down arrow
	else if ( keycode === 40) {
		camera.translateY(0.05)
	}

}
