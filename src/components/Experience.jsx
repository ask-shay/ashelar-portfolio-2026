import React, { useState } from 'react'

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const experiences = [
    {
      icon: '💼',
      role: 'Full Stack Developer',
      company: 'Tech Solutions Inc.',
      location: 'Mumbai, India',
      period: '2022 - Present',
      bullets: [
        'Developed and maintained full-stack web applications using React, Node.js, and MongoDB',
        'Implemented RESTful APIs and integrated third-party services',
        'Collaborated with cross-functional teams to deliver high-quality software solutions',
        'Optimized application performance and improved user experience'
      ]
    },
    {
      icon: '🚀',
      role: 'Frontend Developer',
      company: 'Digital Agency',
      location: 'Remote',
      period: '2021 - 2022',
      bullets: [
        'Built responsive and interactive user interfaces using React and modern CSS',
        'Worked on multiple client projects with tight deadlines',
        'Implemented design systems and component libraries',
        'Improved website performance and accessibility standards'
      ]
    },
    {
      icon: '🎓',
      role: 'Software Engineering Intern',
      company: 'Startup Hub',
      location: 'Mumbai, India',
      period: '2020 - 2021',
      bullets: [
        'Learned full-stack development fundamentals',
        'Contributed to open-source projects',
        'Participated in code reviews and team meetings',
        'Gained experience with version control and agile methodologies'
      ]
    }
  ]

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section id="experience" className="experience-section scroll-reveal">
      <div className="container">
        <div className="section-header">
          <h2>Work Experience</h2>
          <p className="section-subtitle">My professional journey</p>
        </div>

        <div className="experience-list">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`experience-card ${expandedIndex === index ? 'expanded' : ''}`}
              onClick={() => toggleExpanded(index)}
            >
              <div className="exp-icon">{exp.icon}</div>
              <div className="exp-header">
                <div className="exp-title-block">
                  <h3 className="exp-role">{exp.role}</h3>
                  <p className="exp-company">{exp.company}</p>
                  <p className="exp-location">{exp.location}</p>
                </div>
                <div className="exp-period">{exp.period}</div>
              </div>
              <div className="exp-indicator">+</div>
              <div className="exp-content">
                <ul className="exp-bullets">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>
                      <span className="bullet-icon">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



