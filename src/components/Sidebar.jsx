import React, { useState, useEffect, useRef } from 'react'

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)
  const activeSectionRef = useRef('')
  const scrollProgressRef = useRef(0)
  const rafIdRef = useRef(null)

  const sections = [
    { id: 'hero', label: 'Home', icon: '⌂', color: '#06b6d4' },
    { id: 'about', label: 'Philosophy', icon: '💡', color: '#06b6d4' },
    { id: 'services', label: 'Services', icon: '⚙️', color: '#8b5cf6' },
    { id: 'experience', label: 'Experience', icon: '📊', color: '#8b5cf6' },
    { id: 'journey', label: 'My Journey', icon: '🧭', color: '#06b6d4' },
    { id: 'projects', label: 'Projects', icon: '🚀', color: '#06b6d4' },
    { id: 'contact', label: 'Contact', icon: '✉️', color: '#8b5cf6' }
  ]

  // Inline SVG icons (professional, scalable)
  const ICONS = {
    hero: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    about: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M9 9a3 3 0 116 0c0 1.657-1.343 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 17v.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    services: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M21 12.7v-1.4l-2.1-.3a7.2 7.2 0 00-.5-1.2l1.2-1.8-1-1-1.8 1.2a7.2 7.2 0 00-1.2-.5L12.7 3h-1.4l-.3 2.1c-.4.1-.8.3-1.2.5L7 4.4 6 5.4l1.2 1.8c-.2.4-.4.8-.5 1.2L3 11.3v1.4l2.1.3c.1.4.3.8.5 1.2L4.4 16l1 1 1.8-1.2c.4.2.8.4 1.2.5L11.3 21h1.4l.3-2.1c.4-.1.8-.3 1.2-.5l1.8 1.2 1-1-1.2-1.8c.2-.4.4-.8.5-1.2L21 12.7z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    experience: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 3h18v18H3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 14l3-3 4 4 5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    projects: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    journey: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 12h4l2-3 4 6 6-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="5" cy="12" r="1.2" fill="currentColor" />
        <circle cx="11" cy="15" r="1.2" fill="currentColor" />
        <circle cx="17" cy="6" r="1.2" fill="currentColor" />
      </svg>
    ),
    contact: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }

  // Detect which section is in view - optimized to prevent flickering
  useEffect(() => {
    // Throttle updates using requestAnimationFrame
    const updateScrollState = ({ scroll, limit, velocity, direction, progress }) => {
      // Cancel any pending RAF
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }

      rafIdRef.current = requestAnimationFrame(() => {
        // Use Lenis scroll value if available, otherwise fallback to window.scrollY
        const scrollY = window.lenis ? scroll : window.scrollY
        const scrollPosition = scrollY + window.innerHeight / 3
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const newScrollProgress = Math.max(0, Math.min(100, (scrollY / docHeight) * 100))
        
        // Only update progress if changed significantly (reduce re-renders)
        if (Math.abs(newScrollProgress - scrollProgressRef.current) > 0.5) {
          scrollProgressRef.current = newScrollProgress
          setScrollProgress(newScrollProgress)
        }

        // Find active section
        let newActiveSection = ''
        let foundSection = false
        
        for (let section of sections) {
          const element = document.getElementById(section.id)
          if (element) {
            const { offsetTop, offsetHeight } = element
            // Check if section is in the viewport
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              newActiveSection = section.id
              foundSection = true
              break
            }
          }
        }
        
        // If no section found in viewport, set to first section that's below scroll
        if (!foundSection) {
          for (let section of sections) {
            const element = document.getElementById(section.id)
            if (element && element.offsetTop > scrollPosition) {
              newActiveSection = section.id
              break
            }
          }
        }

        // Only update state if section actually changed (prevents flickering)
        if (newActiveSection && newActiveSection !== activeSectionRef.current) {
          activeSectionRef.current = newActiveSection
          setActiveSection(newActiveSection)
        }
      })
    }

    // Use Lenis scroll event if available
    if (window.lenis) {
      window.lenis.on('scroll', updateScrollState)
      updateScrollState({ scroll: window.lenis.scroll }) // Call once on mount
      return () => {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current)
        }
        if (window.lenis) {
          window.lenis.off('scroll', updateScrollState)
        }
      }
    } else {
      // Fallback to native scroll with throttling
      let ticking = false
      const handleNativeScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateScrollState({ scroll: window.scrollY })
            ticking = false
          })
          ticking = true
        }
      }
      window.addEventListener('scroll', handleNativeScroll, { passive: true })
      handleNativeScroll() // Call once on mount
      return () => {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current)
        }
        window.removeEventListener('scroll', handleNativeScroll)
      }
    }
  }, []) // Empty dependency array - only run once

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element && window.lenis) {
      // Update ref immediately to prevent flickering during scroll
      activeSectionRef.current = id
      setActiveSection(id)
      window.lenis.scrollTo(element, {
        offset: -20,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    } else if (element) {
      activeSectionRef.current = id
      setActiveSection(id)
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <aside className="sidebar">
      {/* SVG Gradient Definition */}
      <svg style={{ display: 'none' }}>
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>

      <nav className="sidebar-nav">
        <div className="sidebar-container">
          {sections.map((section, idx) => (
            <button
              key={section.id}
              className={`sidebar-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => scrollToSection(section.id)}
              title={section.label}
              aria-label={`Navigate to ${section.label}`}
              style={{
                '--delay': `${idx * 0.05}s`,
                '--color': section.color
              }}
            >
              <span className="sidebar-icon-wrapper">
                {ICONS[section.id]}
                <span className="sidebar-glow"></span>
              </span>
              <span className="sidebar-label"><span className="sparkle-text">{section.label}</span></span>
            </button>
          ))}
        </div>
      </nav>

      {/* Progress circle */}
      <div className="sidebar-progress-ring">
        <svg className="progress-svg" viewBox="0 0 36 36">
          <circle className="progress-bg" cx="18" cy="18" r="16" />
          <circle 
            className="progress-fill" 
            cx="18" 
            cy="18" 
            r="16"
            style={{ '--progress': `${scrollProgress}%` }}
          />
        </svg>
        <div className="progress-text">{Math.round(scrollProgress)}%</div>
      </div>
    </aside>
  )
}

