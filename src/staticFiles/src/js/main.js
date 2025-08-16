let inputEl = document.querySelector("input");
let btnEl = document.querySelector("button");
let tarefas = ["Comprar pão"];


inputEl.addEventListener("keypress", (e)=>{
    if(e.key == "Enter") adicionarTarefa();
})

const validarCampo=()=>{
  let valida = false;
  if(document.getElementById("task").value == "") valida = true;
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

    if(validarCampo()){
        Swal.fire({
            icon:"warning",
            title:"Atenção",
            text:"Preencha o campo tarefa",
            confirmButtonColor:"#3085d6",
            confirmButtonText:"Ok"
        })
    }
    else{
        tarefas.push(linha.value)
        criarDiv(linha.value);
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

function aparecerLogin(){
  if (tarefas.length > 1){
      const login = document.getElementById("login");
      login.classList.add("show");
  }
}

verificarLista()
setInterval(atualizarRelogio, 1000);
atualizarRelogio();
setInterval(aparecerLogin, 1000)

