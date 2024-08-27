# freelibre

_v 0.1.0_

This is a blood sugar monitoring app for logging and searching treatments and meals. It serves as an alternative to FreeStyle Libre and similar apps.

There is a demo mode that shows the capabilities of the application with mocked data. It has inaccuracies with the graph data, namely, on the page of a certain treatment, the graph is generated randomly when the page is reloaded. This is done for simplicity or because of laziness 🙂 Anyway, you can get the idea of ​​the application from this [demo 🚀.](https://freelibre.vercel.app)


### Features
A standout feature of freelibre is the ability to search food intakes and view related insulin doses and blood sugar levels before and after each meal. Think of it as a time-travel tool for specific moments. The app integrates with NightScout for data storage and retrieval.
- **Home screen:** Day overview with a blood sugar chart
- **Logging and search:** Record notes and search through them
- **Mobile-focused:** Optimized for mobile, but responsive on web

### Roadmap
Development is ongoing with the following goals:
- ~~Replace MUI charts with chart.js; add touch event support~~ :white_check_mark:
- ~~Create a demo mode with fake data~~ :white_check_mark:
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
