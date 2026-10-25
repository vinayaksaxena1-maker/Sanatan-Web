# 📜 Vedic Astronomical Engine: 11-Benchmark Calibration & Deep Audit Addendum Plan

> **Project:** Sanatan Web (`D:\Sanatan Web`)  
> **Target:** 100% Mathematical Rigour, Metrological Error Distribution & Zero-Drift vs Global Standards  
> **Status:** APPROVED & AUDIT-LOCKED  

---

## 🎯 1. Triple Ground-Truth Verification Protocol & Source Provenance

Har ek benchmark ko test aur verify karne ke liye **3 independent external sources** use kiye jayenge. Har source ke sath uska **version, coordinate frame, time scale, aur calculation flags** record karna mandatory hai:

| Layer / Parameter | Ground Truth Source 1 (Consumer & Jyotish Standard) | Ground Truth Source 2 (Govt of India Official) | Ground Truth Source 3 (Scientific Ephemeris Standard) |
|---|---|---|---|
| **Ayanamsha & Precession** | **Drik Panchang** (`drikpanchang.com` - Chitrapaksha Lahiri) | **PAC Kolkata Digital Portal** (`packolkata.imd.gov.in/panchang/en` - Saka 1948) | **Swiss Ephemeris** (`astro.com/swisseph` via `-sid1` flag) |
| **Panchang Angas (Tithi, Nakshatra, etc.)** | **Drik Panchang** (Udayatithi & Dynamic Boundary) | **Rashtriya Panchang** (PAC Published Standards) | **NASA JPL Horizons** (DE440 for 2000-2050, DE441 for historical) |
| **Sunrise / Sunset / Refraction** | **Drik Panchang** (Civil Topocentric) | **PAC Kolkata** (Indian Standard Horizon & Refraction) | **NOAA Solar Calculator** (USNO Zenith $90.833^\circ$ baseline) |
| **Planetary Longitudes & True Nodes**| **Drik Panchang** (Grah Sthiti - True Node view) | **PAC Kolkata** (Nirayana Longitudes Table) | **NASA JPL Horizons** (ICRF / Ecliptic of-date conversion) |
| **Rahu Kaal & Choghadiya** | **Drik Panchang** (Dynamic Dinamana Slicer) | **Rashtriya Panchang** (Dinamana 8-part division) | **BPHS Astronomical Slicer** |
| **Bhava Chalit (House Cusps)** | **Drik Panchang Kundali** (Sripati Mode) | **PAC Kolkata** (City Lagnas & Midday) | **Jagannatha Hora** (Sripati Quadrant Trisecting Reference) |

> ⚠️ **Metrological Rule:** Do sources ka aapas me match hona tabhi "Independent Confirmation" maana jayega jab unke underlying ephemeris (DE440 vs VSOP87 vs ELP2000) aur coordinate frames documented hon.

---

## 📏 2. Acceptance Tolerance Metrology (Provisional Gates)

Universal constant limits ke bajaye parameter-wise thresholds set kiye gaye hain:

| Parameter Type | Provisional Max Delta | Target P95 Error | Verification Verdict |
|---|---|---|---|
| **Suryodaya / Suryast** | $\le \pm 45\text{ seconds}$ | $\le 15\text{ seconds}$ | **PASS** (Otherwise FAIL) |
| **Sun / Moon Longitudes** | $\le \pm 0^\circ\ 00'\ 30"\ (30")$ | $\le 10"$ | **PASS** (Otherwise FAIL) |
| **Planetary Longitudes (Mars..Saturn)** | $\le \pm 0^\circ\ 01'\ 30"\ (90")$ | $\le 30"$ | **PASS** (Otherwise FAIL) |
| **True Rahu / Ketu Longitude** | $\le \pm 0^\circ\ 01'\ 00"\ (60")$ | $\le 20"$ | **PASS** (Otherwise FAIL) |
| **Tithi / Nakshatra End Moments** | $\le \pm 2\text{ minutes}$ | $\le 45\text{ seconds}$ | **PASS** (Otherwise FAIL) |
| **Ahoratra Day Boundary (Night births)** | Exact Match ($0\text{ drift}$ in Vaar / Dina-Lord) | $0\text{ drift}$ | **PASS** (Otherwise FAIL) |
| **High Latitude / Polar Behaviour** | Zero crash, zero `NaN`, explicit status code | Zero crash | **PASS** (Otherwise FAIL) |

