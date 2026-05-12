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

			hoverSound.volume = 0.25;

			hoverSound.currentTime = 0;

			hoverSound.play();
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

canvas.width =
	window.innerWidth;

canvas.height =
	window.innerHeight;

const particles = [];

const particleCount = 120;

// =========================
// CREATE
// =========================

for(let i = 0; i < particleCount; i++){

	particles.push({

		x: Math.random() * canvas.width,

		y: Math.random() * canvas.height,

		size: Math.random() * 2 + 1,

		speedX:
			(Math.random() - 0.5) * 0.3,

		speedY:
			(Math.random() - 0.5) * 0.3,

		opacity:
			Math.random() * 0.5
	});
}

// =========================
// DRAW
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

		particle.x += particle.speedX;
		particle.y += particle.speedY;

		if(
			particle.x < 0 ||
			particle.x > canvas.width
		){
			particle.speedX *= -1;
		}

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

		canvas.width =
			window.innerWidth;

		canvas.height =
			window.innerHeight;
	}
);