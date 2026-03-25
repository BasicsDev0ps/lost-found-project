// Authentication JavaScript

// Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('errorMessage');

    try {
      errorDiv.style.display = 'none';

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setToken(data.token);
      setUser(data.user);

      alert('Login successful!');
      window.location.href = 'index.html';
    } catch (error) {
      errorDiv.textContent = error.message;
      errorDiv.style.display = 'block';
    }
  });
}

// Handle Register
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorDiv = document.getElementById('errorMessage');

    if (password !== confirmPassword) {
      errorDiv.textContent = 'Passwords do not match';
      errorDiv.style.display = 'block';
      return;
    }

    try {
      errorDiv.style.display = 'none';

      console.log('API_URL:', API_URL);
      console.log('Register payload:', { name, email, phone, password });

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      let data;
      try {
        data = await response.json();
        console.log('Response data:', data);
      } catch (jsonError) {
        console.error('Failed to parse JSON:', jsonError);
        console.log('Response text:', await response.text());
        throw new Error('Server returned invalid response');
      }

      if (!response.ok) {
        throw new Error(data.error || `Registration failed (${response.status})`);
      }

      if (!data.token || !data.user) {
        throw new Error('Invalid response: missing token or user');
      }

      setToken(data.token);
      setUser(data.user);

      alert('Registration successful!');
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Registration error:', error);
      errorDiv.textContent = error.message;
      errorDiv.style.display = 'block';
    }
  });
}

// Logout function
function logout() {
  removeToken();
  alert('Logged out successfully');
  window.location.href = '/frontend/index.html';
}
