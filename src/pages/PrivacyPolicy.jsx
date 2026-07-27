import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-sm text-primary lift-on-hover"
        >
          <ArrowLeft className="h-4 w-4" /> Vissza a főoldalra
        </Link>

        <h1 className="mt-10 font-display text-4xl sm:text-5xl font-bold tracking-tight">
          Adatkezelési tájékoztató
        </h1>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Hatályos: {new Date().getFullYear()}. — AB Masszázs
        </p>

        <div className="mt-12 space-y-10 font-body text-sm sm:text-base text-ink/80 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">1. Az adatkezelő</h2>
            <p className="mt-3">
              AB Masszázs · 2365 Inárcs, Május 1. utca 12. · Telefon: +36 30 635 7807
            </p>
            <p className="mt-2 text-muted">
              [Kitöltendő: a vállalkozás pontos neve, adószáma, nyilvántartási száma és
              kapcsolattartó e-mail címe.]
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">
              2. Milyen adatokat kezelek és miért
            </h2>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>
                <strong>Kapcsolatfelvételi űrlap:</strong> név, e-mail cím, telefonszám, település
                és az üzenet szövege — kizárólag a megkeresésed megválaszolása és az időpont
                egyeztetése céljából.
              </li>
              <li>
                <strong>Telefonos egyeztetés:</strong> név és telefonszám az időpont rögzítéséhez.
              </li>
              <li>
                <strong>Egészségügyi jellegű információ:</strong> ha panaszt, korábbi sérülést vagy
                leletet osztasz meg, azt bizalmasan, kizárólag a kezelés biztonságos elvégzéséhez
                használom.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">
              3. Az adatkezelés jogalapja
            </h2>
            <p className="mt-3">
              A GDPR 6. cikk (1) bekezdés a) pontja szerinti hozzájárulásod, egészségügyi jellegű
              adat esetén a 9. cikk (2) bekezdés a) pontja szerinti kifejezett hozzájárulásod. A
              hozzájárulás bármikor, indoklás nélkül visszavonható.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">4. Megőrzési idő</h2>
            <p className="mt-3">
              A megkeresésedet a válaszadást követő legfeljebb 1 évig őrzöm meg, kivéve, ha
              rendszeres vendégként az időpontjaid nyilvántartásához hosszabb megőrzésbe
              beleegyezel. Számlázási adatok esetén a jogszabályi megőrzési idő irányadó.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">5. Adattovábbítás</h2>
            <p className="mt-3">
              Adataidat nem értékesítem és marketing céljából nem adom tovább. A szolgáltatás
              működéséhez az alábbi adatfeldolgozókat veszem igénybe, akik kizárólag a saját
              feladatuk ellátásához férnek hozzá az adatokhoz:
            </p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>
                <strong>Web3Forms</strong> — a kapcsolatfelvételi űrlapon küldött üzenetet
                továbbítja az e-mail címemre, saját adatvédelmi szabályzata szerint.
              </li>
              <li>
                <strong>Calendly</strong> — az online időpontfoglaláskor megadott foglalási adatokat
                kezeli, saját adatvédelmi szabályzata szerint.
              </li>
              <li>
                <strong>Vercel</strong> — az oldal tárhelyszolgáltatója, amely a működéshez
                szükséges technikai naplóadatokat kezeli.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">6. A te jogaid</h2>
            <p className="mt-3">
              Kérheted a rólad tárolt adatok másolatát, helyesbítését, törlését, a kezelés
              korlátozását, valamint tiltakozhatsz az adatkezelés ellen. Kérésedet a fenti
              elérhetőségek bármelyikén jelezheted, és 30 napon belül válaszolok.
            </p>
            <p className="mt-3">
              Panasszal a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH, 1055 Budapest,
              Falk Miksa utca 9-11., ugyfelszolgalat@naih.hu) fordulhatsz.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">7. Sütik</h2>
            <p className="mt-3">
              Ez a weboldal nem használ saját marketing- vagy nyomkövető sütiket. A beágyazott
              térkép (Google Maps) és az online foglalónaptár (Calendly) a saját működéséhez sütiket
              helyezhet el; ezek a szolgáltatók saját adatvédelmi szabályzata szerint működnek.
            </p>
          </section>
        </div>

        <Link
          to="/"
          className="mt-16 inline-flex items-center gap-2 font-body text-sm text-primary lift-on-hover"
        >
          <ArrowLeft className="h-4 w-4" /> Vissza a főoldalra
        </Link>
      </div>
    </div>
  )
}
