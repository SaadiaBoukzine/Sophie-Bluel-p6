//****************login/logout****************************************/
// si l'utilisateur est connecté , la présence du "token" dans le stockage local.
let isConnected = localStorage.getItem('token') ? true:false;
let file = null;
// Affiche l'état de la connexion dans la console à des fins de débogage.
//* modifie l'interface utilisateur .
if(isConnected){
  const btnLogout = document.getElementById("logout");
  // Change le texte du bouton "Logout".
  btnLogout.textContent = 'Logout';
    // Si pas connecté, cache un élément HTML
 }else{
  const modif = document.querySelector('.modifier');
   modif.style.visibility='hidden'
}

// déconnecter l'utilisateur de l'application/
const logoutButton = document.getElementById("logout");
// Ajoute un d'événements de clic au bouton "Logout"
logoutButton.addEventListener("click", ClickLogout);
// Fonction qui gère la déconnexion de l'utilisateur.
function ClickLogout() {
//   console.log("je passe dans la  fonction")
// Vérifie le texte du bouton pour déterminer l'action à effectuer.
    if (logoutButton.textContent === "login") {
          // Si "login", redirige l'utilisateur vers la page de connexion.
        window.location.href = "./login.html";
    } 
        // Si  "Logout", déconnecte l'utilisateur 
    else if (logoutButton.textContent === "Logout")
    {

       // logoutButton.removeEventListener("click", ClickLogout);
       localStorage.removeItem('token');

        window.location.href = "./index.html";

    }
}

//******** Récupération de l'élément du DOM (projet)*****************/
// récupère les données à partir d'une API en utilisant fetch.
let lstProjects = null;
fetch("http://localhost:5678/api/works")
		.then(reponse => reponse.json())
		.then(photos =>{
      lstProjects = photos;
			ajoutphoto(photos)
			})    
      
  // Une fois les données récupérées, elles sont passées à la fonction ajoutphoto.

//fonction ajoute les photos récupérées à la galerie .
	function ajoutphoto (photos){
      // Récupère l'élément du DOM avec la classe "gallery".
	const gallery = document.querySelector('.gallery')
	// console.log("ok")
	gallery.innerHTML="";
 // boucle pour parcourt la liste des photos récupérées.
  for (let i=0; i< photos.length; i++){
		// On crée l’élément img.
		const images = document.createElement("img");
	 // Crée un élément "figcaption" pour la description de la photo.
		const figcaption = document.createElement("figcaption");
 // Crée un élément "figure" pour chaque photo et sa description.
    const figure = document.createElement("figure");
		// configurer la source de l’image avec l'URL de la photo.
		images.src = photos[i].imageUrl;
		// Configure le texte de la description avec le titre de la photo.
		figcaption.innerText = photos[i].title;
		figure.appendChild(images);
    figure.appendChild(figcaption);
		// On rattache  la balise l’image à la description
		gallery.appendChild(figure)
		
	};
}
//********des boutons de categories*****************/
//  récupère les catégories depuis une API.
let lstCategories = null;
  async function categoriesImport() {
    // Effectue une requête GET à l'API pour récupérer les catégories.
    await fetch("http://localhost:5678/api/categories")
    .then(reponse => reponse.json())
    .then(categories=>{
          // Stocke la liste de catégories récupérée dans la variable lstCategories.
          lstCategories = categories; 
    })
  };
