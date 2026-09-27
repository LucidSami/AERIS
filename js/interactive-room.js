import { SYSTEM_COMPONENTS } from './data.js';

export function initInteractiveRoom() {
  const wrapper = document.getElementById('room-svg-wrapper');
  if (!wrapper) return;

  // Render SVG
  const svgContent = `
    <svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-label="Interactive Room Cutaway Diagram">
      <defs>
        <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#EBE9E4" />
          <stop offset="100%" stop-color="#DCDAD5" />
        </linearGradient>
        <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#C4956A" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#C4956A" stop-opacity="0.4"/>
        </linearGradient>
        
        <!-- Airflow dashed path animation -->
        <style>
          .airflow-path {
            stroke-dasharray: 10;
            animation: dash-flow 2s linear infinite;
          }
          @keyframes dash-flow {
            to { stroke-dashoffset: -20; }
          }
          .hotspot-dot {
            transform-origin: center;
            transition: transform 0.2s, fill 0.2s;
            cursor: pointer;
          }
          .hotspot-group:hover .hotspot-dot {
            transform: scale(1.5);
            fill: var(--color-accent-blue);
          }
          .hotspot-pulse {
            transform-origin: center;
            animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          }
          @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 0.8; }
            100% { transform: scale(2.5); opacity: 0; }
          }
        </style>
      </defs>

      <!-- Background / Structure -->
      <g id="room-structure" stroke="#4A4A4A" stroke-width="1.5" stroke-linejoin="round">
        <!-- Back Wall -->
        <polygon points="150,100 650,100 650,400 150,400" fill="url(#wallGrad)" />
        <!-- Left Wall (angled) -->
        <polygon points="50,50 150,100 150,400 50,450" fill="#E2E0DC" />
        <!-- Right Wall (angled) -->
        <polygon points="650,100 750,50 750,450 650,400" fill="#D2D0CC" />
        <!-- Floor -->
        <polygon points="50,450 150,400 650,400 750,450" fill="url(#floorGrad)" />
        <!-- Ceiling -->
        <polygon points="50,50 150,100 650,100 750,50" fill="#FAFAF8" />
      </g>

      <!-- Architectural Elements -->
      <!-- Window (Left Wall) -->
      <g id="element-window" stroke="#333" stroke-width="1.5">
        <polygon points="70,180 130,210 130,320 70,290" fill="#E8F0FA" opacity="0.6"/>
        <line x1="100" y1="195" x2="100" y2="305" />
      </g>
      
      <!-- Door (Right Wall) -->
      <g id="element-door" stroke="#333" stroke-width="1.5">
        <polygon points="670,200 710,180 710,430 670,390" fill="#FBF3EB" />
        <circle cx="680" cy="300" r="3" fill="#333" />
      </g>

      <!-- Ceiling Unit (HRV/ERV) -->
      <g id="element-hrv" stroke="#333" stroke-width="1.5">
        <rect x="350" y="85" width="100" height="30" fill="#F2F0ED" rx="2" />
        <line x1="360" y1="100" x2="440" y2="100" stroke-dasharray="2" />
      </g>

      <!-- Sensor (Back Wall) -->
      <g id="element-sensor" stroke="#333" stroke-width="1">
        <rect x="500" y="200" width="20" height="30" fill="#FAFAF8" rx="2" />
        <circle cx="510" cy="210" r="4" fill="#2D8F6F" />
      </g>

      <!-- Furniture (Abstract) -->
      <g id="element-furniture" stroke="#4A4A4A" stroke-width="1.5">
        <!-- Bed/Sofa shape -->
        <rect x="250" y="340" width="200" height="40" fill="#DCDAD5" rx="4" />
        <rect x="250" y="280" width="30" height="100" fill="#DCDAD5" rx="4" />
      </g>

      <!-- Solar Panel (Outside/Roof visual) -->
      <g id="element-solar" stroke="#333" stroke-width="1" opacity="0.7">
        <polygon points="500,30 580,30 550,60 470,60" fill="#3B7DD8" />
        <line x1="490" y1="40" x2="560" y2="40" />
        <line x1="480" y1="50" x2="550" y2="50" />
      </g>

      <!-- Airflow Paths -->
      <g id="airflow-lines" fill="none" stroke-width="2" class="airflow-path">
        <!-- Fresh air in -->
        <path d="M400,115 C400,180 300,200 300,280" stroke="#3B7DD8" />
        <!-- Stale air out -->
        <path d="M550,300 C550,200 450,180 450,115" stroke="#C44D4D" />
      </g>

      <!-- Hotspots -->
      <g id="hotspots"></g>
    </svg>
  `;
  wrapper.innerHTML = svgContent;

  const hotspotsContainer = wrapper.querySelector('#hotspots');
  const infoPanel = document.getElementById('room-info-panel');
  const btnClose = infoPanel.querySelector('.btn-close');

  // Hardcoded positions mapping to IDs for this specific SVG viewBox
  const coords = {
    1: {x: 100, y: 250}, // Window (Airtight)
    2: {x: 690, y: 380}, // Door
    3: {x: 400, y: 100}, // HRV
    4: {x: 200, y: 250}, // Air purifying wall
    5: {x: 510, y: 215}, // Sensor
    6: {x: 525, y: 45},  // Solar
    7: {x: 650, y: 300}, // Acoustic (wall corner)
    8: {x: 350, y: 360}, // Furniture
    9: {x: 450, y: 150}  // Vent paths
  };

  let activeHotspot = null;

  SYSTEM_COMPONENTS.forEach(comp => {
    const pos = coords[comp.id];
    if (!pos) return;

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "hotspot-group");
    g.setAttribute("transform", `translate(${pos.x}, ${pos.y})`);
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", `View details for ${comp.title}`);

    // Pulse ring
    const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    pulse.setAttribute("class", "hotspot-pulse");
    pulse.setAttribute("r", "8");
    pulse.setAttribute("fill", "none");
    pulse.setAttribute("stroke", "#3B7DD8");
    pulse.setAttribute("stroke-width", "2");
    
    // Core dot
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("class", "hotspot-dot");
    dot.setAttribute("r", "6");
    dot.setAttribute("fill", "#1A1A1A");

    g.appendChild(pulse);
    g.appendChild(dot);
    hotspotsContainer.appendChild(g);

    // Event listeners
    const triggerPanel = (e) => {
      e.stopPropagation();
      openPanel(comp);
    };

    g.addEventListener('click', triggerPanel);
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerPanel(e);
      }
    });
  });

  function openPanel(comp) {
    infoPanel.querySelector('.panel-number').textContent = `0${comp.id}`;
    infoPanel.querySelector('.panel-title').textContent = comp.title;
    infoPanel.querySelector('.panel-desc').textContent = comp.desc;
    infoPanel.querySelector('.panel-status').textContent = comp.status;
    
    const specsEl = infoPanel.querySelector('.panel-specs');
    if (specsEl && comp.techSpecs) {
      specsEl.textContent = comp.techSpecs;
    }
    
    infoPanel.classList.add('active');
    activeHotspot = comp.id;
  }

  function closePanel() {
    infoPanel.classList.remove('active');
    activeHotspot = null;
  }

  btnClose.addEventListener('click', closePanel);
  
  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (activeHotspot && !infoPanel.contains(e.target) && !wrapper.contains(e.target)) {
      closePanel();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeHotspot) {
      closePanel();
    }
  });
}
