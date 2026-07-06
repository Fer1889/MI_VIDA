(function () {
  
  /* ── Generador Automático de Estrellas (Se mantiene igual) ── */
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

  /* ── Lógica Multi-Canvas ULTRA-OPTIMIZADA para Celular ── */
  const cards = document.querySelectorAll('.scratch-card');

  cards.forEach(card => {
    const canvas = card.querySelector('.scratch-canvas');
    // 'desynchronized: true' le da una pista al navegador para renderizar el canvas directo en baja latencia
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true }); 
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let rect = null; // Guardará las coordenadas en caché

    function initCanvas() {
      rect = canvas.getBoundingClientRect(); // Cálculo inicial
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
      ctx.fillText('✨ ♡ ✨', canvas.width / 2, canvas.height / 2);
    }

    // Función rápida para extraer coordenadas sin recalcular el layout
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

    // Se ejecuta EXACTAMENTE al poner el dedo en la pantalla
    function handleStart(e) {
      isDrawing = true;
      rect = canvas.getBoundingClientRect(); // Captura limpia solo al iniciar el toque
      const pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
      
      // Borra el punto inicial exacto del toque
      drawScratch(pos.x, pos.y, pos.x, pos.y);
    }

    // Se ejecuta de manera continua al mover el dedo
    function handleMove(e) {
      if (!isDrawing) return;
      
      const pos = getPos(e);
      
      // Dibuja una línea continua desde la posición anterior a la actual
      drawScratch(lastX, lastY, pos.x, pos.y);
      
      // Actualiza el último punto registrado
      lastX = pos.x;
      lastY = pos.y;
    }

    // Motor de raspado por vector de línea (La clave de la velocidad)
    function drawScratch(startX, startY, endX, endY) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 36; // Grosor del raspado (equivalente al radio de 18px de antes)
      ctx.lineCap = 'round';  // Puntas redondeadas
      ctx.lineJoin = 'round'; // Uniones suavizadas para evitar esquinas rotas
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }

    // Listeners de Escritorio
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', () => isDrawing = false);

    // Listeners Táctiles Optimizados
    canvas.addEventListener('touchstart', handleStart);
    canvas.addEventListener('touchmove', (e) => {
      if (isDrawing) {
        e.preventDefault(); // Evita que la pantalla del cel tiemble o haga scroll involuntario
        handleMove(e);
      }
    });
    window.addEventListener('touchend', () => isDrawing = false);

    window.addEventListener('DOMContentLoaded', initCanvas);
    window.addEventListener('resize', () => {
      initCanvas();
    });
  });

})();