// Cette fonction affiche les boutons de catégories sur la page.
  async function  displayBtnCategories(){
    // Appelle la fonction categoriesImport pour récupérer les catégories.
   await categoriesImport();
    // Récupère les éléments du DOM nécessaires.
    const portfolio = document.getElementById("portfolio");
    const gallery = document.querySelector(".gallery");
// Crée un conteneur div pour les boutons de catégories.
    const categoryButtons = document.createElement("div");
  categoryButtons.classList.add("categories");
    // On crée d'une balise div et class categories 
    const buttonAll = document.createElement("button");
    // On crée d'une balise butonCategory   
      buttonAll.classList.add("boutonCategory");
      //selectionner l'attribut id et all
      buttonAll.setAttribute("id", 0);
    // On accède a la liste pour configurer la description
    
      buttonAll.innerText = "Tous";
      buttonAll.addEventListener('click',(e)=>{
      
       ajoutphoto(lstProjects);
 
      })
      categoryButtons.appendChild(buttonAll);
 
      
      //*************conditions pour trier les categories****/
   // Crée des boutons pour chaque catégorie et les ajoute au conteneur.
     for(let i=0; i <lstCategories.length;i++ ){
     // On crée d'une balise div et class categories 
     const buttonAll = document.createElement("button");
     // On crée d'une balise butonCategory   
       buttonAll.classList.add("boutonCategory");
       //selectionner l'attribut id et all
       buttonAll.setAttribute("id", lstCategories[i].id);
     // On accède a la liste pour configurer la description
       buttonAll.innerText = lstCategories[i].name;
       buttonAll.addEventListener('click',(e)=>{
              // Lorsqu'un bouton de catégorie est cliqué, filtre les projets par catégorie.
        let lstTri =  lstProjects.filter(project => project.categoryId ==buttonAll.id);
        ajoutphoto(lstTri);
       })
 
       categoryButtons.appendChild(buttonAll);
   }
     // Insère le conteneur de boutons de catégories avant la galerie d'images.
  portfolio.insertBefore(categoryButtons, gallery);
}
//Appelle la fonction pour afficher les boutons de catégories.
  displayBtnCategories();

