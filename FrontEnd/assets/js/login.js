const form = document.querySelector('form');

// Quand on submit
form.addEventListener("submit", (event) => {
    // On empeche le comportement par défaut
    event.preventDefault();

    console.log("Il n'y a pas eu de rechargement de page");

    const email = document.getElementById("email").value;
    const mdp = document.getElementById("mot-de-passe").value;
    const errorMessage = document.getElementById("errorMessage");

    console.log(email);
    console.log(mdp);

    const url = "http://localhost:5678/api/users/login";
    const data = {
        email,
        password: mdp
    };

    fetch(url, {
        method: 'POST', // Specifie la methode HTTP POST
        headers: {
            'Content-Type': 'application/json', // Specifie le type de contenu comme JSON
        },
        body: JSON.stringify(data) // Convertit les donnees JavaScript en JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse la reponse JSON
    })
    .then(data => {
        console.log('Success:', data); // Gere les donnees renvoyees par l'API

        localStorage.setItem('token', data.token);

        window.location.href = "index.html"; 
    })
    .catch(error => {
        console.error('Error:', error); // Gere les erreurs
        errorMessage.textContent = "Email ou mot de passe incorrect";
    });
});