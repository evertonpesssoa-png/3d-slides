// =========================
// ASURAS
// =========================

const items =
	document.querySelectorAll(".item");

const slider =
	document.querySelector(".slider");

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

			if(!hoverSound) return;

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

			// =========================
			// FALLBACK MOBILE
			// =========================

			window.addEventListener(
				"click",
				handleFirstInteraction,
				{ once: true }
			);

			window.addEventListener(
				"touchstart",
				handleFirstInteraction,
				{ once: true }
			);
		});
}

// =========================
// PRIMEIRA INTERAÇÃO
// =========================

function handleFirstInteraction(){

	if(!bgMusic) return;

	bgMusic.volume = 0.12;

	bgMusic
		.play()
		.catch(() => {});
}

// =========================
// CURSOR BASE
// =========================

document.body.style.cursor =
	"default";

// =========================
// PORTAL TRANSITION
// =========================

const portalTransition =
	document.getElementById(
		"portalTransition"
	);

// =========================
// CONTROLE
// =========================

let transitioning = false;

// =========================
// CLICK ASURA
// =========================

items.forEach(item => {

	item.addEventListener(
		"click",
		() => {

			if(transitioning) return;

			transitioning = true;

			const asura =
				item.dataset.asura;

			startAsuraTransition(
				item,
				asura
			);
		}
	);
});

// =========================
// START TRANSITION
// =========================

function startAsuraTransition(
	selectedItem,
	asura
){

	// =========================
	// PAUSA SLIDER
	// =========================

	slider.style.animationPlayState =
		"paused";

	// =========================
	// SOM CLICK
	// =========================

	if(hoverSound){

		hoverSound.volume = 0.2;

		hoverSound.currentTime = 0;

		hoverSound
			.play()
			.catch(() => {});
	}

	// =========================
	// FADE OUT MUSICA
	// =========================

	if(bgMusic){

		const fadeAudio =
			setInterval(() => {

				if(bgMusic.volume > 0.02){

					bgMusic.volume -= 0.01;

				}else{

					bgMusic.volume = 0;

					clearInterval(
						fadeAudio
					);
				}

			}, 40);
	}

	// =========================
	// FADE GERAL
	// =========================

	slider.classList.add(
		"fade-all"
	);

	// =========================
	// ITEM ATIVO
	// =========================

	selectedItem.classList.add(
		"active"
	);

	// =========================
	// ZOOM CINEMATOGRÁFICO
	// =========================

	document.body.style.transition =
		"transform 1.6s ease";

	document.body.style.transform =
		"scale(1.03)";

	// =========================
	// PORTAL
	// =========================

	if(portalTransition){

		portalTransition.classList.add(
			"active"
		);
	}

	// =========================
	// FLASH
	// =========================

	createPortalFlash(
		selectedItem.dataset.color
	);

	// =========================
	// DEBUG
	// =========================

	console.log(
		"Entrando no mundo:",
		asura
	);

	// =========================
	// TRANSIÇÃO FUTURA
	// =========================

	setTimeout(() => {

		// =========================
		// FUTURO LOAD GLB
		// =========================

		// window.location.href =
		// `world.html?asura=${asura}`;

		alert(
			`Entrando no reino de ${asura}`
		);

		resetTransition(
			selectedItem
		);

	}, 2200);
}

// =========================
// FLASH PORTAL
// =========================

function createPortalFlash(color){

	const flash =
		document.createElement(
			"div"
		);

	flash.className =
		"portal-flash";

	flash.style.setProperty(
		"--flash-color",
		color
	);

	document.body.appendChild(
		flash
	);

	requestAnimationFrame(() => {

		flash.classList.add(
			"show"
		);
	});

	setTimeout(() => {

		flash.classList.remove(
			"show"
		);

		setTimeout(() => {

			flash.remove();

		}, 1000);

	}, 900);
}

// =========================
// RESET TRANSITION
// =========================

function resetTransition(
	selectedItem
){

	// =========================
	// SLIDER
	// =========================

	slider.style.animationPlayState =
		"running";

	slider.classList.remove(
		"fade-all"
	);

	// =========================
	// ITEM
	// =========================

	selectedItem.classList.remove(
		"active"
	);

	// =========================
	// PORTAL
	// =========================

	if(portalTransition){

		portalTransition.classList.remove(
			"active"
		);
	}

	// =========================
	// RESET BODY
	// =========================

	document.body.style.transform =
		"scale(1)";

	// =========================
	// RESET MUSICA
	// =========================

	if(bgMusic){

		bgMusic.volume = 0.12;
	}

	// =========================
	// LIBERA CLICK
	// =========================

	transitioning = false;
}