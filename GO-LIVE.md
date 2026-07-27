# Élesítés — AB Masszázs

Az oldal kész. Ami hiányzik, azt **nem lehet kitalálni** — anyukádtól kell megkérdezni,
vagy meg kell venni. Amíg ezek nincsenek meg, a `npm run build` szándékosan MEGÁLL.

Ellenőrzés bármikor: `npm run preflight`

---

## 1. Amit be kell szerezni (6 dolog)

| # | Mi | Honnan | Mennyi idő |
|---|---|---|---|
| 1 | **`.hu` domain** | pl. rackhost.hu, dotroll.com — kb. 3–5 000 Ft/év | 10 perc |
| 2 | **Web3Forms kulcs** | <https://web3forms.com> — ingyenes, csak e-mail cím kell | 30 mp |
| 3 | **Anyukád Calendly-fiókja** | <https://calendly.com> — ingyenes csomag elég | 15 perc |
| 4 | **Valódi árak** | anyukádtól | — |
| 5 | **Valódi nyitvatartás** | anyukádtól | — |
| 6 | **Facebook-oldal URL** | ha van; ha nincs, hagyd üresen | — |

**A 3-as a legfontosabb.** A `BOOKING_URL` most a *te* Calendly-fiókodra mutat. Ha így menne
ki, minden vendég **hozzád** foglalna időpontot, és a naptár tökéletesen működőnek látszana.
A preflight ezt külön nevesítve fogja meg.

---

## 2. Amit be kell írni

**`src/config.js`** — minden szerkeszthető érték itt van:

```js
export const BOOKING_URL    = 'https://calendly.com/<anyukád-fiókja>/...'
export const W3F_ACCESS_KEY = '<a web3forms kulcs>'
export const SITE_URL       = 'https://<a megvett domain>'
export const FACEBOOK_URL   = '<valódi oldal URL, vagy üres string>'
```

Majd írd át a `HOURS`, `PRICING` és `PACKAGES` tömböket a valós értékekre, és **töröld a
fölöttük lévő `TODO` / `FIGYELEM` kommenteket** — a preflight ezekből tudja, hogy még
mintaadat van bent.

### Ha a domain nem `abmasszazs.hu` lesz

A domain **négy** helyen szerepel. A preflight ellenőrzi, hogy egyezik-e, de átírni neked kell:

- `src/config.js` → `SITE_URL`
- `index.html` → `og:url`, `canonical`, és a Plausible `data-domain`
- `public/sitemap.xml` → mindhárom `<loc>`
- `public/robots.txt` → a `Sitemap:` sor

---

## 3. Deploy

```bash
npm install
npm run preflight     # amíg ez nem megy át, ne deployolj
npm run build         # a preflight automatikusan lefut előtte
```

Vercelre:

1. Push a repót GitHubra
2. Vercel → **Add New Project** → válaszd ki a repót
3. A frameworköt (Vite) magától felismeri — ne állíts semmit
4. Deploy
5. **Settings → Domains** → add hozzá a megvett domaint, és állítsd be a DNS-t a
   regisztrátornál a Vercel által kiírt értékekre

A `vercel.json` már tartalmazza az SPA-fallbacket (kell az `/adatkezeles` és `/impresszum`
útvonalakhoz), a biztonsági fejléceket és a cache-szabályokat.

---

## 4. Élesítés után — kézzel ellenőrizd

- [ ] **Foglalj magadnak egy időpontot** az éles oldalon, és nézd meg, hogy anyukád
      naptárában jelent-e meg. Ne hidd el, hogy jó — próbáld ki.
- [ ] **Küldj egy üzenetet a kapcsolati űrlapon**, és nézd meg, megérkezett-e az e-mail.
      A Web3Forms első üzenetét e-mailben meg kell erősíteni, különben csendben elnyeli.
- [ ] Telefonszám mobilon rákattintva tárcsáz-e
- [ ] A térkép a valódi címre visz-e
- [ ] Mobilon végignézve nem lóg-e ki semmi
- [ ] `https://<domain>/sitemap.xml` és `/robots.txt` betöltődik-e
- [ ] Google Search Console: add hozzá a domaint, küldd be a sitemapet
- [ ] Google Business Profile: ha még nincs, ez helyi vállalkozásnál többet hoz, mint az
      oldal fele — és ingyenes

---

## 5. Amit szándékosan NEM tettünk bele

- **Vélemények.** A `TESTIMONIALS` üres, és a szekció addig meg sem jelenik, amíg nincs
  valódi vendégvélemény. Kitalált vélemény fogyasztóvédelmileg is kockázatos, és üresebbnek
  látszik, mint a semmi.
- **Saját fotók.** A galéria jelenleg Unsplash-képekből áll. Amint van pár kép a valódi
  kezelőről, cseréld le őket a `public/img/` mappában — a valódi tér sokkal többet ér, és
  ez a legnagyobb egyszeri javítás, ami még hátravan.

---

*Utolsó frissítés: 2026-07-27*
