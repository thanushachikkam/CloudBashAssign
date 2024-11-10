document.getElementById("urlForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const url = document.getElementById("url").value;

    try {
        const response = await fetch("http://localhost:5000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        // Populate the results table
        const tableBody = document.getElementById("frequencyTable").querySelector("tbody");
        tableBody.innerHTML = "";  // Clear previous results
        data.forEach(item => {
            const row = document.createElement("tr");
            const wordCell = document.createElement("td");
            wordCell.textContent = item.word;
            const freqCell = document.createElement("td");
            freqCell.textContent = item.frequency;
            row.appendChild(wordCell);
            row.appendChild(freqCell);
            tableBody.appendChild(row);
        });

        document.getElementById("results").style.display = "block";

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing the request.");
    }
});
