import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-stone-200 px-5 py-10">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 text-sm text-stone-500">
        <p>{`© ${year} ${BUSINESS.legalName || BUSINESS.name || 'AB Masszázs'}`}</p>
        <div className="flex gap-6">
          {BUSINESS.facebook ? (
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          ) : null}
          {BUSINESS.instagram ? (
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          ) : null}
          <Link to="/adatvedelem" className="underline underline-offset-4">Adatvédelem</Link>
        </div>
      </div>
    </footer>
  )
}
