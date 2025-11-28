// ----- Setup Canvas -----
const canvas = document.getElementById("explosionCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// ----- Particules -----
class Particle {
    constructor(x, y) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 3 + 1;   // vitesse plus douce
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.alpha = 1;
        this.size = Math.random() * 4 + 2;
        this.fade = Math.random() * 0.01 + 0.003; // disparition plus lente
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.fade;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

let particles = [];
let explosionDone = false;

function explode() {
    if (explosionDone) return;
    explosionDone = true;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Beaucoup plus de particules
    for (let i = 0; i < 400; i++) {
        particles.push(new Particle(cx, cy));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
    });

    // Quand tout est fini, on retire le canvas
    if (particles.length === 0 && explosionDone) {
        canvas.style.transition = "opacity 1s";
        canvas.style.opacity = "0";
        setTimeout(() => canvas.remove(), 1200);
    }

    requestAnimationFrame(animate);
}

explode(); // lance automatiquement
animate();