async function loadVuelos() {
    try {
      const response = await fetch("http://localhost:3000/api/vuelos");
      const vuelos = await response.json();
      displayVuelos(vuelos);
    } catch (error) {
      console.error("Error al obtener los vuelos:", error);
    }
  }
  
  function displayVuelos(vuelos) {
    const vuelosTable = document.getElementById("vuelos-table-body");
    vuelosTable.innerHTML = "";
  
    vuelos.forEach((vuelo) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${vuelo.codigo}</td>
        <td>${vuelo.origen}</td>
        <td>${vuelo.destino}</td>
        <td>${new Date(vuelo.fecha).toLocaleString()}</td>
      `;
      vuelosTable.appendChild(row);
    });
  }
  
  document.addEventListener("DOMContentLoaded", loadVuelos);
  