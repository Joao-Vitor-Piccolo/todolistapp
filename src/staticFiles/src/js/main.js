let inputEl = document.querySelector("input");
let tarefas = ["Comprar pão"];
let btn_login = document.getElementById("show_div_login")
let btn_cadastro = document.getElementById("show_div_cadastro")

const validarCampo=(item)=>{
  let valida = false;
  if(document.getElementById("task").value == ""){
    valida = true;
  }
  if(tarefas.includes(item)){
    valida = true;
  }
  return valida;
}

function verificarLista(){
  for(let tarefa of tarefas){
    criarDiv(tarefa)
  }
}

function removerTarefas(tarefaDiv, valor){
  tarefaDiv.remove()
  tarefas = tarefas.filter(item => item !== valor)
}

function rendenizarLogin(){
  const cadastre_se = document.getElementById("botao_cadastro")
  cadastre_se.classList.add("show")
  const login = document.getElementById("login");
  const confirmarSenha = login.querySelector("input[name='confirmar_senha']");
  if (confirmarSenha) {
    confirmarSenha.remove();
  }
  const h2 = login.querySelector("h2");
  if (h2){
     h2.textContent = "Login";
  }

  const btnLogin = login.querySelector("#botao_login");
  if (btnLogin){
     btnLogin.textContent = "Entrar";
  }

  const form = login.querySelector("form");
  if (form){ 
    form.setAttribute("action", "/token");
  }
}

function rendenizarCadastro() {
  const login = document.getElementById("login");
  const cadastre_se = document.getElementById("botao_cadastro")
  cadastre_se.classList.add("remove")
  const confirmarSenha = login.querySelector("input[name='confirmar_senha']");
  if (confirmarSenha) {
    confirmarSenha.remove();
  }

  const input = document.createElement("input");
  input.type = "confirmar_senha";
  input.name = "confirmar_senha";
  input.placeholder = "Confirme a senha:";

  const senha = login.querySelector("#senha");

  if (senha) {
    senha.insertAdjacentElement("afterend", input);
  }

  const h2 = login.querySelector("h2");
  if (h2){
     h2.textContent = "Cadastro";
  }

  const btnLogin = login.querySelector("#botao_login");
  if (btnLogin){
     btnLogin.textContent = "Cadastrar";
  }

  const form = login.querySelector("form");
  if (form){ 
    form.setAttribute("action", "/create_user/");
  }
}

function criarDiv(value) {
  const container = document.getElementById("main");

  const novaDiv = document.createElement("div");
  novaDiv.classList.add("item");

  const p = document.createElement("p");
  p.textContent = value;

  const trash_bin = document.createElement("button");
  const check = document.createElement("button");
  check.classList.add("check")
  trash_bin.classList.add('trash_bin')
  trash_bin.onclick = () => removerTarefas(novaDiv, value);
  check.onclick = () => {
  p.classList.toggle("dashed");
  check.classList.toggle("close_check");
};
  novaDiv.appendChild(p)
  novaDiv.appendChild(check);
  novaDiv.appendChild(trash_bin);
  
  container.appendChild(novaDiv);
}

function adicionarTarefa(){
    let linha = document.getElementById("task")
    if(validarCampo(linha.value)){
        Swal.fire({
            icon:"warning",
            title:"Atenção",
            text:"Preencha o campo tarefa // Não pode duas tarefas iguais",
            confirmButtonColor:"#3085d6",
            confirmButtonText:"Ok"
        })
    }
    else{
        tarefas.push(linha.value)
        criarDiv(linha.value);
    }
}



function aparecerLogin(){
  if (tarefas.length > 1){
      const login = document.getElementById("login");
      login.classList.add("show");
  }
}


function atualizarRelogio() {
  const agora = new Date();

  const dia = agora.getDate().toString().padStart(2, "0");
  const mes = (agora.getMonth() + 1).toString().padStart(2, "0");
  const ano = agora.getFullYear().toString().slice(-2);

  const horas = agora.getHours().toString().padStart(2, "0");
  const minutos = agora.getMinutes().toString().padStart(2, "0");

  const horarioFormatado = `${dia}/${mes}/${ano} || ${horas}:${minutos}`;

  document.getElementById("relogio").textContent = horarioFormatado;
}


inputEl.addEventListener("keypress", (e)=>{
    if(e.key == "Enter") adicionarTarefa();
})

btn_login.addEventListener("click", () => {
    const login = document.getElementById("login");
    rendenizarLogin()
    login.classList.add("show");

    });

btn_cadastro.addEventListener("click", () => {
      const cadastro = document.getElementById("login");
      rendenizarCadastro()
      cadastro.classList.add("show");
});

verificarLista()
setInterval(atualizarRelogio, 1000);
atualizarRelogio();
setInterval(aparecerLogin, 1000)

