const form = document.querySelector('form');

// Quand on submit
form.addEventListener("submit", (event) => {
    // On empêche le comportement par défaut
    event.preventDefault();

    console.log("Il n’y a pas eu de rechargement de page");

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
        method: 'POST', // Spécifie la méthode HTTP POST
        headers: {
            'Content-Type': 'application/json', // Spécifie le type de contenu comme JSON
        },
        body: JSON.stringify(data) // Convertit les données JavaScript en JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse la réponse JSON
    })
    .then(data => {
        console.log('Success:', data); // Gère les données renvoyées par l'API

        localStorage.setItem('token', data.token);

        window.location.href = "index.html"; 
    })
    .catch(error => {
        console.error('Error:', error); // Gère les erreurs
        errorMessage.textContent = "Email ou mot de passe incorrect";
    });
});