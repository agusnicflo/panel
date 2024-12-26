const FinalUserPage = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData) return <p>No hay datos disponibles</p>;

  return (
    <div>
      <h1>Interfaz del Usuario</h1>
      <h2>Silueta 1</h2>
      <img src={userData.silhouette1.profileImage} alt="Perfil" />
      <p>Redes Sociales: {userData.silhouette1.socialLinks.join(", ")}</p>
      <p>Horario: {userData.silhouette1.schedule.join(", ")}</p>
      <p>Botones: {userData.silhouette1.buttons.join(", ")}</p>
      {/* Similar para Silhouette2, Silhouette3, Silhouette4 */}
    </div>
  );
};

export default FinalUserPage;