const apiKey = '0ba10c1c9f59423f821cce3f7f2e3818';
const newsContainer = document.getElementById('news-container');

async function fetchNews() {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
            displayNews(data.articles);
        } else {
            newsContainer.innerHTML = '<p>No news articles available at the moment.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
    }
}

function displayNews(articles) {
    articles.forEach(article => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
            <div class="card mb-4">
                <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${article.title}">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description || 'No description available'}</p>
                    <a href="${article.url}" class="btn btn-primary" target="_blank">Read More</a>
                </div>
            </div>
        `;
        newsContainer.appendChild(col);
    });
}

document.addEventListener('DOMContentLoaded', fetchNews);
