const url = "https://jsonplaceholder.typicode.com/users?utm_source=chatgpt.com";

const ul = $("#listagemNomes");
async function mostrarNomes() {

    let resposta = await fetch(url);


    let resul = await resposta.json();
    console.log(resul)
    resul.forEach(e => {
        let lis = $('<li>', { class: "list-group-item list-group-item-action" });

        lis.html(e.name)

        ul.append(lis);

    });


}

mostrarNomes();


$("#buscar").on("click", async () => {

    const valorInput = $('#busca').val();
    const corpoModal = $(".modal-body");

    $('#busca').val('');
    corpoModal.empty();

    const respost = await fetch(url);

    const resul = await respost.json();

    let encontrado = false;

    resul.forEach(ele => {

        if (valorInput == ele.name) {

            encontrado = true;
            console.log("rua: " + ele.address.street);

            const nomeUser = $("<p></p>");
            const rua = $("<p></p>");
            const cidade = $("<p></p>");
            const codPostal = $("<p></p>");
            const email = $("<p></p>");

            nomeUser.html("Nome: " + ele.name);
            rua.html("Rua: " + ele.address.street);
            cidade.html("Cidade: " + ele.address.city);
            codPostal.html("Codigo Postal: " + ele.address.zipcode);
            email.html("Email: " + ele.email);

            corpoModal.append(nomeUser);
            corpoModal.append(rua);
            corpoModal.append(cidade);
            corpoModal.append(codPostal);
            corpoModal.append(email);

            $("#mostrarModal").modal("show");

        }


    })

    if (!encontrado) {
        alerta("nome incorreto", "error");
    }


    if (valorInput == "") {
        alerta("erro: campo esta vazio", "error");
    }


})



function alerta(titulo, icone) {

    Swal.fire({
        position: "top-end",
        icon: icone,
        title: titulo,
        showConfirmButton: false,
        timer: 2000
    });



}