//*****************************creation de la modale 1 avec les projets*****************/
// Déclaration de la variable modal qui sera utilisée pour stocker la modal affichée.
let modal = null;
//**Fonction ouvrir modal avec la class .OModal
const openModal = function (e) {
 //**empêche le comportement par défaut rechargement de la page */ 
  // e.preventDefault();
  /**récupère l'élément cible de la modale en utilisant l'attribut href  */
  const target = document.querySelector(e.target.getAttribute('href'));
  //**affiche la modale en définissant sa propriété display=block */
  target.style.display = 'block';
  //**supprime l'attribut aria-hidden 'true', indiquant qu'elle est maintenant cachée.
  target.removeAttribute('aria-hidden');
  //**ajoute un attribut aria-modal  ,'true', indiquant qu'elle est maintenant cachée.*/
  target.setAttribute('aria-modal', 'true');
  modal = target;
  //**ajout de l'écouteur d'événements appelle la fonction closeModal*/
  // modal.addEventListener('click', closeModal);
//**ajout de l'écouteur d'événements quant le clic sur l'élément de fermeture */
  modal.querySelector('.close').addEventListener('click', closeModal);

  const galleryModal = document.querySelector(".galleryModal");
  galleryModal.innerHTML ='';
     // Parcourt la liste des projets et crée un élément 'figure' pour chaque projet.
  lstProjects.forEach((project) => {
     // Crée un élément 'figure' 
    const figure = document.createElement('figure');
        // Remplit le contenu de la figure avec l'icône de suppression, l'image et un texte d'édition.
    figure.innerHTML = `
     
        <i class="fa-regular fa-trash-can trash" data-id=${project.id} id="deletePicture"></i>
        <img src="${project.imageUrl}"  alt="${project.id}">
        <figcaption>éditer</figcaption>
      
    `;
   // Ajoute le contenu de la balise <figure> à la variable modalContent *//
  galleryModal.appendChild(figure);
  });
  // Sélectionne tous les éléments avec la classe "trash" (icônes de suppression).
  const trashs = document.querySelectorAll(".trash");
  // Ajoute un écouteur d'événements pour le clic sur chaque icône de suppression.

  trashs.forEach((trash)=>{
    trash.addEventListener('click',(event)=>{  
     // Appelle la fonction fetchDelete avec l'ID du projet à supprimer.
      fetchDelete(event.target.dataset.id)
    })
  })

////***********************************modale2 *****************************////
// Crée un bouton "Ajouter un projet"
  const btnAddProject = document.createElement('button');
  btnAddProject.classList.add("ajoutProjet")
  btnAddProject.textContent = 'Ajouter une photo';
  // Ajoute un écouteur d'événements pour le clic sur le bouton "Ajouter un projet".

  btnAddProject.addEventListener('click',()=>{
    const supp = document.querySelector('.suppr-gallery');
    const title = document.querySelector('#titleModal');
    title.textContent ='';
    supp.textContent = '';
      // Vide la galerie modal.
    galleryModal.innerHTML = '';
      // Remplit la galerie modal avec le formulaire d'ajout de projet.
    galleryModal.innerHTML = `
      <div class="modal2">
    
      <i class="fa-solid fa-arrow-left" id="retour"></i>
      
        <h2>Ajout photo</h2>
        <div id="addphoto">
          <form id="formulaire">
            <div id=photo>
                <i class="fa-sharp fa-regular fa-image" id="iconeimage"></i>
                <button id="ajoutphoto">+ Ajouter photo 
                <input type="file" id="labelphoto" accept="image/*">
                </button>
                  <p>jpg, png : 4mo max</p>
           </div>
               <label for="title"class="titlelabel">Titre</label>
                <input  name="title" id="title" >
                     <p class="categorielabel">Catégorie</p>
                     <div id="selctcatergory">  
                     <select name="category" id="category" >
                       <option value="Champs-selection"></option>
                       <option value="1">Objets</option>
                       <option value="2">Appartements</option>
                       <option value="3">Hotels & restaurants</option>
                      </select>
                      </div>
                        <input type="button" value="Valider" id="bntvalider">
          </form>
      </div>        
      `;
      
       // Récupération des éléments HTML nécessaires affichage minature
       const imageInput = document.getElementById('labelphoto');
       const imagePreview = document.getElementById('photo');
       const uploadForm = document.getElementById('formulaire');
       const btnValidation = document.getElementById('bntvalider');

       btnValidation.addEventListener('click', () =>{
        // Empêcher le rechargement de la page par déf
        // e.preventDefault(); 

        validationFormulaire()
       })
      
       // Gestionnaire d'événement pour le changement de fichier
       imageInput.addEventListener('change', function () {
        console.log('Est-ce que je passe là ?',imageInput.files[0]);
           file = imageInput.files[0];

           if (file) {
               // Création d'un objet FileReader pour prévisualiser l'image
               const reader = new FileReader();

               reader.onload = function (e) {
                   // Création de l'élément d'image pour la prévisualisation
                   const img = document.createElement('img');
                   img.src = e.target.result;
                   // Ajustez la taille de prévisualisation à votre convenance
                   img.style.maxWidth = '700px'; 
                   // Affichage de l'image prévisualisée
                   imagePreview.innerHTML = '';
                   imagePreview.appendChild(img);

                // Changer la couleur du bouton Valider en rouge
                 btnValidation.style.backgroundColor = '#1D6154';
               };
               // Lecture du fichier en tant que URL de données 
               reader.readAsDataURL(file);
           }
          
       });
//**********************bouton +ajouter photo  valider ******************************** */
//**le bouton de sélection de fichier par défaut est masqué

const ajoutphoto = document.getElementById('ajoutphoto');
const labelphoto = document.getElementById('labelphoto');
// Déclenche le clic sur le bouton de sélection de fichier
ajoutphoto.addEventListener('click', () => {
  labelphoto.click(); 
});

//  un gestionnaire d'événements pour le changement de fichier
labelphoto.addEventListener('change', (event) => {
  // Le fichier sélectionné  récupéré
  const selectedFile = event.target.files[0];
  //  affichez son nom
  console.log('Fichier sélectionné :', selectedFile.name);
});

  // Ajoute un bouton de retour à la modal d'ajout de projet.
      const boutonRetour = document.getElementById("retour");
      boutonRetour.addEventListener("click",()=>boutonRetourModale2());
      // Fonction pour revenir à la galerie après avoir ajouté un projet. 
      function boutonRetourModale2() {
        displayModalsGallery()
      }
  })
// Ajoute le bouton "Ajouter un projet" à la galerie modal.
  galleryModal.appendChild(btnAddProject)
 
};


