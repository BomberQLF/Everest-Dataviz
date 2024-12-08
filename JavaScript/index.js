document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer');

    // Boutons
    const mentionsBtn = document.getElementById('mentions');
    const sourcesBtn = document.getElementById('sources');
    const contactBtn = document.getElementById('contact');

    // Sections
    const mentionsSection = document.querySelector('.mentions-details');
    const sourcesSection = document.querySelector('.sources-details');

    // Ajoute une éventuelle section pour Contact
    const contactSection = document.querySelector('.contact-details');

    // Par défaut, footer a une hauteur complète
    footer.style.height = '100vh';

    // Fonction pour réinitialiser tout
    const resetSectionsAndStyles = () => {
        // Cacher toutes les sections
        mentionsSection.style.display = 'none';
        sourcesSection.style.display = 'none';
        if (contactSection) contactSection.style.display = 'none';

        // Retirer le style actif des boutons
        mentionsBtn.classList.remove('active');
        sourcesBtn.classList.remove('active');
        contactBtn.classList.remove('active');
    };

    // Fonction pour gérer le clic sur un bouton
    const handleButtonClick = (button, section) => {
        resetSectionsAndStyles(); // Réinitialise les styles et sections

        // Afficher la section associée
        section.style.display = 'block';

        // Ajouter la classe active au bouton cliqué
        button.classList.add('active');

        // Ajuster la hauteur du footer pour s'adapter à son contenu
        footer.style.height = 'auto';
    };

    // Ajouter des événements de clic
    mentionsBtn.addEventListener('click', () => handleButtonClick(mentionsBtn, mentionsSection));
    sourcesBtn.addEventListener('click', () => handleButtonClick(sourcesBtn, sourcesSection));
    contactBtn.addEventListener('click', () => handleButtonClick(contactBtn, contactSection));
});