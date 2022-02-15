function sendMail(contactForm) {
    emailjs.send('gmail', 'CrateMatch Website', {
        'from_name': contactForm.name.value,
        'from_email': contactForm.email.value,
        'message': contactForm.enquiry.value
    })
    .then(
        function(response) {
            console.log('Success', response);
        },
        function(error) {
            console.log('Failed', error);
        }
    )
    formReset();  // Reset all form data
    return false;
}

function formReset(contactForm) {
    contactForm.name.value = '';
    contactForm.email.value = '';
    contactForm.enquiry.value = '';
}