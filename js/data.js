// ==========================================================================
// SMART CLEAN-AIR INTERIOR SYSTEM — Master Structured Data Foundation
// Single Source of Truth for Technical, Commercial, and R&D Data
// ==========================================================================

export const SYSTEM_COMPONENTS = [
  {
    id: 1,
    title: "Airtight Building Envelope",
    category: "Building Envelope",
    desc: "Precision continuous weatherstripping, compression gaskets, and acoustic sealing to block uncontrolled outdoor particulate infiltration.",
    techSpecs: "Target infiltration rate < 1.0 ACH50 (Passive House benchmark: 0.6 ACH50). Prevents bypass of filtration system.",
    status: "R&D Prototype Specification"
  },
  {
    id: 2,
    title: "Acoustic Compression Door Seals",
    category: "Envelope Perimeter",
    desc: "Perimeter neoprene gaskets and automatic drop-down mechanical bottom sweep seals activating upon door latching.",
    techSpecs: "Reduces perimeter leakage by up to 85% while dampening urban corridor sound transmission (Rw ~32dB).",
    status: "Benchmarked to German DIN 18095"
  },
  {
    id: 3,
    title: "Compact Counterflow ERV Core",
    category: "Ventilation & Energy",
    desc: "Energy Recovery Ventilator with enthalpy polymer membrane for simultaneous sensible heat and latent moisture recovery.",
    techSpecs: "Sensible efficiency > 72%, Latent efficiency > 60%. Essential for Dhaka's hot/humid climate to prevent AC overload.",
    status: "Engineering Specification Defined"
  },
  {
    id: 4,
    title: "Architectural Air-Purifying Wall",
    category: "Interior Integration",
    desc: "Concealed wall-cavity distribution plenum with replaceable modular filtration panels integrated into decorative finishes.",
    techSpecs: "Low-velocity displacement airflow (< 0.2 m/s) eliminating draft sensation while maintaining continuous clean air delivery.",
    status: "Concept Under Architectural Investigation"
  },
  {
    id: 5,
    title: "Multi-Sensor Environmental Telemetry",
    category: "Intelligent Monitoring",
    desc: "Real-time laser particulate scattering (PM1.0, PM2.5, PM10), dual-beam NDIR CO₂, digital temperature, RH, and ambient sound.",
    techSpecs: "Dual-channel calibration with automatic baseline correction; closed-loop PWM fan control via Modbus/I2C.",
    status: "Functional IoT Hardware Stack"
  },
  {
    id: 6,
    title: "Solar PV & Battery Energy Resilience",
    category: "Power Architecture",
    desc: "Dedicated rooftop monocrystalline PV array coupled with LiFePO4 battery pack and hybrid charge controller for off-grid continuity.",
    techSpecs: "24V DC native system bus bypassing AC inverter losses; supports 8-12 hour continuous ventilation during grid shedding.",
    status: "Calculations Under Validation"
  },
  {
    id: 7,
    title: "Acoustic Attenuation Envelope",
    category: "Soundproofing",
    desc: "Multi-density acoustic decoupling batt insulation and constrained-layer damping drywalls to isolate heavy traffic noise.",
    techSpecs: "Target interior background noise < 35 dBA (NC-30) against 75-80 dBA exterior urban traffic baseline.",
    status: "Acoustic Simulation Pending"
  },
  {
    id: 8,
    title: "Furniture-Integrated Air Handling",
    category: "Interior Integration",
    desc: "Custom cabinetry, credenzas, and headboards housing low-noise BLDC tangential blowers and pre-filtration cartridges.",
    techSpecs: "Acoustically lined labyrinth air returns operating below 26 dBA at occupant breathing level.",
    status: "R&D Prototype Exploration"
  },
  {
    id: 9,
    title: "Balanced Air Distribution Pathways",
    category: "Mechanical Ventilation",
    desc: "Dedicated low-resistance ducting ensuring positive room pressurization (5-10 Pa) relative to exterior to resist infiltration.",
    techSpecs: "Balanced supply/exhaust CFM with HEPA H13 post-filtration (99.97% MPPS at 0.3 micron).",
    status: "Fluid Dynamics Validation Required"
  }
];

