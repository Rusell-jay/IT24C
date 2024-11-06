class AppletCard {
    constructor(title, description, link, image) {
        this.title = title;
        this.description = description;
        this.link = link;
        this.image = image || ''; // If image is not provided, use an empty string
    }

    createCard() {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card applet-card';

        // Add image if it exists and apply inline style to make it small like an icon
        const imageTag = this.image ? `<img src="${this.image}" class="card-img-top" alt="${this.title}" style="width: 50px; height: 50px; object-fit: cover; margin-bottom: 10px;">` : '';

        cardDiv.innerHTML = `
            ${imageTag}  <!-- Insert image if available -->
            <div class="card-body">
                <h5 class="card-title">${this.title}</h5>
                <p class="card-text">${this.description}</p>
                <a href="${this.link}" class="btn btn-primary applet-btn">Go to Applet</a>
            </div>
        `;
        return cardDiv;
    }
}

class AppletRenderer {
    constructor(containerId, searchInputId) {
        this.container = document.getElementById(containerId);
        this.searchInput = document.getElementById(searchInputId);
        this.appletData = [];
        this.filteredData = [];
        this.searchInput.addEventListener('input', () => this.filterApplets());
    }

    fetchAppletData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.appletData = data;
                this.filteredData = data;
                this.renderApplets(this.filteredData);
            })
            .catch(error => console.error('Error loading applet data:', error));
    }

    renderApplets(data) {
        this.container.innerHTML = ''; // Clear previous content
        data.forEach(applet => {
            const appletCard = new AppletCard(applet.title, applet.description, applet.link, applet.image);
            const cardElement = appletCard.createCard();
            this.container.appendChild(cardElement);
        });
    }

    filterApplets() {
        const query = this.searchInput.value.toLowerCase();
        this.filteredData = this.appletData.filter(applet =>
            applet.title.toLowerCase().includes(query) ||
            applet.description.toLowerCase().includes(query)
        );
        this.renderApplets(this.filteredData);
    }
}

// Initialize and fetch the applet data
const appletRenderer = new AppletRenderer('applet-container', 'searchApplet');
appletRenderer.fetchAppletData('applet.json');  // Ensure 'applets.json' is correct and accessible
