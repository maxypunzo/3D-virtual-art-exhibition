// console.log("The three js object", THREE);

//scene
const scene = new THREE.Scene(); // create scene

//camera
const camera = new THREE.PerspectiveCamera(
    75, //field of view
    window.innerWidth / window.innerHeight, //aspect ratio
    0.1, // for the near field of Viewport
    1000 //far
);

scene.add(camera);
camera.position.z = 5; // move the camera back 5 units

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true}) //for smooth edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfffff, 1); //background color
document.body.appendChild(renderer.domElement); //add the renderer to our html

//Lights
//ambientLight
const ambientLight = new THREE.AmbientLight(0x101010, 1.0); //color for intensity, distance, decay
ambientLight.position = camera.position; // light follows camera
scene.add(ambientLight);

// Directional Light
const sunLight = new THREE.DirectionalLight(0xddddd, 1.0); // color, intensity
sunLight.position.y = 15;
scene.add(sunLight);

const geometry = new THREE.BoxGeometry(1,1,1); //BoxGeometry
const material = new THREE.MeshBasicMaterial({color: 0xff000}); //color of the object
const cube = new THREE.Mesh(geometry, material);

//add mash to a scene
scene.add(cube);

//Controls
// Event listener for when we press the keys
document.addEventListener("keydown", onKeyDown, false);
// ----------------------------------------------------------------------------------------

//Create a floor plane and add it to the scene
const planeGeometry = new THREE.PlaneBufferGeometry(50, 50); //PlaneGeometry is the shape of the object

//For the texture of the floor
const floorTexture = new THREE.TextureLoader().load('img/Floor.jpg');
const planeMaterial = new THREE.MeshBasicMaterial({
    map: floorTexture,
    side: THREE.DoubleSide,
});
const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);

floorPlane.rotation.x = Math.PI / 2; // this is  90 degrees
floorPlane.position.y = -Math.PI; // this is 180 degrees

scene.add(floorPlane); // add the fllor to the scene

//create the walls
const wallGroup = new THREE.Group();  //create the group of the walls
scene.add(wallGroup);

//font wall
const frontWall = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(50, 20),
    // new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('img/wood_wall.jpeg'),
        side: THREE.DoubleSide
    })
);

frontWall.position.z = -20;

// Lef wall
const leftWall = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(50, 20),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('img/office_wall.jpeg'),
        side: THREE.DoubleSide,
    })
);
leftWall.rotation.y = Math.PI /2; // this is 90 degrees
leftWall.position.x = -20;

//right wall
const rightWall = new THREE.Mesh(
    // new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.PlaneBufferGeometry(50, 20),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('img/office_wall.jpeg'),
        side: THREE.DoubleSide,
    })
);
rightWall.rotation.y = Math.PI / 2; // 90 degrees
rightWall.position.x = 20;

wallGroup.add(frontWall, leftWall, rightWall);

//Loop each wall and create the bounding box
for (let index = 0; index < wallGroup.children.length; index++) {
    wallGroup.children[index].BBox = new THREE.Box3();
    wallGroup.children[index].BBox.setFromObject(wallGroup.children[index]);
}

//create a ceiling
const ceilingGeometry = new THREE.PlaneBufferGeometry(50, 50);  //ceilingGeometry is the shape of the object
const ceilingTexture = new THREE.TextureLoader().load('img/OfficeCeiling005_4K-JPG_Color.jpg');
const ceilingMaterial = new THREE.MeshBasicMaterial({
    map: ceilingTexture,
    side: THREE.DoubleSide
});
const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

ceilingPlane.rotation.x = Math.PI / 2
ceilingPlane.position.y = 12;

scene.add(ceilingPlane);

// create painting function for front wall
function createPainting(imageUrl, width, height, position) {
    // const textureLoader = new THREE.TextureLoader();
    const paintingtexture = new THREE.TextureLoader().load(imageUrl);
    const paintingMaterial = new THREE.MeshBasicMaterial({
        map: paintingtexture,
    });
    const paintingGeometry = new THREE.PlaneBufferGeometry(width, height);
    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
    painting.position.set(position.x, position.y, position.z);
    return painting;
}

// create painting function for side walls
function createSidePainting(imageUrl, width, height, rotation, position) {
    const paintingtexture = new THREE.TextureLoader().load(imageUrl);
    const paintingMaterial = new THREE.MeshBasicMaterial({
        map: paintingtexture,
    });
    const paintingGeometry = new THREE.PlaneBufferGeometry(width, height);
    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
    painting.rotation.y.set(rotation.y);
    painting.position.set(position.x, position.y, position.z);
    return painting;
}

const painting1 = createPainting(
    'img/artworks/0.jpg', 10, 5, 
    new THREE.Vector3(-13, 5, -19.99)
);
const painting2 = createPainting(
    'img/artworks/1.jpg', 10, 5, 
    new THREE.Vector3(13, 5, -19.99)
);
const painting3 = createPainting(
    '/img/artworks/2.jpg', 10, 5,
    new THREE.Vector3(0, 5, -19.99)
)
// const sidePaintng = createSidePainting(
//     'img/artworks/3.jpg', 10, 5, Math.PI / 2,
//     new THREE.Vector3(15, 5, 17)
// );
// const sidePaintng1 = createSidePainting(
//     'img/artworks/4.jpg', 10, 5, Math.PI / 2,
//     new THREE.Vector3(15, 5, 27)
// );


scene.add(painting1, painting2, painting3);

// ----------------------------------------------------------------------------------------------------
//Controls for pointer locker control
const controls = new PointerLockControls(camera, document.body);

//Lock the pointer (controls are activated) and hide the menu
function startExperience() {
    // Lock the pointer
    controls.lock();
    //hide the menu 
    hideMenu();
}

const playButton = document.getElementById('play_button');
playButton.addEventListener('click', startExperience);

//Hide menu
function hideMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
}
//show menu
function showMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'block';
}

// function when a key is pressed, execute function onKeyDown
function onKeyDown(event) {
    let keyCode = event.which;
    // right arrow key or D
    if (keyCode === 39 || keyCode === 68) {
        camera.translateX(0.08);
    } 
    // left arrow or A
    else if (keyCode === 37 || keyCode === 65) {
        camera.translateX(-0.08)
    }
    // Up arrow key or W
    else if(keyCode === 38 || keyCode === 87) { 
        camera.translateZ(-0.08)
    } 
    // for down arrow key or S
    else if (keyCode === 40 || keyCode === 83) { 
        camera.translateZ(0.08)
    }
}

let render = function () {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    //Renderer
    renderer.render(scene, camera); //render the scene

    requestAnimationFrame(render);
}

render();