//**********************Validation et vérification formulaire*****************************
function validationFormulaire() {

  console.log("validationFormulaire")
  
  // Valeure du champs titre
  const titre = document.getElementById("title").value;
  // valeur du champs catégorie
  const categorie = document.getElementById("category").value;

  //Condition de validation gestion des erreurs
  if (!file) {
    alert("Veuillez choisir une image");
    return;
  }
  if (titre.trim() === "") {
    alert("Veuillez définir un titre");
    return;
  }
  if (categorie === "Champs-selection") {
    alert("Veuillez sélectionner une catégorie");
    return;
  
}

  // Création des les éléments du formulaire
  let formData = new FormData();
  formData.append("image", file);
  formData.append("title", titre);
  formData.append("category", categorie);
  const token = localStorage.getItem('token')
  // Envoie dans la requète poste
  
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token 
      
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
         fetch("http://localhost:5678/api/works")
        .then(reponse => reponse.json())
        .then(photos =>{
          lstProjects = photos;
          ajoutphoto(photos)
          })     
        return response.json();
      }
      throw new Error("erreur lors du transfert");
    })
    .then((data) => {
      closeModal();

    })
    .catch((error) => {
      console.error(error);
    });
  }


//********************************************fonction fermeture de la modale *************/
const closeModal = function (e) {
 //*aucune modale n'est actuellement ouverte */ 
  if (modal === null) return;
   //**empêche le comportement par défaut rechargement de la page */ 
  // e.preventDefault();
  //***cache la modale en modifiant sa propriété display=none*/
  modal.style.display = 'none';
  //**ajoute l'attribut aria-hidden 'true', indiquant qu'elle est maintenant cachée.
  modal.setAttribute('aria-hidden', 'true');
  //** supprime l'attribut aria-modal */
  modal.removeAttribute('aria-modal');
   //**supprime l'écouteur d'événements,  la fonction closeModal ne sera plus appelée*/
  modal.removeEventListener('click', closeModal);
  //**supprime l'écouteur d'événements quant le clic sur l'élément de fermeture */
  modal.querySelector('.close').removeEventListener('click', closeModal);
  modal = null;
};

document.querySelectorAll('.OModal').forEach(a => {
  a.addEventListener('click', openModal);
});
// **********************fermeture au click en dehors de la modale
// Sélectionnez la modal
const modalclose = document.querySelector('closeModal');
// Ajoutez un gestionnaire d'événements pour les clics sur l'ensemble du document
document.addEventListener('click', function (event) {
  // Vérifiez si l'élément cliqué est en dehors de la modal
  // if (!modalclose.contains(event.target)) {
  //   // L'utilisateur a cliqué à l'extérieur de la modal
  //   // Fermez la modal ici
  //   modalclose.style.display = 'none'; // Vous pouvez personnaliser la méthode de fermeture de la modal
  // }
});

