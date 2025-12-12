# ADNOXY Campaign Intelligence

A modern, data-driven campaign intelligence dashboard built with React, TypeScript, and Vite. Provides real-time insights into outdoor advertising campaigns with geospatial analysis, audience demographics, and performance metrics.

## Features

- **Real-time Campaign Monitoring**: Live exposure tracking and performance metrics
- **Geospatial Intelligence**: Interactive map with billboard locations, traffic heatmaps, and audience flow analysis
- **Audience Analytics**: Demographic breakdowns, income brackets, and POI relevance scoring
- **Creative Insights**: AI-powered creative analysis with readability and contrast scoring
- **Asset Performance**: Detailed performance tracking for individual billboards
- **Uplift Analysis**: Campaign effectiveness measurement and channel attribution

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Maps**: Leaflet + React-Leaflet
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your API keys to .env.local
```

### Development

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Build

```bash
npm run build
```

This generates an optimized production build in the `dist` directory.

### Preview

```bash
npm run preview
```

Preview the production build locally.

## Deployment

### Vercel

This project is configured for easy deployment on Vercel.

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite configuration
4. Add environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`: Your Gemini API key
5. Deploy!

The `vercel.json` file contains the build configuration.

### Environment Variables

Create a `.env.local` file with the following variables:

```
GEMINI_API_KEY=your_api_key_here
```

## Project Structure

```
├── components/          # Reusable React components
│   ├── TopBar.tsx      # Header component
│   └── Sidebar.tsx     # Navigation sidebar
├── pages/              # Page components
│   ├── Overview.tsx    # Campaign overview dashboard
│   ├── MapPage.tsx     # Geospatial intelligence
│   ├── Assets.tsx      # Asset management
│   ├── Report.tsx      # Campaign reports
│   ├── Uplift.tsx      # Uplift analysis
│   └── CreativeInsights.tsx # Creative analysis
├── data/               # Mock data and utilities
│   └── mockData.ts     # Sample campaign data
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main app component
├── index.tsx           # Entry point
└── vite.config.ts      # Vite configuration
```

## Available Routes

- `/` - Campaign Overview
- `/map` - Geospatial Intelligence
- `/assets` - Asset Management
- `/report` - Campaign Reports
- `/uplift` - Uplift Analysis
- `/creative` - Creative Insights

## Performance Optimizations

- Code splitting with Vite
- Lazy loading of route components
- Optimized chart rendering with Recharts
- Responsive design for mobile and desktop

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - ADNOXY AI

## Support

For issues and feature requests, please contact the development team.
