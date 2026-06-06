export default function ProfileHeader({ name, title }) {
  return (
    <div className="profile-header">
      <h1>{name}</h1>
      <p className="profile-title">{title}</p>
    </div>
  );
}
