import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="foot-left">
          <strong>Akshay Shelar</strong>
          <p className="muted">
          Software Engineer (Full Stack) • Security & System Design
</p>

        </div>
        <div className="foot-right">
          <small className="muted">© {currentYear} Akshay Shelar</small>
        </div>
      </div>
    </footer>
  )
}

