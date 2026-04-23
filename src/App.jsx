import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const TARGET_DATE = new Date('2026-08-10T07:00:00+07:00')

function calculateRemaining(now, target) {
  if (now >= target) {
    return {
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      finished: true,
    }
  }

  let months = 0
  const cursor = new Date(now)
  while (true) {
    const next = new Date(cursor)
    next.setMonth(next.getMonth() + 1)
    if (next <= target) {
      cursor.setMonth(cursor.getMonth() + 1)
      months++
    } else {
      break
    }
  }

  const totalMs = target.getTime() - now.getTime()
  const totalSeconds = Math.floor(totalMs / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)

  return {
    months,
    days: totalDays,
    hours: totalHours,
    minutes: totalMinutes % 60,
    seconds: totalSeconds % 60,
    finished: false,
  }
}

function TimeUnit({ value, labelKm, ariaLabel, minDigits = 2 }) {
  const display = String(value).padStart(minDigits, '0')
  return (
    <div className="time-unit" role="group" aria-label={ariaLabel}>
      <div className="time-unit__box" aria-hidden="true">
        <div className="time-unit__shine" />
        <span className="time-unit__digits" key={display}>
          {display}
        </span>
      </div>
      <div className="time-unit__label" aria-hidden="true">
        {labelKm}
      </div>
    </div>
  )
}

function App() {
  const [remaining, setRemaining] = useState(() =>
    calculateRemaining(new Date(), TARGET_DATE),
  )
  const lastAnnouncedMinuteRef = useRef(-1)
  const [announcement, setAnnouncement] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const tick = () => {
      const next = calculateRemaining(new Date(), TARGET_DATE)
      setRemaining(next)

      if (next.minutes !== lastAnnouncedMinuteRef.current) {
        lastAnnouncedMinuteRef.current = next.minutes
        if (next.finished) {
          setAnnouncement('ពេលវេលាប្រឡងបានមកដល់ហើយ។ សូមជូនពរឱ្យមានសំណាងល្អ!')
        } else {
          setAnnouncement(
            `នៅសល់ ${next.months} ខែ សរុប ${next.days} ថ្ងៃ ឬ ${next.hours} ម៉ោង ${next.minutes} នាទី មុនប្រឡងបាក់ឌុប។`,
          )
        }
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const visualSummary = useMemo(() => {
    if (remaining.finished) return 'ពេលវេលាប្រឡងបានមកដល់ហើយ'
    return `នៅសល់ ${remaining.months} ខែ សរុប ${remaining.days} ថ្ងៃ ឬ ${remaining.hours} ម៉ោង ${remaining.minutes} នាទី ${remaining.seconds} វិនាទី`
  }, [remaining])

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <div className="orb orb--gold" />
        <div className="orb orb--amber" />
        <div className="orb orb--blue" />
        <div className="backdrop__grid" />
        <div className="backdrop__noise" />
      </div>

      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>

      <main
        id="main-content"
        className={`page ${mounted ? 'page--in' : ''}`}
        aria-labelledby="hero-title"
      >
        <header className="hero">
          <div className="hero__badge" aria-hidden="true">
            <span className="hero__badge-dot" />
            ប្រឡងបាក់ឌុប · ឆ្នាំ ២០២៦
          </div>
          <h1 id="hero-title" className="hero__title">
            តើអ្នកត្រៀមខ្លួនក្នុងការប្រឡង
            <br />
            <span className="hero__title-accent">ទុតិយភូមិ</span>
            <span className="hero__title-after">ហើយឬនៅ?</span>
          </h1>
          <p className="hero__subtitle">
            ខាងក្រោមគឺជាពេលវេលាដែលនៅសល់រហូតដល់ថ្ងៃប្រឡងបញ្ចប់ការសិក្សាថ្នាក់ទី ១២។
            ចូរប្រើពេលវេលាដ៏មានតម្លៃនេះ ដើម្បីត្រៀមខ្លួនឱ្យបានល្អបំផុត។
          </p>
        </header>

        <section
          className="countdown"
          aria-label="ពេលវេលានៅសល់មុនប្រឡង"
          aria-describedby="countdown-desc"
        >
          <p id="countdown-desc" className="sr-only">
            {visualSummary}។ គោលដៅ៖ ថ្ងៃចន្ទ ទី ១០ ខែសីហា ឆ្នាំ ២០២៦ វេលាម៉ោង ៧:០០ ព្រឹក។
          </p>

          {remaining.finished ? (
            <div className="countdown__finished" role="alert">
              <div className="countdown__finished-title">ពេលវេលាបានមកដល់ហើយ!</div>
              <div className="countdown__finished-subtitle">
                សូមជូនពរឱ្យប្រឡងជាប់ជាមួយនឹងនិទ្ទេសល្អប្រសើរបំផុត
              </div>
            </div>
          ) : (
            <div className="countdown__grid">
              <TimeUnit
                value={remaining.months}
                labelKm="ខែ"
                ariaLabel={`នៅសល់ ${remaining.months} ខែ`}
              />
              <TimeUnit
                value={remaining.days}
                labelKm="ថ្ងៃ"
                ariaLabel={`សរុប ${remaining.days} ថ្ងៃ`}
                minDigits={3}
              />
              <TimeUnit
                value={remaining.hours}
                labelKm="ម៉ោង"
                ariaLabel={`សរុប ${remaining.hours} ម៉ោង`}
                minDigits={4}
              />
              <TimeUnit
                value={remaining.minutes}
                labelKm="នាទី"
                ariaLabel={`${remaining.minutes} នាទី`}
              />
              <TimeUnit
                value={remaining.seconds}
                labelKm="វិនាទី"
                ariaLabel={`${remaining.seconds} វិនាទី`}
              />
            </div>
          )}
        </section>

        <section className="target" aria-label="ព័ត៌មានលម្អិតអំពីថ្ងៃប្រឡង">
          <div className="target__icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="3" />
              <path d="M16 2v4M8 2v4M3 10h18" />
              <path d="M8 15h3M13 15h3M8 18h3" />
            </svg>
          </div>
          <div className="target__text">
            <div className="target__label">ថ្ងៃកំណត់ប្រឡង</div>
            <div className="target__date">
              ថ្ងៃចន្ទ ទី ១០ ខែសីហា ឆ្នាំ ២០២៦ វេលាម៉ោង ៧:០០ ព្រឹក
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" aria-label="ការរក្សាសិទ្ធិ និងអ្នកបង្កើត">
        <div className="footer__row">
          <span className="footer__copy">
            © ២០២៦{' '}
            <a
              href="https://www.goldeniq.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__brand"
              aria-label="ទស្សនាគេហទំព័រ Golden-IQ"
            >
              @Golden-IQ
            </a>{' '}
            All Rights Reserved
          </span>
          <span className="footer__sep" aria-hidden="true">
            ·
          </span>
          <span className="footer__author">
            អ្នកបង្កើត៖{' '}
            <a
              href="https://www.sungchhay.goldeniq.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__author-link"
              aria-label="ទស្សនាគេហទំព័រផ្ទាល់ខ្លួនរបស់ Chhit-Sungchhay"
            >
              Chhit-Sungchhay
            </a>
          </span>
        </div>
      </footer>
    </>
  )
}

export default App
