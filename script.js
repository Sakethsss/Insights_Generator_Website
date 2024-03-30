document.getElementById('csvFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = e.target.result.split('\n');
        const columnHeadings = data[0].split(',');
        const columnHeadingsElement = document.getElementById('columnHeadings');
        columnHeadingsElement.innerHTML = '';
       const listContainer = document.createElement('ul');
        columnHeadings.forEach(function(heading) {
           const listItem = document.createElement('li');
            listItem.textContent = heading;
            listItem.style.border = '1px solid black'; // Add border to each list item
            listItem.style.padding = '3px 5px'; // Adjust padding to make the boxes smaller
            listItem.style.fontSize = '12px'; // Adjust font size to make the boxes smaller
            listContainer.appendChild(listItem);
            //columnHeadingsElement.innerHTML += '<span>' + heading + '</span>';
        });
      columnHeadingsElement.appendChild(listContainer);
        const firstParameterSelect = document.getElementById('firstParameter');
        const secondParameterSelect = document.getElementById('secondParameter');
        columnHeadings.forEach(function(heading) {
            firstParameterSelect.innerHTML += '<option value="' + heading + '">' + heading + '</option>';
            secondParameterSelect.innerHTML += '<option value="' + heading + '">' + heading + '</option>';
        });
    };
    reader.readAsText(file);
});

function generateInsights() {
    const firstParameter = document.getElementById('firstParameter').value;
    const secondParameter = document.getElementById('secondParameter').value;
  
  if (firstParameter === secondParameter) {
        alert('Please select two different parameters.');
        return;}
    // Make AJAX request to Flask backend with selected parameters
    // Update insightsGraph with the generated insights
}
