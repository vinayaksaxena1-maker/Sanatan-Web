# 📜 Vedic Astronomical Engine: 11-Benchmark Calibration & Deep Audit Addendum Plan

> **Project:** Sanatan Web (`D:\Sanatan Web`)  
> **Target:** 100% Mathematical Rigour, Metrological Error Distribution & Zero-Drift vs Global Standards  
> **Status:** EXHAUSTIVE SPECIFICATION & FINAL AUDIT CONTRACT (LOCKED)  

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

## 📏 2. Acceptance Tolerance Metrology & Source Resolution Limits

| Parameter Type | Provisional Max Delta | Target P95 Error | Ground Truth Resolution Limits & Caveats |
|---|---|---|---|
| **Suryodaya / Suryast** | $\le \pm 45\text{ seconds}$ | $\le 15\text{ seconds}$ | PAC published data is rounded to nearest minute (`hh:mm`); seconds comparison only valid against NOAA/Drik. |
| **Sun / Moon Longitudes** | $\le \pm 0^\circ\ 00'\ 30"\ (30")$ | $\le 10"$ | JPL ICRF to of-date ecliptic conversion required; TT vs UTC $\Delta T$ epoch offset must be accounted for. |
| **Planetary Longitudes (Mars..Saturn)** | $\le \pm 0^\circ\ 01'\ 30"\ (90")$ | $\le 30"$ | Geocentric apparent vs astrometric coordinates must be strictly matched. |
| **True Rahu / Ketu Longitude** | $\le \pm 0^\circ\ 01'\ 00"\ (60")$ | $\le 20"$ | True Node perturbation models differ across libraries (Swiss Ephemeris vs JPL Osculating vs Traditional). |
| **Tithi / Nakshatra End Moments** | $\le \pm 2\text{ minutes}$ | $\le 45\text{ seconds}$ | PAC lists ending times in hours and minutes; sub-minute evaluation requires continuous root solver comparison. |
| **Ahoratra Day Boundary (Night births)** | Exact Match ($0\text{ drift}$ in Vaar / Dina-Lord) | $0\text{ drift}$ | Binary logic gate: civil midnight ($00:00$) vs local sunrise timestamp. |
| **High Latitude / Polar Behaviour** | Zero crash, zero `NaN`, explicit status code | Zero crash | Strict contractual output: `{ status: 'POLAR_DAY' | 'POLAR_NIGHT' }`, never fictitious sunrise times. |

---

## 🔬 3. Deep Audit Correction Addendum (6 Critical Verification Pillars)

### Pillar A: Mathematical Invariants (Priority: Very High)
* **Tithi Angular Invariant:** Har sample point par $\text{Tithi} = \lfloor (\lambda_{\text{Moon}} - \lambda_{\text{Sun}} \pmod{360^\circ}) / 12^\circ \rfloor + 1$ mathematically 100% hold hona chahiye.
* **Nakshatra / Yoga / Karana Invariant:**
  * Nakshatra $= \lfloor \lambda_{\text{Moon}} / 13^\circ\ 20' \rfloor + 1$
  * Yoga $= \lfloor (\lambda_{\text{Sun}} + \lambda_{\text{Moon}} \pmod{360^\circ}) / 13^\circ\ 20' \rfloor + 1$
  * Karana $= \text{Half-Tithi } (6^\circ \text{ segment})$
* **Circular Angle Normalization:** $0^\circ / 360^\circ$ wrap-around boundary par negative angles ya $>360^\circ$ angles ka zero-error normalization ($[-1^\circ \to 359^\circ]$).

### Pillar B: Time Engine & Calendar Integrity (Priority: Very High)
* **Time Scale Transformations:** UTC $\leftrightarrow$ TT (Terrestrial Time) $\leftrightarrow$ TDB $\leftrightarrow$ Local Civil Time / IST ($+5:30$) ka precision conversion.
* **Julian Day & Date Boundary:** Leap year (century/non-century), Julian $\to$ Gregorian calendar transition (Oct 1582), Kali Ahargana alignment.
* **Midnight vs Suryodaya Boundary:** Raat `00:00:00` se `Suryodaya` ke beech civil date change hoti hai, lekin Vedic Ahoratra Vaar aur Dina-Lord pichhle din ke sunrise se locked rehte hain.
* **Historical Timezone Jumps:** Historical charts ke liye DST (Daylight Saving) aur historical timezone changes ($+5:21:14 \to +5:30$) ka handling.