////************************************ supprimer les images *****************************////
//**une requête pour supprimer une image. ** */
async function fetchDelete(imageId) {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   //** */ Si la suppression réussit, afficher un message de confirmation.*/
    if (response.ok) {
      console.log('Image supprimée avec succès');   
     await fetch("http://localhost:5678/api/works")
		.then(reponse => reponse.json())
		.then(photos =>{
      lstProjects = photos;
			ajoutphoto(photos)
			})     
      displayModalsGallery();
      
  const galleryModal = document.querySelector(".galleryModal");
  galleryModal.innerHTML ='';
     // Parcourt la liste des projets et crée un élément 'figure' pour chaque projet.
  lstProjects.forEach((project) => {
     // Crée un élément 'figure' 
    const figure = document.createElement('figure');
        // Remplit le contenu de la figure avec l'icône de suppression, l'image et un texte d'édition.
    figure.innerHTML = `
     
        <i class="fa-regular fa-trash-can"></i>" data-id=${project.id} id="deletePicture"></i>
        <img src="${project.imageUrl}"  alt="${project.id}">
        <figcaption>éditer</figcaption>
      
    `;
   // Ajoute le contenu de la balise <figure> à la variable modalContent *//
  galleryModal.appendChild(figure);
  });
  // Sélectionne tous les éléments avec la classe "trash" (icônes de suppression).
  const trashs = document.querySelectorAll(".trash");
  // Ajoute un écouteur d'événements pour le clic sur chaque icône de suppression.

  trashs.forEach((trash)=>{
    trash.addEventListener('click',(event)=>{  
     // Appelle la fonction fetchDelete avec l'ID du projet à supprimer.
      fetchDelete(event.target.dataset.id)
    })
  })
      //si non message 'Erreur lors de la suppression de l'image'*//
    } else {
      alert('Erreur lors de la suppression de l\'image');
    }
  } catch (error) {
    console.log(error);
  }
};
//**************************************retour sur la modale 1 et afficher son contenu ******************/

let isModalOpened = false;
//**afficher une galerie de photos dynamiquement  */
function displayModalsGallery() {
   const galleryModal = document.querySelector(".galleryModal");
  galleryModal.innerHTML=''
 lstProjects.forEach((project) => {
     // Crée un élément 'figure' 
    const figure = document.createElement('figure');
    figure.innerHTML = `
     
        <i class="fa-regular fa-trash-can" id="deletePicture"></i>
        <img src="${project.imageUrl}" data-id=${project.id} alt="${project.id}">
        <figcaption>éditer</figcaption>
      
    `;
   // Ajoute le contenu de la balise <figure> à la variable modalContent *//
   let title = document.getElementById('titleModal');             
   title.textContent = 'Gallerie Photo';
  galleryModal.appendChild(figure)

  
  });
  const btnAddProject = document.createElement('button');
  btnAddProject.classList.add("ajoutProjet")
  btnAddProject.textContent = 'Ajouter un projet';

  btnAddProject.addEventListener('click',()=>{
    const supp = document.querySelector('.suppr-gallery');
    const title = document.querySelector('#titleModal');
    title.textContent ='';
    supp.textContent = '';
    galleryModal.innerHTML = '';
    galleryModal.innerHTML = `
    <div class="modal2">
    
    <i class="fa-solid fa-arrow-left" id="retour"></i>
    
      <h2>Ajout photo</h2>
      <div id="addphoto">
        <form id="formulaire">
          <div id=photo>
              <i class="fa-sharp fa-regular fa-image" id="iconeimage"></i>
              <button id="ajoutphoto">+ Ajouter photo 
              <input type="file" id="labelphoto" accept="image/*">
              </button>
                <p>jpg, png : 4mo max</p>
         </div>
             <label for="title"class="titlelabel">Titre</label>
              <input  name="title" id="title" >
                   <p class="categorielabel">Catégorie</p>
                   <div id="selctcatergory">  
                   <select name="category" id="category" >
                     <option value="Champs-selection"></option>
                     <option value="1">Objets</option>
                     <option value="2">Appartements</option>
                     <option value="3">Hotels & restaurants</option>
                    </select>
                    </div>
                      <input type="button" value="Valider" id="bntvalider">
        </form>
    </div>     
      `;
      const boutonRetour = document.getElementById("retour");
      boutonRetour.addEventListener("click",()=>boutonRetourModale2());
      
      function boutonRetourModale2() {
       
        displayModalsGallery();
 
      }
  })

  galleryModal.appendChild(btnAddProject)

}



















