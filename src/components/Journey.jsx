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
      id: 1,
      side: 'left',
      title: 'The Spark',
      subtitle: 'Curiosity-driven learning',
      description:
        'It began with a simple curiosity about how websites work. No formal degree—just a drive to explore, learn, and build.'
    },
    {
      id: 2,
      side: 'right',
      title: 'Learning by Building',
      subtitle: 'Hands-on experience',
      description:
        'I learned by building real projects—solving problems, shipping features, and learning what works in practice.'
    },
    {
      id: 3,
      side: 'left',
      title: 'Engineering Mindset',
      subtitle: 'Impact over credentials',
      description:
        'Effective engineering is measured by outcomes—reliable, maintainable systems that serve user and business needs.'
    },
    {
      id: 4,
      side: 'right',
      title: 'Full Stack Developer',
      subtitle: 'End-to-end system development',
      description:
        'I now work as a full stack developer, building end-to-end solutions—from backend services and distributed systems to clean, responsive interfaces.'
    },
    {
      id: 5,
      side: 'left',
      title: 'Now I Help Others',
      subtitle: 'Turning ideas into products',
      description:
        'I help teams and businesses turn ideas into production-ready software that supports users and business operations.'
    },
    {
      id: 6,
      side: 'right',
      title: 'Looking Ahead',
      subtitle: 'Built to grow',
      description:
        "Let's build something extraordinary together. I curate technology stacks and architect systems that solve today's problems and scale for tomorrow's growth.",
      isFinal: true
    }
  ];
  

  return (
    <section id="journey" className={`story-section ${vantaLoaded ? 'vanta-ready' : ''}`} ref={vantaRef}>
      <div className="container">
        <div className="story-header">
          <h2 className="story-title">My Journey</h2>
          <p className="story-subtitle">How I became a Full Stack Developer</p>
        </div>

        <div className="story-journey-map">
          <div className="journey-line"></div>
          
          {journeyNodes.map((node) => (
            <div
              key={node.id}
              className={`journey-node ${node.side} ${node.isFinal ? 'final' : ''}`}
            >
              <div className={`node-marker node-${node.id}`}></div>
              <div className="node-content">
                <h3 className="node-title">{node.title}</h3>
                <div className="node-details">
                  <p>{node.subtitle}</p>
                  <p className={node.isFinal ? 'final-message' : 'node-description'}>{node.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}




