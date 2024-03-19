
import * as THREE from 'three';
import {PointerLockControls} from '../examples/jsm/controls/PointerLockControls.js';
console.log("three object", THREE)

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 90, width / height, 0.01, 1000 );
camera.position.z = 10;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );

//lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
ambientLight.position.z = camera.position;
scene.add( ambientLight );


const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0);
// sunLight.position.y = 1
scene.add( sunLight );
//controls
document.addEventListener( 'keydown', onKeyDown, false );

//texture
const floortexture = new THREE.TextureLoader().load('image/Floor.jpg');
floortexture.wrapS = THREE.RepeatWrapping;
floortexture.wrapT = THREE.RepeatWrapping
floortexture.repeat.set(5, 5);

//create the floor
const planegeometry = new THREE.PlaneGeometry( 15, 20);
const planematerial = new THREE.MeshBasicMaterial({ map: floortexture, side: THREE.DoubleSide});
const plane = new THREE.Mesh( planegeometry, planematerial);
plane.rotation.x = Math.PI / 2;
plane.position.y = -Math.PI;
plane.position.z = -7;
scene.add( plane );


//create the walls
const wallGroup = new THREE.Group();
scene.add( wallGroup );

//front wall

const frontwalltexture = new THREE.TextureLoader().load('image/frontwall.jpg');
frontwalltexture.wrapS = THREE.RepeatWrapping;
frontwalltexture.wrapT = THREE.RepeatWrapping
frontwalltexture.repeat.set(1, 0.8);

const frontWall = new THREE.Mesh(
	new THREE.BoxGeometry(15,6,0.001),
	new THREE.MeshBasicMaterial({map: frontwalltexture})
);
frontWall.position.z = -15;

//right wall
const rightwalltexture = new THREE.TextureLoader().load('image/wls2.jpg');
rightwalltexture.wrapS = THREE.RepeatWrapping;
rightwalltexture.wrapT = THREE.RepeatWrapping
rightwalltexture.repeat.set(5, 1);

const rightWall = new THREE.Mesh(
	new THREE.BoxGeometry(19,6,1),
	new THREE.MeshBasicMaterial({map: rightwalltexture, side: THREE.DoubleSide})
);
rightWall.rotation.y = Math.PI / 2;
rightWall.position.x = -7
rightWall.position.y = 0
rightWall.position.z = -6.5

//left wall
const leftwalltexture = new THREE.TextureLoader().load('image/wls2.jpg');
leftwalltexture.wrapS = THREE.RepeatWrapping;
leftwalltexture.wrapT = THREE.RepeatWrapping
leftwalltexture.repeat.set(4, 1);

const leftWall = new THREE.Mesh(
	new THREE.BoxGeometry(19,6,1),
	new THREE.MeshBasicMaterial({ map: leftwalltexture, side: THREE.DoubleSide})

);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.x = 7
leftWall.position.y = 0
leftWall.position.z = -6.5

//ceiling
const ceilingtexture = new THREE.TextureLoader().load('image/ceiling.jpg');
ceilingtexture.wrapS = THREE.RepeatWrapping;
ceilingtexture.wrapT = THREE.RepeatWrapping
ceilingtexture.repeat.set(1, 0.5);

const ceiling = new THREE.Mesh(
	new THREE.BoxGeometry(15,20,0.5),
	new THREE.MeshBasicMaterial({ map: ceilingtexture, side: THREE.DoubleSide})
);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = Math.PI;
ceiling.position.z = -7;
scene.add(ceiling);


wallGroup.add( frontWall, rightWall,leftWall );

//bounding box


//loop through each wall an create the bounding box
for (let i = 0; i < wallGroup.children.length; i++) {
	wallGroup.children[i].BBox = new THREE.Box3();
	wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]);
}


// Create paitings
function createPaiting(imageURL, width, height, position) {
	const TextureLoader = new THREE.TextureLoader();
	const paintingTexture = TextureLoader.load(imageURL);
	const paitingMaterial = new THREE.MeshBasicMaterial({
		map: paintingTexture,
		side: THREE.DoubleSide
	});
	const paitingGeometry = new THREE.PlaneGeometry(width, height);
	const paiting = new THREE.Mesh(paitingGeometry, paitingMaterial);
	paiting.position.set(position.x, position.y, position.z);
	return paiting;
}

const paiting1 = createPaiting(
	'./image/1.jpg',
	2.5,
	4,
	new THREE.Vector3(3,0,-14.99)
)

const paiting2 = createPaiting(
	'./image/8.jpg',
	2.5,
	4,
	new THREE.Vector3(-3,0,-14.99)
)
const paiting3 = createPaiting(
	'./image/3.jpg',
	5,
	4,
	new THREE.Vector3(-6.45,0,-10.99)
)
paiting3.rotation.y = Math.PI / 2;

const paiting4 = createPaiting(
	'./image/5.jpg',
	5,
	4,
	new THREE.Vector3(-6.45,0,-2.99)
)
paiting4.rotation.y = Math.PI / 2;

const paiting5 = createPaiting(
	'./image/7.jpg',
	5,
	4,
	new THREE.Vector3(6.45,0,-10.99)
)
paiting5.rotation.y = Math.PI / 2;

const paiting6 = createPaiting(
	'./image/4.jpg',
	5,
	4,
	new THREE.Vector3(6.45,0,-2.99)
)
paiting6.rotation.y = Math.PI / 2;

scene.add(paiting1, paiting2, paiting3, paiting4, paiting5, paiting6);
// animation

function animation( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}


// menu
const playButton = document.getElementById('play_button');
playButton.addEventListener('click', startExperience);

//movement
const controls = new PointerLockControls(camera, document.body);
//lock the pointer
function startExperience(){
	//lock the pointer
	controls.lock();

	// Hide menu
	hidemenu();
}



function hidemenu(){
	const menu = document.getElementById('menu');
	menu.style.display= 'none';
}
function showmenu(){
	const menu = document.getElementById('menu');
	menu.style.display = 'block';
}

controls.addEventListener('unlock', showmenu);

function onKeyDown(event) {
	let keycode = event.which;
	// right arrow
	if ( keycode === 39  || keycode === 68) {
		controls.moveRight(0.08);
	}
	// left arrow
	else if ( keycode === 37 || keycode === 65){
		controls.moveRight(-0.08);
	}
	//up arrow
	else if ( keycode === 38 || keycode === 87) {
		controls.moveForward(0.08);
	}
	//down arrow
	else if ( keycode === 40 || keycode === 83) {
		controls.moveForward(-0.08);
	}

}
