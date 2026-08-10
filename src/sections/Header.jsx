import { BUSINESS } from '../data/business'

export default function Header() {
  return (
    <header className="px-5 py-6">
      <div className="mx-auto flex max-w-3xl items-baseline justify-between">
        <a href="/" className="text-lg font-semibold tracking-tight text-stone-900">
          {BUSINESS.name || 'AB Masszázs'}
        </a>
        <nav className="flex gap-6 text-sm text-stone-600">
          <a href="#szolgaltatasok" className="hover:text-stone-900">Szolgáltatások</a>
          <a href="#elerhetoseg" className="hover:text-stone-900">Elérhetőség</a>
        </nav>
      </div>
    </header>
  )
}
