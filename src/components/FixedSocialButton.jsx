import React, { useEffect, useState, useRef } from 'react'

export default function FixedSocialButton() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById('hero')
      if (!hero) return setVisible(true)
      const rect = hero.getBoundingClientRect()
      // show button once hero is scrolled out of view (bottom <= 0)
      setVisible(rect.bottom <= 0)
    }

    function onClickOutside(e) {
      if (open && rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onClickOutside)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onClickOutside)
    }
  }, [open])

  if (!visible) return null

  return (
    <div ref={rootRef} className={`fixed-social-btn ${open ? 'open' : ''}`} aria-hidden={false}>
      <button
        className="fsb-toggle"
        aria-label="Open social links"
        onClick={() => setOpen((s) => !s)}
      >
        {open ? '✕' : '☰'}
      </button>

      <div className="fsb-list" role="menu" aria-hidden={!open}>
        <a 
          className="fsb-item" 
          href="https://github.com/ask-shay" 
          target="_blank" 
          rel="noreferrer" 
          aria-label="GitHub"
        >
          <svg viewBox="0 0 24 24" className="fsb-icon" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 .5C5.73.5.88 5.35.88 11.62c0 4.77 3.09 8.81 7.38 10.24.54.1.74-.23.74-.51 0-.25-.01-.92-.01-1.8-3 .65-3.63-1.45-3.63-1.45-.49-1.25-1.2-1.58-1.2-1.58-.98-.67.07-.66.07-.66 1.08.08 1.65 1.11 1.65 1.11.96 1.65 2.51 1.18 3.12.9.1-.71.38-1.18.69-1.45-2.4-.27-4.93-1.2-4.93-5.33 0-1.18.42-2.15 1.11-2.91-.11-.27-.48-1.38.11-2.88 0 0 .91-.29 2.98 1.11a10.37 10.37 0 012.71-.37c.92.01 1.85.12 2.71.37 2.07-1.4 2.98-1.11 2.98-1.11.59 1.5.22 2.61.11 2.88.69.76 1.11 1.73 1.11 2.91 0 4.14-2.54 5.05-4.96 5.32.39.34.74 1.02.74 2.06 0 1.49-.01 2.69-.01 3.06 0 .28.19.62.75.51 4.29-1.43 7.38-5.47 7.38-10.24C23.12 5.35 18.27.5 12 .5z" fill="currentColor"/>
          </svg>
          <span>GitHub</span>
        </a>
        <a 
          className="fsb-item" 
          href="https://www.linkedin.com/in/ask-shay/" 
          target="_blank" 
          rel="noreferrer" 
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fsb-icon">
            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6C1.1 6 0 4.88 0 3.5C0 2.12 1.1 1 2.48 1C3.86 1 4.98 2.12 4.98 3.5ZM0.39 8.98H4.57V24H0.39V8.98ZM8.57 8.98H12.39V11.06C12.98 10.03 14.48 8.86 16.87 8.86C21.01 8.86 22 11.33 22 15.11V24H17.82V15.98C17.82 13.7 17.6 11.4 14.98 11.4C12.32 11.4 11.92 13.28 11.92 15.82V24H8.57V8.98Z" fill="currentColor"/>
          </svg>
          <span>LinkedIn</span>
        </a>
        <a 
          className="fsb-item" 
          href="https://www.instagram.com/akshay__shelar_" 
          target="_blank" 
          rel="noreferrer" 
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" className="fsb-icon" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm8.5 1.5h-8.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5A4.25 4.25 0 0020.5 16.25v-8.5A4.25 4.25 0 0016.25 3.5zM12 7a5 5 0 110 10 5 5 0 010-10zm6.5-2.5a1 1 0 11-2 0 1 1 0 012 0z" fill="currentColor"/>
          </svg>
          <span>Instagram</span>
        </a>
        <a 
          className="fsb-item fsb-resume" 
          href="/assets/resume.pdf" 
          download="Akshay_Shelar_Resume.pdf"
          aria-label="Download Resume"
        >
          <svg viewBox="0 0 24 24" className="fsb-icon" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 15H16V17H8V15ZM8 11H13V13H8V11Z" fill="currentColor"/>
          </svg>
          <span>Download Resume</span>
        </a>
      </div>
    </div>
  )
}
