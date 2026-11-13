// تعبئة اسم الخدمة أو المنتج تلقائياً من رابط الصفحة
const urlParams = new URLSearchParams(window.location.search);
const selectedService = urlParams.get('service');
const subjectInput = document.getElementById('subject');

if (selectedService && subjectInput) {
    const cleanService = selectedService.replace(/[<>]/g, '');
    subjectInput.value = cleanService;
}

// إرسال النموذج فعلياً إلى Formspree مع تخصيص رسالة النجاح
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formAction = contactForm.getAttribute('action');
        if (formAction === 'YOUR_FORMSPREE_LINK') {
            formStatus.textContent = '[ERROR]: Please add your Formspree link first.';
            return;
        }

        formStatus.textContent = '[SENDING...]: Transmitting your message...';

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
                // التحقق مما إذا كان المستخدم في صفحة التقييمات لعرض جملة الشكر
                if (window.location.pathname.includes('reviews.html')) {
                    formStatus.textContent = '[THANK YOU]: Your review and feedback have been received! I appreciate your support.';
                } else {
                    formStatus.textContent = '[SUCCESS]: Request received! I will reply to your email with payment details (Bit/Mani) shortly.';
                }
                contactForm.reset();
            } else {
                formStatus.textContent = '[ERROR]: Failed to send message. Please try again.';
            }
        } catch (error) {
            formStatus.textContent = '[ERROR]: Network issue. Check your internet connection.';
        }
    });
}