### Pillar C: Boundary & Event-Solving Accuracy (Priority: Very High)
* **Continuous Root-Finding:** Linear interpolation ki jagah Newton-Raphson ya Brent's Method ka use.
* **Solver Convergence & Max-Iteration Safeguard:** Agar solver $N > 100$ iterations me converge na ho (e.g. stationary points), to silent failure ya infinite loop ke bajaye robust bisection fallback execute hoga.
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
* **Astronomical Model vs Meteorological Reality:** Engine standard atmospheric model (1013.25 mbar, 10°C) par operate karta hai; real local weather fluctuations (temperature inversions) se hone wale physical visual drift ko astronomical bug nahi maana jayega.
* **Polar Strict Contracts (>55° / Polar Circles):** Jab suraj 24 ghante na doobey (Midnight Sun) ya na ugey (Polar Night), engine koi artificial/fake sunrise time generate nahi karega; balki strictly `{ status: 'POLAR_DAY', sunrise: null, sunset: null }` ya `{ status: 'POLAR_NIGHT' }` return karega.

### Pillar E: Panchang Rules & Tradition Consistency (Priority: High)
* **Udayatithi vs Instant-based Selection:** Vrat aur dynamic muhurta ke beech udayatithi niyam vs instantaneous tithi ka clear architectural separation.
* **Kshaya & Vriddhi Tithi Lifecycle:** Sunrise-to-sunrise ke beech aane-jaane wali Kshaya Tithi ko continuous scanner se detect karna taaki festival determination fail na ho.
* **Rahu Kaal Weekday Sequence:** Dinamana ke 8 hisso me weekday ke hisaab se correct slot pick karna (Mon: 2nd, Sat: 3rd, Fri: 4th, Wed: 5th, Thu: 6th, Tue: 7th, Sun: 8th), zero fixed-duration assumptions.
* **Sripati House Trisector Geometry:** Lagna aur MC (Midheaven) nikal kar quadrant ko 3 barabar hisson me baantna (No fixed 15° Equal house assumption).

### Pillar F: Regression, Reproducibility & Failure Logging (Priority: High)
* **Deterministic Runs:** Seeded random dates aur historical dates ko repeat run karne par exact bit-level identical output aana chahiye.
* **Cache Integrity:** Panchang cache se nikla result aur fresh calculation ka output $100\%$ identical hona chahiye.
* **Silent Fallback & NaN Detection:** Invalid coordinates (e.g. Lat $>90^\circ$) par engine silent wrong calculation nahi karega; structured validation error throw karega.
* **Failure Telemetry:** Har test failure par `{ inputDate, coordinates, expected, actual, signedDelta, failureCategory }` JSON format me log hoga.

---

## 📊 4. Scientific Error Metrology (No Fake 99% Blanket Scores)

Report me koi single misleading accuracy percentage nahi aayega. Engine ka scorecard 6 alag metrological metrics me bat-ta hai:

1. **Numerical Accuracy:** Mean Error, Median Error, Maximum Error, aur P95 Error (arcseconds & seconds).
2. **Boundary Accuracy:** Event timing error (seconds me) aur transition classification accuracy.
3. **Functional Correctness:** Category-wise Pass / Total tests ($N \ge 10,000$ stratified test vectors).
4. **Robustness:** Invalid inputs, polar edge-cases, aur zero crash rate.
5. **Reproducibility:** Repeat calculation runs me zero divergence ($100\%$ determinism).
6. **Reference Agreement:** Har external source ke sath **Signed Delta ($\Delta = \text{Actual} - \text{Expected}$)** aur **Absolute Delta ($|\Delta|$)** report hoga taaki systematic bias detect ho sake.

---

## ⚠️ 5. Source Resolution Limits & Metrological Boundaries

