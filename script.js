// script.js
// last update: 4 feb 26

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

function initPagination(listId, paginationId, itemsPerPage) {
    const list = document.getElementById(listId);
    const container = document.getElementById(paginationId);
    
    if (!list || !container) return;

    const items = Array.from(list.children);
    let currentPage = 1;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    if (totalPages <= 1) {
        container.style.display = 'none';
        return;
    }

    renderItems(1);

    const initialHeight = list.offsetHeight;
    list.style.minHeight = `${initialHeight}px`;

    renderControls();

    function renderItems(page) {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        
        currentPage = page;

        items.forEach(item => item.style.display = 'none');
        
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        items.slice(start, end).forEach(item => {
            item.style.display = 'flex';
        });

        const infoSpan = container.querySelector('.page-info');
        if (infoSpan) infoSpan.innerText = `Page ${currentPage} of ${totalPages}`;

        updateButtonStates();
    }

    function updateButtonStates() {
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');

        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    }

    function renderControls() {
        container.innerHTML = '';

        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '← prev';
        prevBtn.className = 'pagination-btn prev-btn';
        prevBtn.onclick = () => renderItems(currentPage - 1);

        const infoSpan = document.createElement('span');
        infoSpan.className = 'page-info';
        infoSpan.innerText = `Page ${currentPage} of ${totalPages}`;

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = 'next →';
        nextBtn.className = 'pagination-btn next-btn';
        nextBtn.onclick = () => renderItems(currentPage + 1);

        container.appendChild(prevBtn);
        container.appendChild(infoSpan);
        container.appendChild(nextBtn);

        updateButtonStates();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initPagination('project-list', 'project-pagination', 4);
    initPagination('journal-list', 'journal-pagination', 4);
});