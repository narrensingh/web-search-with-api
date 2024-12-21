async function performSearch() {
  const query = document.getElementById('searchInput').value;
  const nums = 15;
  const url = `https://google-search72.p.rapidapi.com/search?q=${query}&lr=en-US&num=${nums}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '937dc010eamsh81d95cf5c9cd77bp194095jsn8c6c686f5840',
      'x-rapidapi-host': 'google-search72.p.rapidapi.com',
    },
  };

  const loader = document.getElementById('loader');
  const resultsContainer = document.getElementById('resultsContainer');
  loader.style.display = 'block';
  resultsContainer.innerHTML = '';

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    loader.style.display = 'none';
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    if (result.items && result.items.length > 0) {
      result.items.forEach((item) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        resultItem.innerHTML = `
                            <a href="${item.link}" target="_blank">${item.title}</a>
                            <p>${item.snippet}</p>
                        `;

        resultsContainer.appendChild(resultItem);
      });
    } else {
      resultsContainer.innerHTML = '<p>No results found.</p>';
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    alert(
      'An error occurred while fetching the search results. Please try again later.'
    );
  }
}
