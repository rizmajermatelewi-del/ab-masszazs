/* Whether "Időpontfoglalás" leads to the online booking page or to her
   telephone. Spec §11: /foglalas replaces the phone number when it works,
   and not before -- so this stays false until the environment variables are
   set at the host (see docs/foglalas-beallitas.md) and one real test booking
   has gone through her calendar and both e-mails.

   Demo mode shows the page, with invented free times and nothing sent. */
import { DEMO } from './demo.js'

const LIVE = false

export const BOOKING_ONLINE = DEMO || LIVE
