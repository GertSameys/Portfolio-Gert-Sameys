// Initialize EmailJS
(function() {
    emailjs.init('n1OxJf_mszpXPvazP'); // Replace with your EmailJS user ID
})();

// Mobile menu
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
});

// Function to show error message and red border
function showError(inputElement, message) {
    const control = inputElement.parentNode;
    const help = control.nextElementSibling;
    
    inputElement.classList.add('is-danger');
    control.querySelector('.icon.is-right').innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    help.style.display = 'block';
    help.textContent = message;
}

// Function to clear error message and styles
function clearError(inputElement) {
    const control = inputElement.parentNode;
    const help = control.nextElementSibling;

    inputElement.classList.remove('is-danger');
    control.querySelector('.icon.is-right').innerHTML = '';
    help.style.display = 'none';
    help.textContent = '';
}

// Form validation and submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    let isValid = true;

    // Clear existing errors
    clearError(nameInput);
    clearError(emailInput);
    clearError(subjectInput);
    clearError(messageInput);

    // Basic validation
    if (!name) {
        showError(nameInput, 'Please enter your name.');
        isValid = false;
    }

    if (!email) {
        showError(emailInput, 'Please enter your email.');
        isValid = false;
    } else if (!email.includes('@')) {
        showError(emailInput, 'Please enter a valid email.');
        isValid = false;
    }

    if (!subject) {
        showError(subjectInput, 'Please enter a subject.');
        isValid = false;
    }

    if (!message) {
        showError(messageInput, 'Please enter your message.');
        isValid = false;
    }


    if (isValid) {
        // Send email using EmailJS
        emailjs.send('service_dqxj8di', 'template_8w9qbl4', {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        })
        .then(function(response) {
            clearError(document.getElementById('contact-form'));
            showError(document.getElementById('contact-form'), 'Your message has been sent successfully!', 'is-success');
            document.getElementById('contact-form').reset(); // Reset the form after submission
        }, function(error) {
            showError(document.getElementById('contact-form'), 'Failed to send the message. Please try again later.', 'is-danger');
        });
    }
});
