// smooth scroll
$(document).ready(function ()
{
    $(".navbar .nav-link").on('click', function (event)
    {

        if (this.hash !== "")
        {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function ()
            {
                window.location.hash = hash;
            });
        }
    });
});

// navbar toggle
$('#nav-toggle').click(function ()
{
    $(this).toggleClass('is-active')
    $('ul.nav').toggleClass('show');
});

function showCustomAlert(message)
{
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message;
    alertBox.classList.remove('hidden');
}

function closeCustomAlert()
{
    const alertBox = document.getElementById('customAlert');
    alertBox.classList.add('hidden');

    document.getElementById('name').value = "";
    document.getElementById('email').value = "";

    if (document.getElementById('message'))
    {
        document.getElementById('message').value = "";
    }
    if (document.getElementById('company'))
    {
        document.getElementById('company').value = "";
        document.getElementById('description').value = "";
        document.getElementById('phone').value = "";
    }

    document.querySelector('#submitButton').disabled = false;
}


function sendContactEmail()
{
    try
    {
        document.querySelector('#submitButton').disabled = true;

        var templateParams = {
            to_name: "TDL Webcraft",
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value
        }
        const serviceID = "";
        const templateID = "";

        emailjs.send(serviceID, templateID, templateParams).then(
            (response) =>
            {
                console.log('SUCCESS!', response.status, response.text);
                showCustomAlert("Uw bericht is succesvol ontvangen. Bedankt!");
            },
            (error) =>
            {
                console.log('FAILED...', error);
                showCustomAlert("Het versturen van uw bericht is mislukt. Probeer het later opnieuw.");
                document.querySelector('#submitButton').disabled = false;
            }
        );
    } catch (err)
    {
        console.error("Unexpected error:", err);
        showCustomAlert("Er is een onverwachte fout opgetreden. Probeer het later opnieuw.");
        document.querySelector('#submitButton').disabled = false;
    }
}

function sendHireMeEmail()
{
    try
    {
        document.querySelector('#submitButton').disabled = true;

        var templateParams = {
            to_name: "TDL Webcraft",
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('company').value,
            description: document.getElementById('description').value
        }

        const serviceID = "";
        const templateID = "";

        emailjs.send(serviceID, templateID, templateParams).then(
            (response) =>
            {
                console.log('SUCCESS!', response.status, response.text);
                showCustomAlert("Uw bericht is succesvol ontvangen. Bedankt!");
            },
            (error) =>
            {
                console.log('FAILED...', error);
                showCustomAlert("Het versturen van uw offerteaanvraag is mislukt. Probeer het later opnieuw.");
            }
        );
    } catch (err)
    {
        console.error("Unexpected error:", err);
        showCustomAlert("Er is een onverwachte fout opgetreden. Probeer het later opnieuw.");
    }
}