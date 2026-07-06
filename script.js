(function () {
  
  /* ── Generador Automático de Estrellas ── */
  const starsContainer = document.getElementById('starsContainer');
  const starCount = 45;

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

  /* ── Lógica Multi-Canvas CORREGIDA ── */
  const cards = document.querySelectorAll('.scratch-card');

  cards.forEach(card => {
    const canvas = card.querySelector('.scratch-canvas');
    
    // AQUÍ ESTABA EL ERROR: quitamos el "desynchronized" para que la transparencia funcione perfecto
    const ctx = canvas.getContext('2d', { alpha: true }); 
    
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let rect = null; 

    function initCanvas() {
      rect = canvas.getBoundingClientRect(); 
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

    function getPos(e) {
      let clientX, clientY;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function handleStart(e) {
      isDrawing = true;
      rect = canvas.getBoundingClientRect(); 
      const pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
      
      drawScratch(pos.x, pos.y, pos.x, pos.y);
    }

    function handleMove(e) {
      if (!isDrawing) return;
      
      const pos = getPos(e);
      drawScratch(lastX, lastY, pos.x, pos.y);
      
      lastX = pos.x;
      lastY = pos.y;
    }

    function drawScratch(startX, startY, endX, endY) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 36; 
      ctx.lineCap = 'round';  
      ctx.lineJoin = 'round'; 
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }

    // Listeners de Escritorio
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', () => isDrawing = false);

    // Listeners Táctiles 
    canvas.addEventListener('touchstart', handleStart);
    canvas.addEventListener('touchmove', (e) => {
      if (isDrawing) {
        e.preventDefault(); 
        handleMove(e);
      }
    });
    window.addEventListener('touchend', () => isDrawing = false);

    window.addEventListener('DOMContentLoaded', initCanvas);
    window.addEventListener('resize', initCanvas);
  });

})();
