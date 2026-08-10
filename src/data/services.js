/* Her price list. Empty until she gives it — spec §9 makes this a hard blocker,
   and an invented price is worse than a missing one because a client will quote
   it back to her.

   `minutes` and `price` are integers, not strings: Phase 2's booking does
   arithmetic on the duration, and the price is formatted for display in one
   place rather than baked into the data.

   Shape:
     { id: 'svedmasszazs-60', name: 'Svédmasszázs', minutes: 60,
       price: 9000, desc: 'Egy mondat arról, kinek való.' } */
export const SERVICES = []
