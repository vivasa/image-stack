# React Data Viewer

This is a single-page React application that displays random data fetched from a specified API. By default, it fetches and displays images from Unsplash, but it can also be configured to fetch data from other APIs.

## Features

- Random image fetch from Unsplash or data from other APIs
- Maintain the fetched data in a stack
- Flexibility to select the fetcher function via environment variables

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- An API key from Unsplash (if you're using the Unsplash fetcher)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/vivasa/data-stack.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your API key in `.env` (if you're using the Unsplash fetcher)
   ```JS
   REACT_APP_UNSPLASH_ACCESS_KEY = 'Enter Your API';
   ```
4. Specify the fetcher function in `.env` (if you want to use a fetcher other than the Unsplash fetcher)
   ```JS
   REACT_APP_FETCHER_FUNCTION_NAME = 'Enter the fetcher function name';
   ```

### Running the app

After installing the dependencies and setting up your Unsplash API key (if needed), you can start the app by running:

```sh
npm start
```

Then open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Built With

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Acknowledgements

Images are provided by [Unsplash](https://unsplash.com/).

