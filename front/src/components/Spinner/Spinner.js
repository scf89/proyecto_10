// src/components/Spinner/Spinner.js
import "./Spinner.css";

export const Spinner = () => {
  const spinner = document.createElement("div");
  spinner.className = "spinner";
  return spinner;
};

// Función para mostrar el spinner en un elemento padre específico
export const showSpinner = (parentElement) => {
    const spinner = Spinner();
    spinner.classList.add("spinner-active");
    parentElement.appendChild(spinner);
  };
  
  // Función para ocultar el spinner del elemento padre
  export const hideSpinner = (parentElement) => {
    const spinner = parentElement.querySelector(".spinner-active");
    if (spinner) {
      spinner.remove();
    }
  };