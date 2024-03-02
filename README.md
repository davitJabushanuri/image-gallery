# Image Gallery

[Preview](https://image-gallery-opal-tau.vercel.app/)

This is a React and TypeScript-based project that provides a simple and interactive interface to search and view images. The project uses the Unsplash API to fetch images and display them on the page.

## Features

- **Accessibility-Focused** - Built with adherence to WCAG guidelines:

  - **Meaningful Structure**: Headings, landmarks, and ARIA attributes are used to structure the content effectively.
  - **Keyboard Navigation**: Navigate the application effortlessly using your keyboard with logical tab order.
  - **Focus Indicators**: Interactive elements have clear visual cues when focused.
  - **Screen Reader Support**: The app is optimized for use with screen readers.
  - **Alternative Text for Images**: Images are accompanied by descriptive alt text, conveying their meaning to screen reader users and improving SEO.

- **Automatic Color Scheme**: The application adapts to your system's theme preference.

- **Main Page**: The main page showcases the top 20 trending photos from Unsplash. A dynamic search box is also present, which allows for real-time image search. As you input your search terms, the page updates instantly to display the corresponding results, utilizing an infinite query mechanism.

- **Top 20 Showcase**: Displays a curated selection of stunning images upon initial load.

- **Search**: Effortlessly find specific images using the intuitive search bar. As you type, relevant suggestions are displayed in real-time. It utilizes infinite queries to ensure better performance and user experience.

- **Search History**: Keep track of your past searches for easy revisiting or removal.

- **Image Details Modal**: Clicking on an image opens a modal, providing a closer look at the image along with valuable information like views, likes, and downloads.

- **Caching**: React Query ensures a smooth experience by caching fetched images. Cached results are automatically refreshed every 5 minutes to maintain data accuracy.

- **Error Handling**: Gracefully handles unexpected errors to prevent application crashes and Informs users about any issues encountered.

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository:

   ```sh
   git clone git@github.com:davitJabushanuri/image-gallery.git
   ```

2. Install the dependencies:

   ```sh
   pnpm install
   ```

3. Obtain an access key from the Unsplash API:

   - Visit [Unsplash Developers](https://unsplash.com/developers)
   - Register as a developer and create a new application
   - copy the access and secret keys to the .env file

   ```sh
   VITE_APP_ACCESS_KEY=your access key
   VITE_APP_SECRET_KEY=your secret key
   ```

   check the .env.example file in the project for reference.

4. Start the development server:

   ```sh
   pnpm dev
   ```

## Built with

- React
- TypeScript
- Tanstack Query
- Unsplash API
- SCSS and CSS modules
