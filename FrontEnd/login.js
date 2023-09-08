
// ---- Récupération du dom -----------------------------------------
const inputPassword = document.querySelector('input[type="password"]');
const inputEmail = document.querySelector('input[type="email"]');
const submit = document.querySelector('input[type="submit"]');
const error = document.querySelector('.error');
const login = document.getElementById("login");



//------ Variable de stockage valeur 
let string = inputPassword.value;
let stringPass = inputEmail.value;



//--------- Evénement click formulaire + check 

submit.addEventListener('click', (e) => {
    console.log('je passe là ?')
   // empêche le comportement par défaut du formulaire//
    e.preventDefault();
    //recuperation des valeur de l'indentification stocker dans (inputPassword et inputEmail)
    string = inputEmail.value;
    stringPass= inputPassword.value;
    //Cette ligne appelle une fonction requestLogin()//
   // requestLogin()
    //then() est enchaînée pour gérer la réponse de la demande de connexion.//
    //la réponse de la demande de connexion//
    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "email": string,
            "password": stringPass,
        })
    }).then((response) => response.json())
        //résultat de la demande de connexion. Si un token est présent dans la réponse //
        .then(login => {
        
            if (login.token) {
                localStorage.setItem('token', login.token);
                //la page est redirigée vers "./index.html//
                window.location.href = "./index.html";
            } else {
                //si le token n'est pas trouvé, un message d'erreur 
                //est affiché dans un élément HTML avec l'identifiant error//                
                error.style.color = 'red';
                error.innerHTML = "Identifiant ou Mot de passe incorrect";
            };
        });
});
