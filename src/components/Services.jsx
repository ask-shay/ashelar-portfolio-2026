import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function Services() {
  const vantaRef = useRef(null)
  const vantaEffect = useRef(null)
  const [vantaLoaded, setVantaLoaded] = useState(false)

  useEffect(() => {
    let mounted = true
    
    async function initVanta() {
      try {
        if (!THREE || !THREE.PerspectiveCamera) {
          console.warn('THREE.js not fully loaded, skipping Vanta initialization')
          setVantaLoaded(true)
          return
        }

        const module = await import('vanta/dist/vanta.rings.min')
        const RINGS = module.default
        
        if (!vantaRef.current || !mounted) return

        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

        vantaEffect.current = RINGS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: !isMobile, // Disable mouse controls on mobile
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x8b5cf6,
          backgroundColor: 0x071018,
          maxDistance: isMobile ? 25 : 28, // Slightly reduced on mobile
          maxSpeed: isMobile ? 1.2 : 1.5 // Slightly slower on mobile
        })
        setVantaLoaded(true)
        console.info(`Vanta RINGS initialized on Services section (${isMobile ? 'mobile' : 'desktop'})`)
      } catch (err) {
        console.error('Vanta RINGS failed:', err)
        setVantaLoaded(true)
      }
    }

    setTimeout(initVanta, 150)

    return () => {
      mounted = false
      if (vantaEffect.current?.destroy) vantaEffect.current.destroy()
    }
  }, [])

  return (
    <section id="services" className={`services-section scroll-reveal ${vantaLoaded ? 'vanta-ready' : ''}`} ref={vantaRef}>
      <div className="container">
        <div className="section-intro">
          <h2 className="section-title">What I Can Do For You</h2>
          <p className="section-subtitle">Specialized expertise across the full stack</p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">⚛️</div>
            <h3 className="service-title">Full Stack Development</h3>
            <p className="service-desc">
              End-to-end web applications with React, Node.js, and modern databases. From frontend to backend deployment.
            </p>
            <div className="service-arrow">→</div>
          </div>

          <div className="service-card">
            <div className="service-icon">⚡</div>
            <h3 className="service-title">Real-time Systems</h3>
            <p className="service-desc">
              WebSocket-powered applications with Socket.io. Real-time messaging, notifications, and live collaboration features.
            </p>
            <div className="service-arrow">→</div>
          </div>

          <div className="service-card">
            <div className="service-icon">🏗️</div>
            <h3 className="service-title">System Design</h3>
            <p className="service-desc">
              Scalable architecture planning. Database design, API design, and microservices patterns for high-performance systems.
            </p>
            <div className="service-arrow">→</div>
          </div>

          <div className="service-card">
            <div className="service-icon">🚀</div>
            <h3 className="service-title">DevOps & Deployment</h3>
            <p className="service-desc">
              Docker containerization, CI/CD pipelines, and cloud deployment. Production-ready infrastructure.
            </p>
            <div className="service-arrow">→</div>
          </div>
        </div>
      </div>
    </section>
  )
}




