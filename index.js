document.addEventListener('DOMContentLoaded', () => {
    
    const map = L.map('map').setView([37.8, -96], 4);

    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);


    function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }


    async function getLocality(lat, lng) {
        const apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data.locality || 'Unknown locality';
        } catch (error) {
            console.error('Error fetching locality:', error);
            return 'Error fetching locality';
        }
    }


    async function addMarkers() {
        for (let i = 1; i <= 3; i++) {
            const lat = getRandomInRange(30, 35, 3); 
            const lng = getRandomInRange(-90, -100, 3);
            const marker = L.marker([lat, lng]).addTo(map);


            const locality = await getLocality(lat, lng);
            const markerInfo = `Marker ${i}: Lat ${lat}, Lng ${lng}`;
            const localityInfo = `Locality: ${locality}`;

            document.getElementById(`marker${i}`).textContent = `${markerInfo} | ${localityInfo}`;
        }
    }

    addMarkers();
});
