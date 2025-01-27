var particles = [];
var pool = [];

function spawn(x, y) {
  var particle = pool.length ? pool.pop() : {};
  particle.x = x;
  particle.y = y;
  particle.vx = Math.random() * 2 - 1;
  particle.vy = Math.random() * 2 - 1;
  particle.radius = Math.random() * 5 + 1;
  particles.push(particle);
}

function update() {
  for (var i = particles.length - 1; i >= 0; i--) {
    var particle = particles[i];
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vx *= 0.92;
    particle.vy *= 0.92;
    particle.radius *= 0.96;
    if (particle.radius < 0.5) {
      pool.push(particles.splice(i, 1)[0]);
    }
  }
}

function draw() {
  var canvas = document.getElementById('particle-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = particles.length - 1; i >= 0; i--) {
    var particle = particles[i];
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ff004f'; // change the color to #ff004f
    ctx.fill();
  }
}

document.addEventListener('mousemove', function(event) {
  spawn(event.clientX, event.clientY);
});

setInterval(function() {
  update();
  draw();
}, 16);

document.addEventListener('mousemove', function(event) {
  spawn(event.clientX, event.clientY);
});