// =========================
// ASURAS
// =========================

const items =
	document.querySelectorAll(".item");

// =========================
// CORES DINÂMICAS
// =========================

items.forEach(item => {

	const color =
		item.dataset.color;

	item.style.setProperty(
		"--glow-color",
		color
	);
});

// =========================
// SOM HOVER
// =========================

const hoverSound =
	document.getElementById(
		"hoverSound"
	);

items.forEach(item => {

	item.addEventListener(
		"mouseenter",
		() => {

			if (!hoverSound) return;

			hoverSound.volume = 0.12;

			hoverSound.currentTime = 0;

			hoverSound
				.play()
				.catch(() => {});
		}
	);
});

// =========================
// PARTICLES
// =========================

const canvas =
	document.getElementById(
		"particles"
	);

const ctx =
	canvas.getContext("2d");

// =========================
// SIZE
// =========================

function resizeCanvas(){

	canvas.width =
		window.innerWidth;

	canvas.height =
		window.innerHeight;
}

resizeCanvas();

// =========================
// PARTICLES ARRAY
// =========================

const particles = [];

const particleCount = 120;

// =========================
// CREATE PARTICLES
// =========================

for(let i = 0; i < particleCount; i++){

	particles.push({

		x:
			Math.random() * canvas.width,

		y:
			Math.random() * canvas.height,

		size:
			Math.random() * 2 + 1,

		speedX:
			(Math.random() - 0.5) * 0.3,

		speedY:
			(Math.random() - 0.5) * 0.3,

		opacity:
			Math.random() * 0.5
	});
}

// =========================
// DRAW PARTICLES
// =========================

function drawParticles(){

	ctx.clearRect(
		0,
		0,
		canvas.width,
		canvas.height
	);

	particles.forEach(particle => {

		ctx.beginPath();

		ctx.arc(
			particle.x,
			particle.y,
			particle.size,
			0,
			Math.PI * 2
		);

		ctx.fillStyle =
			`rgba(255,255,255,${particle.opacity})`;

		ctx.fill();

		// =========================
		// MOVIMENTO
		// =========================

		particle.x += particle.speedX;

		particle.y += particle.speedY;

		// =========================
		// LIMITES X
		// =========================

		if(
			particle.x < 0 ||
			particle.x > canvas.width
		){
			particle.speedX *= -1;
		}

		// =========================
		// LIMITES Y
		// =========================

		if(
			particle.y < 0 ||
			particle.y > canvas.height
		){
			particle.speedY *= -1;
		}
	});

	requestAnimationFrame(
		drawParticles
	);
}

drawParticles();

// =========================
// RESIZE
// =========================

window.addEventListener(
	"resize",
	() => {

		resizeCanvas();
	}
);

// =========================
// AMBIENT MUSIC
// =========================

const bgMusic =
	document.getElementById(
		"bgMusic"
	);

// =========================
// AUTO PLAY AMBIENTE
// =========================

if(bgMusic){

	bgMusic.volume = 0;

	bgMusic
		.play()
		.then(() => {

			setTimeout(() => {

				bgMusic.volume = 0.12;

			}, 800);

		})
		.catch(() => {

			// MOBILE FALLBACK

			window.addEventListener(
				"click",
				() => {

					bgMusic.volume = 0.12;

					bgMusic
						.play()
						.catch(() => {});

				},
				{ once: true }
			);
		});
}

// =========================
// CURSOR BASE
// =========================

document.body.style.cursor =
	"default";

// =========================
// BUTTERFLIES
// =========================

const butterflyContainer =
	document.getElementById(
		"butterflies"
	);

// =========================
// CORES ASURAS
// =========================

const asuraColors = [

	"#ff4db8", // Diva
	"#35ff9c", // Siria
	"#00d9ff", // Merlim
	"#287bff", // Astreia
	"#8b2fff", // Umbra
	"#ffd54f", // Atena
	"#ff4444", // Vitória
	"#fff0b3", // Héstia
	"#00ffd5"  // Daedala
];

// =========================
// CREATE BUTTERFLY
// =========================

function createButterfly(){

	if(!butterflyContainer) return;

	const butterfly =
		document.createElement("div");

	butterfly.className =
		"butterfly";

	// =========================
	// ESTRUTURA
	// =========================

	butterfly.innerHTML = `

		<div class="wing left"></div>
		<div class="wing right"></div>
		<div class="body"></div>

	`;

	// =========================
	// COR
	// =========================

	const color =
		asuraColors[
			Math.floor(
				Math.random()
				* asuraColors.length
			)
		];

	butterfly.style.color =
		color;

	// =========================
	// POSIÇÃO INICIAL
	// =========================

	let x =
		Math.random()
		* window.innerWidth;

	let y =
		window.innerHeight +
		Math.random() * 200;

	butterfly.style.left =
		x + "px";

	butterfly.style.top =
		y + "px";

	// =========================
	// ESCALA / PROFUNDIDADE
	// =========================

	const scale =
		Math.random() * 1.2 + 0.5;

	// =========================
	// ADD DOM
	// =========================

	butterflyContainer.appendChild(
		butterfly
	);

	// =========================
	// MOVIMENTO
	// =========================

	let angle =
		Math.random()
		* Math.PI
		* 2;

	const speed =
		Math.random() * 1.2 + 0.4;

	const drift =
		Math.random() * 2 + 0.5;

	const move = setInterval(() => {

		angle += 0.03;

		x +=
			Math.cos(angle)
			* drift;

		y -= speed;

		butterfly.style.left =
			x + "px";

		butterfly.style.top =
			y + "px";

		// =========================
		// ROTAÇÃO
		// =========================

		const rotate =
			Math.sin(angle)
			* 25;

		butterfly.style.transform = `
			translateZ(${scale * 100}px)
			scale(${scale})
			rotate(${rotate}deg)
		`;

		// =========================
		// REMOVE
		// =========================

		if(y < -100){

			clearInterval(move);

			butterfly.remove();
		}

	}, 16);
}

// =========================
// LOOP BORBOLETAS
// =========================

setInterval(() => {

	createButterfly();

}, 700);