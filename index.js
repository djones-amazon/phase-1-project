const filteredNameList = [];
const imgLocList = [];


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
    // sliceBadNames()
    //console.log(filteredNameList);
    //const charNamesList = unfilteredList.map(charObj => )
    //const charFilmsList = [];
    

        
}

const renderCards = function() {
    const cardsDiv = document.getElementById('cardSpace');
    //debugger;
    let index = 0;
    filteredNameList.forEach(charName => {
        const currentFigure =document.createElement('figure');
        currentFigure.id = `fig${index}`;

        const currentImg = document.createElement('img');
        currentImg.src = imgLocList[index];
        
        const currentImgFigCap = document.createElement('figcaption');
        currentImgFigCap.innerText = charName;
        
        currentFigure.append(currentImg, currentImgFigCap);
       // debugger;
        cardsDiv.append(currentFigure);
        index++;
    });
}


document.addEventListener('DOMContentLoaded', getFilteredList());
