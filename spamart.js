// Set up GraphQL query for Objkt.com API
const query = `
  query {
    token(
      where: {tags: {tag: {name: {_ilike: "%spamart%"}}}},
      limit: 500
    ) {
      token_id
      display_uri
    }
  }
`;

// Define function to get random image from Objkt.com API
async function getRandomImage() {
  try {
    // Fetch data from Objkt.com API
    const response = await fetch('https://data.objkt.com/v3/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query})
    });

    // Parse response data
    const data = await response.json();
    const tokens = data.data.token;
    
    // Choose random image from list of tokens
    const randomIndex = Math.floor(Math.random() * tokens.length);
    const randomImage = tokens[randomIndex];

    // Return image URL
    return randomImage.display_uri.replace('ipfs://', 'https://ipfs.io/ipfs/');;
  } catch (error) {
    console.error(error);
  }
}

// Update image on page load
window.addEventListener('load', async () => {
  // Get container element for image
  const container = document.querySelector('.background');
  
  // Get random image URL from Objkt.com API
  const imageUrl = await getRandomImage();


  // Set background image for container
  container.style.backgroundImage = `url(${imageUrl})`;
});


