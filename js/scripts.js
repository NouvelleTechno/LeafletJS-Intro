// On déclare les coordonnées de Paris
let lat = 48.852969;
let lon = 2.349903;
let limites = [];
let markers = L.markerClusterGroup();

let map = L.map("map", {
    zoom: 13,
    center: [lat, lon]
});

L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
    minZoom: 1,
    maxZoom: 20,
    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>'
}).addTo(map);

// On charge villes.json
fetch("villes.json")
    .then(data => data.json())
    .then(villes => {
        // On boucle sur les villes
        for(let [ville, contenu] of Object.entries(villes)){
            let coords = [contenu.lat, contenu.lon];
            
            // On charge l'icône du marqueur
            let icone = L.icon({
                iconUrl: "/images/pin.png",
                iconSize: [25,41],
                iconAnchor: [12.5, 41],
                popupAnchor: [0, -41]
            });
            
            // On crée le marqueur pour chaque ville
            let marker = L.marker(coords, {
                icon: icone
            });

            let popup = `<div class="popup">
                            <img src="/images/${contenu.image}" alt="${ville}" width="50" height="50">
                            <div>
                                <h2>${ville}</h2>
                                <p>${contenu.description}</p>
                            </div>
                        </div>`;

            marker.bindPopup(popup);
            limites.push(coords);

            // On ajoute le marqueur au cluster
            markers.addLayer(marker);
        }

        // On ajoute les clusters à la carte
        map.addLayer(markers);

        map.fitBounds(limites);
    });

