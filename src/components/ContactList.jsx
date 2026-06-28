export default function ContactList({ location, email, linkedin, github }) {
  return (
    <div className="profile-contact">
      <div className="contact-item contact-location">📍 {location}</div>
      <div className="contact-item contact-email">📧 <a href={`mailto:${email}`}>{email}</a></div>
      <div className="contact-item contact-link">
        <svg className="contact-icon" width="20" height="20" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
          <rect width="8" height="8" fill="#0A66C2"/>
          <rect x="1" y="1" width="2" height="2" fill="#fff"/>
          <rect x="1" y="4" width="2" height="3" fill="#fff"/>
          <rect x="4" y="1" width="3" height="3" fill="#fff"/>
        </svg>
        <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
      <div className="contact-item contact-link">
        <svg className="contact-icon" width="20" height="20" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
          <rect width="8" height="8" fill="#333"/>
          <path d="M1 1h1v1H1V1M2 2h1v4H2V2M4 1h2v1H4V1M6 2v4h1V2H6M2 6h4v1H2V6" fill="#fff"/>
        </svg>
        <a href={github} target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
  );
}
