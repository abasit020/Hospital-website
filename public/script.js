document.addEventListener('DOMContentLoaded', async () => {
    const soilForm = document.getElementById('soil-form');
    const resultsPanel = document.getElementById('results-panel');
    const cropList = document.getElementById('crop-list');
    const adviceText = document.getElementById('advice-text');
    const analysisDate = document.getElementById('analysis-date');
    const historyList = document.getElementById('history-list');
    const statusText = document.querySelector('#realtime-status span').nextSibling;

    let supabase;

    // 1. Initialize Supabase
    try {
        const configRes = await fetch('/api/config');
        const { supabaseUrl, supabaseAnonKey } = await configRes.json();

        supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

        // Setup Real-time Subscription
        supabase
            .channel('soil-tests-channel')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'soil_tests'
            }, (payload) => {
                console.log('Real-time record received:', payload);
                addRecordToHistory(payload.new, true);
            })
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    console.log('Successfully subscribed to real-time updates');
                    statusText.textContent = ' Real-time Active';
                } else {
                    statusText.textContent = ' Syncing...';
                }
            });

    } catch (err) {
        console.error('Real-time initialization failed:', err);
        statusText.textContent = ' Offline Mode';
    }

    // 2. Load History
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

            historyList.innerHTML = '';
            if (data.length > 0) {
                data.slice(0, 10).forEach(item => addRecordToHistory(item));
            } else {
                historyList.innerHTML = '<p class="empty-msg">No records yet. Be the first to analyze!</p>';
            }
        } catch (error) {
            console.error('History fetch error:', error);
        }
    }

    function addRecordToHistory(item, isRealtime = false) {
        // Remove empty message if it exists
        const emptyMsg = historyList.querySelector('.empty-msg');
        if (emptyMsg) emptyMsg.remove();

        const div = document.createElement('div');
        div.className = 'history-item';
        if (isRealtime) div.style.borderColor = '#fbc02d'; // Highlight real-time updates

        div.innerHTML = `
            <span class="loc">${item.location}</span>
            <span class="crops">${item.suitable_crops}</span>
            <div style="font-size: 11px; margin-top: 5px; color: #888; display: flex; justify-content: space-between;">
                <span>${new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span style="font-weight: 600; color: #2e7d32;">${item.ph} pH</span>
            </div>
        `;

        if (isRealtime) {
            historyList.prepend(div);
            // Limit to 10 items
            if (historyList.children.length > 10) {
                historyList.lastElementChild.remove();
            }
        } else {
            historyList.appendChild(div);
        }
    }
});
