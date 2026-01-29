// script.js
// last update: 29 jan 26

import('https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js').then(THREE => {
    const globeContainer = document.getElementById('globe');
    if (!globeContainer) return;

    const width = globeContainer.clientWidth;
    const height = globeContainer.clientHeight;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    
    globeContainer.appendChild(renderer.domElement);
    
    const geometry = new THREE.SphereGeometry(3.75, 40, 40);
    const material = new THREE.MeshBasicMaterial( { wireframe: true, color: 0x2563EB } );
    const globe = new THREE.Mesh( geometry, material );
    scene.add(globe);
    
    const tiltAngle = 10 * Math.PI / 180;
    
    let zoomTime = 0;

    function animate() {
        requestAnimationFrame(animate);

        zoomTime += 0.002;

        const minZ = 1;
        const maxZ = 6.3;

        const center = (minZ + maxZ) / 2;     // 3.5
        const amplitude = (maxZ - minZ) / 2;  // 2.5

        camera.position.z = center + Math.sin(zoomTime) * amplitude;

        globe.rotation.y += 0.0015;
        globe.rotation.x = tiltAngle;

        renderer.render(scene, camera);
    }
    
    animate();
});

const selfPreview = document.getElementById("self-image-preview");
const selfTrigger = document.querySelector(".self-image");

selfTrigger.addEventListener("mouseenter", () => {
    selfPreview.style.backgroundImage = `url(${selfTrigger.dataset.img})`;
    selfPreview.style.display = "block";
});

selfTrigger.addEventListener("mousemove", (e) => {
    const pad = 20;
    const x = Math.min(
        window.innerWidth - selfPreview.offsetWidth - pad,
        e.clientX + pad
    );
    const y = Math.min(
        window.innerHeight - selfPreview.offsetHeight - pad,
        e.clientY + pad
    );

    selfPreview.style.left = `${x}px`;
    selfPreview.style.top = `${y}px`;
});

selfTrigger.addEventListener("mouseleave", () => {
    selfPreview.style.display = "none";
});