export const LEAKAGE_POINTS = [
  {
    id: 1,
    name: "Window Frame Perimeter",
    mechanism: "Differential thermal movement causing shim gaps between rough masonry opening and frame.",
    risk: "Uncontrolled bypass of PM2.5 and humid street air directly into occupant space.",
    mitigation: "Pre-compressed expanding polyurethane foam tapes (EPDM) and elastomeric acoustic sealants."
  },
  {
    id: 2,
    name: "Door Frame & Jamb Junction",
    mechanism: "Loose-fitting stop moldings and standard hollow architectural door frames.",
    risk: "Significant airflow leakage path and high-frequency sound transmission from corridors.",
    mitigation: "Continuous bulb-style silicone compression gaskets with mortised adjustable strikes."
  },
  {
    id: 3,
    name: "Door Bottom Undercut Gap",
    mechanism: "Standard 15mm-25mm clearance under doors for carpet/flooring clearance.",
    risk: "Primary leakage aperture; acts as acoustic megaphone and major air intake bypass.",
    mitigation: "Automatic surface or concealed mechanical drop seal with silicone fin actuating on door close."
  },
  {
    id: 4,
    name: "Drywall & Masonry Wall Joints",
    mechanism: "Micro-cracks in plaster, dry jointing, and perimeter wall-to-slab boundaries.",
    risk: "Diffused infiltration throughout the perimeter envelope over large surface area.",
    mitigation: "Flexible non-hardening acoustic caulking at all floor/ceiling junctions and corner beads."
  },
  {
    id: 5,
    name: "Electrical Switch & Outlet Boxes",
    mechanism: "Conduit pathways penetrating exterior walls acting as pressurized pneumatic straws.",
    risk: "Drafty unconditioned air bringing fine particulate dust behind electrical faceplates.",
    mitigation: "Airtight back-boxes with internal elastomer cable grommets and foam gasket faceplate inserts."
  },
  {
    id: 6,
    name: "Plumbing & AC Refrigerant Penetrations",
    mechanism: "Oversized core-drilled concrete penetrations around copper lines and drain pipes.",
    risk: "Bulk air intrusion, pest entry vectors, and thermal bridging.",
    mitigation: "Intumescent firestop sleeves combined with multi-layer acoustic elastomeric collar boots."
  },
  {
    id: 7,
    name: "Exhaust Vent & Duct Penetrations",
    mechanism: "Inadequate dampers allowing backdraft when exhaust fan is idle.",
    risk: "Reverse air contamination during windy conditions or high outdoor AQI events.",
    mitigation: "Spring-loaded motorized airtight backdraft dampers with dual EPDM perimeter seals."
  },
  {
    id: 8,
    name: "Ceiling-to-Wall Structural Junctions",
    mechanism: "Settlement gaps between suspended false ceilings and structural perimeter beams.",
    risk: "Hidden plenum infiltration bypassing primary interior room surface envelope.",
    mitigation: "Continuous vapour-permeable air barrier membrane taped directly to concrete structural slab."
  }
];