1. **PAC Kolkata Publication Granularity:** PAC Rashtriya Panchang digital tables daily times ko nearest whole minute (`hh:mm`) me print karti hain. Isliye PAC se compare karte waqt sub-minute tolerances apply nahi ho sakti. Sub-minute accuracy sirf NOAA aur continuous ephemeris integration se verify hogi.
2. **PAC Geographic Scope:** PAC direct printed tables sirf 4 metros (Delhi, Kolkata, Mumbai, Chennai) ke liye deta hai. Doosre sheharo ke liye published correction parameters lagane padte hain.
3. **True Node Definition Variance:** Swiss Ephemeris (`SE_TRUE_NODE`) aur NASA JPL Horizons ke osculating orbit definitions me microscopic perturbation differences hote hain; isliye $\le 60"$ ki tolerance scientifically mandatory hai.
4. **Stratified 10,000-Test Distribution:** Test vectors sirf modern normal days ke nahi honge. Isme minimum:
   * 1,000 leap year / century boundary test cases (1600, 1900, 2000, 2100).
   * 1,000 high-latitude / extreme coordinate test cases ($55^\circ \text{ to } 75^\circ\text{ N/S}$).
   * 1,000 lunar perigee/apogee (speed extreme) cases.
   * 1,000 retrograde stationing inversion moments ($v = 0$).
   * 6,000 pan-India multi-century random dates.

---

## 🌌 6. The Complete Physical & Computational Iceberg (Final Hard Truths)

Yeh wo 6 bache hue zameeni astronomical aur computational constraints hain jin par har celestial engine depend karta hai:

1. **$\Delta T$ (Delta-T) Earth Slowdown Drift:**
   * Dharti ke ghoomne ki raftaar tidal friction ke karan dheemi ho rahi hai. 
   * Year 2026 me $\Delta T \approx 69.2\text{ seconds}$ hai.
   * Agar engine civil UTC time aur Terrestrial Time ($\text{TT} = \text{UTC} + \Delta T$) ke beech ka farq calculate nahi karega, to grahon ki positions me lagbhag **70 second ka permanent phase lag** rahega.
2. **Geodetic vs Geocentric Latitude (Earth Spheroid WGS84 Flattening):**
   * Dharti gol nahi, oblate spheroid hai ($f = 1/298.257$).
   * Delhi ($28.6^\circ\text{ N}$) par Geographic (Geodetic) latitude aur Geocentric latitude me **$11\text{ arcminutes} (0.18^\circ)$** ka antar hota hai.
   * Agar Moon parallax me geographic latitude direct daal di, to Chandrama ki position me 10-15 arcsecond ka permanent shift aayega.
