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

        if (globeContainer.clientWidth === 0) return;

        zoomTime += 0.002;

        const minZ = 1;
        const maxZ = 6.3;

        const center = (minZ + maxZ) / 2;
        const amplitude = (maxZ - minZ) / 2;

        camera.position.z = center + Math.sin(zoomTime) * amplitude;

        globe.rotation.y += 0.0015;
        globe.rotation.x = tiltAngle;

        renderer.render(scene, camera);
    }
    
    animate();
});

window.addEventListener('resize', () => {
    const newWidth = globeContainer.clientWidth;
    const newHeight = globeContainer.clientHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

const selfPreview = document.getElementById("self-image-preview");
const selfTrigger = document.querySelector(".self-image");

const supportsHover = window.matchMedia('(hover: hover)').matches;

if (supportsHover && selfTrigger && selfPreview) {
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
}

document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById('journal-list');
    const paginationContainer = document.getElementById('journal-pagination');
    
    if (!list || !paginationContainer) return;

    const items = Array.from(list.children);
    const itemsPerPage = 3;
    let currentPage = 1;

    function renderPage(page) {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        
        currentPage = page;

        items.forEach(item => {
            item.style.display = 'none';
        });

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        items.slice(start, end).forEach(item => {
            item.style.display = 'flex';
        });

        renderControls(totalPages);
    }

    function renderControls(totalPages) {
        paginationContainer.innerHTML = '';

        if (totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            btn.classList.add('pagination-btn');
            
            if (i === currentPage) {
                btn.classList.add('active');
            }

            btn.addEventListener('click', () => {
                renderPage(i);
            });

            paginationContainer.appendChild(btn);
        }
    }

    renderPage(1);
});