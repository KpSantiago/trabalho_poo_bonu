//DASHBOARD = nome técnico dado ao perfil do usuario, é a informação que só ele pode acessar
const form = document.querySelector("#formCadastro");

const atualizarUsuario = (usuario) => {
  localStorage.setItem("usuarios", JSON.stringify(usuario));
}
const recuperarUsuario = () => JSON.parse(localStorage.getItem("usuarios") || "[]");

const salvarUsuario = (event) => {
  event.preventDefault();
  const usuarios = recuperarUsuario();
  let nome = form.userName.value;
  let email = form.userEmail.value;
  let senha = form.userPass.value;

  let user = { id: usuarios.length + 1, nome, email, senha }
  console.log(nome)
  usuarios.push(user);
  // comparaLogin(user.id, nome, email, senha);
  atualizarUsuario(usuarios);

  location.href = "index.html"
}

// function comparaLogin(id, name, email, senha) {
//   const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

//   const idUsuario = usuarios.findIndex(idUser => idUser === id);

//   if (usuarios[idUsuario].nome === name) {
//     console.log("essas informacoes ja sao utilizadas");
//     form.reset();
//     location.href = "cadastro.html"
//   }
//   if (usuarios[idUsuario].email === email) {
//     console.log("essas informacoes ja sao utilizadas");
//     form.reset();
//   }
//   if (usuarios[idUsuario].senha === senha){
//     console.log("essas informacoes ja sao utilizadas");
//     form.reset();
//   }
// }
form.addEventListener("submit", salvarUsuario);