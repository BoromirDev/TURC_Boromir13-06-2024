let myWorks = [];
let myWorksFiltered = [];

/* DECLARATION DE CODE */

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

function affichageWorks() {
  const gallery = document.querySelector(".gallery")
  gallery.innerHTML = "";
  myWorksFiltered.forEach((element) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = element.imageUrl;
    img.alt = element.title;
    figure.setAttribute('id','gallery-work-' + element.id)

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = element.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

async function affichageCategories() {
  const categories = document.querySelector("#categories")
  const btnTous = document.createElement("button")
  btnTous.textContent = 'Tous';
  btnTous.classList.add("btn-projets");
  btnTous.addEventListener("click", (e) => {
    myWorksFiltered = myWorks;
    affichageWorks();
  })
  categories.appendChild(btnTous);
  const arrayCategories = await getCategories()
  console.log(localStorage)
  arrayCategories.forEach((categorie) => {
    const btn = document.createElement("button")
    btn.textContent = categorie.name;
    btn.id = categorie.id;
    btn.classList.add("btn-projets");
    btn.addEventListener("click", (e) => {
      btnId = e.target.id;
      myWorksFiltered = myWorks.filter((work) => {
        console.log("IDs: ", btnId, work)
        return work.categoryId == btnId
      });
      affichageWorks();
    });
    categories.appendChild(btn);
  })

  // ajouter un boutton tous qui va simplement remplacer
  // la liste filtrée avec notre liste en copie quand on
  // clique dessus

}

function modeAdmin() {
  const barreEdition = document.querySelector('.barre-edition');
  barreEdition.style.display = 'flex';

  addWorksToBaseModal(myWorks)
  addEventsForBaseModal()
  addEventsForUploadModal()
}

/* EXECUTION DE CODE */
async function main() {
  // La liste de projets vient du backend
  myWorks = await getWorks();
  myWorksFiltered = myWorks;
  
  // Qu'on affiche
  affichageWorks();

  // vérifier si l'utilisateur a un token
  const token = localStorage.getItem('token');

  if (token) {
    // si l'utilisateur a un token, afficher le mode admin
    document.querySelector('.barre-edition').style.display = 'flex';
    document.querySelector('.btn-modal').style.display = 'block';
    
    // qu'on active
    modeAdmin();

  } else {
    // si l'utilisateur n'a pas de token, afficher les catégories
    document.querySelector('.barre-edition').style.display = 'none';
    document.querySelector('.btn-modal').style.display = 'none';

    // qu'on affiche
    affichageCategories();
  }
}

main()

