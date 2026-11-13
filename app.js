// تعبئة اسم الخدمة أو المنتج تلقائياً من رابط الصفحة
const urlParams = new URLSearchParams(window.location.search);
const selectedService = urlParams.get('service');
const subjectInput = document.getElementById('subject');

if (selectedService && subjectInput) {
    const cleanService = selectedService.replace(/[<>]/g, '');
    subjectInput.value = cleanService;
}

// إرسال النموذج فعلياً إلى Formspree
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formAction = contactForm.getAttribute('action');
        if (formAction === 'YOUR_FORMSPREE_LINK') {
            formStatus.textContent = '[ERROR]: Please add your Formspree link in contact.html first.';
            return;
        }

        formStatus.textContent = '[SENDING...]: Encrypting and transmitting request...';

        const data = new FormData(contactForm);

        try {
            const response = await fetch(formAction, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = '[SUCCESS]: Request received! I will reply to your email with payment details (Bit/Mani) shortly.';
                contactForm.reset();
            } else {
                formStatus.textContent = '[ERROR]: Failed to send message. Please try again.';
            }
        } catch (error) {
            formStatus.textContent = '[ERROR]: Network issue. Check your internet connection.';
        }
    });
}
