class LeafletMap {
    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();
    }

    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    addMarker(lat, lng, message, color = 'red') {
        // Default Leaflet marker
        const markerOptions = {
            icon: L.AwesomeMarkers.icon({
                icon: 'info-sign',
                markerColor: color === 'blue' ? 'blue' : 'red'
            })
        };

        const marker = L.marker([lat, lng], markerOptions).addTo(this.map);
        marker.bindPopup(message);
    }

    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.message);
                });
            })
            .catch(error => console.error('Error loading markers:', error));
    }
}

// Create the map instance
const myMap = new LeafletMap('map', [8.360004, 124.868419], 18);

// Adding markers
myMap.addMarker(8.359735, 124.869206, 'CCS Faculty Office', 'blue');
myMap.addMarker(8.359639, 124.869179, 'CCS Laboratory 1', 'blue');
myMap.addMarker(8.359554, 124.869153, 'CCS Laboratory 2', 'blue');

// Load markers from JSON
myMap.loadMarkersFromJson('applet2.json');
