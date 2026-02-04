import React, { useState } from 'react'

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const experiences = [
    {
      company: 'Tecogis',
      role: 'Full Stack Developer',
      period: 'Jan 2024 - Present',
      location: 'Mumbai, India',
      icon: '💼',
      color: '#06b6d4',
      bullets: [
        'Built real-time, production-grade platforms using MERN, Socket.IO, and Docker',
        'Developed a multiplayer card game with live gameplay, analytics, and QR-based interactions',
        'Designed secure internal systems for diamond trading, including RFID audits, billing, and reporting',
        'Implemented role-based access control, JWT authentication, and scalable REST APIs',
        'Delivered event and vendor management systems with real-time dashboards and access tracking'
      ]
    },
    {
      company: 'Uniton India',
      role: 'Founder & Full Stack Developer',
      period: 'Jun 2020 - Feb 2023',
      location: 'Nashik, India',
      icon: '🚀',
      color: '#8b5cf6',
      bullets: [
        'Founded and built a MERN-stack e-commerce platform from concept to deployment',
        'Developed secure authentication, product management, and order workflows',
        'Implemented responsive UIs using React Hooks, Redux, and modern styling',
        'Managed inventory, logistics, and operational automation end-to-end'
      ]
    },
    {
      company: 'Patanjali & Cropinno',
      role: 'Project Coordinator',
      period: 'Aug 2021 - Dec 2021',
      location: 'India',
      icon: '📊',
      color: '#ec4899',
      bullets: [
        'Coordinated cross-organization delivery between Patanjali and Cropinno',
        'Managed requirements, timelines, cost estimates, and stakeholder communication',
        'Supported decision-making through structured reporting and presentations'
      ]
    }
  ]

  return (
    <section id="experience" className="container scroll-reveal experience-section">
      <div className="section-header">
        <h2>Work Experience</h2>
        <p className="section-subtitle">3+ years of building scalable solutions</p>
      </div>

      <div className="experience-list">
        {experiences.map((exp, index) => (
          <article
            key={index}
            className={`experience-card ${expandedIndex === index ? 'expanded' : ''}`}
            style={{ animationDelay: `${index * 0.15}s` }}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <div 
              className="exp-icon" 
              style={{ background: `linear-gradient(135deg, ${exp.color}22, ${exp.color}08)` }}
            >
              <span>{exp.icon}</span>
            </div>
            <div className="exp-header">
              <div className="exp-title-block">
                <h3 className="exp-role">{exp.role}</h3>
                <p className="exp-company">{exp.company}</p>
                <p className="exp-location">{exp.location}</p>
              </div>
              <div className="exp-period">{exp.period}</div>
            </div>
            <div className="exp-content">
              <ul className="exp-bullets">
                {exp.bullets.map((bullet, bulletIndex) => (
                  <li 
                    key={bulletIndex} 
                    className="list-item"
                    style={{ animationDelay: `${index * 0.15 + bulletIndex * 0.05}s` }}
                  >
                    <span className="bullet-icon">▸</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="exp-indicator">
              <span>{expandedIndex === index ? '−' : '+'}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}




