export default function Studies({ studies = [], certificates = [] }) {
  return (
    <section className="profile-study-section">
      <h2>Estudios y certificados</h2>
      {studies.map(({ degree, institution }) => (
        <div key={`${degree}-${institution}`} className="study-item">
          <strong>{degree}</strong>
          <p>{institution}</p>
        </div>
      ))}
      <div className="certificates-section">
        <h3>Certificados / Cursos</h3>
        <ul className="certificates-list">
          {certificates.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