---

## 🔬 3. Deep Audit Correction Addendum (6 Critical Verification Pillars)

Yeh addendum engine ki buniyadi accuracy ko zameeni kasauti par parkhta hai:

### Pillar A: Mathematical Invariants (Priority: Very High)
* **Tithi Angular Invariant:** Har sample point par $\text{Tithi} = \lfloor (\lambda_{\text{Moon}} - \lambda_{\text{Sun}} \pmod{360^\circ}) / 12^\circ \rfloor + 1$ mathematically 100% hold hona chahiye.
* **Nakshatra / Yoga / Karana Invariant:**
  * Nakshatra $= \lfloor \lambda_{\text{Moon}} / 13^\circ\ 20' \rfloor + 1$
  * Yoga $= \lfloor (\lambda_{\text{Sun}} + \lambda_{\text{Moon}} \pmod{360^\circ}) / 13^\circ\ 20' \rfloor + 1$
  * Karana $= \text{Half-Tithi } (6^\circ \text{ segment})$
* **Circular Angle Normalization:** $0^\circ / 360^\circ$ wrap-around boundary par negative angles ya $>360^\circ$ angles ka zero-error normalization ($[-1^\circ \to 359^\circ]$).

### Pillar B: Time Engine & Calendar Integrity (Priority: Very High)
* **Time Scale Transformations:** UTC $\leftrightarrow$ TT (Terrestrial Time) $\leftrightarrow$ TDB $\leftrightarrow$ Local Civil Time / IST ($+5:30$) ka precision conversion.
* **Julian Day & Date Boundary:** Leap year (century/non-century), Julian $\to$ Gregorian calendar transition, Kali Ahargana alignment.
* **Midnight vs Suryodaya Boundary:** Raat `00:00:00` se `Suryodaya` ke beech civil date change hoti hai, lekin Vedic Ahoratra Vaar aur Dina-Lord pichhle din ke sunrise se locked rehte hain.
* **Historical Timezone Jumps:** Historical charts ke liye DST (Daylight Saving) aur historical timezone changes ($+5:21:14 \to +5:30$) ka handling.

### Pillar C: Boundary & Event-Solving Accuracy (Priority: Very High)
* **Continuous Root-Finding:** Linear interpolation ki jagah Newton-Raphson ya Brent's Method ka use.
* **3-Point Boundary Stress Test:**
  * Exact Boundary se **1 second pehle** ($T - 1\text{s}$)
  * Exact Boundary moment par ($T$)
  * Exact Boundary se **1 second baad** ($T + 1\text{s}$)
  * Test: Kya tithi/nakshatra index expected sequence me change hota hai bina oscillation ya jitter ke?
