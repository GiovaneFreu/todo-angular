# TodoPro - Professional Task Management 🚀

[![Angular](https://img.shields.io/badge/Angular-20+-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)
[![CI/CD](https://github.com/GiovaneFreu/todo-angular/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/GiovaneFreu/todo-angular/actions)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://todo-angular-woad.vercel.app/)

A modern, professional-grade task management application built with Angular 20+ and the latest web technologies. This project demonstrates enterprise-level Angular development practices and modern UI/UX patterns.

## 🌐 Live Demo

**[🚀 View Live Application](https://todo-angular-woad.vercel.app/)**

Try the application now! The demo includes all features and represents the latest version deployed automatically via CI/CD with enterprise-grade security controls.

> 💡 **For Recruiters**: This application demonstrates modern Angular 20 development with standalone components, TypeScript strict mode, automated CI/CD, and production deployment. Perfect showcase of enterprise-level frontend development skills.

![TodoPro Screenshot](./docs/images/screenshot.png)

## ✨ Features

### Core Functionality
- ✅ **Smart Task Management** - Create, edit, delete, and organize tasks
- 🏷️ **Categories & Tags** - Organize tasks with custom categories and tags
- 📊 **Priority Levels** - Four priority levels with visual indicators
- 🔍 **Advanced Filtering** - Search by text, status, priority, and category
- 📈 **Progress Tracking** - Visual progress indicators and statistics
- 💾 **Auto-save** - Automatic local backup of tasks

### Modern UI/UX
- 🎨 **Modern Design** - Clean, professional interface with Tailwind CSS
- 🌙 **Dark/Light Theme** - Automatic theme switching with system preference
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- ⚡ **Smooth Animations** - Subtle animations for better user experience
- 🎯 **Accessibility** - WCAG 2.1 AA compliant with keyboard navigation

### Technical Excellence
- 🔧 **Angular 20+ Signals** - Reactive state management with Angular Signals
- 🏗️ **Standalone Components** - Modern Angular architecture without NgModules
- 📦 **TypeScript Strict** - Maximum type safety and code quality
- 🧪 **Comprehensive Testing** - Unit, integration, and E2E tests
- 🚀 **CI/CD Pipeline** - Automated testing, building, and deployment
- 📊 **Bundle Analysis** - Optimized bundle size and performance

## 🛠️ Tech Stack

### Frontend
- **Angular 20+** - Modern web framework with Signals and Standalone Components
- **TypeScript 5.9+** - Type-safe development with strict mode
- **Tailwind CSS 3.4+** - Utility-first CSS framework
- **RxJS 7.8+** - Reactive programming library

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Jest** - Unit testing framework
- **Cypress** - End-to-end testing
- **Husky** - Git hooks for code quality

### DevOps & Deployment
- **GitHub Actions** - CI/CD pipeline
- **Vercel** - Deployment platform
- **Docker** - Containerization
- **Lighthouse CI** - Performance monitoring

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- npm 10+
- Angular CLI 20+

### Installation

```bash
# Clone the repository
git clone https://github.com/GiovaneFreu/todo-angular.git
cd todo-angular

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:4200](http://localhost:4200) to view it in your browser.

### Available Scripts

```bash
# Development
npm start                 # Start development server
npm run watch            # Build with watch mode

# Building
npm run build            # Production build
npm run build:prod       # Optimized production build

# Testing
npm test                 # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run e2e              # Run E2E tests

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Analysis
npm run analyze          # Analyze bundle size
```

## 📱 Usage

### Creating Tasks
1. Enter a task title in the input field
2. Optionally add description, priority, category, and due date
3. Click "Add Task" to save

### Managing Tasks
- **Complete**: Click the checkbox to mark as done
- **Edit**: Click the edit button to modify task details
- **Delete**: Click the delete button to remove the task
- **Filter**: Use the search bar and filters to find specific tasks

### Bulk Operations
- Select multiple tasks using checkboxes
- Use bulk actions to complete or delete multiple tasks at once

### Theme Switching
- Click the theme toggle in the header
- Choose between Light, Dark, or System theme

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── theme-toggle/    # Theme switching component
│   │   ├── todo-list/       # Task list with sorting/filtering
│   │   └── progress/        # Progress tracking and statistics
│   ├── models/              # TypeScript interfaces and types
│   ├── services/            # Business logic and data services
│   │   ├── todo.service.ts  # Task management service
│   │   └── theme.service.ts # Theme management service
│   └── app.component.*      # Root application component
├── assets/                  # Static assets
├── environments/            # Environment configurations
└── styles/                  # Global styles and Tailwind config
```

## 🧪 Testing

### Unit Tests
```bash
npm test                    # Run all unit tests
npm run test:coverage      # Generate coverage report
```

### E2E Tests
```bash
npm run e2e               # Run Cypress E2E tests
```

### Test Coverage
- Target: 80%+ code coverage
- Current coverage: ![Coverage](https://codecov.io/gh/GiovaneFreu/todo-angular-pro/branch/main/graph/badge.svg)

## 🚀 Deployment

### Vercel (Recommended)
1. Fork this repository
2. Connect to Vercel
3. Deploy automatically with each push

### Docker
```bash
# Build image
docker build -t todo-angular-pro .

# Run container
docker run -p 80:80 todo-angular-pro
```

### Manual Build
```bash
npm run build:prod
# Deploy the contents of the dist/ folder
```

## 🎯 Performance

- **Lighthouse Score**: 95+
- **Bundle Size**: 206.55 kB → 59.39 kB gzipped (73% compression)
- **Build Time**: ~34 seconds on Vercel
- **First Contentful Paint**: < 1.5s
- **Angular 20**: Latest framework version with performance optimizations

## 🛡️ Security

- **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **Content Security Policy**: Modern CSP implementation
- **No sensitive data**: Client-side only, no data persistence vulnerabilities
- **Dependencies**: Regularly updated to latest secure versions
- **Vercel Platform**: Enterprise-grade security and SSL

## 🎖️ Technical Highlights

This project showcases **senior-level frontend development skills**:

### 🏗️ **Architecture & Patterns**
- **Standalone Components**: Modern Angular 20 without NgModules
- **Signal-based State**: Reactive state management with Angular Signals  
- **Clean Architecture**: Separation of concerns and maintainable code structure
- **TypeScript Strict Mode**: Maximum type safety and developer experience

### ⚡ **Performance & Optimization**  
- **Bundle Optimization**: 73% compression ratio in production builds
- **Lazy Loading**: Code splitting and optimized bundle loading
- **Build Performance**: Sub-35s production builds with caching
- **Runtime Performance**: Optimized change detection with OnPush strategy

### 🔄 **DevOps & Automation**
- **CI/CD Pipeline**: Automated testing, building, and deployment
- **Quality Gates**: ESLint, Prettier, TypeScript compiler checks
- **Automated Deployment**: Git-to-production workflow with Vercel
- **Environment Management**: Development and production configurations

### 🧪 **Testing & Quality Assurance**
- **Unit Testing**: Comprehensive test coverage with Jasmine/Karma
- **Build Validation**: Automated build verification in CI pipeline
- **Code Quality**: Automated linting and formatting enforcement
- **Type Safety**: Zero `any` types, strict TypeScript configuration

### 🌐 **Production Deployment**
- **Modern Hosting**: Vercel platform with global CDN
- **Security Headers**: Production-ready security configuration  
- **Performance Monitoring**: Real-time performance metrics
- **Scalable Architecture**: Ready for enterprise-level traffic

> **Perfect for demonstrating technical competency in Angular, TypeScript, modern frontend development, and DevOps practices to international employers.**

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run the full test suite
6. Create a pull request

### Code Standards
- Follow the existing code style
- Write comprehensive tests
- Update documentation
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Giovane Freu**
- GitHub: [@GiovaneFreu](https://github.com/GiovaneFreu)
- LinkedIn: [Giovane Freu](https://linkedin.com/in/giovanefreu)

## 🙏 Acknowledgments

- Angular team for the amazing framework
- Tailwind CSS for the utility-first approach
- Open source community for inspiration and tools

## 📈 Roadmap

### Version 2.0
- [ ] Real-time collaboration
- [ ] File attachments
- [ ] Calendar integration
- [ ] Mobile app (PWA)
- [ ] Advanced reporting

### Version 2.1
- [ ] AI-powered task suggestions
- [ ] Voice commands
- [ ] Team workspaces
- [ ] API integrations

---

⭐ If you found this project helpful, please consider giving it a star on GitHub!

[⬆ Back to top](#todopro---professional-task-management-)