export const COMPETITORS = [
  {
    capability: "Air Purification (PM2.5/PM10)",
    purifier: "✓ Effective (recirculating)",
    ac: "— Minimal (coarse mesh only)",
    erv: "— Minimal unless upgraded",
    airtightRoom: "— None (requires equipment)",
    proposedSystem: "✓ Integrated Multi-Stage (HEPA + Carbon)"
  },
  {
    capability: "Continuous Fresh-Air Ventilation",
    purifier: "— Zero (recirculates stale air)",
    ac: "— None in standard split ACs",
    erv: "✓ Continuous balanced supply",
    airtightRoom: "— Suffocating without system",
    proposedSystem: "✓ Controlled Pressurized Fresh Air"
  },
  {
    capability: "CO₂ & VOC Dilution",
    purifier: "— Cannot reduce CO₂",
    ac: "— Increases CO₂ over time",
    erv: "✓ Dilutes to outdoor baseline",
    airtightRoom: "✗ Dangerous CO₂ buildup",
    proposedSystem: "✓ Closed-loop NDIR CO₂ Management"
  },
  {
    capability: "Airtight Building Envelope",
    purifier: "— Relies on leaky room",
    ac: "— No envelope improvement",
    erv: "— Typically independent",
    airtightRoom: "✓ High acoustic/air seal",
    proposedSystem: "✓ Engineered Envelope Sealing"
  },
  {
    capability: "Latent & Sensible Energy Recovery",
    purifier: "— None",
    ac: "— High energy penalty",
    erv: "✓ Enthalpy core exchange",
    airtightRoom: "— None",
    proposedSystem: "✓ Tropical ERV Optimized for Dhaka"
  },
  {
    capability: "Acoustic Noise Attenuation",
    purifier: "— Adds motor fan noise",
    ac: "— Compressor/fan vibration",
    erv: "— Duct noise if unbaffled",
    airtightRoom: "✓ High isolation",
    proposedSystem: "✓ Integrated Acoustic Silencers (<35 dBA)"
  },
  {
    capability: "Solar PV + Battery Off-Grid Backup",
    purifier: "— AC grid dependent",
    ac: "— Huge power requirement (kW)",
    erv: "— Standard AC mains",
    airtightRoom: "— Passive structure",
    proposedSystem: "✓ Low-Voltage 24V DC Resilient Bus"
  }
];

export const CUSTOMER_SEGMENTS = [
  {
    segment: "Premium Residential",
    target: "Upper-middle & high-income urban families, luxury penthouses, expats",
    painPoint: "High concern for children's asthma and sleep quality; tired of ugly freestanding purifiers with loud noise.",
    valueProp: "Bespoke architectural aesthetic, zero visible clutter, pure silent sleep sanctuary."
  },
  {
    segment: "Specialized Healthcare & Clinics",
    target: "High-end dental clinics, private consultation suites, IVF labs, luxury recovery rooms",
    painPoint: "Cross-contamination, airborne particulate contamination, high ambient traffic noise during consultation.",
    valueProp: "Positive-pressure sterile isolation, acoustic privacy for doctor-patient confidentiality."
  },
  {
    segment: "Private Education & Childcare",
    target: "International schools, executive tutoring centers, premium nurseries",
    painPoint: "High classroom CO₂ causes lethargy, cognitive decline, and increased viral transmission.",
    valueProp: "Maintains CO₂ < 600 ppm all day; verifiable real-time air quality dashboard for parents."
  },
  {
    segment: "Commercial Boardrooms & Suites",
    target: "Corporate headquarters, financial trading floors, embassies, recording studios",
    painPoint: "Sound leakage compromising confidential discussions; mental fatigue in sealed AC rooms.",
    valueProp: "Acoustically certified quietude with high-oxygen continuous fresh-air delivery."
  },
  {
    segment: "Green Real Estate Developers",
    target: "Boutique condominium builders, LEED-seeking commercial towers",
    painPoint: "Standard AC splits offer zero differentiation; rising buyer demand for wellness-certified residences.",
    valueProp: "Turnkey clean-air system adding 8-12% premium to property valuation."
  }
];

