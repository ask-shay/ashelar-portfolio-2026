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
          backgroundColor: 0x071018
        })
        setVantaLoaded(true)
        console.info('Vanta DOTS initialized on About section')
      } catch (err) {
        console.error('Vanta DOTS failed:', err)
        setVantaLoaded(true)
      }
    }

    setTimeout(initVanta, 200)

    return () => {
      mounted = false
      if (vantaEffect.current?.destroy) vantaEffect.current.destroy()
    }
  }, [])

  return (
    <section id="about" className={`about-section scroll-reveal ${vantaLoaded ? 'vanta-ready' : ''}`} ref={vantaRef}>
      <div className="container">
        <div className="section-intro">
          <h2 className="section-title">Philosophy</h2>
          <p className="section-subtitle">My approach to building meaningful digital experiences</p>
        </div>

        <div className="philosophy-block">
          <p className="philosophy-text">
            I believe in crafting software that not only functions flawlessly but also creates genuine value for users. 
            Every line of code is an opportunity to solve real problems, enhance experiences, and push the boundaries of what's possible.
          </p>
        </div>

        <div className="principles-grid">
          <div className="principle-card">
            <span className="principle-number">01</span>
            <h3 className="principle-title">User-Centric Design</h3>
            <p className="principle-desc">
              Every decision starts with the user. Understanding their needs, pain points, and goals drives the development process.
            </p>
          </div>

          <div className="principle-card">
            <span className="principle-number">02</span>
            <h3 className="principle-title">Clean & Scalable</h3>
            <p className="principle-desc">
              Code should be maintainable, readable, and built to grow. Architecture matters as much as functionality.
            </p>
          </div>

          <div className="principle-card">
            <span className="principle-number">03</span>
            <h3 className="principle-title">Continuous Learning</h3>
            <p className="principle-desc">
              Technology evolves rapidly. Staying curious and adapting to new tools and methodologies is essential.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}



