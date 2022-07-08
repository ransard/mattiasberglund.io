import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

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

const createPhysics = (mesh, scene) => {
	const parent = mesh.parent;
	mesh.parent = null;
	mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
		mesh,
		BABYLON.PhysicsImpostor.BoxImpostor,
		{ mass: 0, friction: 0.5, restitution: 0.7 },
		scene
	);
	mesh.parent = parent;
};

const createScene = (canvas, engine) => {
	// This creates a basic Babylon Scene object (non-mesh)
	var scene = new BABYLON.Scene(engine);
	var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
	var physicsPlugin = new BABYLON.CannonJSPlugin();

	scene.enablePhysics(gravityVector, physicsPlugin);

	var camera = new BABYLON.ArcRotateCamera(
		'camera',
		0,
		Math.PI / 2,
		10,
		new BABYLON.Vector3(0, 5, -5),
		scene
	);

	camera.setTarget(BABYLON.Vector3.Zero());

	// This attaches the camera to the canvas
	camera.attachControl(canvas, true);

	camera.position.y = -40;

	// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
	var light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

	// Default intensity is 1. Let's dim the light a small amount
	light.intensity = 0.7;

	BABYLON.SceneLoader.ImportMesh('', '/', 'low-poly.glb', scene, (meshes) => {
		meshes.forEach((x) => {
			if (x.name === 'Plane') {
				createPhysics(x, scene);
			}
		});

		// Our built-in 'sphere' shape.
		var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, scene);
		sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
			sphere,
			BABYLON.PhysicsImpostor.SphereImpostor,
			{ mass: 1, restitution: 0.9 },
			scene
		);

		// Move the sphere upward 1/2 its height
		sphere.position.y = 5;
	});

	// sphere.actionManager = new BABYLON.ActionManager(scene);

	// sphere.actionManager.registerAction(
	// 	new BABYLON.InterpolateValueAction(
	// 		BABYLON.ActionManager.OnPickTrigger,
	// 		light,
	// 		'diffuse',
	// 		BABYLON.Color3.Black(),
	// 		1000
	// 	)
	// );

	// sphere.actionManager.registerAction(
	// 	new BABYLON.InterpolateValueAction(
	// 		BABYLON.ActionManager.OnPickTrigger,
	// 		light,
	// 		'diffuse',
	// 		BABYLON.Color3.Black(),
	// 		1000
	// 	)
	// );

	return scene;
};

var makePhysicsObject = (newMeshes, scene, scaling) => {
	// Create physics root and position it to be the center of mass for the imported mesh
	var physicsRoot = new BABYLON.Mesh('physicsRoot', scene);
	physicsRoot.position.y -= 0.9;

	// For all children labeled box (representing colliders), make them invisible and add them as a child of the root object
	newMeshes.forEach((m, i) => {
		if (m.name.indexOf('box') != -1) {
			m.isVisible = false;
			physicsRoot.addChild(m);
		}
	});

	// Add all root nodes within the loaded gltf to the physics root
	newMeshes.forEach((m, i) => {
		if (m.parent == null) {
			physicsRoot.addChild(m);
		}
	});

	// Make every collider into a physics impostor
	physicsRoot.getChildMeshes().forEach((m) => {
		if (m.name.indexOf('box') != -1) {
			m.scaling.x = Math.abs(m.scaling.x);
			m.scaling.y = Math.abs(m.scaling.y);
			m.scaling.z = Math.abs(m.scaling.z);
			m.physicsImpostor = new BABYLON.PhysicsImpostor(
				m,
				BABYLON.PhysicsImpostor.BoxImpostor,
				{ mass: 0.1 },
				scene
			);
		}
	});

	// Scale the root object and turn it into a physics impsotor
	physicsRoot.scaling.scaleInPlace(scaling);
	physicsRoot.physicsImpostor = new BABYLON.PhysicsImpostor(
		physicsRoot,
		BABYLON.PhysicsImpostor.NoImpostor,
		{ mass: 3 },
		scene
	);

	return physicsRoot;
};
