
//****************login/logout****************************************/
let isConnected = localStorage.getItem('token') ? true:false;
console.log(isConnected)
if(isConnected){

  const btnLogout = document.getElementById("logout");
  btnLogout.textContent = 'Logout';
 
}else{
  const modif = document.querySelector('.modifier');
 
  modif.style.visibility='hidden'
}

// déconnecter l'utilisateur de l'application/
const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", ClickLogout);

function ClickLogout() {
  console.log("je passe dans la  fonction")
    if (logoutButton.textContent === "login") {
        window.location.href = "./login.html";
    } 
    else if (logoutButton.textContent === "Logout")
    {

       // logoutButton.removeEventListener("click", ClickLogout);
       localStorage.removeItem('token');

        window.location.href = "./index.html";

    }
}




//******** Récupération de l'élément du DOM (projet)*****************/
let lstProjects = null;
fetch("http://localhost:5678/api/works")
	
		.then(reponse => reponse.json())
		.then(photos =>{
      lstProjects = photos;
			ajoutphoto(photos)
			})

	function ajoutphoto (photos){
	const gallery = document.querySelector('.gallery')
	// console.log("ok")
	gallery.innerHTML="";
	for (let i=0; i< photos.length; i++){
		
	
		// On crée l’élément img.
		const images = document.createElement("img");
		// On crée d'une balise dédiee à la description
		const figcaption = document.createElement("figcaption");

    const figure = document.createElement("figure");
		// On accède à l’indice i de la liste pieces pour configurer la source de l’image.
		images.src = photos[i].imageUrl;
		// On accède à l’indice i de la liste pour configurer la description
		figcaption.innerText = photos[i].title;
    // On rattache la balise article à la section Fiches
		figure.appendChild(images);
    figure.appendChild(figcaption);
		// On rattache  la balise l’image à la description
		gallery.appendChild(figure)
		
	};
}
//********des boutons de categories*****************/
let lstCategories = null;
  async function categoriesImport() {
    await fetch("http://localhost:5678/api/categories")
    .then(reponse => reponse.json())
    .then(categories=>{
      // Je récupere ma liste de categories
          lstCategories = categories; 
    })
  };

  async function  displayBtnCategories(){
   await categoriesImport();
    const portfolio = document.getElementById("portfolio");
    const gallery = document.querySelector(".gallery");

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
        let lstTri =  lstProjects.filter(project => project.categoryId ==buttonAll.id);
        ajoutphoto(lstTri);
 
       })
 
       categoryButtons.appendChild(buttonAll);
   }
  portfolio.insertBefore(categoryButtons, gallery);


}
  

 
  displayBtnCategories();

//******************************modale*****************/

let modal = null;
//**Fonction ouvrir modal avec la class .OModal** */
const openModal = function (e) {
 //**empêche le comportement par défaut rechargement de la page */ 
  e.preventDefault();
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
  console.log("galleryModal", galleryModal)
  lstProjects.forEach((project) => {
     // Crée un élément 'figure' 
    const figure = document.createElement('figure');
    figure.innerHTML = `
     
        <i class="fa-regular fa-trash-can trash" data-id=${project.id} id="deletePicture"></i>
        <img src="${project.imageUrl}"  alt="${project.id}">
        <figcaption>éditer</figcaption>
      
    `;
   // Ajoute le contenu de la balise <figure> à la variable modalContent *//
  galleryModal.appendChild(figure);
  });

  const trashs = document.querySelectorAll(".trash");

  trashs.forEach((trash)=>{
    trash.addEventListener('click',(event)=>{     
      fetchDelete(event.target.dataset.id)
    })
  })

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
        <h2>Ajout photo</h2>
        <form id="formulaire">
          <div class="addphoto">
            <img class="img-icon" src="assets/icons/picture.png" alt="picture icon">
            <label for="file"> Ajouter photo</label>
            <input type="file" name="file" id="file" accept="image/jpeg, image/png" hidden>
            <p>jpg, png : 4mo max</p>
          </div>
          <label for="title">Titre</label>
          <input type="text" name="title" id="title" required>
          <label for="category">Catégorie</label>
          <img class="arrow-down" src="assets/icons/dropdown-icon.png" alt="arrow down icon">
          <select name="category" id="category" required>
          </select>
          <hr>
          <input type="submit" value="Valider" id="work-submit">
        </form>
      </div>        
      `;
  })

  galleryModal.appendChild(btnAddProject)
};
//***fonction fermeture de la modale */
const closeModal = function (e) {
 //** signifie qu'aucune modale n'est actuellement ouverte */ 
  if (modal === null) return;
   //**empêche le comportement par défaut rechargement de la page */ 
  e.preventDefault();
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

////************************************ajouter et supprimer les images *****************************////
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
      //si non message 'Erreur lors de la suppression de l'image'*//
    } else {
      alert('Erreur lors de la suppression de l\'image');
    }
  } catch (error) {
    console.log(error);
  }
}


let isModalOpened = false;
//**afficher une galerie de photos dynamiquement  */
function displayModalsGallery() {


  const galleryModal = document.querySelector(".galleryModal");
 lstProjects.forEach((project) => {
     // Crée un élément 'figure' 
    const figure = document.createElement('figure');
    figure.innerHTML = `
     
        <i class="fa-regular fa-trash-can" id="deletePicture"></i>
        <img src="${project.imageUrl}" data-id=${project.id} alt="${project.id}">
        <figcaption>éditer</figcaption>
      
    `;
   // Ajoute le contenu de la balise <figure> à la variable modalContent *//
  galleryModal.appendChild(figure)
  });

}

//******************************** */
function createModale2() {
  const modaleSection = document.createElement('div');
  modaleSection.innerHTML = `
  <div class="modal2">
  <h2>Ajout photo</h2>
  <form id="formulaire">
    <div class="addphoto">
      <img class="img-icon" src="assets/icons/picture.png" alt="picture icon">
      <label for="file"> Ajouter photo</label>
      <input type="file" name="file" id="file" accept="image/jpeg, image/png" hidden>
      <p>jpg, png : 4mo max</p>
    </div>
    <label for="title">Titre</label>
    <input type="text" name="title" id="title" required>
    <label for="category">Catégorie</label>
    <img class="arrow-down" src="assets/icons/dropdown-icon.png" alt="arrow down icon">
    <select name="category" id="category" required>
    </select>
    <hr>
    <input type="submit" value="Valider" id="work-submit">
  </form>
</div>
        
    `;
  const main = document.querySelector('main');
  main.appendChild(modaleSection);
 
  createModale2() 
  }
