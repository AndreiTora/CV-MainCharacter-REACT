export default function About({ about, strengths = [], softSkills = [] }) {
  return (
    <section className="about">
      <h2>Sobre mí</h2>
      <p>{about}</p>
      {(strengths.length > 0 || softSkills.length > 0) && (
        <div className="highlights-grid">
          {strengths.length > 0 && (
            <div className="strengths-section">
              <h3>Fortalezas</h3>
              <ul className="strengths-list">
                {strengths.map((strength) => (
                  <li key={strength}>{strength}</li>
                ))}
              </ul>
            </div>
          )}
          {softSkills.length > 0 && (
            <div className="strengths-section">
              <h3>Soft skills</h3>
              <ul className="strengths-list">
                {softSkills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
