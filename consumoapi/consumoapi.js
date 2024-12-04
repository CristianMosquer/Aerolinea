document.addEventListener("DOMContentLoaded", () => {
  const apiSelector = document.getElementById("apiUrl");
  const form = document.getElementById("tripulacionForm");
  const table = document
    .getElementById("tripulacionTable")
    .getElementsByTagName("tbody")[0];

  function getApiUrl() {
    return apiSelector.value;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const cedula = document.getElementById("cedula").value;
    const puesto = document.getElementById("puesto").value;
    const idVuelo = document.getElementById("idVuelo").value;

    try {
      console.log("Enviando datos:", { cedula, puesto, idVuelo });
      const response = await fetch(getApiUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ cedula, puesto, idVuelo }),
      });

      console.log("Status:", response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error response:", errorData);
        throw new Error(
          `Error al agregar tripulación: ${response.status} ${errorData}`
        );
      }

      const newTripulacion = await response.json();
      console.log("Tripulación agregada:", newTripulacion);
      addTripulacionToTable(newTripulacion);
      form.reset();
    } catch (error) {
      console.error("Error detallado:", error);
      alert(`Error: ${error.message}`);
    }
  }

  async function loadTripulaciones() {
    try {
      console.log("Cargando tripulaciones desde:", getApiUrl());
      const response = await fetch(getApiUrl(), {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Status de carga:", response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error en respuesta:", errorData);
        throw new Error(
          `Error al cargar tripulaciones: ${response.status} ${errorData}`
        );
      }

      const tripulaciones = await response.json();
      console.log("Tripulaciones cargadas:", tripulaciones);

      table.innerHTML = "";
      tripulaciones.forEach(addTripulacionToTable);
    } catch (error) {
      console.error("Error detallado:", error);
      alert(`Error al cargar datos: ${error.message}`);
    }
  }

  function addTripulacionToTable(tripulacion) {
    const row = table.insertRow();
    row.innerHTML = `
            <td>${tripulacion.id || ""}</td>
            <td>${tripulacion.cedula || ""}</td>
            <td>${tripulacion.puesto || ""}</td>
            <td>${tripulacion.idVuelo || ""}</td>
            <td>
                <button onclick="deleteTripulacion('${tripulacion.id}')" 
                        class="delete-btn">Eliminar</button>
            </td>
        `;
  }

  window.deleteTripulacion = async function (id) {
    if (!id) {
      console.error("ID no válido para eliminar");
      return;
    }

    try {
      console.log("Eliminando tripulación:", id);
      const response = await fetch(`${getApiUrl()}/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Status de eliminación:", response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error en respuesta:", errorData);
        throw new Error(`Error al eliminar: ${response.status} ${errorData}`);
      }

      loadTripulaciones();
    } catch (error) {
      console.error("Error detallado:", error);
      alert(`Error al eliminar: ${error.message}`);
    }
  };

  form.addEventListener("submit", handleSubmit);
  apiSelector.addEventListener("change", loadTripulaciones);

  console.log("Iniciando carga de datos...");
  loadTripulaciones();
});
