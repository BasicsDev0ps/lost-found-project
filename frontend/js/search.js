// Search JavaScript

let allItems = [];

async function loadItems(filters = {}) {
  try {
    let url = `${API_URL}/items`;
    const params = new URLSearchParams(filters);
    if (params.toString()) {
      url += '?' + params.toString();
    }

    const response = await fetch(url);
    allItems = await response.json();
    displayItems(allItems);
  } catch (error) {
    console.error('Error loading items:', error);
    document.getElementById('itemsContainer').innerHTML = '<p>Error loading items</p>';
  }
}

function displayItems(items) {
  const container = document.getElementById('itemsContainer');
  const noResults = document.getElementById('noResults');

  if (items.length === 0) {
    container.innerHTML = '';
    noResults.style.display = 'block';
  } else {
    container.innerHTML = items.map(item => createItemCard(item)).join('');
    noResults.style.display = 'none';
  }
}

function applyFilters() {
  const filters = {};

  const type = document.getElementById('filterType').value;
  if (type) filters.type = type;

  const category = document.getElementById('filterCategory').value;
  if (category) filters.category = category;

  const status = document.getElementById('filterStatus').value;
  if (status) filters.status = status;

  const location = document.getElementById('filterLocation').value;
  if (location) filters.location = location;

  loadItems(filters);
}

async function searchItems() {
  const query = document.getElementById('searchInput').value;

  if (!query.trim()) {
    loadItems();
    return;
  }

  try {
    const response = await fetch(`${API_URL}/items/search/query?q=${encodeURIComponent(query)}`);
    const items = await response.json();
    displayItems(items);
  } catch (error) {
    console.error('Search error:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadItems();

  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', searchItems);
  }

  const applyFiltersBtn = document.getElementById('applyFiltersBtn');
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', applyFilters);
  }

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        searchItems();
      }
    });
  }
});
