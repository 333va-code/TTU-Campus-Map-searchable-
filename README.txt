========================================================================
TTU CAMPUS INTERACTIVE MAP - README
========================================================================

OVERVIEW
------------------------------------------------------------------------
This application is a lightweight, zero-dependency interactive web map 
designed for navigating key points of interest across the Tennessee Tech 
University (TTU) campus. Built with vanilla JavaScript, Leaflet.js, and 
Esri ArcGIS tile services, the map provides a high-performance vector and 
raster viewer populated with color-coded custom markers representing 
fraternity houses, bicycle parking racks, and campus food or market vendors.

FEATURES
------------------------------------------------------------------------
- Real-Time Search Filtering: A floating search bar positioned in the top-left 
  corner filters map markers instantly as you type. Non-matching locations 
  are removed from the active map canvas, leaving only matching pins visible.
- Color-Coded Categorization: Custom CSS divIcons render distinct visual 
  badges for rapid spatial identification across three distinct categories.
- Basemap Layer Control: Top-right layer toggle lets users switch between 
  an Esri Satellite Hybrid view (with high-resolution aerial imagery and 
  road labels) and an Esri Topographic map.
- Geographic Bounding: Camera panning and zooming are constrained to the 
  greater campus coordinates [36.1650, -85.5180] to [36.1880, -85.4900] with 
  zoom levels restricted between 15 and 19 to prevent accidental map drift.
- Interactive Popups: Clicking any marker displays an informative popup card 
  containing the location name, its classification, and exact GPS coordinates.

FILE STRUCTURE
------------------------------------------------------------------------
- index.html: HTML5 boilerplate defining the map container `#map`, floating 
  search UI element `#search-container`, embedded CSS styling, and Leaflet 
  CDN imports.
- app.js: Primary JavaScript application containing location coordinate arrays, 
  Leaflet map instantiation, icon generators, layer registry logic, and event 
  listeners for search filtering.

MARKER CATEGORIES & STYLING
------------------------------------------------------------------------
Locations are categorized into three datasets with distinct visual styles:

1. Fraternities (Purple)
   - Style: Hex `#4F2984` background with gold border `#FFC72C`.
   - Contents: Greek organization houses (TKE, KA, Pikapp, Kappa Sig, Sig Chi, 
     Pike, Fiji, Sigep, SAE).

2. Bike Racks (Green)
   - Style: Hex `#16a34a` background with light green border `#bbf7d0`.
   - Contents: Bicycle parking stations distributed near academic buildings, 
     dorms, and recreational facilities.

3. Food & Markets (Yellow)
   - Style: Hex `#eab308` background with dark brown border `#713f12`.
   - Contents: On-campus dining halls, quick-service restaurants, coffee shops, 
     and grab-and-go convenience markets (e.g., Chick-Fil-A, Starbucks, 
     Einstein Bros Bagels, Poet's, Library Market).

GETTING STARTED
------------------------------------------------------------------------
1. Ensure `index.html` and `app.js` reside within the same root directory.
2. Open `index.html` directly in any modern web browser. No local HTTP server, 
   Node.js environment, or build toolchain (Vite, Webpack) is required.
3. Use the search input in the upper-left corner to search for specific locations 
   by name (e.g., "Starbucks", "Bike rack", "Sigep").
4. Click the 'X' button inside the search field to reset filters and display all 
   registered campus markers.

DATA MAINTENANCE
------------------------------------------------------------------------
New locations can be added directly to `app.js` by appending entry objects to 
the `fraternities`, `bikeRacks`, or `foodLocations` arrays using standard WGS84 
decimal coordinates:

{ "name": "Location Name", "coords": [36.17XXX, -85.50XXX] }

DEPENDENCIES
------------------------------------------------------------------------
- Leaflet.js v1.9.4 (JS/CSS via CDN)
- Esri ArcGIS Tile Services (World Imagery, Transportation, Boundaries, Topo)