export const MARKETS = [
  {
    country: "Bangladesh",
    role: "Initial Market & Problem Environment (Ground Zero)",
    flag: "🇧🇩",
    points: [
      "Dhaka annual average PM2.5: 78.0 µg/m³ (15.6× WHO guideline); winter peaks exceed 175 µg/m³.",
      "High urban density, severe vehicular emissions, and rapid unregulated construction dust.",
      "Ubiquitous split AC use creates sealed, high-CO₂ traps with unconditioned window infiltration.",
      "Grid instability necessitates integrated battery/solar power resilience."
    ]
  },
  {
    country: "China",
    role: "Supply-Chain & Advanced Sourcing Ecosystem",
    flag: "🇨🇳",
    points: [
      "Mature manufacturing base for high-grade H13 HEPA and activated catalytic carbon media.",
      "Cost-effective BLDC EC electronically commutated low-noise tangential blowers.",
      "High-precision laser particulate (Plantower) and NDIR CO₂ optical sensor suppliers.",
      "Modular polymer enthalpy ERV core fabrication capabilities."
    ]
  },
  {
    country: "Canada",
    role: "Technology Benchmark & Long-Term Export Opportunity",
    flag: "🇨🇦",
    points: [
      "Global leader in cold/temperate airtight envelope standards (Passive House, R-2000, NBC).",
      "Mandatory balanced mechanical ventilation (HRV/ERV) in modern residential building codes.",
      "Target export destination for premium modular wellness room pods and high-end acoustic assemblies.",
      "Stringent certification pathways (CSA, UL, AHRI) validating global export readiness."
    ]
  }
];

export const WALL_CONCEPTS = [
  {
    code: "Concept A",
    title: "Integrated Architectural Filtration Wall",
    desc: "Filter media integrated directly into double-stud wall cavity. Low-velocity laminar air induction across custom acoustic fabric facings.",
    status: "R&D Investigation Phase"
  },
  {
    code: "Concept B",
    title: "Furniture-Integrated Air Return Cassette",
    desc: "Air circulation channels concealed within baseboards and architectural credenzas. Occupant breathing-zone air circulation with zero duct exposure.",
    status: "Industrial Design Prototyping"
  },
  {
    code: "Concept C",
    title: "Low-Velocity Displacement Wall Plenum",
    desc: "Cool, ultra-filtered air introduced at floor level with natural thermal buoyancy carrying heat, bio-effluents, and CO₂ upward to high-level exhaust.",
    status: "Fluid Simulation Modeling"
  },
  {
    code: "Concept D",
    title: "Modular Magnetic Interchangeable Filter Tiles",
    desc: "Wall panel system with quick-release magnetic architectural faces allowing tool-less 60-second filter replacements without technical service calls.",
    status: "Mechanical Latching Evaluation"
  }
];

