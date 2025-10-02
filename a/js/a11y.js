
// Simple focus trap & dialog helpers
let lastFocused = null;

export function openModal(backdropEl) {
  backdropEl.hidden = false;
  backdropEl.style.display = 'flex';
  lastFocused = document.activeElement;
  const focusable = backdropEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0]; const last = focusable[focusable.length - 1];
  function keydown(e){
    if (e.key === 'Escape') { closeModal(backdropEl); }
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  backdropEl.addEventListener('keydown', keydown);
  backdropEl.dataset.trap = '1';
  first?.focus();
}

export function closeModal(backdropEl) {
  backdropEl.hidden = true;
  backdropEl.style.display = 'none';
  if (backdropEl.dataset.trap === '1') {
    delete backdropEl.dataset.trap;
  }
  lastFocused?.focus();
}

export function announce(el, msg) {
  if (!el) return;
  el.textContent = msg;
}

export function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }
export function pct(n, d){ if(!d) return 0; return clamp(Math.round((n/d)*100), 0, 100); }
