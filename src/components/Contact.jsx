import React from 'react'

export default function Contact() {

  return (
    <div className="contact-wrap-container">
      <div className="container">
        <div className="section-intro">
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-subtitle">Have a project in mind or want to collaborate? Reach out — I'd love to hear from you.</p>
        </div>
      </div>
      <div className="contact-wrap contact-inner">
        <div className="contact-content">

          <div className="contact-methods">
            <div className="contact-method">
              <div className="method-content">
                <h3>Email</h3>
                <p className="method-text">The best way to reach me — drop a message with details.</p>
                <a href="mailto:7akshayshelar@gmail.com" className="method-link">
                  7akshayshelar@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-method">
              <div className="method-content">
                <h3>LinkedIn</h3>
                <p className="method-text">Connect with me for professional updates and opportunities.</p>
                <a href="https://www.linkedin.com/in/ask-shay/" target="_blank" rel="noreferrer" className="method-link">
                  Visit Profile
                </a>
              </div>
            </div>

            <div className="contact-method">
              <div className="method-content">
                <h3>GitHub</h3>
                <p className="method-text">Explore code samples, projects and contributions.</p>
                <a href="https://github.com/ask-shay" target="_blank" rel="noreferrer" className="method-link">
                  View Repositories
                </a>
              </div>
            </div>
          </div>
        </div>

        <aside className="contact-info">
          <div className="info-card">
            <div className="info-card-content">
              <div className="info-block">
                <h4 className="info-title">Availability</h4>
                <p className="info-text">Open for Full Stack roles, freelance & contract work. Based in Mumbai — open to remote & travel.</p>
              </div>

              <div className="info-block">
                <h4 className="info-title">Quick Facts</h4>
                <ul className="info-list">
                  <li>Full Stack Developer</li>
                  <li>React & Node.js Specialist</li>
                  <li>4+ Years Experience</li>
                  <li>Building scalable solutions</li>
                </ul>
              </div>

              <div className="info-block">
                <h4 className="info-title">Response Time</h4>
                <p className="info-text">I typically respond to inquiries within 24 hours. For urgent matters, prefer email with "URGENT" in subject.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
