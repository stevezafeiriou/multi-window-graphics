import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import WindowManager from "./WindowManager";
import "./App.css";

const App = () => {
	const mountRef = useRef(null);
	const renderer = useRef(null);
	const camera = useRef(null);
	const scene = useRef(null);
	const world = useRef(null);
	const cubes = useRef([]);
	const windowManager = useRef(null);
	const initialized = useRef(false);

	const sceneOffsetTarget = useRef({ x: 0, y: 0 });
	const sceneOffset = useRef({ x: 0, y: 0 });

	const getTime = () => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return (new Date().getTime() - today.getTime()) / 1000.0;
	};

	const setupScene = () => {
		renderer.current = new THREE.WebGLRenderer({
			antialias: true,
			depthBuffer: true,
		});
		renderer.current.setSize(window.innerWidth, window.innerHeight);
		renderer.current.setPixelRatio(window.devicePixelRatio || 1);
		mountRef.current.appendChild(renderer.current.domElement);

		scene.current = new THREE.Scene();
		scene.current.background = new THREE.Color(0x000000);

		camera.current = new THREE.OrthographicCamera(
			0,
			window.innerWidth,
			0,
			window.innerHeight,
			-10000,
			10000
		);
		camera.current.position.z = 2.5;
		scene.current.add(camera.current);

		world.current = new THREE.Object3D();
		scene.current.add(world.current);
	};

	const setupWindowManager = () => {
		windowManager.current = new WindowManager();
		windowManager.current.setWinShapeChangeCallback(updateWindowShape);
		windowManager.current.setWinChangeCallback(updateNumberOfCubes);

		const metaData = { foo: "bar" };
		windowManager.current.init(metaData);

		updateNumberOfCubes();
	};

	const updateNumberOfCubes = () => {
		const wins = windowManager.current.getWindows();
		cubes.current.forEach((cube) => world.current.remove(cube));
		cubes.current = [];

		wins.forEach((win, i) => {
			const color = new THREE.Color().setHSL(i * 0.1, 1.0, 0.5);
			const size = 100 + i * 50;
			const cube = new THREE.Mesh(
				new THREE.BoxGeometry(size, size, size),
				new THREE.MeshBasicMaterial({ color, wireframe: true })
			);
			cube.position.set(
				win.shape.x + win.shape.w * 0.5,
				win.shape.y + win.shape.h * 0.5,
				0
			);
			world.current.add(cube);
			cubes.current.push(cube);
		});
	};

	const updateWindowShape = (easing = true) => {
		sceneOffsetTarget.current = { x: -window.screenX, y: -window.screenY };
		if (!easing) {
			sceneOffset.current = sceneOffsetTarget.current;
		}
	};

	const renderScene = () => {
		const time = getTime();
		windowManager.current.update();

		const falloff = 0.05;
		sceneOffset.current.x +=
			(sceneOffsetTarget.current.x - sceneOffset.current.x) * falloff;
		sceneOffset.current.y +=
			(sceneOffsetTarget.current.y - sceneOffset.current.y) * falloff;

		world.current.position.set(sceneOffset.current.x, sceneOffset.current.y, 0);

		const wins = windowManager.current.getWindows();
		cubes.current.forEach((cube, i) => {
			const win = wins[i];
			const posTarget = {
				x: win.shape.x + win.shape.w * 0.5,
				y: win.shape.y + win.shape.h * 0.5,
			};

			cube.position.x += (posTarget.x - cube.position.x) * falloff;
			cube.position.y += (posTarget.y - cube.position.y) * falloff;
			cube.rotation.x = time * 0.5;
			cube.rotation.y = time * 0.3;
		});

		renderer.current.render(scene.current, camera.current);
		requestAnimationFrame(renderScene);
	};

	const resize = () => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		camera.current.left = 0;
		camera.current.right = width;
		camera.current.top = 0;
		camera.current.bottom = height;
		camera.current.updateProjectionMatrix();
		renderer.current.setSize(width, height);
	};

	useEffect(() => {
		if (!initialized.current) {
			setupScene();
			setupWindowManager();
			renderScene();
			window.addEventListener("resize", resize);
			initialized.current = true;
		}

		return () => {
			window.removeEventListener("resize", resize);
			renderer.current.dispose();
			if (mountRef.current) {
				mountRef.current.removeChild(renderer.current.domElement);
			}
		};
	}, []);

	return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default App;