export const ROADMAP = {
  phase1: {
    title: "WEEK 3 — BUILDING ENVELOPE & INTERIOR ARCHITECTURE",
    deliverables: [
      { id: "W3-01", name: "Airtight Room Envelope Design", desc: "Detailed structural sealing strategy, vapor barrier positioning, and penetration specs." },
      { id: "W3-02", name: "Comprehensive Air Leakage Map", desc: "Identification and cataloging of all 8 perimeter infiltration vectors with seal types." },
      { id: "W3-03", name: "Soundproof Acoustic Layering", desc: "Decoupled drywall, mass-loaded vinyl, and acoustic insulation composite matrix." },
      { id: "W3-04", name: "Acoustic Material Performance Study", desc: "Comparative transmission loss (STC/Rw) testing across locally available materials." },
      { id: "W3-05", name: "Door & Window Compression Gasket Spec", desc: "EPDM, silicone bulb, and automatic mechanical drop seal durability analysis." },
      { id: "W3-06", name: "Mechanical Ventilation Airflow Balance", desc: "CFM calculations, duct sizing, low-velocity diffusers, and 5-10 Pa positive pressure design." },
      { id: "W3-07", name: "Tropical ERV Enthalpy Core Selection", desc: "Polymer membrane testing for moisture recovery in Dhaka's 85% RH summer conditions." },
      { id: "W3-08", name: "Air-Purifying Wall Architectural Integration", desc: "Plenum dimensioning and aesthetic architectural surface material compatibility." },
      { id: "W3-09", name: "Furniture Integration Engineering", desc: "Concealed airflow labyrinths and vibration isolation mounts for quiet operation." },
      { id: "W3-10", name: "Solar PV & Battery Integration", desc: "24V DC power budget, charge controller spec, and off-grid emergency backup runtime." }
    ]
  },
  phase2: {
    title: "WEEK 4 — BUSINESS MODEL, SOURCING & FINANCIAL FEASIBILITY",
    deliverables: [
      { id: "W4-01", name: "Bill of Materials (BOM) Compilation", desc: "Granular component cost sheet across envelope, ventilation, filters, sensors, and power." },
      { id: "W4-02", name: "Single-Room MVP Prototype Costing", desc: "Complete fabrication budget for proof-of-concept testing suite in Dhaka." },
      { id: "W4-03", name: "Target Retail Price & Tiering Analysis", desc: "Market-calibrated price points across residential retrofit, new-build, and B2B packages." },
      { id: "W4-04", name: "Gross Margin & COGS Progression Model", desc: "Target 45-55% hardware gross margin at scaled manufacturing volumes." },
      { id: "W4-05", name: "Recurring Consumables Revenue Model", desc: "HaaS subscription architecture for semi-annual HEPA and activated carbon filter packs." },
      { id: "W4-06", name: "Bangladesh Customer Willingness-to-Pay Study", desc: "Structured surveys with upper-middle class homeowners, doctors, and school administrators." },
      { id: "W4-07", name: "China Supply-Chain Sourcing Map", desc: "Tier-1 supplier shortlists for BLDC blowers, ERV cores, HEPA media, and IoT controllers." },
      { id: "W4-08", name: "Canada Certification & Export Feasibility", desc: "CSA/UL electrical safety, ASHRAE 62.2, and Passive House compliance requirements." },
      { id: "W4-09", name: "B2B Channel Strategy & Contractor Partnerships", desc: "Architect, interior designer, and HVAC installer revenue share and certification program." },
      { id: "W4-10", name: "Three-Year Comprehensive Financial Projections", desc: "36-month P&L, unit sales forecast, working capital requirements, and break-even timeline." }
    ]
  }
};

