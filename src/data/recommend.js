/* "Melyik masszázs illik hozzám?" The weights and texts are a PROPOSAL
   (FILLER, Máté 2026-09-28: "javasolj, Brigitta utána átnézi"). She can change
   any number or sentence here without touching the page. No health
   promises: the page says it is a starting point, not advice.

   Each choice adds points to treatments (by service id); the ranking shows
   every treatment's share, and ties go to the order of SERVICES. */

export const AREAS = [
  { id: 'fej', label: 'Fej, halánték', score: { yumeiho: 2, svedmasszazs: 1 } },
  { id: 'nyak', label: 'Nyak, váll', score: { svedmasszazs: 3, yumeiho: 1 } },
  { id: 'hat', label: 'Hát', score: { svedmasszazs: 2, yumeiho: 2 } },
  { id: 'derek', label: 'Derék', score: { yumeiho: 3, svedmasszazs: 1 } },
  { id: 'csipo', label: 'Csípő', score: { yumeiho: 3 } },
  { id: 'lab', label: 'Comb, vádli', score: { svedmasszazs: 2, talpreflexologia: 1 } },
  { id: 'talp', label: 'Talp, boka', score: { talpreflexologia: 3 } },
]

export const NEEDS = [
  { id: 'lazitas', label: 'Kikapcsolódnék', score: { svedmasszazs: 3 } },
  { id: 'ules', label: 'Sokat ülök', score: { yumeiho: 3 } },
  { id: 'allas', label: 'Sokat állok', score: { talpreflexologia: 3, svedmasszazs: 1 } },
  { id: 'egyensuly', label: 'Egyensúlyt keresek', score: { yumeiho: 2, talpreflexologia: 2 } },
]

/* One sentence per treatment for the suggestion card. */
export const PITCH = {
  svedmasszazs: 'Ha feszes a nyakad, a vállad vagy a hátad, és egyszerűen ki szeretnél kapcsolni egy órára.',
  yumeiho: 'Ha a derekad, a csípőd vagy a tartásod zavar, és újra egyensúlyba szeretnél kerülni.',
  talpreflexologia: 'Ha fáradt a lábad, sokat állsz, vagy a talpadon át szeretnél ellazulni.',
}

/* Every treatment with its points and share of all points, best first.
   Empty while nothing is chosen. */
export function rank(areaIds, needId, services) {
  const picks = [...AREAS.filter((a) => areaIds.includes(a.id)), ...NEEDS.filter((n) => n.id === needId)]
  if (!picks.length) return []
  const scored = services.map((s, order) => ({
    id: s.id,
    order,
    score: picks.reduce((sum, p) => sum + (p.score[s.id] ?? 0), 0),
  }))
  const total = scored.reduce((sum, s) => sum + s.score, 0)
  if (!total) return []
  return scored
    .map((s) => ({ ...s, pct: Math.round((s.score / total) * 100) }))
    .sort((a, b) => b.score - a.score || a.order - b.order)
}

/* The winning service id, or null while nothing is chosen. */
export function recommend(areaIds, needId, services) {
  return rank(areaIds, needId, services)[0]?.id ?? null
}
