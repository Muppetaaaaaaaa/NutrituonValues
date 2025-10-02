
import { state } from './state.js';
import { save, load } from './storage.js';
import { announce, clamp, pct, openModal, closeModal } from './a11y.js';

// Element refs
const targetsWrap = document.getElementById('targets');
const calBar = document.getElementById('calBar');
const proBar = document.getElementById('proBar');
const fatBar = document.getElementById('fatBar');
const carbBar = document.getElementById('carbBar');
const calTxt = document.getElementById('calTxt');
const proTxt = document.getElementById('proTxt');
const fatTxt = document.getElementById('fatTxt');
const carbTxt = document.getElementById('carbTxt');
const goalHint = document.getElementById('goalHint');
const announcer = document.getElementById('progressAnnouncer');
const editGoalsBtn = document.getElementById('editGoalsBtn');

// Modal refs
const editGoalsModal = document.getElementById('editGoalsModal');
const goalsForm = document.getElementById('goalsForm');
const saveGoalsBtn = document.getElementById('saveGoalsBtn');
const cancelGoalsBtn = document.getElementById('cancelGoalsBtn');
const calcWeight = document.getElementById('calcWeight');
const calcGoalWeight = document.getElementById('calcGoalWeight');
const calcBtn = document.getElementById('calculateGoalsBtn');
const goalsMsg = document.getElementById('goalsMsg');

// Public API
export function renderTargets() {
  const g = state.goals, t = state.today;
  targetsWrap.innerHTML = `
    <span class="pill">🎯 Calories: <strong>${g.calories||0}</strong></span>
    <span class="pill">🥩 Protein: <strong>${g.proteinG||0} g</strong></span>
    <span class="pill">🧈 Fat: <strong>${g.fatG||0} g</strong></span>
    <span class="pill">🍞 Carbs: <strong>${g.carbsG||0} g</strong></span>
  `;

  const bars = [
    { bar: calBar, txt: calTxt, now: t.calories, max: g.calories },
    { bar: proBar, txt: proTxt, now: t.proteinG, max: g.proteinG },
    { bar: fatBar, txt: fatTxt, now: t.fatG,    max: g.fatG },
    { bar: carbBar, txt: carbTxt, now: t.carbsG, max: g.carbsG },
  ];

  bars.forEach(({bar, txt, now, max}) => {
    const p = pct(now, max);
    bar.style.width = p + '%';
    const wrapper = bar.parentElement;
    wrapper.setAttribute('aria-valuenow', String(clamp(now, 0, max || 0)));
    wrapper.setAttribute('aria-valuemax', String(max || 0));
    txt.textContent = `${now} / ${max || 0}`;
  });

  goalHint.style.display = state.goals.calories ? 'none' : 'block';
  announce(announcer, `Updated totals. Calories ${state.today.calories} of ${state.goals.calories}.`);
}

export function addToToday(adds){
  if (!adds) return;
  state.today.calories = Math.round(state.today.calories + (adds.kcal||0));
  state.today.proteinG = Math.round(state.today.proteinG + (adds.proteinG||0));
  state.today.fatG     = Math.round(state.today.fatG + (adds.fatG||0));
  state.today.carbsG   = Math.round(state.today.carbsG + (adds.carbsG||0));
  save('today', state.today);
  renderTargets();
}

export function deriveGoals(currentKg, goalKg){
  const maintain = Math.round(currentKg * 30);
  const diff = goalKg - currentKg;
  const deltaAbs = clamp(Math.round(Math.abs(diff) * 10), 200, 600);
  const delta = diff === 0 ? 0 : (diff > 0 ? deltaAbs : -deltaAbs);
  const calories = clamp(maintain + delta, 800, 5000);

  const proteinG = Math.round(clamp(1.8 * currentKg, 1.0*currentKg, 2.6*currentKg));
  const fatPct = 30;
  const fatCals = Math.round(calories * (fatPct/100));
  const fatG = Math.round(fatCals / 9);
  const carbCals = Math.max(0, calories - (proteinG*4) - fatCals);
  const carbsG = Math.round(carbCals / 4);

  return { calories, proteinG, fatG, carbsG };
}

// Events
editGoalsBtn.addEventListener('click', () => {
  goalsForm.editCalories.value = state.goals.calories || '';
  goalsForm.editProtein.value  = state.goals.proteinG || '';
  goalsForm.editFat.value      = state.goals.fatG || '';
  goalsForm.editCarbs.value    = state.goals.carbsG || '';
  goalsMsg.textContent = '';
  openModal(editGoalsModal);
});

cancelGoalsBtn.addEventListener('click', () => closeModal(editGoalsModal));

saveGoalsBtn.addEventListener('click', () => {
  const calories = parseInt(goalsForm.editCalories.value, 10);
  const proteinG = parseInt(goalsForm.editProtein.value, 10);
  const fatG = parseInt(goalsForm.editFat.value, 10);
  const carbsG = parseInt(goalsForm.editCarbs.value, 10);

  if (!(calories>=800 && calories<=5000)) return showFormError('⚠️ Enter valid calories (800–5000).');
  if (!(proteinG>=20 && proteinG<=300))   return showFormError('⚠️ Enter valid protein (20–300g).');
  if (!(fatG>=20 && fatG<=200))           return showFormError('⚠️ Enter valid fat (20–200g).');
  if (!(carbsG>=50 && carbsG<=500))       return showFormError('⚠️ Enter valid carbs (50–500g).');

  state.goals = { calories, proteinG, fatG, carbsG };
  save('goals', state.goals);
  renderTargets();
  closeModal(editGoalsModal);
  toast('🎯 Goals updated successfully!');
});

calcBtn.addEventListener('click', () => {
  const w = parseFloat(calcWeight.value);
  const gw = parseFloat(calcGoalWeight.value);
  if (!isFinite(w) || w<30 || w>300) return showFormError('⚠️ Enter a valid current weight (30–300kg).');
  if (!isFinite(gw) || gw<30 || gw>300) return showFormError('⚠️ Enter a valid goal weight (30–300kg).');

  const g = deriveGoals(w, gw);
  goalsForm.editCalories.value = g.calories;
  goalsForm.editProtein.value  = g.proteinG;
  goalsForm.editFat.value      = g.fatG;
  goalsForm.editCarbs.value    = g.carbsG;
  showFormSuccess('✅ Goals calculated! Review and save if they look good.');
});

function showFormError(msg){ goalsMsg.classList.remove('ok'); goalsMsg.textContent = msg; goalsMsg.setAttribute('role','alert'); }
function showFormSuccess(msg){ goalsMsg.classList.add('ok'); goalsMsg.textContent = msg; goalsMsg.removeAttribute('role'); }

// Toast (simple)
const toastEl = document.getElementById('toast');
function toast(message){
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(()=> toastEl.classList.remove('show'), 2600);
}

export function bootNutrition(){
  renderTargets();
}
