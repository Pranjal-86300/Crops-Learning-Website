function loadCrop(cropName) {
  fetch(`/crop/${cropName}`)
    .then(response => response.json())
    .then(data => {
      const details = document.getElementById('crop-details');
      const title = document.getElementById('crop-title');
      title.innerText = data["Crop Name"];

      let html = '';
      for (let key in data) {
        if (key === "Crop Name") continue;

        const value = data[key];

        if (Array.isArray(value)) {
          // Handle lists correctly without numbered indices
          html += `<p><strong>${key}:</strong></p><ul>`;
          value.forEach(item => {
            html += `<li>${item}</li>`;
          });
          html += `</ul>`;
        } else if (typeof value === 'object' && value !== null) {
          if (key === "Fertilizer Plan") {
            html += `<p><strong>${key}:</strong></p><ul>`;
            for (let subKey in value) {
              html += `<li><strong>${subKey}:</strong></li><ul>`;
              for (let nutrient in value[subKey]) {
                html += `<li>${nutrient}: ${value[subKey][nutrient]} kg/ha</li>`;
              }
              html += `</ul>`;
            }
            html += '</ul>';
          } else {
            html += `<p><strong>${key}:</strong></p><ul>`;
            for (let subKey in value) {
              html += `<li><strong>${subKey}:</strong> ${value[subKey]}</li>`;
            }
            html += '</ul>';
          }
        } else {
          html += `<p><strong>${key}:</strong> ${value}</p>`;
        }
      }

      details.innerHTML = html;
    })
    .catch(err => {
      document.getElementById('crop-details').innerHTML = '<p>Error loading crop data.</p>';
    });
}
