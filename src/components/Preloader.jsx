import React, { useEffect, useState } from 'react'

export default function Preloader({ onFinish, duration = 2500 }) {
  const [progress, setProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show content after a brief delay
    const showTimer = setTimeout(() => setShowContent(true), 150)

    // Progress animation
    const startTime = Date.now()
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min(100, (elapsed / duration) * 100)
      setProgress(newProgress)
    }, 16) // ~60fps

    // Finish callback
    const finishTimer = setTimeout(() => {
      onFinish && onFinish()
    }, duration)

    return () => {
      clearTimeout(showTimer)
      clearInterval(progressInterval)
      clearTimeout(finishTimer)
    }
  }, [onFinish, duration])

  return (
    <div className="preloader" role="status" aria-label="Loading">
      {/* Elegant background gradient */}
      <div className="preloader-bg-gradient"></div>
      
      {/* Subtle grid pattern */}
      <div className="preloader-grid"></div>

      {/* Main content */}
      <div className={`preloader-content ${showContent ? 'visible' : ''}`}>
        {/* Elegant initials monogram */}
        <div className="preloader-monogram">
          <div className="monogram-circle">
            <span className="monogram-text">AS</span>
            <div className="monogram-ring"></div>
            <div className="monogram-glow"></div>
          </div>
        </div>

        {/* Minimal progress indicator */}
        <div className="preloader-progress-wrapper">
          <div className="preloader-progress-track">
            <div 
              className="preloader-progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="preloader-progress-text">{Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  )
}