* **Residual Error Measurement:** Calculate kiye gaye event time $T$ par planetary position dobara evaluate karke residual error $(\epsilon < 0.001")$ verify karna.

### Pillar D: Geography & Observer Model (Priority: High)
* **Topocentric vs Geocentric Separation:** Tithi/Nakshatra ke liye Geocentric Nirayana longitudes, jabki Moonrise/Moonset/Eclipse ke liye Topocentric Horizontal Parallax ($~1^\circ$) apply karna.
* **Elevation Dip & Refraction:** Standard horizon ($h_0 = -0.8333^\circ$) me observer elevation ($h$ meters) dip add karte waqt double-counting avoid karna:
  $$\text{True Zenith} = 90^\circ + 0.8333^\circ + 0.0293^\circ \sqrt{h}$$
* **Polar Strict Contracts (>55° / Polar Circles):** Jab suraj 24 ghante na doobey (Midnight Sun) ya na ugey (Polar Night), engine koi artificial/fake sunrise time generate nahi karega; balki strictly `{ status: 'POLAR_DAY', sunrise: null, sunset: null }` ya `{ status: 'POLAR_NIGHT' }` return karega.

### Pillar E: Panchang Rules & Tradition Consistency (Priority: High)
* **Udayatithi vs Instant-based Selection:** Vrat aur dynamic muhurta ke beech udayatithi niyam vs instantaneous tithi ka clear architectural separation.
* **Kshaya & Vriddhi Tithi Lifecycle:** Sunrise-to-sunrise ke beech aane-jaane wali Kshaya Tithi ko continuous scanner se detect karna taaki festival determination fail na ho.
* **Rahu Kaal Weekday Sequence:** Dinamana ke 8 hisso me weekday ke hisaab se correct slot pick karna (Mon: 2nd, Sat: 3rd, Fri: 4th, Wed: 5th, Thu: 6th, Tue: 7th, Sun: 8th), zero fixed-duration assumptions.
* **Sripati House Trisector Geometry:** Lagna aur MC (Midheaven) nikal kar quadrant ko 3 barabar hisson me baantna (No fixed 15° Equal house assumption).

### Pillar F: Regression, Reproducibility & Failure Logging (Priority: High)
* **Deterministic Runs:** Seeded random dates aur historical dates ko repeat run karne par exact bit-level identical output aana chahiye.
* **Cache Integrity:** Panchang cache se nikla result aur fresh calculation ka result $100\%$ identical hona chahiye.
* **Silent Fallback & NaN Detection:** Invalid coordinates (e.g. Lat $>90^\circ$) par engine silent wrong calculation nahi karega; structured validation error throw karega.
* **Failure Telemetry:** Har test failure par `{ inputDate, coordinates, expected, actual, signedDelta, failureCategory }` JSON format me log hoga.

---

## 📊 4. Scientific Error Metrology (No Fake 99% Blanket Scores)

Report me koi single misleading accuracy percentage nahi aayega. Engine ka scorecard 6 alag metrological metrics me bat-ta hai:

1. **Numerical Accuracy:** Mean Error, Median Error, Maximum Error, aur P95 Error (arcseconds & seconds).
2. **Boundary Accuracy:** Event timing error (seconds me) aur transition classification accuracy.
3. **Functional Correctness:** Category-wise Pass / Total tests ($N \ge 10,000$ automated test vectors).
4. **Robustness:** Invalid inputs, polar edge-cases, aur zero crash rate.
5. **Reproducibility:** Repeat calculation runs me zero divergence ($100\%$ determinism).
6. **Reference Agreement:** Har external source ke sath **Signed Delta ($\Delta = \text{Actual} - \text{Expected}$)** aur **Absolute Delta ($|\Delta|$)** report hoga taaki systematic bias detect ho sake.

---

## 🏗️ 5. Phase-by-Phase Execution Roadmap

### 🪐 PHASE 1: Core Astronomy & Ephemeris Layer
* **Benchmarks:** B4 (Ayanamsha), B7 (True Node vs Mean Node), B5 (Coordinate Truncations), B6 (Lunar Parallax), B11 (Stationing/Ingress).
* **Target Files:** `src/engine/astronomicalEngine.ts`, `src/engine/core/sanatan_jpl_bridge.ts`, `src/engine/types.ts`.
* **Testing:** Triple Ground-Truth (Drik, PAC Saka 1948, Swiss Ephemeris DE440/441).

### ☀️ PHASE 2: Solar Horizon, Ahoratra & Temporal Foundation
* **Benchmarks:** B1 (Sunrise Refraction & Elevation Dip), B2 (Ahoratra 00:00 Boundary), B3 (Dynamic Dinamana).
* **Target Files:** `src/engine/astronomicalEngine.ts`, `src/engine/panchangCalc.ts`, `src/engine/muhuratRules.ts`, `src/engine/facade/inputResolver.ts`.
* **Testing:** Delhi, Shimla (elevation), 02:30 AM night birth, Summer/Winter Solstices.

### 🏛️ PHASE 3: Angas, Bhavas & Edge-Cases
* **Benchmarks:** B8 (Kshaya/Vriddhi Scanner), B9 (Sripati Quadrant Trisector), B10 (Polar Safeguards & Contracts).
* **Target Files:** `src/engine/panchangCalc.ts`, `src/engine/kundli/houseCusps.ts`, `src/engine/vrataNirnaya.ts`.
* **Testing:** Known Kshaya Tithi, Jagannatha Hora Sripati comparison, Tromsø Norway polar contract.

### 🧪 PHASE 4: Invariant-Driven 10,000-Vector Master Stress Test & Deployment
* Automated invariant test suite run.
* P95, Mean, Max error distribution scorecard generation.
* Zero-regression validation, clean build, and production deployment.
