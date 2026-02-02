import React, { useEffect, useState, useRef } from 'react'

// Automatic Image Carousel Component
function ImageCarousel({ images, title, hideIndicators = false, slideInterval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, slideInterval)

    return () => clearInterval(interval)
  }, [images, slideInterval])

  if (!images || images.length === 0) return null

  return (
    <div className="image-carousel-container">
      <div 
        className="image-carousel-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`
        }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="image-carousel-slide">
            <img src={img} alt={`${title} - Slide ${idx + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
      {!hideIndicators && (
        <div className="image-carousel-indicators">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`image-carousel-indicator ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Carousel3D({ projects }) {
  const [rotation, setRotation] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [targetRotation, setTargetRotation] = useState(0)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const containerRef = useRef(null)
  const scrollRef = useRef(0)
  const animationRef = useRef(null)
  const lastScrollRef = useRef(0)

  // Handle window resize to update radius
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleWheel = (e) => {
      // Only prevent default if scroll is on the container
      const container = containerRef.current
      if (container && container.contains(e.target)) {
        e.preventDefault()
        scrollRef.current += e.deltaY * 0.1
        setTargetRotation(scrollRef.current)
      }
    }

    // Handle global page scroll to rotate carousel
    const handlePageScroll = () => {
      const currentScroll = window.scrollY
      const scrollDelta = currentScroll - lastScrollRef.current
      
      if (scrollDelta !== 0) {
        // Scroll down = rotate right (positive), Scroll up = rotate left (negative)
        scrollRef.current += scrollDelta * 0.08
        setTargetRotation(scrollRef.current)
      }
      
      lastScrollRef.current = currentScroll
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }
    
    window.addEventListener('scroll', handlePageScroll, { passive: true })
    
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
      window.removeEventListener('scroll', handlePageScroll)
    }
  }, [])

  // Smooth animation loop
  useEffect(() => {
    const animate = () => {
      setRotation(prev => {
        const diff = targetRotation - prev
        return prev + diff * 0.1
      })
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [targetRotation])

  const handleArrowClick = (direction) => {
    const increment = direction === 'left' ? -30 : 30
    scrollRef.current += increment
    setTargetRotation(scrollRef.current)
  }

  // Responsive radius based on screen width
  const getRadius = () => {
    if (windowWidth < 480) return 280
    if (windowWidth < 768) return 320
    if (windowWidth < 1200) return 400
    return 480
  }

  const itemCount = projects.length
  const angleSlice = 360 / itemCount
  const radius = getRadius()

  return (
    <div className="carousel-3d-wrapper" ref={containerRef}>
      <div className="carousel-3d-container">
        <div
          className="carousel-3d-track"
          style={{
            transform: `rotateY(${rotation}deg)`
          }}
        >
          {projects.map((project, idx) => {
            const angle = (idx * angleSlice) * (Math.PI / 180)
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius

            const handleCardClick = () => {
              if (project.link) {
                window.open(project.link, '_blank', 'noopener,noreferrer')
              }
            }

            return (
              <div
                key={idx}
                className="carousel-3d-item"
                style={{
                  transform: `rotateY(${idx * angleSlice}deg) translateZ(${radius}px)`,
                  opacity: 1,
                  transition: 'opacity 0.3s ease'
                }}
              >
                <div className="carousel-3d-card" onClick={handleCardClick}>
                  <div className="carousel-3d-image">
                    {project.isImageCarousel ? (
                      <ImageCarousel 
                        images={project.images} 
                        title={project.title}
                        hideIndicators={project.hideIndicators}
                        slideInterval={project.slideInterval || 3000}
                      />
                    ) : project.isVideo ? (
                      <video
                        src={project.video}
                        poster={project.poster}
                        preload="auto"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => {
                          e.target.play().catch(err => console.log('Video play error:', err))
                        }}
                        onMouseLeave={(e) => {
                          e.target.pause()
                        }}
                        onError={(e) => {
                          console.error('Video load error:', project.video, e)
                        }}
                      />
                    ) : (
                      <img src={project.image} alt={project.title} loading="lazy" />
                    )}
                  </div>
                  <div className="carousel-3d-overlay">
                    <div className="carousel-3d-content">
                      <h3>{project.title}</h3>
                      {!project.link && (
                        <span className="carousel-3d-progress">Under Progress</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <button 
        className="carousel-3d-arrow carousel-3d-arrow-left" 
        onClick={() => handleArrowClick('left')}
        aria-label="Rotate left"
      >
        ←
      </button>

      <div className="carousel-3d-hint">
        <p>Scroll the page to rotate the carousel</p>
      </div>

      <button 
        className="carousel-3d-arrow carousel-3d-arrow-right" 
        onClick={() => handleArrowClick('right')}
        aria-label="Rotate right"
      >
        →
      </button>
    </div>
  )
}
