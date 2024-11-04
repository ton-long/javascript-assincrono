const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");
const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");
const inputTags = document.getElementById("categoria");
const listaTags = document.querySelector(".lista-tags");
const botaoPublicar = document.querySelector(".botao-publicar");
const botaoDescartar = document.querySelector(".botao-descartar");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };

    leitor.onerror = () => {
      reject(`Erro na leitura do arquivo ${arquivo.name}`);
    };

    leitor.readAsDataURL(arquivo);
  });
}

inputUpload.addEventListener("change", async (e) => {
  const arquivo = e.target.files[0];
  if (arquivo) {
    try {
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
      imagemPrincipal.src = conteudoDoArquivo.url;
      nomeDaImagem.textContent = conteudoDoArquivo.nome;
    } catch (erro) {
      console.error("Erro na leitura do arquivo");
    }
  }
});

listaTags.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-tag")) {
    const removerTag = e.target.parentElement;
    listaTags.removeChild(removerTag);
  }
});

const tagsDisponiveis = [
  "Front-end",
  "Programação",
  "Data Science",
  "Full-stack",
  "CSS",
  "HTML",
  "Javascript",
  "React",
];

async function verificaTagsDisponiveis(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tagTexto));
    }, 1000);
  });
}

inputTags.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      try {
        const tagExiste = await verificaTagsDisponiveis(tagTexto);
        if (tagExiste) {
          const newTag = document.createElement("li");
          newTag.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag"/>`;
          listaTags.appendChild(newTag);
          inputTags.value = "";
        } else {
          alert("A tag não foi encontrada!");
        }
      } catch (error) {
        console.error("Erro ao veirificar a existência da tag");
        alert("Erro ao verificar a existencia da tag. Verifique o console.");
      }
    }
  }
});

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const deuCerto = Math.random() > 0.5;
      if (deuCerto) {
        resolve("Projeto publicado com sucesso");
      } else {
        reject("Erro ao publicar o projeto");
      }
    }, 2000);
  });
}

botaoPublicar.addEventListener("click", async (e) => {
  e.preventDefault();
  const nomeDoProjeto = document.getElementById("nome").value;
  const descricaoDoProjeto = document.getElementById("descricao").value;
  const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map(
    (tag) => tag.textContent
  );
  try {
    const resultado = await publicarProjeto(
      nomeDoProjeto,
      descricaoDoProjeto,
      tagsProjeto
    );
    console.log(resultado);
    alert("Deu tudo certo");
  } catch (error) {
    console.log(`Deu errado: ${error}`);
    alert(error);
  }
});

botaoDescartar.addEventListener("click", (e) => {
  e.preventDefault();
  const formulario = document.querySelector("form");
  formulario.reset();
  imagemPrincipal.src = "./img/imagem1.png";
  nomeDaImagem.textContent = "imagem-projeto.png";
  listaTags.innerHTML = "";
});
