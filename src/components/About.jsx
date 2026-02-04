import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function About() {
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

        const module = await import('vanta/dist/vanta.dots.min')
        const DOTS = module.default
        
        if (!vantaRef.current || !mounted) return

        vantaEffect.current = DOTS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x06b6d4,
          color2: 0x8b5cf6,
          backgroundColor: 0x071018,
          size: 3.5,
          spacing: 45
        })
        setVantaLoaded(true)
        console.info('Vanta DOTS initialized on About section')
      } catch (err) {
        console.error('Vanta DOTS failed:', err)
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
    <section id="about" className={`about-section scroll-reveal ${vantaLoaded ? 'vanta-ready' : ''}`} ref={vantaRef}>
      <div className="container">
        <div className="section-intro">
          <h2 className="section-title">My Philosophy</h2>
          <p className="section-subtitle">I focus on building software that is reliable, understandable, and easy to use.</p>
        </div>

        <div className="philosophy-block">
          <p className="philosophy-text">
            <strong>Clean architecture</strong> and thoughtful interfaces matter because they reduce friction — both for users today and for developers maintaining the system tomorrow.
          </p>
        </div>

        <div className="principles-grid">
          <div className="principle-card">
            <div className="principle-number">01</div>
            <h3 className="principle-title">Scalable Architecture</h3>
            <p className="principle-desc">
              Building systems that grow with your ambitions, not limiting factors.
            </p>
          </div>

          <div className="principle-card">
            <div className="principle-number">02</div>
            <h3 className="principle-title">Clean Code</h3>
            <p className="principle-desc">
              Clarity over cleverness, maintainable for years to come.
            </p>
          </div>

          <div className="principle-card">
            <div className="principle-number">03</div>
            <h3 className="principle-title">User-Centric Design</h3>
            <p className="principle-desc">
              Technology should serve people, not the other way around.
            </p>
          </div>

          <div className="principle-card">
            <div className="principle-number">04</div>
            <h3 className="principle-title">Production Ready</h3>
            <p className="principle-desc">
              Real solutions for real problems, not prototypes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}




