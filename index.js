const filteredNameList = [];
const imgLocList = [];
const foundNames = [];

const getCharList =  async function() {
    const response = await fetch(`https://api.disneyapi.dev/character?films=The%20Lion%20King&pageSize=250`);
    const unfilteredData = await response.json();
    
    //debugger;
    return (unfilteredData);
} 

const sliceBadNames = function() {
    const badNames = ['Crocodiles', 'Gopher', `Nala's Father`,
    'Pride Animals', `Pridelanders`, 'The Hyena Clan', 'Wildebeests'];

    badNames.forEach(badName => {
        let index = 0;
        filteredNameList.forEach(filteredName => {
            if(filteredName == badName) {
                filteredNameList.splice(index, 1);
                imgLocList.splice(index, 1);
            }
            index++;
        });
    });
   // debugger;
}

const getFilteredList = async function() {
    const targetFilm = 'The Lion King';
    const unfilteredData = await getCharList();
   // debugger;
    const dataArray = unfilteredData.data;
  //  debugger;
    const charFilms = dataArray.map(charObj => charObj.films);
  //  debugger;
    
    let index = 0;
    charFilms.forEach(filmList => {
        if(filmList.includes(targetFilm) == 1) {
            filteredNameList.push(dataArray[index].name);
            imgLocList.push(dataArray[index].imageUrl);            
        }
        
       // debugger;
        index++;
       // debugger;
    });
   // debugger;
    sliceBadNames();
    renderCards();
    initGame();

    // sliceBadNames()
    //console.log(filteredNameList);
    //const charNamesList = unfilteredList.map(charObj => )
    //const charFilmsList = [];
    

        
}

const renderCards = function() {
    const cardsDiv = document.getElementById('cardSpace');
    cardsDiv.classList.add('wrapper','row');
    //debugger;
    let index = 0;
    filteredNameList.forEach(charName => {
        //const currentFigure =document.createElement('figure');
       // currentFigure.classList.add(`fig${index + 1}`);
        //debugger;
        const figDiv = document.createElement('div');
        figDiv.id = charName.toLowerCase();
        figDiv.classList.add("hiddenAsset");

        const currentImg = document.createElement('img');
        currentImg.src = imgLocList[index];

        const currentImgFigCap = document.createElement('figcaption');
        currentImgFigCap.innerText = charName;
        
        figDiv.append(currentImg, currentImgFigCap);
        cardsDiv.append(figDiv);
       // debugger;
        //cardsDiv.append(currentFigure);
        index++;
    });
}

const runGame = () => {
    
    const ansBoxLabel = document.getElementById("ansBoxLabel");
    ansBoxLabel.classList.remove("hiddenAsset");
    const userEntry = document.getElementById("ansBox");
    userEntry.classList.remove("hiddenAsset");
    let userScore = 0;

    userEntry.addEventListener('input', (e) => {
        const userEntry = (e.target.value).toLowerCase();
        const nameMatch = (charName) => charName.toLowerCase() == userEntry;
        //const isMatch = filteredNameList.includes(e.target.value);
        
        if(filteredNameList.some(nameMatch) && !(foundNames.includes(userEntry))) {
            foundNames.push(userEntry);
            const currentFig = document.getElementById(userEntry);
            currentFig.classList.remove("hiddenAsset");
            userScore++;
            console.log(userScore);
            e.target.value = "";
            e.preventDefault();
        }
    });
}

const initGame = () => {
    const gameForm = document.getElementById('mainForm');
    //debugger;
    gameForm.elements['startGame'].addEventListener('click', (e) => {
        runGame();
        document.getElementById("ansBox").focus();
        gameForm.elements['startGame'].classList.add("hiddenAsset");
        setTimeout(() => {
            document.getElementById("ansBox").disabled = true;
            gameForm['restart'].classList.remove("hiddenAsset");
            gameForm['restart'].addEventListener('click', (e) => {
                location.reload();
            });
        }, 10000)
        e.preventDefault();
    });
    //debugger;
}
document.addEventListener('DOMContentLoaded', getFilteredList());