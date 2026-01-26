/*
*   sphere
*/

import('https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js').then(THREE => {
    const globeContainer = document.getElementById('animation');
    if (!globeContainer) return;

    const width = globeContainer.clientWidth;
    const height = globeContainer.clientHeight;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    
    renderer.setSize(width, height);
    
    globeContainer.appendChild(renderer.domElement);
    
    const geometry = new THREE.SphereGeometry(4, 24, 24);
    const material = new THREE.MeshBasicMaterial( { wireframe: true, color: 0x00aa4b, transparent: true, opacity: 0.15, depthWrite: false } );
    const globe = new THREE.Mesh( geometry, material );
    scene.add(globe);
    
    camera.position.z = 7;
    
    const tiltAngle = 50 * Math.PI / 180;
    
    function animate() {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.0007;
        globe.rotation.x = tiltAngle;
        renderer.render(scene, camera);
    }
    
    animate();
});

/*
*   card tilt
*/

const card = document.getElementById("card");
const faces = card.querySelectorAll(".face");

const maxRotate = 4;
const maxShadow = 20;

let bounds = null;

let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;

function animate() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    card.style.transform = `
        rotateX(${currentY}deg)
        rotateY(${currentX}deg)
    `;

    requestAnimationFrame(animate);
}

animate();

function rotateToMouse(e) {
    if (!bounds) bounds = card.getBoundingClientRect();

    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    // lighting position (both faces)
    faces.forEach(face => {
        face.style.setProperty("--pointer-x", `${mouseX}px`);
        face.style.setProperty("--pointer-y", `${mouseY}px`);
        face.style.setProperty("--light-opacity", "1");
    });

    const percentX = (mouseX / bounds.width - 0.5) * 2;
    const percentY = (mouseY / bounds.height - 0.5) * 2;

    targetX = -percentX * maxRotate;
    targetY = percentY * maxRotate;

    const shadowX = -percentX * maxShadow;
    const shadowY = percentY * maxShadow;

    faces.forEach(face => {
        face.style.boxShadow = `
            ${shadowX}px ${shadowY + 10}px 50px rgba(255,255,255,0.3)
        `;
    });
}

if (window.matchMedia("(pointer: fine)").matches) {
    card.addEventListener("mouseenter", () => {
        bounds = card.getBoundingClientRect();
    });

    card.addEventListener("mousemove", rotateToMouse);

    card.addEventListener("mouseleave", () => {
        targetX = 0;
        targetY = 0;

        faces.forEach(face => {
            face.style.boxShadow =
                "0 4px 50px rgba(255, 255, 255, 0.3)";
            face.style.setProperty("--light-opacity", "0");
        });

        bounds = null;
    });
}

/*
*   modals
*/
const services = document.getElementById("services");
const returnBtn = document.getElementById("return-btn");

services.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
});

returnBtn.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
});