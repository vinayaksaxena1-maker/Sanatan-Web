# 📜 Vedic Astronomical Engine: 11-Benchmark Calibration & Triple Ground-Truth Verification Plan

> **Project:** Sanatan Web (`D:\Sanatan Web`)  
> **Target:** 100% Mathematical Rigour, Zero-Drift vs Official Government & Global Standards  
> **Status:** APPROVED & LOCKED FOR EXECUTION  

---

## 🎯 1. Triple Ground-Truth Verification Protocol (Teeno Independent Sources)

Har ek benchmark ko test aur verify karne ke liye **3 independent external sources** use kiye jayenge taaki kisi ek private ya public system ke bias ka risk na rahe:

| Layer / Parameter | Ground Truth Source 1 (Private Gold Standard) | Ground Truth Source 2 (Govt of India Official) | Ground Truth Source 3 (Global Scientific Standard) |
|---|---|---|---|
| **Ayanamsha & Precession** | **Drik Panchang** (`drikpanchang.com`) | **PAC Kolkata Digital Portal** (`packolkata.imd.gov.in/panchang/en`) | **Swiss Ephemeris** (`astro.com/swisseph`) |
| **Panchang Angas (Tithi, Nakshatra, etc.)** | **Drik Panchang** | **Rashtriya Panchang** (Saka 1948 / 2026-27 via PAC Portal) | **NASA JPL Horizons** (Ecliptic angular delta) |
| **Sunrise / Sunset / Refraction** | **Drik Panchang** (Civil Topocentric) | **PAC Kolkata** (Official Indian Standard Horizon & Refraction) | **NOAA Solar Calculator** (USNO Zenith $90.833^\circ$) |
| **Planetary Longitudes & True Nodes**| **Drik Panchang** (Grah Sthiti - True Node) | **PAC Kolkata** (Nirayana Longitudes Table) | **NASA JPL Horizons** (DE441 State Vectors) |
| **Rahu Kaal & Choghadiya** | **Drik Panchang** Dynamic Muhurta | **Rashtriya Panchang** Dinamana Standards | **BPHS Astronomical Slicer** |
| **Bhava Chalit (House Cusps)** | **Drik Panchang Kundali** (Sripati Mode) | **PAC Kolkata** (City Lagnas & Midday) | **Jagannatha Hora** (Sripati Engine Reference) |

---

## 📏 2. Acceptance Tolerance Thresholds (Pass/Fail Gates)

| Parameter Type | Maximum Allowable Delta | Verification Verdict |
|---|---|---|
| **Suryodaya / Suryast** | $\le \pm 30\text{ to } 45\text{ seconds}$ | **PASS** (Otherwise FAIL) |
| **Sun / Moon Longitudes** | $\le \pm 0^\circ\ 00'\ 30"\ (30\text{ arcseconds})$ | **PASS** (Otherwise FAIL) |
| **Planetary Longitudes (Mars..Saturn)** | $\le \pm 0^\circ\ 01'\ 30"\ (90\text{ arcseconds})$ | **PASS** (Otherwise FAIL) |
| **True Rahu / Ketu Longitude** | $\le \pm 0^\circ\ 01'\ 00"\ (1\text{ arcminute})$ | **PASS** (Otherwise FAIL) |
| **Tithi / Nakshatra End Moments** | $\le \pm 1\text{ to } 2\text{ minutes}$ | **PASS** (Otherwise FAIL) |
| **Ahoratra Day Boundary (Night births)** | Exact Match ($0\text{ drift}$ in Vaar / Dina-Lord) | **PASS** (Otherwise FAIL) |
| **High Latitude / Polar Behaviour** | Zero crash, zero `NaN`, graceful polar fallback | **PASS** (Otherwise FAIL) |

---

## 🏗️ 3. Execution Roadmap: Phase-by-Phase Plan

---

### 🪐 PHASE 1: Core Astronomy & Ephemeris Layer
**Target Files:**  
* `src/engine/astronomicalEngine.ts`  
* `src/engine/core/sanatan_jpl_bridge.ts`  
* `src/engine/types.ts`

