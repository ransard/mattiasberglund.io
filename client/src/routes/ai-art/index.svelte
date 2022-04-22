<!-- <script context="module">
	export async function load({ url, fetch }) {
		const urler = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';
		const response = await fetch(`${urler}/api/images`);
		const images = await response.json();

		return {
			props: {
				images
			}
		};
	}
</script> -->
<script>
	import { afterUpdate, onMount } from 'svelte';
	import Layout from '../__layout.svelte';
	import Modal from '../modal.svelte';

	let images = [];
	let images_thumb = [];
	let showImage = null;

	const loadImage = (e) => {
		e.classList.add('loaded');
		e.src = e.dataset.src;
	};

	let observer;

	onMount(async () => {
		const urler = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';
		const response = await fetch(`${urler}/api/images`);
		images = await response.json();

		images_thumb = images.map((x) => {
			return { image: x, thumb: x.replace(/(\.[\w\d_-]+)$/i, '-thumb.jpg') };
		});

		const options = {
			root: document.body,
			rootMargin: '0px',
			threshold: 0.01
		};

		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					loadImage(entry.target);
					observer.unobserve(entry.target);
				}
			});
		}, options);
	});

	afterUpdate(() => {
		const targetElements = document.querySelectorAll('.lazy-image');

		targetElements.forEach((e) => {
			observer.observe(e);
		});
	});

	const handleClick = (image) => {
		console.log(image);
		showImage = image;
	};

	const cancelModal = () => {
		showImage = null;
		console.log('cancel modal 2');
	};
</script>

<body class="bg-gray-700">
	<div class="flex flex-wrap">
		{#each images_thumb as image}
			<div on:click={() => handleClick(image.image)} style="flex: 1 1 300px;">
				<img
					data-src="/images/gallery/thumb/{image.thumb}"
					loading="lazy"
					class="lazy-image"
					alt="image"
				/>
			</div>
		{/each}
	</div>
	<Modal {showImage} on:cancelModal={cancelModal} />
</body>

<style>
	html,
	body {
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		overflow: auto;
	}

	img {
		width: 100%;
		height: auto;
		opacity: 0.1;
		transition: opacity 1200ms ease-out;
	}

	:global(img.loaded) {
		opacity: 1;
	}
</style>
