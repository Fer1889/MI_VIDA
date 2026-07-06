(function () {
  
  
  const starsContainer = document.getElementById('starsContainer');
  const starCount = 200; 

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = 1 + Math.random() * 2.5; 
    
    star.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      --duration: ${2 + Math.random() * 3}s;
      --delay: ${Math.random() * 4}s;
      --max-op: ${0.3 + Math.random() * 0.6};
    `;
    starsContainer.appendChild(star);
  }

  const cards = document.querySelectorAll('.scratch-card');

  cards.forEach(card => {
    const canvas = card.querySelector('.scratch-canvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    function initCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#94a3b8');
      grad.addColorStop(0.5, '#475569');
      grad.addColorStop(1, '#334155');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = 'bold 20px Georgia';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(' ♡ ', canvas.width / 2, canvas.height / 2);
    }

   
    function scratch(e) {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;

      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2); 
      ctx.fill();
    }

    canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', () => isDrawing = false);


    canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); });
    canvas.addEventListener('touchmove', (e) => {
      if (isDrawing) {
        e.preventDefault();
        scratch(e);
      }
    });
    window.addEventListener('touchend', () => isDrawing = false);
    window.addEventListener('DOMContentLoaded', initCanvas);
    window.addEventListener('resize', initCanvas);
  });

})();