3. **Light-Travel Time & Annual Aberration:**
   * Grahon se roshni aane me samay lagta hai (Surya: ~8.3 min, Shani: ~80 min). Sath hi dharti ki apni raftaar se roshni bend hoti hai (Annual Aberration $\approx 20.5"$).
   * Vedic astrology me **Apparent Nirayana Longitudes** chahiye hote hain, geometric nahi.
4. **Nutation Series Truncation (106 Terms vs 5 Terms in JS):**
   * Dharti ka 18.6-year nutation cycle full IAU 1980 standard me 106 terms ka hota hai.
   * Pure JavaScript libraries bundle size chhota rakhne ke liye ise 4-5 terms me truncate karti hain, jisse Ayanamsha me $1-3"$ ka continuous periodic ripple rehta hai.
5. **ELP-2000 Lunar Perturbation Truncation:**
   * Moon ka orbit itna complex hai ki full ELP-2000/82 theory me 37,000 terms hain.
   * Client-side JS engines ise 50-100 terms par chalate hain, jisse Supermoon (Perigee) ke waqt Moon speed me $0.5'$ se $1'$ ka deviation aa sakta hai.
6. **Float64 Julian Day Precision Degradation:**
   * JavaScript me numbers IEEE 754 (64-bit float) hote hain. Julian Day ($2461323.5$) jaise bade numbers par continuous addition/subtraction karne par fractional milliseconds me rounding noise introduce hoti hai.

---

## 🕉️ 7. Vedic Domain Invariants & Astrological Systemic Contracts

1. **337 Sarvashtakavarga (SAV) Strict Mathematical Invariant:**
   * BPHS Parashari standard me sabhi 7 grahon ke Ashtakavarga binduon ka kul yog (Total SAV sum) 12 rashiyo me **EXACT 337** hona anivarya hai:
     $$\sum_{rashi=1}^{12} \text{SAV}[rashi] \equiv 337$$
   * Agar sum 336 ya 338 aata hai, to bindu-rekha algorithm mathematically corrupt hai.
2. **J2000 vs True-Equator-of-Date Ecliptic Coordinate Frame:**
   * Underlying library (`astronomy-engine`) coordinates J2000 frame me calculate karti hai.
   * Vedic Lahiri Ayanamsha **True Equator and Equinox of Date** par apply hota hai.
   * J2000 ecliptic ko of-date ecliptic me rotate kiye bina agar direct Ayanamsha minus kiya gaya, to **$15-20\text{ arcseconds}$ ka permanent epoch-tilt error** rahega.
3. **Continuous True Rahu Vector Cross-Product Math:**
   * True Node nikaalne ke liye node crossings ka linear interpolation galat hota hai.
   * Moon ke instantaneous position vector $\vec{r}$ aur velocity vector $\vec{v}$ ka cross-product nikaal kar orbital plane normal vector $\vec{L} = \vec{r} \times \vec{v}$ banega, aur uske intersection se True Rahu niklega.
4. **Drik-Ganita vs Surya-Siddhanta Traditionalist Divergence (The Varanasi Pandit Discrepancy):**
   * Modern Drik-ganita (Drik Panchang, PAC Kolkata) sun's upper limb + refraction (-50') use karta hai.
   * Banaras/Mathura ke traditional Surya Siddhanta pandit sun ke geometric center (0') ko mante hain.
   * Dono ke beech ka **3 se 4 minute ka antar** koi code bug nahi, balki do alag astrological shastras (Drik-Paksha vs Saur-Paksha) ka deliberate antar hai. Engine UI me iska clear label hona anivarya hai.

---

## 🏗️ 8. Phase-by-Phase Granular Execution Roadmap (Har Ek Step Me All Hard Truths Embedded)

Yahan har ek terminal truth aur addendum point ko execution phase ke andar **actual file, function aur code step** me strictly bind kiya gaya hai:

### 🪐 PHASE 1: Core Astronomy, Ephemeris & Frame Transformation
**Target Files:**  
* `src/engine/astronomicalEngine.ts`  
* `src/engine/core/sanatan_jpl_bridge.ts`  
* `src/engine/types.ts`

#### Granular Execution Steps:
1. **Step 1.1 ($\Delta T$ Integration):** Stephenson & Morrison polynomial implement karna taaki UTC civil input se Terrestrial Time ($\text{TT} = \text{UTC} + \Delta T$) nikle (70-second phase offset 0 ho).
2. **Step 1.2 (J2000 $\to$ True-of-Date Ecliptic Rotation):** `astronomy-engine` ke J2000 coordinates ko precession/nutation matrix se of-date frame me rotate karna, taaki Ayanamsha lagane par $15-20"$ epoch tilt khatam ho.
3. **Step 1.3 (Continuous True Node Vector Cross-Product):** Instantaneous orbital angular momentum vector $\vec{L} = \vec{r}_{\text{Moon}} \times \vec{v}_{\text{Moon}}$ calculate karke ecliptic plane node intersection nikaalna (linear crossing interpolation replace karna).
4. **Step 1.4 (Nutation & Ayanamsha Calibration):** IAU 1980 standard ke top periodic terms add karke PAC Kolkata (`packolkata.imd.gov.in`) aur Swiss Ephemeris (`-sid1`) se Ayanamsha drift $< 5"$ par lock karna.
5. **Step 1.5 (Root-Solver Fallback & Max-Iterations):** Newton-Raphson aur Brent solver me $N \le 100$ iteration limit lagana; zero-derivative stationary moments ($v \approx 0$) par bisection fallback enable karna.

#### Testing & Deliverable:
* Triple-check against Drik, PAC (nearest minute boundary), aur Swiss Ephemeris (DE440).
* **Phase 1 Delta Report** (Signed Delta $\Delta$ aur Absolute Delta $|\Delta|$ ke sath).

---

### ☀️ PHASE 2: Solar Horizon, Ahoratra & Geodetic Geography
**Target Files:**  
* `src/engine/astronomicalEngine.ts`  
* `src/engine/panchangCalc.ts`  
* `src/engine/muhuratRules.ts`  
* `src/engine/facade/inputResolver.ts`

#### Granular Execution Steps:
1. **Step 2.1 (WGS84 Geodetic $\to$ Geocentric Conversion):** Observer latitude $\phi$ ko geocentric latitude $\phi'$ me convert karna ($\tan \phi' = 0.9933056 \tan \phi$) taaki Moon parallax me $11'$ geodetic error na aaye.
2. **Step 2.2 (Refraction & Elevation Dip Without Double-Counting):** True Zenith $= 90^\circ + 0.8333^\circ + 0.0293^\circ\sqrt{h}$ formula lagana, standard NOAA sea-level parameters ko preserve karte hue.
3. **Step 2.3 (Ahoratra Strict Boundary Interceptor):** `inputResolver.ts` me logic lock karna: `if (eventTime < localSunrise) { vedicDate = calendarDate - 1, dayLord = previousDayLord }`.
4. **Step 2.4 (Dinamana Dynamic Weekday Sequence):** Sunrise se Sunset ko 8 hisso me divide karke strictly weekday-mapped slot choose karna (Rahu Kaal: Mon=2, Sat=3, Fri=4, Wed=5, Thu=6, Tue=7, Sun=8).
5. **Step 2.5 (3-Point Boundary Verification):** Sunrise aur Sunset ke $T - 1\text{s}$, exact $T$, aur $T + 1\text{s}$ par temporal state transition test run karna.

