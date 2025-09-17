import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ModelViewer = ({ objPath, mtlPath, galleryPreview = false }) => {
    const mountRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const sceneRef = useRef(null);
    const controlsRef = useRef(null);
    const frameIdRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        cameraRef.current = camera;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        rendererRef.current = renderer;
        currentMount.appendChild(renderer.domElement);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = !galleryPreview;
        controls.enablePan = !galleryPreview;
        controlsRef.current = controls;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Loaders
        const mtlLoader = new MTLLoader();
        mtlLoader.load(mtlPath, (materials) => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(objPath, (object) => {
                const box = new THREE.Box3().setFromObject(object);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                object.position.sub(center);
                scene.add(object);
                
                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = camera.fov * (Math.PI / 180);
                let cameraZ = Math.abs(maxDim / 1.5 / Math.tan(fov / 2));
                
                camera.position.z = cameraZ;
                camera.far = cameraZ * 2;
                camera.updateProjectionMatrix();

            }, undefined, (error) => {
                console.error('An error happened loading the OBJ file.', error);
            });
        }, undefined, (error) => {
            console.error('An error happened loading the MTL file.', error);
        });

        const animate = () => {
            frameIdRef.current = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        const handleResize = () => {
            if (currentMount && rendererRef.current && cameraRef.current) {
                const width = currentMount.clientWidth;
                const height = currentMount.clientHeight;
                rendererRef.current.setSize(width, height);
                cameraRef.current.aspect = width / height;
                cameraRef.current.updateProjectionMatrix();
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(currentMount);
        
        animate();

        return () => {
            cancelAnimationFrame(frameIdRef.current);
            resizeObserver.unobserve(currentMount);
            if (rendererRef.current) {
                currentMount.removeChild(rendererRef.current.domElement);
            }
        };
    }, [objPath, mtlPath, galleryPreview]);

    const style = galleryPreview 
        ? { width: '100%', height: '100%', overflow: 'hidden' }
        : { width: '100%', height: '500px', overflow: 'hidden' };

    return <div ref={mountRef} style={style} />;
};

export default ModelViewer; 