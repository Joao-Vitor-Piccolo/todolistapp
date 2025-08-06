//DECLARAÇÃO DE VARIAVEIS
let inputEl = document.querySelector("input");
let btnEl = document.querySelector("button");
let tarefas= [];

//FUNÇÃO PARA VALIDAR CAMPO

const validarCampo=()=>{
 let valida = false;
 if(document.getElementById("task").value == "") valida = true;
 return valida;
}


//FUNÇÃO ADIOCINAR TAREFA

function adicionarTarefa(){
    let linha = document.getElementById("task")

    if(validarCampo()){
        //alert("Preencha o campo tarefa")
        Swal.fire({
            icon:"warning",
            title:"Atenção",
            text:"Preencha o campo tarefa",
            confirmButtonColor:"#3085d6",
            confirmButtonText:"Ok"
        })
    }
    else{
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

setInterval(atualizarRelogio, 1000);
atualizarRelogio();

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
  trash_bin.onclick = () => novaDiv.remove();
    check.onclick = () => {
  p.classList.toggle("dashed");
  check.classList.toggle("close_check");
};
  novaDiv.appendChild(p)
  novaDiv.appendChild(check);
  novaDiv.appendChild(trash_bin);
  
  container.appendChild(novaDiv);
}


//FUNÇÃO LISTAR TAREFAS

function listarTarefas(){
    let valor = "";
    for(let i = 0; i < tarefas.length; i++){
        valor += tarefas[i] + "<br>";
    }
    document.getElementById("lista").innerHTML = valor;
}

//FUNÇÃO REMOVER TAREFA

function removerTarefa(){
    Swal.fire({
        icon:"warning",
        title:"Tem certeza que deseja Apagar ?",
        text:"Sua tarefa será apagada",
        showCancelButton:"#3082d6",
        showCancelButton:true,
        cancelButtonColor:"#d33",
        confirmButtonText:"Sim, apagar",
        cancelButtonText:"Cancelar"
    }).then((result)=>{
        if(result.isConfirmed){
            tarefas.pop();
            listarTarefas();
            Swal.fire(
                "Apagado",
                "A Tarefa foi apagada da lista",
                "success"
            )
        }
    })
}

inputEl.addEventListener("keypress", (e)=>{
    if(e.key == "Enter") adicionarTarefa();
})

