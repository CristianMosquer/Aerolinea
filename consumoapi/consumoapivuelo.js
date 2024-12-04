document.addEventListener("DOMContentLoaded", () => {
  const apiSelector = document.getElementById("apiUrl");
  const form = document.getElementById("vueloForm");
  const table = document
    .getElementById("vueloTable")
    .getElementsByTagName("tbody")[0];

  function getApiUrl() {
    return apiSelector.value;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const numeroVuelo = document.getElementById("numeroVuelo").value;
    const origen = document.getElementById("origen").value;
    const destino = document.getElementById("destino").value;
    const fechaSalida = document.getElementById("fechaSalida").value;
    const fechaLlegada = document.getElementById("fechaLlegada").value;

    try {
      console.log("Enviando datos:", {
        numeroVuelo,
        origen,
        destino,
        fechaSalida,
        fechaLlegada,
      });
      const response = await fetch(getApiUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          numeroVuelo,
          origen,
          destino,
          fechaSalida,
          fechaLlegada,
        }),
      });

      console.log("Status:", response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error response:", errorData);
        throw new Error(
          `Error al agregar vuelo: ${response.status} ${errorData}`
        );
      }

      const newVuelo = await response.json();
      console.log("Vuelo agregado:", newVuelo);
      addVueloToTable(newVuelo);
      form.reset();
    } catch (error) {
      console.error("Error detallado:", error);
      alert(`Error: ${error.message}`);
    }
  }

  async function loadVuelos() {
    try {
      console.log("Cargando vuelos desde:", getApiUrl());
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
          `Error al cargar vuelos: ${response.status} ${errorData}`
        );
      }

      const vuelos = await response.json();
      console.log("Vuelos cargados:", vuelos);

      table.innerHTML = "";
      vuelos.forEach(addVueloToTable);
    } catch (error) {
      console.error("Error detallado:", error);
      alert(`Error al cargar datos: ${error.message}`);
    }
  }

  function addVueloToTable(vuelo) {
    const row = table.insertRow();
    row.innerHTML = `
            <td>${vuelo._id || ""}</td>
            <td>${vuelo.numeroVuelo || ""}</td>
            <td>${vuelo.origen || ""}</td>
            <td>${vuelo.destino || ""}</td>
            <td>${new Date(vuelo.fechaSalida).toLocaleString() || ""}</td>
            <td>${new Date(vuelo.fechaLlegada).toLocaleString() || ""}</td>
            <td>
                <button onclick="deleteVuelo('${vuelo._id}')" 
                        class="delete-btn">Eliminar</button>
            </td>
        `;
  }

  window.deleteVuelo = async function (id) {
    if (!id) {
      console.error("ID no válido para eliminar");
      return;
    }

    try {
      console.log("Eliminando vuelo:", id);
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

      loadVuelos();
    } catch (error) {
      console.error("Error detallado:", error);
      alert(`Error al eliminar: ${error.message}`);
    }
  };

  form.addEventListener("submit", handleSubmit);
  apiSelector.addEventListener("change", loadVuelos);

  console.log("Iniciando carga de datos...");
  loadVuelos();
});
