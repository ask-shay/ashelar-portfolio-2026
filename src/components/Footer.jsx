import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="foot-left">
          <strong>Akshay Shelar</strong>
          <p className="muted">Software Developer • MERN Stack • System Design</p>
        </div>
        <div className="foot-right">
          <small className="muted">© {currentYear} Akshay Shelar</small>
        </div>
      </div>
    </footer>
  )
}

