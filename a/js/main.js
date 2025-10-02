
import { save, load } from './storage.js';
import { initStateFromStorage, state } from './state.js';
import { bootNutrition, addToToday } from './nutrition.js';

// Pretend queue integration so the nutrition UI can be tested
const queueEl = document.getElementById('queue');
const exportBtn = document.getElementById('exportDocx');
const removeBtn = document.getElementById('removeLast');
let queue = load('queue') || [];

function renderQueue(){
  if (!queue.length){
    queueEl.innerHTML = '<div class="muted">📝 Nothing added yet. Add items to see totals update.</div>';
    exportBtn.disabled = true; removeBtn.disabled = true; return;
  }
  exportBtn.disabled = false; removeBtn.disabled = false;
  queueEl.innerHTML = queue.map((p,i)=>`
    <div class="list-item">
      <div style="font-weight:700;margin-bottom:4px;">${i+1}. ${p.name || 'Unknown'} ${p.brands ? '— ' + p.brands : ''}</div>
      <div class="muted">⚖️ ${p.amountG ?? '—'} g</div>
      <div class="muted">➕ Adds: ${p.adds ? `${p.adds.kcal} kcal, P ${p.adds.proteinG}g, F ${p.adds.fatG}g, C ${p.adds.carbsG}g` : '—'}</div>
    </div>`).join('');
}

removeBtn.addEventListener('click', ()=>{
  queue.pop();
  save('queue', queue);
  renderQueue();
});

// Demo add: press "a" to simulate adding 50g of (per100) 200kcal, 10P, 5F, 20C
document.addEventListener('keydown', (e)=>{
  if (e.key === 'a'){
    const per100 = { kcal: 200, protein: 10, fat: 5, carbs: 20 };
    const grams = 50;
    const ratio = grams/100;
    const adds = {
      kcal: Math.round((per100.kcal||0) * ratio),
      proteinG: Math.round((per100.protein||0) * ratio),
      fatG: Math.round((per100.fat||0) * ratio),
      carbsG: Math.round((per100.carbs||0) * ratio),
    };
    addToToday(adds);
    queue.push({ name: 'Demo food', amountG: grams, adds });
    save('queue', queue);
    renderQueue();
  }
});

// Boot
initStateFromStorage(load);
bootNutrition();
renderQueue();
