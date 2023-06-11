
# ImageStack Low-Level Design

## Introduction

This document provides a detailed low-level design for the ImageStack project. The project uses React, TypeScript, and Tailwind CSS to create a user interface that fetches and displays images from Unsplash. The user can navigate through the images using a "Previous" and "Next" button, and they can also jump to a specific image using a slider.

## Component Diagram

The ImageStack project is composed of several components. Here's a rough component diagram:

```
    App
    ├── ImageButton
    ├── ImageSlider
    ├── ImageFrame
    └── useImageFetcher
```

### App

This is the main component of the ImageStack project. It makes use of the ImageButton, ImageSlider, ImageFrame, and useImageFetcher components to provide the main functionality of the project.

### ImageButton

ImageButton is a reusable component that is used to render the "Previous" and "Next" buttons. It accepts an `onClick` handler, a `disabled` state, and children (which is the text to be displayed on the button).

### ImageSlider

ImageSlider is a component that is used to render a slider. It allows the user to navigate directly to a specific image. It accepts a `min`, `max`, and `value` to control the slider's range and current value, an `onChange` handler to handle changes in the slider's value, and a `totalImages` prop to display the total number of images fetched.

### ImageFrame

ImageFrame is a component that displays the current image along with a loading spinner if necessary. It accepts a `src` for the image URL, an `alt` for the image's alternative text, and a `showHourGlass` boolean to indicate whether the loading spinner should be shown.

### useImageFetcher

useImageFetcher is a custom hook that handles fetching of images from Unsplash. It also manages the state related to the images, such as the image history, the current index, and the loading state.

## HTML Structure

The HTML structure of the project is defined in the `index.html` file. It's the main HTML document that is loaded when someone visits the application. The file includes the `div` with `id="root"` where the main `App` component gets rendered. 

## CSS Styles

The CSS styles for the project are defined in the `index.css` and the inline `style` in `index.html` files. It contains styles for the `body` and `code` HTML elements. Additionally, it imports base, components, and utilities styles from Tailwind CSS, which is used extensively throughout the project to create a modern, responsive design.

## State Management

State in the ImageStack project is managed using React's useState and useEffect hooks, as well as the custom useImageFetcher hook. Here are the main pieces of state:

- `imageHistory`: an array of image URLs that have been fetched
- `currentIndex`: the index of the current image in the imageHistory array
- `showHourGlass`: a boolean that indicates whether the loading spinner should be shown
- `countdown`: a countdown timer
- `altText`: the alt text for the current image
- `animate`: a boolean that controls a transition animation in the App component

---
