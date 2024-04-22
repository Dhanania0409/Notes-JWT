document.addEventListener('DOMContentLoaded', function() {
    
    const registrationForm = document.getElementById('register-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            registerUser(username, password);
        });
    }

    // Handle Login Form Submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            loginUser(username, password);
        });
    }
});

function registerUser(userData) {
    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
}


function loginUser(userData) {
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.token) {
            localStorage.setItem('token', data.token); // Save token to local storage
            window.location.href = '/dashboard.html'; // Redirect to dashboard
        }
    }).catch(error => console.error('Error:', error));
}
