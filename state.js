
export const state = {
  goals: { calories: 0, proteinG: 0, fatG: 0, carbsG: 0 },
  today: { calories: 0, proteinG: 0, fatG: 0, carbsG: 0 },
  settings: { theme: 'auto' }
};

export function initStateFromStorage(load) {
  const g = load('goals'); if (g) state.goals = g;
  const t = load('today'); if (t) state.today = t;
}
