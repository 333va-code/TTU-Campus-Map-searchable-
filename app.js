const fraternities = [
  { name: "TKE", coords: [36.1745, -85.5016] },
  { name: "KA", coords: [36.175, -85.5016] },
  { name: "Pikapp", coords: [36.1712, -85.5055] },
  { name: "Kappa Sig", coords: [36.1701, -85.505] },
  { name: "Sig Chi", coords: [36.1697, -85.5051] },
  { name: "Pike", coords: [36.1699, -85.506] },
  { name: "Fiji", coords: [36.1703, -85.506] },
  { name: "Sigep", coords: [36.1717, -85.5063] },
  { name: "SAE", coords: [36.1693, -85.506] }
];

const bikeRacks = [
  { name: "Bike rack", coords: [36.17216, -85.50474] },
  { name: "Bike rack", coords: [36.17228, -85.50473] },
  { name: "Bike rack", coords: [36.17355, -85.50454] },
  { name: "Bike rack", coords: [36.17498, -85.5045] },
  { name: "Bike rack", coords: [36.17539, -85.50397] },
  { name: "Bike rack", coords: [36.17545, -85.5047] },
  { name: "Bike rack", coords: [36.17635, -85.50569] },
  { name: "Bike rack", coords: [36.17616, -85.50599] },
  { name: "Bike rack", coords: [36.17569, -85.50698] },
  { name: "Bike rack", coords: [36.1743, -85.50711] },
  { name: "Bike rack", coords: [36.17375, -85.50674] },
  { name: "Bike rack", coords: [36.17768, -85.50439] },
  { name: "Bike rack", coords: [36.17558, -85.5078] },
  { name: "Bike rack", coords: [36.17314, -85.50987] },
  { name: "Bike rack", coords: [36.17324, -85.51071] },
  { name: "Bike rack", coords: [36.1727, -85.50777] },
  { name: "Bike rack", coords: [36.17298, -85.50689] },
  { name: "Bike rack", coords: [36.17261, -85.50708] },
  { name: "Bike rack", coords: [36.17222, -85.50725] },
  { name: "Bike rack", coords: [36.17266, -85.50402] },
  { name: "Bike rack", coords: [36.17474, -85.50276] },
  { name: "Bike rack", coords: [36.17518, -85.50269] },
  { name: "Bike rack", coords: [36.17546, -85.50286] },
  { name: "Bike rack", coords: [36.17621, -85.50321] },
  { name: "Bike rack", coords: [36.17681, -85.50411] },
  { name: "Bike rack", coords: [36.1766, -85.503] }
];

const foodLocations = [
  { name: "Einstein Bros Bagels", coords: [36.17411, -85.50769] },
  { name: "Maddux/McCord Market", coords: [36.17256, -85.50631] },
  { name: "Poet's", coords: [36.17631, -85.50617] },
  { name: "Library Market", coords: [36.17624, -85.50608] },
  { name: "Cafeteria", coords: [36.17574, -85.50422] },
  { name: "Taco Bell", coords: [36.17574, -85.50447] },
  { name: "Chick-Fil-A", coords: [36.17564, -85.50438] },
  { name: "Starbucks", coords: [36.17553, -85.50439] },
  { name: "RUC Market", coords: [36.17584, -85.50451] },
  { name: "Poppie's Ice Cream", coords: [36.17581, -85.50456] },
  { name: "Which Wich", coords: [36.17566, -85.50404] }
];

const createIcon = (name, bg, color, border) => L.divIcon({
  className: 'custom-pin-label',
  html: `<div style="
    background-color: ${bg};
    color: ${color};
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: bold;
    font-family: sans-serif;
    white-space: nowrap;
    box-shadow: 0 2px 4px rgba(0,0,0,0.5);
    border: 1px solid ${border};
    transform: translate(-50%, -100%);
  ">${name}</div>`,
  iconSize: [0, 0]
});

const purpleIcon = (name) => createIcon(name, '#4F2984', 'black', '#FFC72C');
const greenIcon = (name) => createIcon(name, '#16a34a', 'white', '#bbf7d0');
const yellowIcon = (name) => createIcon(name, '#eab308', '#000000', '#713f12');

const ttuBounds = L.latLngBounds(
  [36.1650, -85.5180],
  [36.1880, -85.4900]
);

const map = L.map('map', {
  center: [36.1740, -85.5050],
  zoom: 17,
  minZoom: 15,
  maxZoom: 19,
  maxBounds: ttuBounds,
  maxBoundsViscosity: 1.0,
  zoomControl: false
});

L.control.zoom({ position: 'topright' }).addTo(map);

const esriSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 19,
  attribution: 'Tiles &copy; Esri'
});
const streetOverlay = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 });
const placeLabels = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 });
const topoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 });

const satelliteHybrid = L.layerGroup([esriSatellite, streetOverlay, placeLabels]).addTo(map);

L.control.layers({
  "Satellite Hybrid": satelliteHybrid,
  "Topographic Map": topoMap
}, null, { position: 'topright' }).addTo(map);

const markerRegistry = [];

function registerMarkers(items, iconFn, category) {
  items.forEach(item => {
    const marker = L.marker(item.coords, { icon: iconFn(item.name) })
      .bindPopup(`<b>${item.name}</b> (${category})<br>[${item.coords[0]}, ${item.coords[1]}]`)
      .addTo(map);

    markerRegistry.push({
      name: item.name.toLowerCase(),
      marker
    });
  });
}

registerMarkers(fraternities, purpleIcon, 'Fraternity');
registerMarkers(bikeRacks, greenIcon, 'Bike Rack');
registerMarkers(foodLocations, yellowIcon, 'Food/Market');

const searchInput = document.getElementById('search-input');
const clearBtn = document.getElementById('clear-btn');

function filterMarkers(query) {
  const q = query.trim().toLowerCase();
  
  markerRegistry.forEach(({ name, marker }) => {
    const isMatch = !q || name.includes(q);
    
    if (isMatch && !map.hasLayer(marker)) {
      map.addLayer(marker);
    } else if (!isMatch && map.hasLayer(marker)) {
      map.removeLayer(marker);
    }
  });

  clearBtn.style.display = q ? 'block' : 'none';
}

searchInput.addEventListener('input', (e) => filterMarkers(e.target.value));

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  filterMarkers('');
  searchInput.focus();
});

setTimeout(() => { map.invalidateSize(); }, 200);