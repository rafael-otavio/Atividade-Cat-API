'use strict'

const buscarBtn = document.getElementById('buscarBtn')


// Chave API 
const APIkey = 'suaChaveAPI'

async function buscarImagens(){ // por causa do await tem que falar que a função é assincrona
    const racaInput = document.getElementById('racaInput')
    const raca = racaInput.value.trim().toLocaleLowerCase() 

    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${raca}&limit=20` 
    const response = await fetch(url, {
        headers:{
             'suaChaveAPI' : APIkey
        }
    })
    const data = await response.json()

    console.log(data.message)
    // Usamos o .map() para extrair apenas a propriedade .url de cada objeto
    return data.map(gato => gato.url) // Adicionado: necessário para enviar o array para a preencherGaleria
}

function criarCard(imagem){
    const card = document.createElement('div')
    card.classList.add('card')
    const foto = document.createElement('img') // Corrigido: adicionado 'img' no createElement
    foto.src = imagem
    card.appendChild(foto)
    return card 
}

async function preencherGaleria(){
    const galeria = document.getElementById('galeria-container')
    const imagens = await buscarImagens()

    const cards = imagens.map(criarCard)

    galeria.replaceChildren(...cards)
}

document.getElementById('buscarBtn').onclick = preencherGaleria;
