# Research Website

A modern, aesthetic punk-style research website to showcase your projects, videos, pictures, and blog posts.

## Folder Structure

```
MyWebpage/
├── index.html              # Main homepage
├── css/
│   ├── styles.css          # Main stylesheet with punk aesthetic
│   └── blog-post.css       # Blog post specific styles
├── js/
│   └── main.js             # JavaScript for interactivity
├── assets/
│   ├── images/             # Store your images here
│   └── videos/             # Store your videos here
├── projects/               # Additional project files
├── blog/                   # Blog post HTML files
│   └── post-1.html         # Example blog post template
└── README.md               # This file
```

## How to Add Your Content

### 1. Adding Your Name and Info
- Open `index.html`
- Replace "YOUR.NAME" in the navigation (line 19)
- Replace "Your Name Here" in the About section (line 171)
- Update the footer copyright (line 186)
- Add your social media links (lines 188-191)

### 2. Adding Project Images
- Add your project images to `assets/images/`
- Name them: `project-1.jpg`, `project-2.jpg`, etc.
- Update image paths in `index.html` (lines 56, 77, 98)
- Update the `alt` attributes with descriptive text

### 3. Adding Project Videos
- Add your project videos to `assets/videos/`
- Name them: `project-video-1.mp4`, `project-video-2.mp4`, etc.
- Videos will display in the project modal when users click "View Details"

### 4. Updating Project Details
- Edit project information in `index.html` (lines 49-110)
- Edit project data in `js/main.js` (lines 43-77)
- Update titles, descriptions, and tags for each project

### 5. Creating Blog Posts
- Copy `blog/post-1.html` and rename it (e.g., `post-2.html`, `post-3.html`)
- Edit the content inside each blog post file
- Update the blog cards in `index.html` (lines 121-152) with:
  - Date
  - Category
  - Title
  - Excerpt
  - Link to the blog post file

### 6. Adding Blog Images
- Add blog header images to `assets/images/`
- Name them: `blog-1.jpg`, `blog-2.jpg`, etc.
- Reference them in your blog post HTML files

### 7. Adding Your Profile Picture
- Add your profile image as `assets/images/profile.jpg`
- Update the image path in the About section (line 177)

## Color Scheme

The website uses a punk-inspired aesthetic with:
- **Primary Color**: Hot Pink (#ff006e)
- **Secondary Color**: Cyan (#00f5ff)
- **Accent Color**: Yellow (#ffbe0b)
- **Background**: Dark (#0a0a0a, #1a1a1a)
- **Text**: Light gray (#f0f0f0)

### Customizing Colors
Edit the CSS variables in `css/styles.css` (lines 9-14):
```css
--color-primary: #ff006e;
--color-secondary: #00f5ff;
--color-accent: #ffbe0b;
```

## Features

- **Smooth Scrolling Navigation**: Click navigation links for smooth scroll to sections
- **Glitch Text Effect**: Punk-style glitch effect on key titles
- **Project Modal**: Click "View Details" to see full project information
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Hover Animations**: Interactive hover effects on cards and buttons
- **Scroll Animations**: Elements fade in as you scroll

## Customization Tips

### Adding More Projects
1. Copy a project card block in `index.html` (lines 49-71)
2. Update the project number, image, title, description, and tags
3. Add corresponding data to `js/main.js` projectData object

### Adding More Blog Posts
1. Create a new HTML file in the `blog/` folder
2. Copy the structure from `blog/post-1.html`
3. Add a new blog card in `index.html` linking to your new post

### Changing Fonts
The website uses:
- **Space Grotesk**: Modern, clean font for body text
- **Courier Prime**: Monospace font for dates and technical text

To change fonts, update the Google Fonts link in `index.html` (line 9) and CSS variables in `css/styles.css` (lines 16-17).

## Opening the Website

Simply open `index.html` in your web browser to view your website locally.

For hosting online, you can use:
- GitHub Pages
- Netlify
- Vercel
- Any web hosting service

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Need Help?

- The code is well-commented to help you understand each section
- All placeholder text is marked clearly
- Image placeholders will show broken image icons until you add real images

Enjoy building your research website!
