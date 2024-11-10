import { Settings } from "../../pages/Settings/Settings";
import { Home } from "../../pages/Home/Home";
import { LoginRegister } from "../../pages/LoginRegister/LoginRegister";
import "./Header.css";

const routes = [
  {
    texto: "Home",
    funcion: Home,
  },
  {
    texto: "Settings",
    funcion: Settings,
  },
  {
    texto: "Login",
    funcion: LoginRegister,
  },
];

export const Header = () => {
  const header = document.querySelector("header");
  header.innerHTML = "";
  const nav = document.createElement("nav");

  // Limpiamos las clases 'active' antes de agregarla
  const setActiveLink = (activeText) => {
    const links = nav.querySelectorAll("a");
    links.forEach((link) => {
      if (link.textContent === activeText) {
        link.classList.add("active"); // Agregar la clase active
      } else {
        link.classList.remove("active"); // Eliminar la clase active de otros
      }
    });
  };

  for (const route of routes) {
    const a = document.createElement("a");
    a.href = "#";

    if (route.texto === "Login" && localStorage.getItem("token")) {
      a.textContent = "Logout";
      a.addEventListener("click", () => {
        localStorage.clear();
        Header();
        Home(); // Redirigir al Home después de logout
      });
    } else {
      if (!localStorage.getItem("token") && route.texto === "Settings") {
        // No permitir acceso a "Settings" si no hay token
      } else {
        a.textContent = route.texto;
        a.addEventListener("click", () => {
          route.funcion();
          setActiveLink(route.texto); // Cambiar la clase active cuando se haga clic
        });
      }
    }

    nav.append(a);
  }

  header.append(nav);

  // Configurar la sección activa cuando la página se cargue
  setActiveLink("Home"); // Definir Home como sección activa inicialmente si es necesario
};
