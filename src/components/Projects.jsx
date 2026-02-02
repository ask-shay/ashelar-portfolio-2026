import React, {useEffect, useState, useRef} from 'react'
import * as THREE from 'three'
import Carousel3D from './Carousel3D'
import '../components/Carousel3D.css'

const ALL_PROJECTS = [
  // Side Projects - First Slider (Moving Right)
  {
    title: 'Uniton E-commerce App',
    type: 'side',
    role: 'Full Stack (MERN)',
    status: 'Live',
    desc: 'Feature-rich shopping platform with advanced categorization, responsive UI, and secure JWT-based auth.',
    isImageCarousel: true,
    hideIndicators: true,
    hideStatusOnHover: true,
    slideInterval: 3000,
    images: [
      '/assets/images/ui-1.png',
      '/assets/images/ui-2.png',
      '/assets/images/ui-3.png',
      '/assets/images/ui-4.png'
    ],
    tech: ['React','Redux','Node','Express','MongoDB'],
    link: 'https://github.com/ask-shay/Uniton'
  },
  {
    title: 'Iron Man 3D - Hand Gesture Control',
    type: 'side',
    role: 'Full Stack',
    status: 'Completed',
    desc: 'Realtime gameplay with Socket.IO, admin dashboards, and live broadcast overlays using Docker and APIs.',
    isImageCarousel: true,
    hideIndicators: true,
    hideStatusOnHover: true,
    slideInterval: 2500,
    images: [
      '/assets/images/iron-man-1.png',
      '/assets/images/iron-man-2.png',
      '/assets/images/iron-man-3.png'
    ],
    tech: ['Socket.IO','Node','Docker','React'],
    link: 'https://ironman-3d.netlify.app/'
  },
  {
    title: 'Syncfusion Dashboard',
    type: 'side',
    role: 'Frontend / Dashboard',
    status: 'Ongoing',
    desc: 'Interactive analytics dashboard with charts, calendar, kanban and theming options for admin users.',
    isImageCarousel: true,
    hideIndicators: true,
    hideStatusOnHover: true,
    slideInterval: 2800,
    images: [
      '/assets/images/sf-1.png',
      '/assets/images/sf-2.png',
      '/assets/images/sf-3.png'
    ],
    tech: ['React','Syncfusion','Charts','Redux'],
    link: 'https://github.com/ask-shay/Multi-Vision'
  },
  {
    title: '3D Galaxy - Hand Gesture Control',
    type: 'side',
    role: 'Frontend / 3D',
    status: 'Live',
    desc: 'Immersive 3D experience with neural interface and interactive 3D universe exploration.',
    isImageCarousel: true,
    hideIndicators: true,
    hideStatusOnHover: true,
    slideInterval: 3200,
    images: [
      '/assets/images/universe-1.jpg',
      '/assets/images/universe-2.png',
      '/assets/images/universe-3.png'
    ],
    tech: ['Three.js','React','WebGL'],
    link: 'https://3d-universe.netlify.app'
  },
  // Side Projects - Second Slider (Moving Left)
  {
    title: 'Chat Application',
    type: 'side',
    desc: 'Real-time messaging app with Socket.IO and user authentication.',
    isVideo: true,
    video: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerJoyrides.mp4',
    poster: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=500&q=80'
  },
  {
    title: 'Task Manager',
    type: 'side',
    desc: 'Collaborative task management with drag-and-drop kanban board.',
    isVideo: true,
    video: 'https://media.w3.org/cc0-video/big_buck_bunny_720p_30mb.mp4',
    poster: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=500&q=80'
  },
  {
    title: 'API Testing Tool',
    type: 'side',
    desc: 'Postman-like tool for testing REST APIs with request/response logs.',
    isVideo: true,
    video: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4',
    poster: 'https://images.unsplash.com/photo-1516321318423-f06f70d504d0?auto=format&fit=crop&w=500&q=80'
  },
  {
    title: 'QR Code Menu',
    type: 'side',
    desc: 'Digital menu system with QR code scanning for restaurants and hotels.',
    isImageCarousel: true,
    hideIndicators: true,
    hideStatusOnHover: true,
    slideInterval: 3500,
    images: [
      '/assets/images/hotel-1.png',
      '/assets/images/hotel-2.png',
      '/assets/images/hotel-3.png'
    ],
    tech: ['React','Node','QR Code','MongoDB'],
    link: 'https://hotel-yelkot.netlify.app/'
  }
]

const MAIN_PROJECTS = ALL_PROJECTS.filter(p => p.type === 'main')
const SIDE_PROJECTS_FIRST = ALL_PROJECTS.filter(p => p.type === 'side').slice(0, 4)
const SIDE_PROJECTS_SECOND = ALL_PROJECTS.filter(p => p.type === 'side').slice(4)

export default function Projects(){
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(3)
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

        const module = await import('vanta/dist/vanta.topology.min')
        const TOPOLOGY = module.default
        
        if (!vantaRef.current || !mounted) return

        vantaEffect.current = TOPOLOGY({
          el: vantaRef.current,
          THREE,
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
        console.info('Vanta TOPOLOGY initialized on Projects section')
      } catch (err) {
        console.error('Vanta TOPOLOGY failed:', err)
        setVantaLoaded(true)
      }
    }

    setTimeout(initVanta, 150)

    return () => {
      mounted = false
      if (vantaEffect.current?.destroy) vantaEffect.current.destroy()
    }
  }, [])

  useEffect(()=>{
    function onResize(){
      const w = window.innerWidth
      if(w > 1000) setVisible(3)
      else if(w > 700) setVisible(2)
      else setVisible(1)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return ()=> window.removeEventListener('resize', onResize)
  },[])

  const step = 100 / visible
  const maxIndex = Math.max(0, Math.ceil(MAIN_PROJECTS.length / visible) - 1)

  return (
    <section id="projects" className="projects-section" ref={vantaRef}>
      <div className="container">
        <div className="section-header">
          <h2>Projects</h2>
          <p className="section-subtitle">Featured work and side experiments</p>
        </div>

        {/* 3D Circular Carousel */}
        <Carousel3D projects={ALL_PROJECTS} />
      </div>
    </section>
  )
}
