import { SYSTEM_COMPONENTS } from './data.js';

export function initInteractiveRoom() {
  const wrapper = document.getElementById('room-svg-wrapper');
  if (!wrapper) return;

  // Render SVG with clean responsive attributes
  const svgContent = `
    <svg viewBox="0 0 800 500" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" aria-label="Interactive Room Cutaway Diagram" style="display:block; width:100%; height:auto;">
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
          .hotspot-group {
            cursor: pointer;
            outline: none;
          }
          .hotspot-dot {
            transform-origin: center;
            transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), fill 0.2s, stroke 0.2s;
          }
          .hotspot-group:hover .hotspot-dot,
          .hotspot-group:focus-visible .hotspot-dot,
          .hotspot-group.active .hotspot-dot {
            transform: scale(1.35);
            fill: #0284C7 !important;
            stroke: #FFFFFF !important;
          }
          .hotspot-group.active .hotspot-pulse {
            stroke: #0284C7;
            animation-duration: 1.4s;
          }
          .hotspot-pulse {
            transform-origin: center;
            animation: pulse-ring 2.2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          }
          @keyframes pulse-ring {
            0% { transform: scale(0.7); opacity: 0.9; }
            100% { transform: scale(2.6); opacity: 0; }
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

      <!-- Hotspots Group -->
      <g id="hotspots"></g>
    </svg>
  `;
  let hotspotsContainer = wrapper.querySelector('#hotspots');
  if (!hotspotsContainer) {
    wrapper.innerHTML = svgContent;
    hotspotsContainer = wrapper.querySelector('#hotspots');
  } else {
    hotspotsContainer.innerHTML = '';
  }

  const infoPanel = document.getElementById('room-info-panel');
  const btnClose = infoPanel ? infoPanel.querySelector('.btn-close') : null;

  // Hardcoded positions mapping to IDs for this specific SVG viewBox
  const coords = {
    1: {x: 100, y: 250, label: "01. Envelope"},
    2: {x: 690, y: 380, label: "02. Gaskets"},
    3: {x: 400, y: 100, label: "03. ERV Core"},
    4: {x: 200, y: 250, label: "04. Air Wall"},
    5: {x: 510, y: 215, label: "05. Sensors"},
    6: {x: 525, y: 45,  label: "06. 24V Solar"},
    7: {x: 650, y: 300, label: "07. Acoustics"},
    8: {x: 350, y: 360, label: "08. Millwork"},
    9: {x: 450, y: 150, label: "09. Vents"}
  };

  let activeHotspot = null;
  const hotspotElements = {};
  const pillElements = {};

  // Build or find subsystem selector container
  let pillsContainer = document.getElementById('subsystem-pills');
  if (!pillsContainer) {
    const navWrapper = document.createElement('div');
    navWrapper.className = 'subsystem-nav';
    navWrapper.innerHTML = `
      <div class="subsystem-nav-label">Tap to inspect subsystem:</div>
      <div class="subsystem-pills" id="subsystem-pills"></div>
    `;
    wrapper.parentNode.insertBefore(navWrapper, infoPanel);
    pillsContainer = navWrapper.querySelector('#subsystem-pills');
  } else {
    pillsContainer.innerHTML = '';
  }

  SYSTEM_COMPONENTS.forEach(comp => {
    const pos = coords[comp.id];
    if (!pos) return;

    // 1. Create SVG Hotspot
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "hotspot-group");
    g.setAttribute("id", `hotspot-${comp.id}`);
    g.setAttribute("transform", `translate(${pos.x}, ${pos.y})`);
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", `View specifications for ${comp.title}`);

    // Large invisible touch target for effortless mobile tapping (48px diameter)
    const touchTarget = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    touchTarget.setAttribute("r", "24");
    touchTarget.setAttribute("fill", "transparent");
    touchTarget.setAttribute("style", "pointer-events:all;");

    // Pulse ring
    const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    pulse.setAttribute("class", "hotspot-pulse");
    pulse.setAttribute("r", "9");
    pulse.setAttribute("fill", "none");
    pulse.setAttribute("stroke", "#38BDF8");
    pulse.setAttribute("stroke-width", "2");
    
    // Core dot with high-contrast border
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("class", "hotspot-dot");
    dot.setAttribute("r", "7.5");
    dot.setAttribute("fill", "#0F172A");
    dot.setAttribute("stroke", "#FFFFFF");
    dot.setAttribute("stroke-width", "2");

    // Center indicator dot
    const centerDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    centerDot.setAttribute("r", "3");
    centerDot.setAttribute("fill", "#38BDF8");

    // Small numerical badge
    const badgeText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    badgeText.setAttribute("y", "-13");
    badgeText.setAttribute("text-anchor", "middle");
    badgeText.setAttribute("font-size", "10");
    badgeText.setAttribute("font-weight", "800");
    badgeText.setAttribute("fill", "#0F172A");
    badgeText.textContent = `0${comp.id}`;

    g.appendChild(touchTarget);
    g.appendChild(pulse);
    g.appendChild(dot);
    g.appendChild(centerDot);
    g.appendChild(badgeText);
    hotspotsContainer.appendChild(g);
    hotspotElements[comp.id] = g;

    // 2. Create Mobile Quick-Selector Pill
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'subsystem-pill';
    pill.id = `pill-${comp.id}`;
    pill.textContent = pos.label || comp.title;
    pillsContainer.appendChild(pill);
    pillElements[comp.id] = pill;

    // Event listeners
    const triggerPanel = (e) => {
      if (e) e.stopPropagation();
      openPanel(comp);
    };

    g.addEventListener('click', triggerPanel);
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerPanel(e);
      }
    });

    pill.addEventListener('click', triggerPanel);
  });

  function openPanel(comp) {
    if (!infoPanel) return;

    infoPanel.querySelector('.panel-number').textContent = `0${comp.id}`;
    infoPanel.querySelector('.panel-title').textContent = comp.title;
    infoPanel.querySelector('.panel-desc').textContent = comp.desc;
    infoPanel.querySelector('.panel-status').textContent = comp.status;
    
    const specsEl = infoPanel.querySelector('.panel-specs');
    if (specsEl && comp.techSpecs) {
      specsEl.textContent = comp.techSpecs;
    }
    
    // Highlight active hotspot and pill
    Object.keys(hotspotElements).forEach(id => {
      hotspotElements[id].classList.toggle('active', Number(id) === comp.id);
    });
    Object.keys(pillElements).forEach(id => {
      pillElements[id].classList.toggle('active', Number(id) === comp.id);
    });

    infoPanel.classList.add('active');
    activeHotspot = comp.id;

    // On mobile devices, smoothly ensure the panel is within viewport view
    if (window.innerWidth <= 1024) {
      setTimeout(() => {
        infoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  }

  function closePanel() {
    if (!infoPanel) return;
    infoPanel.classList.remove('active');
    Object.keys(hotspotElements).forEach(id => {
      hotspotElements[id].classList.remove('active');
    });
    Object.keys(pillElements).forEach(id => {
      pillElements[id].classList.remove('active');
    });
    activeHotspot = null;
  }

  if (btnClose) {
    btnClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closePanel();
    });
  }
  
  // Close when clicking outside on desktop
  document.addEventListener('click', (e) => {
    if (activeHotspot && !infoPanel.contains(e.target) && !wrapper.contains(e.target) && !pillsContainer.contains(e.target)) {
      closePanel();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeHotspot) {
      closePanel();
    }
  });
}