#### Benchmarks Covered:
* **Benchmark 4:** Ayanamsha Precision (Chitrapaksha Lahiri Drift)
* **Benchmark 7:** True Node vs Mean Node (Rahu/Ketu 1° 45' Gap)
* **Benchmark 5:** Coordinate Truncation (VSOP87 Planetary Accuracy)
* **Benchmark 6:** Topocentric vs Geocentric (Lunar Parallax Separation)
* **Benchmark 11:** Vakri (Retrograde) Stationing & Sankranti Ingress (Root-Finding)

#### Implementation Steps:
1. **B4:** Precession polynomial me IAU nutation in longitude add karna; PAC Kolkata (`packolkata.imd.gov.in/panchang/en`) ke official Lahiri Ayanamsha se calibrate karna.
2. **B7:** `astronomicalEngine.ts` me True Node algorithm implement karna; default view ko **True Rahu** par set karna (Drik Panchang aur JPL se match karne ke liye).
3. **B5 & B6:** Geocentric longitudes Tithi ke liye aur Topocentric parallax Moonrise/Moonset ke liye isolate karna.
4. **B11:** Linear interpolation ki jagah Newton-Raphson/Brent method se 0-velocity stationing aur Sankranti ingress calculate karna.

#### Triple-Source Testing Vectors:
* **Test Vector 1:** Today's Live Date (`2026-10-25`), New Delhi coordinates (`28.6139° N, 77.2090° E`).
* **Test Vector 2:** Solar Ingress / Sankranti moment.

#### Mandatory Phase 1 Delta Report Format:
```markdown
### 📋 Phase 1 Completion & Delta Verification Report
- **Files Modified:** [list of files and exact math changes]
- **Delta Matrix:**
| Metric | Source 1 (Drik) | Source 2 (PAC Govt) | Source 3 (JPL/Swiss) | Sanatan Web | Delta vs S1 | Delta vs S2 | Status |
|---|---|---|---|---|---|---|---|
| Lahiri Ayanamsha | 24° 13' 48" | 24° 13' 48" | 24° 13' 46" | 24° 13' 47" | -1" | -1" | PASS |
| True Rahu Degree | 22° 14' 10" | 22° 14' 11" | 22° 14' 08" | 22° 14' 10" | 0" | -1" | PASS |
| Sun Longitude | ... | ... | ... | ... | ... | ... | PASS |
| Moon Longitude | ... | ... | ... | ... | ... | ... | PASS |
```

---

### ☀️ PHASE 2: Solar Horizon, Ahoratra & Temporal Foundation
**Target Files:**  
* `src/engine/astronomicalEngine.ts`  
* `src/engine/panchangCalc.ts`  
* `src/engine/muhuratRules.ts`  
* `src/engine/facade/inputResolver.ts`

#### Benchmarks Covered:
* **Benchmark 1:** Suryodaya & Suryast (Refraction -50' arcmin + Altitude Dip Angle)
* **Benchmark 2:** Ahoratra Bug (Midnight 00:00 to Sunrise Day Boundary)
* **Benchmark 3:** Dinamana / Ratrimana (Dynamic 1/8th Division vs Flat 90-min)

#### Implementation Steps:
1. **B1:** Standard Refraction (`-0.8333°`) ke sath atmospheric elevation dip formula jodna:
   $$\text{Dip} = 0.0293^\circ \times \sqrt{h \text{ (meters)}}$$
   Aur PAC Kolkata ke metro sunrise standards se cross-verify karna.
2. **B2:** `inputResolver.ts` me temporal interceptor lagana: Agar `birthTime < localSunrise`, to `vedicDate = calendarDate - 1 day` set ho, Vaar aur Dina-Lord automatic pichhle din map ho.
3. **B3:** Verify karna ki Rahu Kaal, Yamaganda aur 8 Choghadiya Dinamana (`Sunset - Sunrise`) aur Ratrimana (`NextSunrise - Sunset`) se dynamically slice ho rahe hain.

#### Triple-Source Testing Vectors:
* **Test Vector 1 (Plains):** New Delhi (`28.6139° N, 77.2090° E`, elevation 216m).
* **Test Vector 2 (High Altitude):** Shimla (`31.1048° N, 77.1734° E`, elevation 2200m).
* **Test Vector 3 (Ahoratra Night Birth):** Date `26-Oct-2026`, Time `02:30 AM` (Expected Vaar: Ravivar, not Somwar).
* **Test Vector 4 (Seasonal Extremes):** Summer Solstice (`21 June`) aur Winter Solstice (`22 December`).

#### Mandatory Phase 2 Delta Report Format:
```markdown
### 📋 Phase 2 Completion & Delta Verification Report
- **Files Modified:** [list of files and exact changes]
- **Delta Matrix:**
| Metric | Source 1 (Drik) | Source 2 (PAC Govt) | Source 3 (NOAA/USNO) | Sanatan Web | Delta vs S1 | Delta vs S2 | Status |
|---|---|---|---|---|---|---|---|
| Sunrise (Delhi) | 06:28:15 | 06:28:00 | 06:28:10 | 06:28:12 | -3s | +12s | PASS |
| Sunrise (Shimla) | 06:24:30 | 06:24:20 | 06:24:25 | 06:24:28 | -2s | +8s | PASS |
| 02:30 AM Vaar | Ravivar | Ravivar | Ravivar | Ravivar | 0 | 0 | PASS |
| Rahu Kaal (June 21)| 102 mins | 102 mins | 102 mins | 102 mins | 0m | 0m | PASS |
```

---

### 🏛️ PHASE 3: Angas, Bhavas & Edge-Cases
**Target Files:**  
* `src/engine/panchangCalc.ts`  
* `src/engine/kundli/houseCusps.ts`  
* `src/engine/vrataNirnaya.ts`

#### Benchmarks Covered:
* **Benchmark 8:** Kshaya & Vriddhi Tithi (Continuous Boundary Scanner)
* **Benchmark 9:** Bhava Chalit House Systems (Sripati Parashari 15° Standard)
* **Benchmark 10:** High-Latitude & Polar Singularity (>55° Latitude Safeguards)

#### Implementation Steps:
1. **B8:** Discrete daily loop ki jagah continuous event scanner lagana jo sunrise-to-sunrise ke beech aane-jaane wali Kshaya Tithi ko record kare aur PAC/Drik festival rules se align kare.
2. **B9:** `houseCusps.ts` me Parashari Sripati padhati me Lagna ko 1st house ka Madhya lock karna aur PAC local midday & Jagannatha Hora standard se verify karna.
3. **B10:** High latitude ($|\text{lat}| > 55^\circ$) ke liye guards lagana jahan polar day/night me trigonometric functions crash na hon aur standard polar fallback enable ho.

#### Testing Vectors:
* **Test Vector 1 (Kshaya Tithi):** Historical / upcoming Kshaya tithi date.
* **Test Vector 2 (Bhava Chalit):** Borderline Lagna (`28° Mesh`) tested against Jagannatha Hora & Drik Sripati mode.
* **Test Vector 3 (Polar Region):** Tromsø, Norway (`69.6492° N, 18.9553° E`) in June/December.

#### Mandatory Phase 3 Delta Report Format:
```markdown
### 📋 Phase 3 Completion & Delta Verification Report
- **Files Modified:** [list of files and exact changes]
- **Delta Matrix:**
| Metric | Source 1 (Drik) | Source 2 (PAC Govt) | Source 3 (J.Hora) | Sanatan Web | Delta vs S1 | Delta vs S2 | Status |
|---|---|---|---|---|---|---|---|
| Kshaya Tithi Detected | Yes (Pratipada) | Yes (Pratipada) | Yes (Pratipada) | Yes (Pratipada) | Match | Match | PASS |
| 1st House Cusp (Sripati) | 13° 15' | 13° 15' (Lagna) | 13° 15' | 13° 15' | 0' | 0' | PASS |
| Polar Day Run (Tromsø) | Non-crash | Non-crash | Non-crash | Non-crash | Clean | Clean | PASS |
```

---

### 🧪 PHASE 4: Final 5-Vector Master Stress Test & Deployment
* **Objective:** Comprehensive end-to-end verification and certification. Zero architectural changes.
* **5 Universal Test Vectors:**
  1. Plain City (Delhi)
  2. High Elevation (Shimla)
  3. Ahoratra Night Birth (02:30 AM)
  4. Ingress / Eclipse Day
  5. High Latitude (London / Oslo)
* **Action:**
  * Run `npm run test` (confirm 1,902+ engine tests pass).
  * Run `npm run build` (confirm 0 TypeScript/Vite errors).
  * Generate master certificate report.
  * Git commit & live production deployment.

---

## 📌 Rules of Engagement for Execution:
1. **Never Skip Ahead:** Phase 1 complete hokar verify hoga, tabhi Phase 2 chalu hoga.
2. **Triple-Check Mandatory:** Drik Panchang, PAC Kolkata Govt Portal, aur Swiss/JPL teeno ke reference ke sath delta report har phase ke turant baad aayegi.
3. **Transparent Reporting:** Jahan bhi difference permissible threshold se zyada hoga, wahan turant **FAIL** likha jayega aur root-cause fix kiya jayega.
