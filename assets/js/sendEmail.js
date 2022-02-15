let contactName;
let contactEmail;
let enquiry;
let submitMessage;

contactName = document.getElementById('name');
contactEmail = document.getElementById('email');
enquiry = document.getElementById('enquiry');
submitMessage = document.getElementById('form-submit-message');


function sendMail(contactForm) {
    emailjs.send('gmail', 'CrateMatch Website', {
        'from_name': contactForm.name.value,
        'from_email': contactForm.email.value,
        'message': contactForm.enquiry.value
    })
        .then(
            function (response) {
                console.log('Success', response);
                contactName.value = '';
                contactEmail.value = '';
                enquiry.value = '';
                submitMessage.innerHTML = 'Thank you for your message';
            },
            function (error) {
                console.log('Failed', error);
            }
        )

    return false;
}