export default function ContactList({ location, email, linkedin, infojobs }) {
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
    </div>
  );
}
