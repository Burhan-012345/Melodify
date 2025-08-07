document.addEventListener('DOMContentLoaded', function() {
    // Initialize local storage if empty
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    // Generate a random user ID for registration
    document.getElementById('register-userid').value = generateUserId();

    // Form switching functionality
    const switchButtons = document.querySelectorAll('.switch-form');
    switchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetForm = this.getAttribute('data-target');
            switchForm(targetForm);
            
            // If switching from login to register with filled credentials
            if (targetForm === 'register') {
                const loginUsername = document.getElementById('login-username').value;
                const loginPassword = document.getElementById('login-password').value;
                
                if (loginUsername && loginPassword) {
                    document.getElementById('register-username').value = loginUsername;
                    document.getElementById('register-password').value = loginPassword;
                    document.getElementById('register-confirm-password').value = loginPassword;
                    showNotification('Please complete your registration', 'info');
                }
            }
        });
    });

    // Login form submission
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.username === username);
        
        if (user) {
            if (user.password === password) {
                showNotification('Login successful! Redirecting...', 'success');
                // Redirect to player.html after a short delay
                setTimeout(() => {
                    window.location.href = 'player.html';
                }, 1500);
            } else {
                showNotification('Incorrect password', 'error');
            }
        } else {
            showNotification('Username not found. Please register.', 'info');
            switchForm('register');
            document.getElementById('register-username').value = username;
            document.getElementById('register-password').value = password;
            document.getElementById('register-confirm-password').value = password;
        }
    });

    // Register form submission
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const userId = document.getElementById('register-userid').value;
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users'));
        
        // Check if username already exists
        if (users.some(u => u.username === username)) {
            showNotification('Username already exists', 'error');
            return;
        }
        
        // Check if email already exists
        if (users.some(u => u.email === email)) {
            showNotification('Email already registered', 'error');
            return;
        }
        
        // Add new user
        users.push({
            userId,
            username,
            email,
            password,
            hasResetPassword: false // Flag for password reset
        });
        
        localStorage.setItem('users', JSON.stringify(users));
        showNotification('Registration successful! Redirecting...', 'success');
        
        // Reset form and generate new user ID
        this.reset();
        document.getElementById('register-userid').value = generateUserId();
        
        // Redirect to player.html after a short delay
        setTimeout(() => {
            window.location.href = 'player.html';
        }, 1500);
    });

    // Forgot password form submission
    document.getElementById('forgot-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const userId = document.getElementById('forgot-userid').value;
        const username = document.getElementById('forgot-username').value;
        const newPassword = document.getElementById('forgot-new-password').value;
        const confirmPassword = document.getElementById('forgot-confirm-password').value;
        
        if (newPassword !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(u => u.userId === userId && u.username === username);
        
        if (userIndex === -1) {
            showNotification('User ID or username is incorrect', 'error');
            return;
        }
        
        if (users[userIndex].hasResetPassword) {
            showNotification('Password has already been reset once. Contact support for further assistance.', 'error');
            return;
        }
        
        // Update password
        users[userIndex].password = newPassword;
        users[userIndex].hasResetPassword = true;
        localStorage.setItem('users', JSON.stringify(users));
        
        showNotification('Password reset successfully!', 'success');
        this.reset();
        switchForm('login');
    });
});

// Function to switch between forms
function switchForm(formName) {
    // Hide all forms and info texts
    document.querySelectorAll('.form').forEach(form => {
        form.classList.remove('active');
    });
    document.querySelectorAll('.text-item').forEach(text => {
        text.classList.remove('active');
    });
    
    // Show selected form and info text
    document.getElementById(`${formName}-form`).classList.add('active');
    document.getElementById(`${formName}-info`).classList.add('active');
}

// Function to toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Function to copy user ID to clipboard
function copyToClipboard(inputId) {
    const input = document.getElementById(inputId);
    input.select();
    document.execCommand('copy');
    
    // Show feedback
    const originalValue = input.value;
    input.value = 'Copied!';
    setTimeout(() => {
        input.value = originalValue;
    }, 1000);
}

// Function to generate random user ID
function generateUserId() {
    return 'USER-' + Math.random().toString(36).substr(2, 8).toUpperCase();
}

// Function to show notification
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification';
    notification.classList.add(type, 'show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}