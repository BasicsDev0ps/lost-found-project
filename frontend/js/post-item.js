// Post Item JavaScript

const postLostForm = document.getElementById('postLostForm');
const postFoundForm = document.getElementById('postFoundForm');

// Convert image file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function handlePostForm(form, itemType) {
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = getUser();
    const token = getToken();
    
    if (!user || !token) {
      alert('Please login first');
      window.location.href = 'login.html';
      return;
    }

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const location = document.getElementById('location').value;
    const foundDate = document.getElementById('foundDate').value;
    const imageFile = document.getElementById('image').files[0];

    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');

    try {
      errorDiv.style.display = 'none';
      successDiv.style.display = 'none';

      let image = null;
      
      // If image is provided, convert to base64
      if (imageFile) {
        image = await fileToBase64(imageFile);
      }

      const requestBody = {
        title,
        description,
        category,
        type: itemType,
        location,
        foundDate,
        image_url: image,
      };

      console.log('Posting item with token:', token.substring(0, 20) + '...');
      console.log('Request body:', requestBody);

      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      console.log('Response status:', response.status);
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to post item');
      }

      successDiv.textContent = 'Item posted successfully!';
      successDiv.style.display = 'block';
      form.reset();

      setTimeout(() => {
        window.location.href = 'search.html';
      }, 2000);
    } catch (error) {
      console.error('Error posting item:', error);
      errorDiv.textContent = error.message;
      errorDiv.style.display = 'block';
    }
  });
}

// Handle both forms
document.addEventListener('DOMContentLoaded', () => {
  if (postLostForm) {
    handlePostForm(postLostForm, 'lost');
  }
  if (postFoundForm) {
    handlePostForm(postFoundForm, 'found');
  }
});
