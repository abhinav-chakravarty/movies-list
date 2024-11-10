document.addEventListener("DOMContentLoaded", () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function renderTable(data) {
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    dataTable.innerHTML = ''; // Clear existing table rows

    const nameCounts = data.reduce((acc, item) => { acc[item.universe] = (acc[item.universe] || 0) + 1; return acc; }, {}); const nameColors = {}; let colorIndex = 0; const colors = ['#F0E68C', '#FFFFF0', '#E6E6FA', '#FFE4E1', '#ADD8E6', '#FFB6C1'];

    data.forEach(item => {
        const row = dataTable.insertRow();
        const dateCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const uniCell = row.insertCell(2);
        dateCell.textContent = item.date;
        nameCell.textContent = item.name;
        uniCell.textContent = item.universe;
        if (nameCounts[item.universe] > 1) { if (!nameColors[item.universe]) { nameColors[item.universe] = colors[colorIndex % colors.length]; colorIndex++; } row.style.backgroundColor = nameColors[item.universe]; }
    });
}

function sortTable(columnIndex) {
    const table = document.getElementById("data-table");
    const rows = Array.from(table.rows).slice(1); // Skip header row
    const isAscending = table.getAttribute('data-sort-direction') === 'asc';
    
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();
        
        if (columnIndex === 0) { // Sort by date
            const dateA = new Date(cellA);
            const dateB = new Date(cellB);
            return isAscending ? dateA - dateB : dateB - dateA;
        } else { // Sort by name
            return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        }
    });
    
    isAscending ? table.setAttribute('data-sort-direction', 'desc') : table.setAttribute('data-sort-direction', 'asc');
    
    const dataTable = table.getElementsByTagName('tbody')[0];
    dataTable.innerHTML = ''; // Clear existing table rows
    rows.forEach(row => dataTable.appendChild(row));
}
