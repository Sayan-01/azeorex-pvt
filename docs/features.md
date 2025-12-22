# Azeorex Platform Features

## Overview ==>
Azeorex is an all-in-one Web Design & Development Agency, a powerful No-Code SaaS platform for building and deploying websites, and a vibrant Template Marketplace.

## Core Pillars ==>

### 🚀 Agency Services
- End-to-end web design and full-stack development
- Professional design and development services

### 🧩 No-Code Builder (SaaS)
- Drag-and-drop editor to design and deploy websites
- Intuitive interface for creating professional websites without coding
- By a single click user can deploy website to live subdomains

### 🏪 Azeorex Templates Marketplace
- Marketplace for templates built in Azeorex
- Ready-to-use templates for quick editing and deployment

### 🎨 Figma Templates Marketplace
- Buy and sell professional Figma templates
- Seamless integration with design workflows

## Key Features  ==>

### Website Creation & Deployment
- Create and deploy websites instantly
- Drag-and-drop component-based design
- Real-time preview and editing
- One-click deployment to live subdomains

### Template Marketplace
- Browse and purchase Figma and Azeorex templates
- Secure checkout process
- Automatic template cloning to your projects
- Sell your own templates and earn

### AI-Powered Features
- AI Template Generator - Create layouts from natural language prompts
- AI Design Suggestions - Smart recommendations for design elements
- AI Code Generation - Convert Figma designs into Azeorex templates

<!-- ### Analytics Dashboard
- Track performance metrics
- Monitor downloads and sales
- Visitor statistics
- Performance insights -->

## Getting Started ==>
1. Sign up for an account
2. Choose to create a new project or browse templates
3. Customize your site or template
4. Deploy and go live

## How It Works ==>

### Publish Your Website 
1. Login and create a new project (name, description, subdomain) or just buy a template from marketplace
2. Open the project and create pages or edit existing pages
3. Use the editor to design with drag-and-drop
4. Deploy instantly to your live subdomain

### Uploading Templates
  `Figma Templates`
    1. Go to Profile → Become an Admin
    2. Accept policies
    3. Upload .fig files with details
    4. Template goes live in the marketplace

  `Azeorex Templates`
    1. Visit Marketplace → Become a Creator
    2. Select a project and accept privacy policy
    3. Fill in template details
    4. Submit for listing in the marketplace

### Buying Templates
  `Figma Templates`: Purchase and download directly
  `Azeorex Templates`: Automatically cloned to your projects after purchase

## Benefits
- No coding skills required
- Fast deployment
- Professional-quality results
- Monetization opportunities for creators
- Seamless design-to-development workflow

### How Subdomain Feature Works
1. In production, my DNS should support wild card subdomains, Add  a DNS record like `*.azeorex.com` -> pointing to your Next.js server IP.
2. Use middleware to detect subdomain.
3. For a request to https://subdomain.azeorex.com/, the server internally rewrites the request to https://azeorex.com/subdomain, while the user sees https://subdomain.azeorex.com/.

---

*For more information, visit our [website](https://azeorex.com) or contact our support team.*