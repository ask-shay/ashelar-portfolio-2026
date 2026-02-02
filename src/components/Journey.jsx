import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function Journey() {
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

        const module = await import('vanta/dist/vanta.globe.min')
        const GLOBE = module.default
        
        if (!vantaRef.current || !mounted) return

        vantaEffect.current = GLOBE({
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
        console.info('Vanta GLOBE initialized on Journey section')
      } catch (err) {
        console.error('Vanta GLOBE failed:', err)
        setVantaLoaded(true)
      }
    }

    setTimeout(initVanta, 300)

    return () => {
      mounted = false
      if (vantaEffect.current?.destroy) vantaEffect.current.destroy()
    }
  }, [])

  const journeyNodes = [
    {
      side: 'left',
      title: 'The Beginning',
      period: '2020',
      description: 'Started my journey in software development with curiosity and determination.'
    },
    {
      side: 'right',
      title: 'First Steps',
      period: '2021',
      description: 'Learned the fundamentals of web development and built my first projects.'
    },
    {
      side: 'left',
      title: 'Growth Phase',
      period: '2022',
      description: 'Expanded skills in full-stack development and worked on real-world projects.'
    },
    {
      side: 'right',
      title: 'Specialization',
      period: '2023',
      description: 'Focused on React, Node.js, and modern development practices.'
    },
    {
      side: 'left',
      title: 'Current Focus',
      period: '2024 - Present',
      description: 'Building scalable applications and continuously learning new technologies.'
    }
  ]

  return (
    <section id="journey" className={`story-section journey-section scroll-reveal ${vantaLoaded ? 'vanta-ready' : ''}`} ref={vantaRef}>
      <div className="container">
        <div className="section-header">
          <h2>My Journey</h2>
          <p className="section-subtitle">The path that led me here</p>
        </div>

        <div className="story-journey-map">
          <div className="journey-line"></div>
          
          {journeyNodes.map((node, index) => (
            <div
              key={index}
              className={`journey-node ${node.side} ${index === journeyNodes.length - 1 ? 'final' : ''}`}
            >
              <div className={`node-marker node-${index + 1} ${index === journeyNodes.length - 1 ? 'node-final' : ''}`}></div>
              <div className="node-content">
                <h3 className="node-title">{node.title}</h3>
                <div className="node-details">
                  <p>{node.period}</p>
                  <p className="node-description">{node.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

