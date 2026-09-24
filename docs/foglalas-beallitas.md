# Az online foglalás bekapcsolása

A kód kész és tesztelt. Élesben három dolog kell hozzá, ami az ő fiókjához kötődik.
Egyszer kell megcsinálni, kb. 30 perc.

## 1. Google Naptár-hozzáférés (service account)

1. https://console.cloud.google.com → új projekt: `ab-masszazs`.
2. *APIs & Services → Library* → **Google Calendar API** → Enable.
3. *IAM & Admin → Service Accounts* → Create. Név: `foglalas`. Szerepkör nem kell.
4. A service accounton belül: *Keys → Add key → JSON*. A letöltött fájlból kell a
   `client_email` és a `private_key`. **Ezt a fájlt senkinek ne küldd el, és ne tedd a repóba.**
5. Édesanyád Google Naptárában: *Beállítások → a naptár → Megosztás adott személyekkel* →
   hozzáadni a `client_email` címet, jogosultság: **Módosíthatja az eseményeket**.
   Ha valaha vissza akarja vonni, ugyanitt két kattintás.
6. A naptár azonosítója (*Naptár integrálása → Naptárazonosító*), a fő naptárnál ez az
   e-mail címe.

## 2. Gmail alkalmazásjelszó

1. Az ő Google-fiókjában be kell legyen kapcsolva a kétlépcsős azonosítás.
2. https://myaccount.google.com/apppasswords → név: `weboldal` → a 16 karakteres jelszót
   kell megjegyezni.

## 3. Netlify környezeti változók

*Site configuration → Environment variables*:

| Változó | Érték |
|---|---|
| `GOOGLE_CLIENT_EMAIL` | a JSON `client_email` mezője |
| `GOOGLE_PRIVATE_KEY` | a JSON `private_key` mezője, egy sorban, ahogy van (`\n`-ekkel) |
| `CALENDAR_ID` | a naptár azonosítója |
| `GMAIL_USER` | az ő Gmail címe |
| `GMAIL_APP_PASSWORD` | a 16 karakteres alkalmazásjelszó |
| `BOOKING_SECRET` | hosszú véletlen szöveg: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `SITE_ORIGIN` | az oldal címe, pl. `https://abmasszazs.hu` (perjel nélkül a végén) |

Ha bármelyik hiányzik, a `/api/*` 503-at ad, és az oldal a telefonszámot mutatja: nem
tud „félig működni”.

## 4. Élesítés

1. Egy próbafoglalás a saját adatainkkal: megjelenik-e a naptárban, megjön-e mindkét e-mail,
   működik-e a lemondó link.
2. Ha igen: `src/data/booking.js` → `const LIVE = true`, commit, deploy. Innentől minden
   „Időpontfoglalás” gomb a `/foglalas` oldalra visz.

## A szabályok, ha változtatni kell

`src/lib/slots.js` → `RULES`: 15 perc szünet két vendég között, legalább 2 órával előre,
legfeljebb 60 napra előre, félórás rács. A nyitvatartás a `business.js`-ből jön; egy-egy
szabadnapot elég a naptárba beírni eseményként, az oldal azt foglaltnak veszi.
