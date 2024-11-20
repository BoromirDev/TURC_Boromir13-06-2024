const modal = document.querySelector('.modal');
const uploadModal = document.querySelector('.uploadModal');

function createDeleteButton(work) {
  // ajouter un boutton suppression a chaque image de work
  const deleteButton = document.createElement('button')
  deleteButton.addEventListener('click', (event) => {
    const workToDelete = document.getElementById('modal-work-' + work.id)
    const galleryWorkToDelete = document.getElementById('gallery-work-' + work.id)
  
    try {
      fetch(`http://localhost:5678/api/works/${work.id}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (response.ok) {
              workToDelete.remove();
              galleryWorkToDelete.remove();
  
              let index = myWorks.indexOf(work);
              myWorks.splice(index, 1);
  
              let myFilteredWork = myWorksFiltered.find(workFiltered => workFiltered.id == work.id);
              index = myWorksFiltered.indexOf(myFilteredWork);
              myWorksFiltered.splice(index, 1);
          } else {
              console.error("La suppression a échoué.");
          }
      })
      .catch(error => {
          console.error("Erreur lors de la suppression : ", error);
      });
    } catch (error) {
        console.error("Erreur générale : ", error);
    }
  })
  return deleteButton
}

function addWorksToBaseModal(myWorks) {
  const modalGallery = document.querySelector('.modal-gallery');
  modalGallery.innerHTML = '';

  myWorks.forEach((work) => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    figure.setAttribute('id','modal-work-' + work.id)
    img.src = work.imageUrl;
    img.classList.add("modal-image");

    // mise en place du delete button
    deleteButton = createDeleteButton(work);

    const figcaption = document.createElement('figcaption');
    figure.appendChild(img);
    figure.appendChild(deleteButton);
    figure.appendChild(figcaption);
    modalGallery.appendChild(figure);
  });
}

function closeModal() {
  modal.style.display = 'none'
  uploadModal.style.display = 'none'
}

function addEventsForBaseModal() {
  
  // ajouter la fonctionalite d'affichage du modal
  const openModalButton = document.querySelector('.btn-modal');
  openModalButton.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  // boutton pour fermer le modal
  const closeModalButton = document.getElementById('close-base-modal');
  closeModalButton.addEventListener('click', closeModal);
  
  // fermer sur clique exterieur
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

function addEventsForUploadModal() {
  const btnOpenUploadModal = document.querySelector('#btnOpenUploadModal');
  // ajouter la fonctionalite d'affichage du modal upload au boutton du modal de base
  btnOpenUploadModal.addEventListener('click', () => {
    uploadModal.style.display = 'flex';
    modal.style.display = 'none'
  });
  
  // boutton pour fermer le modal
  const closeUploadModalButton = document.getElementById('close-upload-modal');
  closeUploadModalButton.addEventListener('click', closeModal);

  // boutton pour retourner au modal de base
  const btnReturnToBaseModal = document.querySelector('.return-modal');
  btnReturnToBaseModal.addEventListener('click', () => {
    uploadModal.style.display = 'none';
    modal.style.display = 'flex'
  });

  // fermer sur clique exterieur
  uploadModal.addEventListener('click', (event) => {
    if (event.target === uploadModal) {
      closeModal();
    }
  });
}




