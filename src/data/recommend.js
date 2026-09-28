/* "Melyik masszázs illik hozzám?" The weights are a PROPOSAL built from her
   own flyer texts (Máté, 2026-09-28: "javasolj, Brigitta utána átnézi").
   She can change any number here without touching the page. No health
   promises: the page says it is a starting point, not advice.

   Each choice adds points to treatments (by service id); the highest wins,
   ties go to the order of SERVICES. */

export const AREAS = [
  { id: 'nyak', label: 'Nyak, váll', score: { svedmasszazs: 2, yumeiho: 1 } },
  { id: 'hat', label: 'Hát', score: { svedmasszazs: 2, yumeiho: 2 } },
  { id: 'derek', label: 'Derék, csípő', score: { yumeiho: 3, svedmasszazs: 1 } },
  { id: 'lab', label: 'Láb', score: { svedmasszazs: 1, talpreflexologia: 1 } },
  { id: 'talp', label: 'Talp', score: { talpreflexologia: 3 } },
]

export const NEEDS = [
  { id: 'lazitas', label: 'Kikapcsolódnék', score: { svedmasszazs: 3 } },
  { id: 'ules', label: 'Sokat ülök', score: { yumeiho: 3 } },
  { id: 'allas', label: 'Sokat állok', score: { talpreflexologia: 3, svedmasszazs: 1 } },
  { id: 'egyensuly', label: 'Egyensúlyt keresek', score: { yumeiho: 2, talpreflexologia: 2 } },
]

/* Returns the winning service id, or null while nothing is chosen. */
export function recommend(areaIds, needId, services) {
  const picks = [...AREAS.filter((a) => areaIds.includes(a.id)), ...NEEDS.filter((n) => n.id === needId)]
  if (!picks.length) return null
  let best = null
  let bestScore = 0
  for (const s of services) {
    const total = picks.reduce((sum, p) => sum + (p.score[s.id] ?? 0), 0)
    if (total > bestScore) {
      best = s.id
      bestScore = total
    }
  }
  return best
}