#### Testing & Deliverable:
* Delhi (plain), Shimla (elevation dip), 02:30 AM night birth (Ahoratra), Summer/Winter Solstice.
* **Phase 2 Delta Report** (Signed Delta aur Whole-minute PAC tolerance mapping ke sath).

---

### 🏛️ PHASE 3: Angas, Bhavas, Invariants & Traditions
**Target Files:**  
* `src/engine/panchangCalc.ts`  
* `src/engine/kundli/houseCusps.ts`  
* `src/engine/kundli/ashtakavargaEngine.ts` (ya equivalent)  
* `src/engine/vrataNirnaya.ts`

#### Granular Execution Steps:
1. **Step 3.1 (Continuous Kshaya/Vriddhi Event Scanner):** Sunrise-to-sunrise 24-hr continuous boundary solver jo kshaya tithi ko detect kare aur Udayatithi vs instantaneous festival nirnaya alag kare.
2. **Step 3.2 (Sripati Quadrant Trisector Implementation):** Lagna aur MC (Midheaven) ke beech ke quadrant ko 3 hisso me baantna (variable house spans); fixed 15° Equal house logic remove karna.
3. **Step 3.3 (337 Sarvashtakavarga Invariant Guard):** Unit test enforce karna: $\sum_{\text{rashi}=1}^{12} \text{SAV}[\text{rashi}] \equiv 337$. Agar sum $\neq 337$, engine build fail ho jaye.
4. **Step 3.4 (Strict Polar Contracts):** Lat $>55^\circ$ par Midnight Sun/Polar Night me fictitious time generate na karke `{ status: 'POLAR_DAY', sunrise: null, sunset: null }` return karna.
5. **Step 3.5 (Cache vs Fresh Calculation Integrity Test):** Verify karna ki cache hit hone par aur fresh compute hone par exact bit-level identical JSON output aaye.

#### Testing & Deliverable:
* Known Kshaya Tithi date, Jagannatha Hora Sripati Bhava Chalit comparison, 337 SAV invariant run, Tromsø Norway polar test.
* **Phase 3 Delta Report**.

---

### 🧪 PHASE 4: Stratified 10,000-Vector Master Stress Test & Deployment
* **Objective:** Pure automated verification across the entire 5-bucket stratified landscape:
  1. 1,000 Leap Century & Calendar Cutover cases (1582, 1600, 1900, 2000, 2100).
  2. 1,000 High Latitude cases ($55^\circ$ to $75^\circ\text{ N/S}$).
  3. 1,000 Lunar Perigee/Apogee extreme velocity cases.
  4. 1,000 Stationary Inversion moments ($v \approx 0$).
  5. 6,000 Pan-India multi-century random dates.
* **Scorecard Generation:**
  * Numerical Accuracy: Mean, Median, Max, P95 Error (arcseconds & seconds).
  * Robustness: Zero crash, Zero `NaN`, clean structured error on invalid coordinates.
  * Determinism: $100\%$ bit-level reproducibility on repeat runs.
* **Production Deployment:**
  * Git safe commit checkpoint.
  * Live Vercel build verification.
