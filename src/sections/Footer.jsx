import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-8 gap-y-4 text-sm text-faint">
        <p>{`© ${year} ${BUSINESS.legalName || BUSINESS.name || 'AB Masszázs'}`}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {BUSINESS.facebook ? (
            <a
              href={BUSINESS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-clay"
            >
              Facebook
            </a>
          ) : null}
          {BUSINESS.instagram ? (
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-clay"
            >
              Instagram
            </a>
          ) : null}
          <Link
            to="/adatvedelem"
            className="inline-flex min-h-[44px] items-center underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-clay"
          >
            Adatvédelem
          </Link>
        </div>
      </div>
    </footer>
  )
}
