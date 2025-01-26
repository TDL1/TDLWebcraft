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
        const serviceID = "service_vdw2ylp";
        const templateID = "template_by9n8xi";

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
            company: document.getElementById('company').value,
            description: document.getElementById('description').value
        }

        const serviceID = "service_vdw2ylp";
        const templateID = "template_2wsidgk";

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

document.addEventListener("DOMContentLoaded", () => {
    const textElements = document.querySelectorAll("[data-translate]");
    const placeholderElements = document.querySelectorAll("[data-translate-placeholder]");
    const langDropdownItems = document.querySelectorAll(".dropdown-item");
    const langDropdownButton = document.getElementById("langDropdownButton");

    // Function to get the correct path for translations.json
    function getTranslationsPath() {
        const basePath = window.location.pathname; // Get the current path
        const depth = basePath.split("/").length - 2; // Calculate depth of the current file
        const prefix = "../".repeat(depth); // Add "../" based on depth
        return `${prefix}assets/languages/translations.json`;
    }

    // Function to load translations
    async function loadTranslations(lang) {
        try {
            const path = getTranslationsPath(); // Get the correct path dynamically
            const response = await fetch(path);
            const translations = await response.json();

            // Update text content
            textElements.forEach((el) => {
                const key = el.getAttribute("data-translate");
                if (translations[lang][key]) {
                    el.textContent = translations[lang][key];
                }
            });

            // Update placeholders
            placeholderElements.forEach((el) => {
                const key = el.getAttribute("data-translate-placeholder");
                if (translations[lang][key]) {
                    el.placeholder = translations[lang][key];
                }
            });

            // Save selected language to localStorage
            localStorage.setItem("language", lang);

            // Update dropdown button text
            langDropdownButton.textContent = lang === "en" ? "English" : "Nederlands";
        } catch (error) {
            console.error("Error loading translations:", error);
        }
    }

    // Event listener for dropdown items
    langDropdownItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const selectedLang = item.getAttribute("data-lang");
            loadTranslations(selectedLang);
        });
    });

    // Load the default language on page load
    const defaultLang = localStorage.getItem("language") || "en";
    loadTranslations(defaultLang);
});


document.addEventListener("DOMContentLoaded", () =>
{
    const langSwitcher = document.getElementById("lang-switcher");
    const downloadLink = document.getElementById("downloadCv");
    const cvLink = document.getElementById("cv");

    // Function to update the download link
    function updateDownloadLink(lang)
    {
        if (lang === "en")
        {
            downloadLink.href = "/";
            downloadLink.download = "cv-tristan-delaere-english.pdf";
        } else if (lang === "nl")
        {
            downloadLink.href = "/";
            downloadLink.download = "cv-tristan-delaere.pdf";
        }
    }

    function updateCvLink(lang)
    {
        if (lang === "en")
        {
            cvLink.href = "cv-tristan-delaere-english.pdf";
        } else if (lang === "nl")
        {
            cvLink.href = "cv-tristan-delaere.pdf";
        }
    }

    // Update the download link when the language changes
    langSwitcher.addEventListener("change", (e) =>
    {
        const selectedLang = e.target.value;
        updateDownloadLink(selectedLang);
        updateCvLink(selectedLang);
    });

    // Set default language and update the link
    const defaultLang = localStorage.getItem("language") || "en";
    langSwitcher.value = defaultLang;
    updateDownloadLink(defaultLang);
    updateCvLink(defaultLang);
});