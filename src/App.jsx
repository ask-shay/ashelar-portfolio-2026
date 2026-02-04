import React, {useState, useEffect, useRef} from 'react'
import Lenis from 'lenis'
import './App.css'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Experience from './components/Experience'
import Journey from './components/Journey'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import FixedSocialButton from './components/FixedSocialButton'

function App() {
  const [ready, setReady] = useState(false)
  const lenisRef = useRef(null)

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    if (!ready) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Make Lenis available globally for other components
    window.lenis = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle scroll reveal animations
    const handleScroll = ({ scroll, limit, velocity, direction, progress }) => {
      const reveals = document.querySelectorAll('.scroll-reveal')
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const inView = rect.top < window.innerHeight * 0.85
        if (inView) el.classList.add('revealed')
      })
    }

    lenis.on('scroll', handleScroll)
    handleScroll({ scroll: 0 }) // Call once on mount

    return () => {
      lenis.destroy()
      delete window.lenis
    }
  }, [ready])

  return (
    <>
      <Sidebar />
      
      <div className={`site-root ${ready? 'ready':''}`}>
        {!ready && <Preloader onFinish={() => setReady(true)} />}
      <main>
        <Hero />
        <FixedSocialButton />
        <About />
        <Services />
        <Experience />
        <Journey />
        <Projects />
        
        <section className="container contact-section scroll-reveal" id="contact">
          <Contact />
        </section>
      </main>
        <Footer />
      </div>
    </>
  )
}

export default App
