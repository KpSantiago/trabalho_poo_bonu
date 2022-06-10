const form = document.querySelector("#formLogin");

const recuperarUsuario = () => JSON.parse(localStorage.getItem("usuarios") || "[]");

const inforUsuario = (event) => {
  event.preventDefault();
  
  let nome = form.userName.value;
  let senha = form.userPass.value;
  
  loginUsuario(nome, senha);
  
}
const loginUsuario = (name, pass)=>{
  const usuarios = recuperarUsuario();
  const usuario = {
    id: "",
    nome: "",
    senha: ""
  }
  usuarios.forEach(user => {
    if(user.nome == name && user.senha){
      usuario.id = user.id;
      usuario.nome = name;
      usuario.senha = pass;
    }
  });
  if(usuario.nome == name && usuario.senha == pass){
    saveSession(usuario.id);
    location.href = "produtos.html";
  }
}

const saveSession = (data) => {
  if(saveSession){
    localStorage.setItem("session", data);
  }
  sessionStorage.setItem("logado", JSON.stringify(data));
}
form.addEventListener("submit", inforUsuario);
