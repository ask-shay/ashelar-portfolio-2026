import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Contact() {
  const vantaRef = useRef(null)
  const vantaEffect = useRef(null)

  useEffect(() => {
    let mounted = true
    async function initVanta() {
      try {
        if (!THREE || !THREE.PerspectiveCamera) {
          console.warn('THREE.js not fully loaded, skipping Vanta initialization')
          return
        }

        if (!vantaRef.current || !mounted) return
        const module = await import('vanta/dist/vanta.fog.min')
        const FOG = module.default
        vantaEffect.current = FOG({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0xffb347,
          midtoneColor: 0x3b82f6,
          lowlightColor: 0x8b5cf6,
          baseColor: 0x071018,
          speed: 1.0,
          zoom: 0.9
        })
      } catch (err) {
        console.error('Vanta (fog) failed to initialize on Contact info card:', err)
      }
    }

    // delay to ensure THREE.js is loaded
    setTimeout(initVanta, 200)

    return () => {
      mounted = false
      if (vantaEffect.current && vantaEffect.current.destroy) vantaEffect.current.destroy()
    }
  }, [])

  return (
    <div className="contact-wrap-container">
      <div className="contact-wrap contact-inner">
        <div className="contact-content">
          <div className="contact-header">
            <h2>Let's Connect</h2>
            <p className="contact-subtitle">Have a project in mind or want to collaborate? Reach out — I'd love to hear from you.</p>
          </div>

          <div className="contact-methods">
            <div className="contact-method">
              <div className="method-content">
                <h3>Email</h3>
                <p className="method-text">The best way to reach me — drop a message with details.</p>
                <a href="mailto:7akshayshelar@gmail.com" className="method-link">
                  7akshayshelar@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-method">
              <div className="method-content">
                <h3>LinkedIn</h3>
                <p className="method-text">Connect with me for professional updates and opportunities.</p>
                <a href="https://www.linkedin.com/in/ask-shay/" target="_blank" rel="noreferrer" className="method-link">
                  Visit Profile
                </a>
              </div>
            </div>

            <div className="contact-method">
              <div className="method-content">
                <h3>GitHub</h3>
                <p className="method-text">Explore code samples, projects and contributions.</p>
                <a href="https://github.com/ask-shay" target="_blank" rel="noreferrer" className="method-link">
                  View Repositories
                </a>
              </div>
            </div>
          </div>
        </div>

        <aside className="contact-info">
          <div className="info-vanta-card" id="info-vanta" ref={vantaRef}>
            <div className="info-vanta-content">
              <div className="info-block">
                <h4 className="info-title">Availability</h4>
                <p className="info-text">Open for Full Stack roles, freelance & contract work. Based in Mumbai — open to remote & travel.</p>
              </div>

              <div className="info-block">
                <h4 className="info-title">Quick Facts</h4>
                <ul className="info-list">
                  <li>Full Stack Developer</li>
                  <li>React & Node.js Specialist</li>
                  <li>3+ Years Experience</li>
                  <li>Building scalable solutions</li>
                </ul>
              </div>

              <div className="info-block">
                <h4 className="info-title">Response Time</h4>
                <p className="info-text">I typically respond to inquiries within 24 hours. For urgent matters, prefer email with "URGENT" in subject.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
