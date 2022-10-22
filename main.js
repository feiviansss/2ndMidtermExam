const gotCharacter =  document.querySelector(".character-container")
const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

let limit = 0;
let offset = 0;

previous.addEventListener("click", () =>{
  if(offset != 0){
    offset -=1;
    removeChildNodes(gotCharacter);
    fetchCharacters(offset, limit);
  }
});

next.addEventListener("click", () =>{
  offset +=1;
  removeChildNodes(gotCharacter);
  fetchCharacters(offset, limit);
});

function fetchCharacter(id){
  fetch(`https://thronesapi.com/api/v2/Characters/${id}`)
  .then(res => res.json())
  .then(data => {
    createCharacter(data);
    spinner.style.display = "none";
  });
}

function fetchCharacters(offset, limit){
  spinner.style.display = "block";
  for (let i = offset; i <= offset + limit; i++){
    fetchCharacter(i);
  }
}

function createCharacter(Characters){

  const flipCard = document.createElement("div");
  flipCard.classList.add("flipCard");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("cardContainer");

  flipCard.appendChild(cardContainer);

  const card = document.createElement("div");
  card.classList.add("cardBlock");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("imgContainer");

  const image = document.createElement("img");
  image.src = Characters.imageUrl;

  imageContainer.appendChild(image);

  const number = document.createElement("p");
  number.textContent = `#${Characters.id.toString().padStart(2,0)}`;

  const fullName = document.createElement("p");
  fullName.classList.add("name");
  fullName.textContent = Characters.fullName;

 
  card.appendChild(imageContainer);
  card.appendChild(number);
  card.appendChild(fullName);

  const cardBack = document.createElement("div");
  cardBack.classList.add("cardBlockBack");
  
  const fullNameBack = document.createElement("p");
  fullNameBack.classList.add("nameBack");
  fullNameBack.textContent = Characters.fullName;

  const title = document.createElement("p");
  title.classList.add("title");
  title.textContent = Characters.title;

  const family = document.createElement("p");
  family.classList.add("family");
  family.textContent = Characters.family;
  
  cardBack.appendChild(fullNameBack);
  cardBack.appendChild(title);
  cardBack.appendChild(family);

  cardContainer.appendChild(card);
  cardContainer.appendChild(cardBack);
  gotCharacter.appendChild(flipCard);

}

function removeChildNodes(parent){
  while (parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}

fetchCharacters(offset, limit);



