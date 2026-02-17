# API Playground - Interactive API Documentation

A modern, interactive API documentation playground that lets developers test APIs directly in the documentation with live HTTP requests.

## 🚀 Features

- **Live API Testing**: Make real HTTP requests (GET, POST, PUT, DELETE, PATCH)
- **OpenAPI/Swagger Support**: Upload or paste OpenAPI/JSON specifications
- **Request Builder**: Visual form builder for HTTP requests
- **Response Viewer**: Syntax-highlighted JSON/XML responses with expandable sections
- **Request History**: Auto-saved history with search and replay functionality
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Status Bar**: Real-time loading indicators and connection status

## 🛠️ Tech Stack

This project uses modern technologies chosen for specific reasons:

### **Next.js 15 (App Router)**
- **Why**: App Router is the modern React framework approach with React Server Components (RSC) support, providing better performance and a more intuitive file-based routing system
- **Benefit**: Built-in optimizations, automatic code splitting, and excellent developer experience

### **TypeScript**
- **Why**: Full type safety catches errors before runtime, provides better autocomplete in IDEs, and makes large codebases more maintainable
- **Benefit**: Reduced bugs, better documentation through types, and improved developer productivity

### **Tailwind CSS**
- **Why**: Utility-first CSS framework enables rapid UI development without writing custom CSS, and produces small bundle sizes with purging
- **Benefit**: Fast prototyping, consistent design system, and no need to write CSS files

### **Next.js Themes**
- **Why**: Provides seamless dark mode support with automatic system preference detection and localStorage persistence
- **Benefit**: Zero-setup theme switching with optimal user experience

### **Lucide React**
- **Why**: Modern, lightweight icon library with tree-shaking support
- **Benefit**: Only the icons you use are bundled, keeping the app lightweight

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kyooosukedn/api-playground.git
   cd api-playground
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage

### Quick Start

1. **Load an API Specification**
   - Upload an OpenAPI/Swagger JSON or YAML file
   - Or paste your API specification directly into the text area
   - Click "Load Specification & Open Playground"

2. **Make API Requests**
   - Select HTTP method (GET, POST, PUT, DELETE, PATCH)
   - Enter the API URL
   - Add headers (e.g., `Content-Type: application/json`, `Authorization: Bearer token`)
   - Add query parameters
   - For non-GET requests, add a JSON body
   - Click "Send Request"

3. **View Response**
   - See the response status, time, and headers
   - View syntax-highlighted JSON response
   - Copy response data with one click
   - Expand/collapse sections for better readability

4. **History Management**
   - All requests are automatically saved to localStorage
   - View history in the sidebar or on the /history page
   - Search through your request history
   - Click any request to replay it

5. **Dark Mode**
   - Toggle dark/light mode using the theme button in the navigation
   - Your preference is saved and persists across sessions

## 📁 Project Structure

```
api-playground/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with theme provider
│   │   ├── page.tsx            # Landing page with API input
│   │   ├── playground/         # Main playground page
│   │   │   └── page.tsx
│   │   ├── history/            # History page
│   │   │   └── page.tsx
│   │   └── globals.css         # Global styles with Tailwind
│   ├── components/
│   │   ├── api-input.tsx       # API spec upload component
│   │   ├── request-builder.tsx # HTTP request form builder
│   │   ├── response-viewer.tsx # Response display with syntax highlighting
│   │   ├── status-bar.tsx      # Loading/status indicator
│   │   ├── request-history.tsx # History sidebar
│   │   ├── navigation.tsx      # Main navigation
│   │   ├── theme-toggle.tsx    # Dark mode toggle
│   │   └── theme-provider.tsx  # Next-themes wrapper
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   └── lib/                    # Utility functions (future)
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🔧 Component Architecture

The application follows a component-based architecture for reusability and maintainability:

- **ApiInput**: Handles OpenAPI/JSON specification upload and validation
- **RequestBuilder**: Visual form for constructing HTTP requests with method, URL, headers, params, and body
- **ResponseViewer**: Displays API responses with syntax highlighting, expandable sections, and copy functionality
- **RequestHistory**: Manages and displays request history with search and replay
- **StatusBar**: Shows real-time connection and request status

**Why this structure?** Each component has a single responsibility and can be tested independently. This makes the codebase easier to maintain and extend.

## 🎨 Design Decisions

### LocalStorage for State Persistence
- **Why**: Request history and API specs are stored in localStorage to persist across page reloads without requiring a backend
- **Trade-off**: Data is browser-specific and limited to ~5MB, but this fits the MVP requirements

### Client-Side Fetch API
- **Why**: Using the native fetch API for HTTP requests keeps the app lightweight and avoids additional dependencies
- **Note**: For production, you might want to handle CORS via a proxy server

### Class-Based Dark Mode
- **Why**: Using Tailwind's `darkMode: "class"` allows for explicit theme control and enables users to override system preferences
- **Benefit**: Provides a better user experience with manual theme selection

## 🚀 Deployment

This project is deployed on Vercel:

- **Why Vercel**: Zero-config deployment, automatic preview deployments, edge network for global performance, and free tier for personal projects
- **How**: Connected GitHub repository to Vercel for automatic deployments on push

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

## 📝 Future Enhancements

Potential features for future iterations:

- [ ] Monaco Editor integration for better code editing
- [ ] WebSocket support for real-time APIs
- [ ] Environment variable management
- [ ] Export/import request collections
- [ ] GraphQL support
- [ ] Request/response transformation scripts
- [ ] Team sharing features
- [ ] API documentation auto-generation from OpenAPI specs

## 🤝 Contributing

This is a portfolio project. Feel free to fork and use it as a reference!

## 📄 License

MIT License - feel free to use this project for learning or as a starting point for your own projects.

---

Built with ❤️ by [kyooosukedn](https://github.com/kyooosukedn)
