let urlAlunos = "https://fantastic-palm-tree-xr57rw76x6rg3gr4-3000.app.github.dev/alunos"
$("#loading").hide()

$("#form-aluno").hide()

function mostrarForm() {
    $("#loading").show()
    
    setTimeout(() => {
        $("#form-aluno").show()
        $("#table-aluno").hide()
        $("#loading").hide()
    }, 2000)
}

function ocultarForm() {
    $("#form-aluno").hide()
    $("#table-aluno").show()
    $("#btn-salvar").show()
    $("#btn-atualizar").hide()
}

// função de listar os alunos
function listarAlunos() {
    fetch(urlAlunos)
        .then((dados) => { return dados.json() })
        .then((alunos) => {
            console.log("lista de alunos", alunos)

            let alunosLista = ""

            for (const aluno of alunos) {
                alunosLista +=
                    `
             <tr>
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.sexo}</td>
                <td>
                <a onclick="editarAluno(${aluno.id})" class="waves-effect waves-light "><i class="material-icons left">edit</i></a>
                <a onclick="deletarAluno(${aluno.id})" class="waves-effect waves-light red-text text-darken-1"><i class="material-icons left">delete</i></a>
                </td>
            </tr>
            `
            }

            document.querySelector("tbody").innerHTML = alunosLista

        })
}

listarAlunos()

// função de salvar o aluno
function salvarAluno() {
    let nome = document.getElementById("nome").value
    let idade = document.getElementById("idade").value
    let sexo = document.getElementById("sexo").value

    let aluno = {
        nome, idade, sexo
    }
    console.log('o aluno pra salvar', aluno)

    fetch(urlAlunos, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aluno)
    })
        .then((dados) => { return dados.json() })
        .then((aluno) => {
            console.log("aluno salvo", aluno)
            listarAlunos()
            ocultarForm()
        })

}


// Função de editar aluno
function editarAluno(id) {
    $("#btn-salvar").hide()
    $("#btn-atualizar").show()
    console.log("Editando", id)
    fetch(urlAlunos + "/" + id)
        .then((dados) => { return dados.json() })
        .then((aluno) => {
            console.log("aluno pra editar", aluno)
            document.getElementById("id-aluno").value = aluno.id
            document.getElementById("nome").value = aluno.nome
            document.getElementById("idade").value = aluno.idade
            document.getElementById("sexo").value = aluno.sexo
            mostrarForm()
        })
}

// Função de deletar aluno
function deletarAluno(id) {
    console.log("Deletando", id)
    fetch(urlAlunos + "/" + id, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    }).then((dados) => {
        listarAlunos()
    })
}

function atualizarAluno() {
    let id = document.getElementById("id-aluno").value
    let nome = document.getElementById("nome").value
    let idade = document.getElementById("idade").value
    let sexo = document.getElementById("sexo").value

    let aluno = {
        nome, idade, sexo
    }
    console.log('o aluno pra atualizar', aluno)

    fetch(urlAlunos + "/" + id, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aluno)
    })
        .then((dados) => { return dados.json() })
        .then((aluno) => {
            console.log("aluno atualizado", aluno)
            listarAlunos()
            ocultarForm()
            $("#btn-salvar").show()
            $("#btn-atualizar").hide()
        })

}