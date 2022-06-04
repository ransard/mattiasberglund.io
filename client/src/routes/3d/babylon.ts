import * as BABYLON from 'babylonjs';

export const init = (canvas) => {
	const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

	const scene = createScene(canvas, engine);

	engine.runRenderLoop(function () {
		scene.render();
	});

	const resize = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		engine.resize();
	};

	// the canvas/window resize event handler
	window.addEventListener('resize', resize, false);

	resize();
};

const createScene = (canvas, engine) => {
	// This creates a basic Babylon Scene object (non-mesh)
	var scene = new BABYLON.Scene(engine);

	// This creates and positions a free camera (non-mesh)
	var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);

	// This targets the camera to scene origin
	camera.setTarget(BABYLON.Vector3.Zero());

	// This attaches the camera to the canvas
	camera.attachControl(canvas, true);

	// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
	var light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

	// Default intensity is 1. Let's dim the light a small amount
	light.intensity = 0.7;

	// Our built-in 'ground' shape.
	var ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);

	return scene;
};
