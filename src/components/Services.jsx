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
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
          setVantaLoaded(true)
          return
        }

        if (!THREE || !THREE.PerspectiveCamera) {
          console.warn('THREE.js not fully loaded, skipping Vanta initialization')
          setVantaLoaded(true)
          return
        }

        const module = await import('vanta/dist/vanta.rings.min')
        const RINGS = module.default
        
        if (!vantaRef.current || !mounted) return

        vantaEffect.current = RINGS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x071018
        })
        setVantaLoaded(true)
        console.info('Vanta RINGS initialized on Services section')
      } catch (err) {
        console.error('Vanta RINGS failed:', err)
        setVantaLoaded(true)
      }
    }

    setTimeout(initVanta, 250)

    return () => {
      mounted = false
      if (vantaEffect.current?.destroy) vantaEffect.current.destroy()
    }
  }, [])

  return (
    <section id="services" className={`services-section scroll-reveal ${vantaLoaded ? 'vanta-ready' : ''}`} ref={vantaRef}>
      <div className="container">
        <div className="section-header">
          <h2>Services</h2>
          <p className="section-subtitle">What I can build for you</p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <span className="service-icon">⚛️</span>
            <h3 className="service-title">Frontend Development</h3>
            <p className="service-desc">
              React, Next.js, and modern JavaScript frameworks. Responsive, accessible, and performant user interfaces.
            </p>
            <span className="service-arrow">→</span>
          </div>

          <div className="service-card">
            <span className="service-icon">🔧</span>
            <h3 className="service-title">Backend Development</h3>
            <p className="service-desc">
              Node.js, Express, RESTful APIs, and database design. Scalable server-side solutions.
            </p>
            <span className="service-arrow">→</span>
          </div>

          <div className="service-card">
            <span className="service-icon">🚀</span>
            <h3 className="service-title">Full Stack Solutions</h3>
            <p className="service-desc">
              End-to-end web applications from concept to deployment. MERN stack expertise.
            </p>
            <span className="service-arrow">→</span>
          </div>

          <div className="service-card">
            <span className="service-icon">🎨</span>
            <h3 className="service-title">UI/UX Design</h3>
            <p className="service-desc">
              User-centered design thinking. Creating intuitive and beautiful digital experiences.
            </p>
            <span className="service-arrow">→</span>
          </div>
        </div>
      </div>
    </section>
  )
}

