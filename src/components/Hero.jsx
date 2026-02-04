import React, { useEffect, useState, useRef } from 'react'
import * as THREE from 'three'

export default function Hero({ onStoryClick }){
  const vantaRef = useRef(null)
  const vantaEffect = useRef(null)
  const [vantaLoaded, setVantaLoaded] = useState(false)

  // Initialize Vanta effect - FOG on mobile, HALO on desktop
  useEffect(()=>{
    let mounted = true
    async function initVanta(){
      try{
        // Ensure THREE is loaded before initializing Vanta
        if (!THREE || !THREE.PerspectiveCamera) {
          console.warn('THREE.js not fully loaded, skipping Vanta initialization')
          setVantaLoaded(true)
          return
        }

        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
        
        if (isMobile) {
          // Use FOG for mobile
          const module = await import('vanta/dist/vanta.fog.min')
          const FOG = module.default
          if(!vantaRef.current || !mounted) return

          // Use a cooler cyan/teal fog on mobile so hero name remains readable
          vantaEffect.current = FOG({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: false,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x06b6d4,
            backgroundColor: 0x041220,
            showDots: false,
            maxDistance: 30.0,
            speed: 0.9
          })
          setVantaLoaded(true)
          console.info('Vanta FOG initialized on Hero section (mobile)')
        } else {
          // Use HALO for desktop
          const module = await import('vanta/dist/vanta.halo.min')
          const HALO = module.default
          if(!vantaRef.current || !mounted) return

          vantaEffect.current = HALO({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x071018,
            baseColor: 0x06b6d4,
            amplitudeFactor: 1.5,
            xyFrequency: 0.5,
            zFrequency: 0.5
          })
          setVantaLoaded(true)
          console.info('Vanta HALO initialized on Hero section (desktop)')
        }
      }catch(err){
        console.error('Vanta initialization failed:', err)
        setVantaLoaded(true)
      }
    }
    
    // Delay to ensure THREE.js is fully loaded
    setTimeout(initVanta, 200)
    
    return ()=>{
      mounted = false
      if(vantaEffect.current?.destroy) vantaEffect.current.destroy()
    }
  },[])

  const scrollToNext = () => {
    const el = document.getElementById('about') || document.getElementById('projects')
    if (el && window.lenis) {
      window.lenis.scrollTo(el, {
        offset: -20,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleResumeDownload = () => {
    const link = document.createElement('a')
    link.href = '/assets/resume.pdf'
    link.download = 'Akshay_Shelar_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      {/* Hero Section */}
      <section className={`hero premium hero-minimal ${vantaLoaded ? 'vanta-ready' : ''}`} id="hero" ref={vantaRef} aria-label="Introduction">
        <div className="hero-social" aria-hidden>
          <a className="social-link" href="https://github.com/ask-shay" target="_blank" rel="noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" className="social-icon" xmlns="http://www.w3.org/2000/svg" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M12 .5C5.73.5.88 5.35.88 11.62c0 4.77 3.09 8.81 7.38 10.24.54.1.74-.23.74-.51 0-.25-.01-.92-.01-1.8-3 .65-3.63-1.45-3.63-1.45-.49-1.25-1.2-1.58-1.2-1.58-.98-.67.07-.66.07-.66 1.08.08 1.65 1.11 1.65 1.11.96 1.65 2.51 1.18 3.12.9.1-.71.38-1.18.69-1.45-2.4-.27-4.93-1.2-4.93-5.33 0-1.18.42-2.15 1.11-2.91-.11-.27-.48-1.38.11-2.88 0 0 .91-.29 2.98 1.11a10.37 10.37 0 012.71-.37c.92.01 1.85.12 2.71.37 2.07-1.4 2.98-1.11 2.98-1.11.59 1.5.22 2.61.11 2.88.69.76 1.11 1.73 1.11 2.91 0 4.14-2.54 5.05-4.96 5.32.39.34.74 1.02.74 2.06 0 1.49-.01 2.69-.01 3.06 0 .28.19.62.75.51 4.29-1.43 7.38-5.47 7.38-10.24C23.12 5.35 18.27.5 12 .5z" fill="currentColor"/></svg>
          </a>

          <a className="social-link" href="https://www.linkedin.com/in/ask-shay/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="social-icon"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6C1.1 6 0 4.88 0 3.5C0 2.12 1.1 1 2.48 1C3.86 1 4.98 2.12 4.98 3.5ZM0.39 8.98H4.57V24H0.39V8.98ZM8.57 8.98H12.39V11.06C12.98 10.03 14.48 8.86 16.87 8.86C21.01 8.86 22 11.33 22 15.11V24H17.82V15.98C17.82 13.7 17.6 11.4 14.98 11.4C12.32 11.4 11.92 13.28 11.92 15.82V24H8.57V8.98Z" fill="currentColor"/></svg>
          </a>

          <a className="social-link" href="https://www.instagram.com/akshay__shelar_" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" className="social-icon" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm8.5 1.5h-8.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5A4.25 4.25 0 0020.5 16.25v-8.5A4.25 4.25 0 0016.25 3.5zM12 7a5 5 0 110 10 5 5 0 010-10zm6.5-2.5a1 1 0 11-2 0 1 1 0 012 0z" fill="currentColor"/></svg>
          </a>
        </div>
        <div className="hero-content">
          <div className="container hero-center">
            
            {/* Name introduction */}
            <div className="hero-intro">Hi, I'm</div>

            {/* Name - prominent */}
            <h1 className="hero-name">Akshay Shelar</h1>

            {/* Main tagline */}
            <h2 className="hero-tagline">Software Engineer (Full Stack)</h2>
            
            {/* Social icons removed from Hero - use header social links instead */}

            {/* Rotating Resume Download Indicator - Bottom Right */}
            <div className="story-spinner" onClick={handleResumeDownload} role="button" aria-label="Download Resume">
              <div className="spinner-ring"></div>
              <div className="spinner-center">
                <span className="spinner-center-text">Download Resume</span>
              </div>
            </div>
        </div>
      </div>
      </section>

      {/* story moved to dedicated `Journey` component */}
    </>
  )
}
