# freelibre

_v 0.1.0_

This is a blood sugar monitoring app for logging and searching treatments and meals. It serves as an alternative to FreeStyle Libre and similar apps.

### Features
A standout feature of freelibre is the ability to search food intakes and view related insulin doses and blood sugar levels before and after each meal. Think of it as a time-travel tool for specific moments. The app integrates with NightScout for data storage and retrieval.
- **Home screen:** Day overview with a blood sugar chart
- **Logging and search:** Record notes and search through them
- **Mobile-focused:** Optimized for mobile, but responsive on web

### Roadmap
Development is ongoing with the following goals:
- Replace MUI charts with chart.js; add touch event support
- Implement PWA offline capabilities
- Create a flexible analytics report page
- Add more search filters

### Tech Stack
**freelibre** is built with the React ecosystem, chosen to explore and learn the React stack.
- React
- React Router
- MUI Joy UI
- Chart.js
- Vite
- Nightscout API

### Installation
```bash
# install dependencies
$ npm install

# build for production and launch server
$ npm run build
$ npm run start

```
