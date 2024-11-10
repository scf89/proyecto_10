

import "./Home.css";
import { apiFetch } from "../../api/api";


export const Home = async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  // Realizamos el fetch a la API de eventos
  const data = await apiFetch("events");

  // Obtenemos los eventos
  const eventos = data;
  console.log(eventos);

  // Pintamos los eventos
  pintarEventos(eventos, main);
};

export const pintarEventos = (eventos, elementoPadre) => {
  const divEventos = document.createElement("div");
  divEventos.className = "eventos";
  for (const evento of eventos) {
    const divEvento = document.createElement("div");
    const titulo = document.createElement("h3");
    const fecha = document.createElement("p");
    const descripcion = document.createElement("p");
    const caratula = document.createElement("img");
    const info = document.createElement("div");

    const user = JSON.parse(localStorage.getItem("user"));
    let like;
    if(user){
      // Agregar asistencia a evento
      like = document.createElement("img");
      like.className = "like";


      // Aquí puedes personalizar si el usuario ya asiste al evento
      console.log(user);
      if (user.eventsAttending?.includes(evento._id)) {
        like.src = "/assets/relleno-like.png";
        like.addEventListener("click", () => removeAsistencia(evento._id));
      } else {
        like.src = "/assets/like.png";
        like.addEventListener("click", () => addAsistencia(evento._id));
    }
    }


    divEvento.className = "evento";
    titulo.textContent = evento.title;
    fecha.textContent = `Fecha: ${new Date(evento.date).toLocaleDateString()}`;
    descripcion.textContent = evento.description;
    caratula.src = evento.image || "/assets/default-event.jpg";  // Imagen de evento
    info.innerHTML = `
      <p>${evento.address || "Ubicación no disponible"}</p>   
    `;

    divEvento.append(titulo, fecha, descripcion, caratula, info);
    if (like) divEvento.append(like);
    divEventos.append(divEvento);
  }

  elementoPadre.append(divEventos);
};



const addAsistencia = async (idEvento) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    // Usamos `apiFetch` con los parámetros necesarios
    const updatedUser = await apiFetch(`eventuser/${idEvento}/attendees`, "PATCH", null, localStorage.getItem("token"));

    // Actualizamos el usuario en localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Asistencia añadida exitosamente al evento.");

    Home(); // Redirigimos o actualizamos la vista
  } catch (error) {
    console.error("Error en la petición:", error);
    alert("Hubo un error al procesar la asistencia.");
  }
};

const removeAsistencia = async (idEvento) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    // Usamos `apiFetch` para eliminar al usuario de la lista de asistentes del evento
    const updatedUser = await apiFetch(`eventuser/${idEvento}/attendees`, "DELETE", null, localStorage.getItem("token"));

    // Actualizamos el usuario en localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Asistencia eliminada exitosamente del evento.");
    Home(); // Recargar los eventos para reflejar el cambio
  } catch (error) {
    console.error("Error en la petición:", error);
    alert("Hubo un error al eliminar la asistencia.");
  }
};






