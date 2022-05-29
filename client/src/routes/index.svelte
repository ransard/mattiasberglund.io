<script>
	import Layout from './__layout.svelte';
	import Card from '../card.svelte';
	const images = ['images/1.png', 'images/2.png', 'images/3.png'];
</script>

<body class="bg-gray-700">
	<div
		class="container grid grid-cols-2 gap-8 mx-auto p-8 max-w-4xl bg-gradient-to-r from-cyan-500 to-blue-500"
	>
		<div class="col-span-2 text-white">
			<h1>My Home</h1>
		</div>
		<Card href="/ai-art">AI Art</Card>
		<Card href="/3d">3D</Card>
		<Card href="https://name.mattiasberglund.io">Name Maker</Card>
		<Card href="https://mat.mattiasberglund.io">Veckans Matlista</Card>
		<Card href="https://blog.mattiasberglund.io">Blog</Card>
		<Card href="/todo">Cellular/ABM/RL/Robotics</Card>
		<Card href="/todo">Experiments</Card>
		<Card href="/todo">About</Card>
		<Card href="/todo">Games n stuff</Card>
		<Card href="/todo">MUD</Card>
		<Card href="/todo">Cultivation</Card>
	</div>
</body>
