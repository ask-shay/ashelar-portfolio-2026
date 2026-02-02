import React, { useEffect } from 'react'

export default function Preloader({ onFinish, duration = 2500 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish && onFinish()
    }, duration)

    return () => clearTimeout(timer)
  }, [onFinish, duration])

  return (
    <div className="preloader" role="status" aria-label="Loading">
      <div className="preloader-loader">
        <div className="loader-ring">
          <div className="ring-segment"></div>
          <div className="ring-segment"></div>
          <div className="ring-segment"></div>
          <div className="ring-segment"></div>
        </div>
        <div className="loader-center"></div>
      </div>
    </div>
  )
}
