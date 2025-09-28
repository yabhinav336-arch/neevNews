# NeevNews - Global News & Articles Platform

A modern, responsive news website built with Next.js, featuring global news coverage, in-depth analysis, and compelling storytelling from around the world.

## 🌟 Features

### Core Features
- **Modern Landing Page**: Beautiful, responsive design with mobile-first approach
- **Dark/Light Mode**: Toggle between themes with localStorage persistence
- **SEO Optimized**: Comprehensive meta tags, structured data, and next-seo integration
- **Accessibility**: ARIA attributes and A11Y best practices throughout
- **Performance**: Optimized for Core Web Vitals with lazy loading and image optimization

### Content Sections
- **Hero Section**: Featured articles with engaging visuals
- **Latest News**: Grid layout with categorized articles
- **Categories**: Explore news by topic (World, Politics, Technology, Business, etc.)
- **Newsletter Signup**: Email subscription with form validation
- **Trending Topics**: Dynamic trending hashtags and popular content

### Technical Features
- **Responsive Design**: Mobile-first with Tailwind CSS breakpoints
- **TypeScript**: Full type safety and better development experience
- **Component Architecture**: Modular, reusable components
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Font Optimization**: Google Fonts with preloading and fallbacks

## 🚀 Tech Stack

- **Framework**: Next.js 14 (latest stable)
- **Styling**: Tailwind CSS with PostCSS
- **Icons**: Lucide React
- **Fonts**: Inter & Source Serif Pro (Google Fonts)
- **SEO**: next-seo with comprehensive meta tags
- **TypeScript**: Full type safety
- **Animation**: Framer Motion (optional)
- **Forms**: React Hook Form (optional)

## 📦 Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
neevNews/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx       # Navigation with dark mode toggle
│   │   ├── Footer.tsx       # Footer with links and newsletter
│   │   └── Layout.tsx       # Main layout wrapper with SEO
│   └── Sections/
│       ├── Hero.tsx         # Featured articles hero section
│       ├── LatestNews.tsx   # Latest news grid with sidebar
│       ├── Categories.tsx   # News categories showcase
│       └── Newsletter.tsx   # Email subscription section
├── pages/
│   ├── _app.tsx            # App wrapper with global SEO
│   ├── _document.tsx       # Document with structured data
│   └── index.tsx           # Homepage with all sections
├── styles/
│   └── globals.css         # Global styles and Tailwind imports
├── hooks/
│   └── useDarkMode.ts      # Dark mode hook with localStorage
├── types/
│   └── index.ts            # TypeScript type definitions
├── utils/
│   └── data.ts             # Mock data and utility functions
└── public/
    ├── robots.txt          # SEO robots file
    └── site.webmanifest    # PWA manifest
```

## 🎨 Design System

### Colors
- **Primary**: Blue shades (#3b82f6)
- **Secondary**: Gray shades for text and backgrounds
- **Accent**: Red shades for highlights and CTAs

### Typography
- **Headings**: Source Serif Pro (serif font)
- **Body Text**: Inter (sans-serif font)
- **Responsive**: Fluid typography scaling

### Components
- **Cards**: Hover effects with subtle shadows
- **Buttons**: Primary, secondary, and outline variants
- **Forms**: Consistent styling with focus states

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large**: > 1280px

## 🔍 SEO Features

### Meta Tags
- Title and description optimization
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs

### Structured Data
- Organization schema
- Website schema
- Article schemas (ready for individual articles)

### Performance
- Image optimization with Next.js Image
- Font preloading and optimization
- Core Web Vitals optimization

## 🌐 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Accessibility**: Screen readers and keyboard navigation

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically with each push to main branch

### Other Platforms
- **Netlify**: Build command: `npm run build`, Publish directory: `out`
- **AWS Amplify**: Standard Next.js configuration
- **Self-hosted**: Use `npm run build && npm run start`

## 📊 Performance Optimizations

- **Images**: WebP/AVIF formats with lazy loading
- **Fonts**: Preloaded with font-display: swap
- **CSS**: Tailwind CSS with purging unused styles
- **JavaScript**: Code splitting and tree shaking
- **Caching**: Static generation with ISR support

## 🔧 Customization

### Adding New Categories
1. Update `categories` array in `utils/data.ts`
2. Add corresponding routes in `pages/category/[slug].tsx`

### Modifying Content
1. Update mock data in `utils/data.ts`
2. Replace with API calls when backend is ready

### Styling Changes
1. Modify Tailwind config in `tailwind.config.js`
2. Update component styles using Tailwind classes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- [ ] User authentication and profiles
- [ ] Comment system for articles
- [ ] Search functionality
- [ ] Social media integration
- [ ] Push notifications
- [ ] Offline reading support
- [ ] Multi-language support
- [ ] Advanced filtering and sorting
- [ ] Editorial dashboard
- [ ] Analytics integration

## 📞 Support

For questions or support, please contact:
- Email: support@neevnews.com
- GitHub Issues: [Create an issue](https://github.com/your-username/neevnews/issues)

---

Built with ❤️ using Next.js and modern web technologies.