export const RISKS = {
  technical: [
    { name: "Envelope Airtightness Inconsistencies", severity: "High", mitigation: "Standardized pre-fabricated gasket kits and mandatory blower-door test sign-off." },
    { name: "Condensation & Mold in Humid Weather", severity: "Critical", mitigation: "Enthalpy ERV core recovering latent moisture; humidity sensor triggering auto-dehumidification." },
    { name: "Filter Pressure Drop & Airflow Loss", severity: "Medium", mitigation: "Oversized deep-pleat filter cassettes minimizing face velocity and static resistance." },
    { name: "Acoustic Fan & Duct Resonance", severity: "Medium", mitigation: "Silicone vibration dampers, sound attenuators, and variable speed EC motors running at <50% capacity." },
    { name: "Sensor Calibration Drift", severity: "Medium", mitigation: "Dual-beam optical NDIR CO₂ sensors with auto-calibration and field-swappable sensor cassettes." },
    { name: "Maintenance & Filter Access Resistance", severity: "High", mitigation: "Tool-free magnetic panel access; mobile app notifying replacement based on real particulate load." },
    { name: "Local Replacement Filter Availability", severity: "High", mitigation: "Standardized universal dimensions; local buffer warehousing of 2-year consumable inventory." },
    { name: "Excess Power Draw on Backup Battery", severity: "Medium", mitigation: "Ultra-high efficiency brushless DC motors consuming under 45 Watts on balanced mode." }
  ],
  commercial: [
    { name: "Customer Sticker Shock / Initial CapEx", severity: "High", mitigation: "Equipment leasing, 0% EMI financing, and tiered modular retrofit options." },
    { name: "Installation Complexity & Contractor Errors", severity: "Critical", mitigation: "In-house certified installation teams; pre-assembled modular cassette units." },
    { name: "Consumer Confusion with Cheap Air Purifiers", severity: "High", mitigation: "Aggressive R&D demonstrations comparing unventilated CO₂ spikes vs true fresh air delivery." },
    { name: "Incumbent HVAC Brand Counter-Moves", severity: "Medium", mitigation: "Patent proprietary air-purifying wall architecture; lock in B2B developer partnerships." },
    { name: "Slow Market Adoption Rate", severity: "Medium", mitigation: "Live demonstration showroom in Gulshan/Banani showcasing real-time telemetry comparison." }
  ],
  regulatory: [
    { name: "Bangladesh Building Code (BNBC) Compliance", severity: "Medium", mitigation: "Engage local mechanical engineering professors and RAJUK-registered consultants." },
    { name: "Electrical Safety Standards (BSTI / IEC)", severity: "Medium", mitigation: "Design to CE/IEC 60335 standards from day one; utilize pre-certified power supplies." },
    { name: "Ventilation Standards Compliance (ASHRAE 62.2)", severity: "Low", mitigation: "System engineered to exceed ASHRAE continuous outdoor airflow requirements." },
    { name: "Health Product Advertising Regulations", severity: "High", mitigation: "Strict non-medical environmental wellness positioning; zero curative claims." },
    { name: "Canadian / US Import Certification (CSA / UL)", severity: "Medium", mitigation: "Engage accredited testing lab (Intertek/UL) during Year 2 prototype maturity." }
  ],
  supplyChain: [
    { name: "China Port Congestion & Tariff Volatility", severity: "High", mitigation: "Maintain 90-day buffer inventory; evaluate secondary sourcing in Vietnam/Thailand." },
    { name: "Component Lead Time Uncertainty", severity: "Medium", mitigation: "Design with drop-in compatible alternative microcontrollers and standard filter sizes." },
    { name: "Shipping Cost Inflation", severity: "Medium", mitigation: "Localize metal/wood cabinetry in Bangladesh; import only high-tech core components." },
    { name: "Spare Parts Obsolescence", severity: "Low", mitigation: "5-year guaranteed component availability contractual clauses with tier-1 suppliers." },
    { name: "Local Assembly Quality Variance", severity: "High", mitigation: "End-of-line digital QA testing rig checking CFM, pressure drop, and electrical safety." }
  ]
};

export const BOM_CATEGORIES = [
  { item: "Airtight Envelope & Gasket Package", share: "12%", note: "Compression EPDM seals, acoustic drop seals, sealant" },
  { item: "Balanced Enthalpy ERV Core", share: "22%", note: "Polymer latent exchange core with dual EC centrifugal blowers" },
  { item: "Multi-Stage Filtration Cassette", share: "14%", note: "G4 pre-filter + True H13 HEPA (99.97%) + Activated Carbon" },
  { item: "Sensor Suite & Telemetry Controller", share: "11%", note: "Laser PM2.5, NDIR CO₂, Temp/RH, ESP32 IoT gateway" },
  { item: "Acoustic Silencers & Duct Attenuation", share: "9%", note: "Micro-perforated acoustic baffles and decoupled duct sleeves" },
  { item: "Architectural Wall / Furniture Plenum", share: "13%", note: "Powder-coated aluminum frame, magnetic grilles, sound fabric" },
  { item: "Solar PV + LiFePO4 Battery Subsystem", share: "12%", note: "200W panel + 24V 50Ah battery + MPPT charge controller (optional add-on)" },
  { item: "Assembly, Factory QA & Commissioning", share: "7%", note: "Quality testing, blower-door field calibration" }
];

export const IMAGE_SOURCES = {
  hero: {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    description: 'Modern architectural interior with clean floor-to-ceiling glass and natural lighting',
    photographer: 'RArchitecture',
    source: 'Unsplash',
    license: 'Unsplash License',
    usage: 'Hero section background overlay'
  }
};
