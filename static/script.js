document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('csvFileInput').addEventListener('change', processFile);
});

function processFile() {
    const file = document.getElementById('csvFileInput').files[0];
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
            listItem.style.border = '1px solid black';
            listItem.style.padding = '3px 5px';
            listItem.style.fontSize = '12px';
            listContainer.appendChild(listItem);
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
}

function generateInsights() {
    const formData = new FormData(document.getElementById('uploadForm'));
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const graphUrl = response.graph_url;
                document.getElementById('insightsGraph').innerHTML = '<img src="' + graphUrl + '" alt="Insights Graph">';
                // Add download link for the insights graph
                document.getElementById('insightsGraph').innerHTML += '<br><a href="/download_insights/' + graphUrl.split('/').pop() + '">Download Insights Graph</a>';
            } else {
                alert('Error generating insights.');
            }
        }
    };
    xhr.open('POST', '/');
    xhr.send(formData);
}
