import React, { Suspense, useRef } from "react";
import * as THREE from "three";

export default function ThreeDHealth() {
  const canvasRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const crossRef = useRef();
  const animationIdRef = useRef();

  React.useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(2.5, 2.2, 3.2);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 1.2, 100);
    pointLight.position.set(5, 5, 5);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // Medical Cross
    const crossGroup = new THREE.Group();
    crossRef.current = crossGroup;

    // Horizontal bar
    const horizontalGeometry = new THREE.BoxGeometry(2.2, 0.4, 0.6);
    const horizontalMaterial = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x2563eb,
      emissiveIntensity: 0.2,
      metalness: 0.2,
      roughness: 0.3
    });
    const horizontalMesh = new THREE.Mesh(horizontalGeometry, horizontalMaterial);
    horizontalMesh.castShadow = true;
    horizontalMesh.receiveShadow = true;
    crossGroup.add(horizontalMesh);

    // Vertical bar
    const verticalGeometry = new THREE.BoxGeometry(2.2, 0.4, 0.6);
    const verticalMaterial = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.15,
      metalness: 0.2,
      roughness: 0.3
    });
    const verticalMesh = new THREE.Mesh(verticalGeometry, verticalMaterial);
    verticalMesh.rotation.z = Math.PI / 2;
    verticalMesh.castShadow = true;
    verticalMesh.receiveShadow = true;
    crossGroup.add(verticalMesh);

    scene.add(crossGroup);

    // Animation loop
    const animate = (time) => {
      // Float animation
      crossGroup.position.y = Math.sin(time * 0.001) * 0.2;
      crossGroup.rotation.y = time * 0.0005;
      crossGroup.rotation.x = Math.sin(time * 0.0008) * 0.1;

      camera.lookAt(crossGroup.position);
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (renderer) {
        renderer.dispose();
      }
      // Clean up geometries and materials
      horizontalGeometry.dispose();
      horizontalMaterial.dispose();
      verticalGeometry.dispose();
      verticalMaterial.dispose();
    };
  }, []);

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden bg-slate-900/60">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}