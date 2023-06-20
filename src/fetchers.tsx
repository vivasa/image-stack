// Fetch image from Unsplash
export const fetchImageFromUnsplash = (): Promise<any> => {
  return fetch('https://api.unsplash.com/photos/random?query=nature', {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

// Fetch data from an external API
export const fetchFromExternalApi = (): Promise<any> => {
  // This is a placeholder, replace it with your actual API call
  return fetch('https://your-api-url.com/data');
}
