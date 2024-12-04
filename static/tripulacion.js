async function loadTripulacion() {
    try {
      const response = await fetch("http://localhost:3000/api/tripulacion");
      const tripulacion = await response.json();
      renderTripulacion(tripulacion);
    } catch (error) {
      console.error("Error al cargar la tripulación:", error);
      alert("Error al cargar la tripulación");
    }
  }
  
  function renderTripulacion(tripulacion) {
    const tableBody = document.getElementById("tripulacion-table-body");
    tableBody.innerHTML = ""; // Limpiar el contenido previo
  
    if (tripulacion.length === 0) {
      const noDataRow = document.createElement("tr");
      const noDataCell = document.createElement("td");
      noDataCell.colSpan = 4;
      noDataCell.textContent = "No hay datos disponibles.";
      noDataRow.appendChild(noDataCell);
      tableBody.appendChild(noDataRow);
    } else {
      tripulacion.forEach((tripulante) => {
        const row = document.createElement("tr");
  
        // Crear las celdas de la fila
        const idCell = document.createElement("td");
        idCell.textContent = tripulante._id;
        row.appendChild(idCell);
  
        const cedulaCell = document.createElement("td");
        cedulaCell.textContent = tripulante.cedula;
        row.appendChild(cedulaCell);
  
        const puestoCell = document.createElement("td");
        puestoCell.textContent = tripulante.puesto;
        row.appendChild(puestoCell);
  
        // Crear las celdas de acción (Actualizar / Eliminar)
        const actionsCell = document.createElement("td");
        actionsCell.innerHTML = `
                  <button class="btn btn-warning btn-sm" onclick="editTripulacion('${tripulante._id}', '${tripulante.cedula}', '${tripulante.puesto}')">Editar</button>
                  <button class="btn btn-danger btn-sm" onclick="deleteTripulacion('${tripulante._id}')">Eliminar</button>
              `;
        row.appendChild(actionsCell);
  
        // Agregar la fila a la tabla
        tableBody.appendChild(row);
      });
    }
  }
  
  // Cargar la tripulación cuando la página esté lista
  document.addEventListener("DOMContentLoaded", loadTripulacion);
  
  // Agregar nueva tripulación
  document
    .getElementById("add-tripulacion-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault(); // Evitar el envío del formulario
  
      const cedula = document.getElementById("cedula").value;
      const puesto = document.getElementById("puesto").value;
      const id_vuelo = document.getElementById("id_vuelo").value; // Obtener el id_vuelo
  
      const newTripulacion = {
        cedula: cedula,
        puesto: puesto,
        id_vuelo: id_vuelo, // Incluir el id_vuelo
      };
  
      try {
        const response = await fetch("http://localhost:3000/api/tripulacion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTripulacion),
        });
  
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Error al agregar tripulación");
        }
        alert("Tripulación agregada");
        loadTripulacion(); // Recargar los datos
      } catch (error) {
        console.error("Error al agregar tripulación:", error);
        alert("Error al agregar tripulación: " + error.message);
      }
    });
  
  // Editar tripulación
  function editTripulacion(id, cedula, puesto) {
    document.getElementById("cedula").value = cedula;
    document.getElementById("puesto").value = puesto;
  
    // Cambiar el comportamiento del formulario para actualizar
    document.getElementById("add-tripulacion-form").onsubmit = async (e) => {
      e.preventDefault(); // Evitar el envío del formulario
  
      const updatedTripulacion = {
        cedula: document.getElementById("cedula").value,
        puesto: document.getElementById("puesto").value,
      };
  
      try {
        const response = await fetch(
          `http://localhost:3000/api/tripulacion/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTripulacion),
          }
        );
  
        const result = await response.json();
        if (response.ok) {
          alert("Tripulación actualizada");
          loadTripulacion(); // Recargar los datos
        } else {
          alert("Error al actualizar tripulación");
        }
      } catch (error) {
        console.error("Error al actualizar tripulación:", error);
        alert("Error al actualizar tripulación");
      }
    };
  }
  
  // Eliminar tripulación
  async function deleteTripulacion(id) {
    const confirmDelete = confirm("¿Estás seguro de eliminar esta tripulación?");
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/tripulacion/${id}`,
          {
            method: "DELETE",
          }
        );
  
        if (response.ok) {
          alert("Tripulación eliminada");
          loadTripulacion(); // Recargar los datos
        } else {
          alert("Error al eliminar tripulación");
        }
      } catch (error) {
        console.error("Error al eliminar tripulación:", error);
        alert("Error al eliminar tripulación");
      }
    }
  }
  