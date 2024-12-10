document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer');

    // Boutons
    const mentionsBtn = document.getElementById('mentions');
    const sourcesBtn = document.getElementById('sources');
    const contactBtn = document.getElementById('contact');

    // Sections
    const mentionsSection = document.querySelector('.mentions-details');
    const sourcesSection = document.querySelector('.sources-details');
    const contactSection = document.querySelector('.contact-details');

    // Par défaut, footer a une hauteur complète
    footer.style.height = '100vh';

    // Fonction pour réinitialiser tout
    const resetSectionsAndStyles = () => {
        mentionsSection.style.display = 'none';
        sourcesSection.style.display = 'none';
        if (contactSection) contactSection.style.display = 'none';

        [mentionsBtn, sourcesBtn, contactBtn].forEach(button => {
            button.classList.remove('active');
            button.style.borderBottom = 'none';
            button.style.display = ''; 
        });
    };

    // Fonction pour gérer le clic sur un bouton
    const handleButtonClick = (button, section) => {
        resetSectionsAndStyles(); 

        section.style.display = 'block';
        button.classList.add('active');
        button.style.borderBottom = '1px solid white';
        button.style.display = 'inline'; 
        footer.style.height = 'auto';
    };

    // Ajouter des événements de clic
    mentionsBtn.addEventListener('click', () => handleButtonClick(mentionsBtn, mentionsSection));
    sourcesBtn.addEventListener('click', () => handleButtonClick(sourcesBtn, sourcesSection));
    contactBtn.addEventListener('click', () => handleButtonClick(contactBtn, contactSection));
});