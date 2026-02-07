document.addEventListener('DOMContentLoaded', () => {
    const soilForm = document.getElementById('soil-form');
    const resultsPanel = document.getElementById('results-panel');
    const cropList = document.getElementById('crop-list');
    const adviceText = document.getElementById('advice-text');
    const analysisDate = document.getElementById('analysis-date');
    const historyList = document.getElementById('history-list');

    // Initialize
    fetchHistory();

    soilForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = soilForm.querySelector('button');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Analyzing...';

        const formData = {
            farmer_name: document.getElementById('farmer_name').value,
            location: document.getElementById('location').value,
            ph: parseFloat(document.getElementById('ph').value),
            moisture: parseFloat(document.getElementById('moisture').value),
            nitrogen: parseFloat(document.getElementById('nitrogen').value),
            phosphorus: parseFloat(document.getElementById('phosphorus').value),
            potassium: parseFloat(document.getElementById('potassium').value)
        };

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Analysis failed');

            const result = await response.json();
            displayResults(result);
            fetchHistory();

            // Scroll to results
            resultsPanel.scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong with the AI analysis. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Run AI Analysis';
        }
    });

    function displayResults(data) {
        resultsPanel.classList.remove('hidden');
        cropList.textContent = data.suitable_crops;
        adviceText.textContent = data.recommendation;
        analysisDate.textContent = new Date(data.created_at).toLocaleDateString('en-GH', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    }

    async function fetchHistory() {
        try {
            const response = await fetch('/api/history');
            const data = await response.json();

            if (data.length > 0) {
                historyList.innerHTML = '';
                data.slice(0, 5).forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'history-item';
                    div.innerHTML = `
                        <span class="loc">${item.location}</span>
                        <span class="crops">${item.suitable_crops}</span>
                        <div style="font-size: 11px; margin-top: 5px; color: #888;">
                            ${new Date(item.created_at).toLocaleDateString()}
                        </div>
                    `;
                    historyList.appendChild(div);
                });
            }
        } catch (error) {
            console.error('History fetch error:', error);
        }
    }
});
