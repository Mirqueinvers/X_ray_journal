let API_BASE = 'http://localhost:5000'; // дефолтное

if (window.location.hostname === 'localhost') {
  API_BASE = 'http://localhost:5000';
} else if (window.location.hostname === 'backend') {
  API_BASE = 'http://backend:5000';
}

export default API_BASE;
