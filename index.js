
const getCharList =  async function() {
    const response = await fetch(`https://api.disneyapi.dev/character?films=The%20Lion%20King`);
    const unfilteredData = await response.json();
    
    debugger;
    return (unfilteredData);
} 

const filterList = async function() {
    const targetFilm = 'The Lion King';
    const unfilteredData = await getCharList();
    debugger;
    const dataArray = unfilteredData.data;
    debugger;
    const charFilms = dataArray.map(charObj => charObj.films);
    debugger;
    const filteredNameList = [];
    let index = 0;
    charFilms.forEach(filmList => {
        /*if(filmList.includes(targetFilm) == 1) {
            filteredNameList.push(dataArray[index].name);
        }*/
        
        //debugger;
        index++;
        //debugger;
    });

    console.log(filteredNameList);
    //const charNamesList = unfilteredList.map(charObj => )
    //const charFilmsList = [];
    

        
}


filterList();