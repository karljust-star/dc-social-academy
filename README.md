# DC Social Academy 🚀

A modern, responsive creator academy & social media analytics dashboard built for educators, content creators, and cohort-based learning communities.

![DC Social Academy Dashboard](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80)

---

## 🌟 Key Features

- 📊 **Interactive Analytics Dashboard**: Powered by Chart.js for real-time visualization of student growth, watch hours, and cohort engagement across weekly, monthly, and yearly intervals.
- 🎨 **Modern Dark & Light Mode**: Seamless theme switching with local storage persistence and dynamic chart adaptation.
- 🎓 **Curriculum & Track Management**: Categorized tracks across Instagram & Reels, TikTok Growth, YouTube Automation, and Monetization with dynamic track publishing modal.
- 🔴 **Interactive Live Masterclass Room**: Virtual live-stream viewer interface with simulated real-time cohort chat.
- 🏆 **Creator Leaderboard**: Recognition system highlighting top-performing creators and growth milestones.
- 🔍 **Real-Time Search & Filtering**: Instant course and curriculum filtering.
- 📱 **100% Mobile Responsive**: Fluid sidebar navigation and adaptive layouts tailored for desktop, tablet, and mobile screens.
- ⚡ **Zero Build Step / Static Ready**: Instant deployment to Vercel, Netlify, or GitHub Pages without build tools needed.

---

## 📁 Project Structure

```text
dc-social-academy/
├── index.html       # Semantic dashboard HTML5 structure & accessibility attributes
├── style.css        # Modern CSS variables, glassmorphic touches, animations & responsive styling
├── script.js        # Dynamic Chart.js logic, theme toggling, track manager & modals
├── vercel.json      # Vercel static deployment and routing configuration
└── README.md        # Comprehensive project documentation & deployment guide
```

---

## 🚀 Quick Start (Local Development)

You can run the project locally using any simple HTTP server or directly opening `index.html` in your browser.

### Option 1: Using Python
```bash
# Python 3
python -m http.server 3000
```
Then open `http://localhost:3000` in your web browser.

### Option 2: Using Node.js / npx
```bash
npx serve .
```

### Option 3: VS Code Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## ☁️ Deployment on Vercel

This repository includes a ready-to-deploy `vercel.json` file.

### Deploying via Vercel CLI:
```bash
npm i -g vercel
vercel
```

### Deploying via Vercel Dashboard:
1. Push this project folder to your GitHub / GitLab / Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your repository and click **Deploy**.

---

## 🛠️ Built With

- **HTML5 & CSS3** (CSS Custom Properties, Flexbox, CSS Grid)
- **Vanilla JavaScript (ES6+)**
- **[Chart.js](https://www.chartjs.org/)** (Data visualisations)
- **[Lucide Icons](https://lucide.dev/)** (Vector icons)
- **[Google Fonts (Plus Jakarta Sans)](https://fonts.google.com/specimen/Plus+Jakarta+Sans)**

---

## 📄 License

This project is licensed under the MIT License.
