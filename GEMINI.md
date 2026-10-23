# Sanatan Web (सनातन घड़ी) - Project Guidelines & Skills Routing

## 🌐 Platform Identity (Strict Web-First Directive)
- **100% Pure Website**: Yeh project kisi bhi roop me mobile app ya hybrid app nahi hai. Yeh ek **Pure Web Application / Website** hai.
- **Pure Web Standards**: Testing, performance, routing aur design sabhi pure website ke rules (Desktop/Tablet/Mobile browsers, Clean URLs, SEO, Core Web Vitals, Responsive Web Layouts, Browser Back/Forward navigation) ke mutabik honge.

---

## 🎯 Task-Specific Autonomous Skills Routing (Mandatory)

Is project me kaam karte samay, task ke domain ke anusar ye skills automatically activate aur follow hongi:

1. **🎨 जब डिज़ाइन / CSS / स्टाइलिंग / UI पर काम हो**:
   - **Primary**: `ui-ux-pro-max` (Visual hierarchy, sacred color palettes, Chandan cream themes, typography, responsive design, micro-interactions)
   - **Supporting**: `component-state-craftsman` (5-State component resilience: Default, Hover/Active, Loading Skeleton, Error/Fallback, Empty Data - zero blank screens)

2. **⚛️ जब React कोड / कॉम्पोनेंट / स्टेट लॉजिक लिखना हो**:
   - **Primary**: `react-clean-modular` (Clean code splitting, 300-line modular limit, TypeScript standards, custom hooks, zero unnecessary re-renders, zero dependency bloat)

3. **🪐 जब पंचांग / मुहूर्त / ज्योतिष / खगोलीय कैलकुलेशन पर काम हो**:
   - **Primary**: `vedic-astronomy-math` (High-precision astronomical math, JPL bridge, Lahiri ayanamsha, Sripati/Placidus cusps, Shodashvarga D1-D60, Shadbala virupas, Ashtakavarga 337-sum invariant, Dasha systems, classical Parashara/Vrata nirnaya)

---

## 🏛️ Core Project Engineering Principles
- **UI Design Status (User Override)**: `SANATAN_WEB_MASTER_ARCHITECTURE_PLAN.md` ka purana UI/Design plan abhi **PAUSE ⏸️** par hai. Naya design 100% user ke live naye instructions ke anusar banega. Jab user explicitly bolega tabhi purana plan resume hoga.
- **Pragmatic Engineering**: YAGNI, native web first, zero dependency bloat.
- **Engine Decoupling**: `src/engine/` is self-contained and mathematically verified (1,902 passing tests); UI changes must never break calculation purity.
- **Performance First**: Zero WASM overhead, clean lazy-loading with `React.lazy()` & suspense skeletons, 60 FPS UI.
