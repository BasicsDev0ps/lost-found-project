// Dashboard JavaScript

async function loadUserItems() {
  const user = getUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/items`);
    const data = await response.json();
    
    console.log('User ID:', user.id);
    console.log('All items:', data);
    
    const myItems = data.filter(item => {
      // Support both camelCase and snake_case field names, convert IDs to numbers
      const itemPostedBy = Number(item.postedBy || item.posted_by);
      const userID = Number(user.id);
      console.log(`Checking item ${item.id}: postedBy=${itemPostedBy}, user.id=${userID}`);
      return itemPostedBy === userID;
    });
    
    const claimedItems = data.filter(item => {
      const itemClaimedBy = item.claimedBy || item.claimed_by;
      return itemClaimedBy && Number(itemClaimedBy) === Number(user.id);
    });

    console.log('My items:', myItems);
    console.log('Claimed items:', claimedItems);

    const myItemsContainer = document.getElementById('myItemsContainer');
    const claimedItemsContainer = document.getElementById('claimedItemsContainer');

    if (myItems.length > 0) {
      myItemsContainer.innerHTML = myItems.map(item => createDashboardItemCard(item)).join('');
    } else {
      myItemsContainer.innerHTML = '<p>No items posted yet</p>';
    }

    if (claimedItems.length > 0) {
      claimedItemsContainer.innerHTML = claimedItems.map(item => createItemCard(item)).join('');
    } else {
      claimedItemsContainer.innerHTML = '<p>No items claimed yet</p>';
    }
  } catch (error) {
    console.error('Error loading user items:', error);
  }
}

function createDashboardItemCard(item) {
  return `
    <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin-bottom: 15px; border-radius: 5px;">
      <h3 style="color: #333; margin-bottom: 5px;">${item.title}</h3>
      <p style="color: #666; font-size: 14px; margin-bottom: 5px;">${item.description}</p>
      <div style="margin-bottom: 10px;">
        <span style="background: #667eea; color: white; padding: 5px 10px; border-radius: 20px; font-size: 12px; margin-right: 5px; display: inline-block;">${item.type === 'lost' ? '🔴 LOST' : '🟢 FOUND'}</span>
        <span style="background: #764ba2; color: white; padding: 5px 10px; border-radius: 20px; font-size: 12px; margin-right: 5px; display: inline-block;">${item.category}</span>
        <span style="background: #999; color: white; padding: 5px 10px; border-radius: 20px; font-size: 12px; display: inline-block;">${item.status.toUpperCase()}</span>
      </div>
      <p style="color: #555; font-size: 13px; margin-bottom: 10px;">📍 ${item.location}</p>
      <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
        <button onclick="editItemPage('${item.id}')" style="background: #667eea; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-size: 14px;">Edit</button>
        <button onclick="deleteItem('${item.id}')" style="background: #dc3545; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-size: 14px;">Delete</button>
      </div>
    </div>
  `;
}

function editItemPage(itemId) {
  window.location.href = `edit-item.html?id=${itemId}`;
}

async function deleteItem(itemId) {
  if (!confirm('Are you sure you want to delete this item?')) return;

  try {
    const response = await fetch(`${API_URL}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete item');
    }

    alert('Item deleted successfully');
    loadUserItems();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

function loadUserProfile() {
  const user = getUser();
  
  if (user) {
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = `Email: ${user.email}`;
    document.getElementById('userPhone').textContent = 'Phone: ***-***-****';
    document.getElementById('profileName').value = user.name;
    document.getElementById('profileEmail').value = user.email || '';
  }
}

// Handle tab switching
document.addEventListener('DOMContentLoaded', () => {
  loadUserProfile();
  loadUserItems();

  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all tabs
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));

      // Add active class to clicked tab
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = getUser();
      const name = document.getElementById('profileName').value;
      const phone = document.getElementById('profilePhone').value;

      try {
        await apiCall(`/users/${user.id}`, 'PUT', { name, phone });
        alert('Profile updated successfully');
        setUser({ ...user, name });
        loadUserProfile();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });
  }
});
