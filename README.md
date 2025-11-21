# Design Sizing Tool

A UX design sizing tool to help designers and managers estimate work using T-shirt sizes (Epics) and story points (Stories). Built with React, Vite, and Tailwind CSS, styled with Cloudflare branding.

## Features

- **Epic Sizing**: T-shirt size estimation (XS-XL) for large bodies of work
- **Story Sizing**: Fibonacci story points (1-13) for individual tickets
- **Guided Questionnaire**: Answer questions to get data-driven recommendations
- **Cloudflare Design**: Professional UI with brand colors and WCAG 2.0 compliance
- **Responsive**: Works on desktop and mobile devices

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 3
- Cloudflare Workers/Pages

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Cloudflare Pages

### Option 1: Using Wrangler CLI

```bash
# Deploy to Cloudflare Pages
npm run deploy
```

### Option 2: Via Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** > **Create application** > **Pages**
3. Connect your GitHub repository: `liberty-biberty/design-sizing-tool`
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
5. Click **Save and Deploy**

### Option 3: Direct Deployment

```bash
# Login to Cloudflare
npx wrangler login

# Deploy
npx wrangler pages deploy dist --project-name=design-sizing-tool
```

## Project Structure

```
src/
├── components/
│   ├── FlowSelector.jsx    # Homepage with Epic/Story selection
│   ├── EpicSizing.jsx       # Epic sizing questionnaire
│   └── StorySizing.jsx      # Story sizing questionnaire
├── App.jsx                  # Main app component
├── main.jsx                 # Entry point
└── index.css                # Tailwind directives
```

## Design System

Uses Cloudflare brand colors:
- **Orange**: `#F6821F` (Primary accent)
- **Blue**: `#0051C3` (Primary brand)
- **Teal**: `#06AED5` (Secondary accent)

All color combinations meet WCAG 2.0 AA contrast standards.

## License

MIT
