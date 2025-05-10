function loadCrop(cropName) {
  fetch(`/crop/${cropName}`)
    .then(response => response.json())
    .then(data => {
      const details = document.getElementById('crop-details');
      const title = document.getElementById('crop-title');
      title.innerText = data["Crop Name"]

      let html = '';
      for (let key in data) {
        if (key !== 'Crop') {
          html += `<p><strong>${key}:</strong> ${data[key]}</p>`;
        }
      }
      details.innerHTML = html;
    })
    .catch(err => {
      document.getElementById('crop-details').innerHTML = '<p>Error loading crop data.</p>';
    });
}
