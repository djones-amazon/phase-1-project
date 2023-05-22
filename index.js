/*This is a trivia game whereas the user has to guess the character names from the Disney movie, The Lion King.
The character names and image url's are attained by fetching the character information from the Disney api and
filterd out the unnecessary data. The user will guess the character names by tying into a text box. When the 
user guesses correctly, the character card will be revealed and the user will be awared a point. The game ends
when the user guesses all character names or 60 seconds. User score output and a reset button will be revaled 
so the user can play again.*/



const filteredNameList = []; //this is the list of names that will be used in the quiz game.
const imgLocList = []; //this is the url of the images of all of the characters that appear in the game.
const foundNames = []; //this trackes which characters the user has susccessfully guessed.
let userScore = 0;


//This function fetches and the characters from the disney api that have appeared in any Lion King movie or show.
//That data is then converted to json format and returned.
const getCharList =  async function() {
    const response = await fetch(`https://api.disneyapi.dev/character?films=The%20Lion%20King&pageSize=250`);
    const unfilteredData = await response.json();
    
    return (unfilteredData);
} 

//there were serveral ancillary characters that users would probably not venture to guess.
//this functions removes those characters from the game.
const sliceBadNames = function() {
    const badNames = ['Crocodiles', 'Gopher', `Nala's Father`,
    'Pride Animals', `Pridelanders`, 'The Hyena Clan', 'Wildebeests', 'Jock', 'Shenzi, Banzai, and Ed'];

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
}

//This function takes the list of characters and filters out all of the characters that are not associated with
//The original Lion King movie. The character names and associated image url that pass are stored in repsective arrays
//creating a 2 row table (row 1 => character name, row 2 => image url).
//Next, three functions are called to remove unwanted characters, render the cards on the page, and intialize the elements that start the game.
const getFilteredList = async function() {
    const targetFilm = 'The Lion King';
    const unfilteredData = await getCharList();
    const dataArray = unfilteredData.data;
    const charFilms = dataArray.map(charObj => charObj.films);
    
    let index = 0;
    charFilms.forEach(filmList => {
        if(filmList.includes(targetFilm) == 1) {
            filteredNameList.push(dataArray[index].name);
            imgLocList.push(dataArray[index].imageUrl);            
        }
        index++;
    });
    
    sliceBadNames();
    renderCards();
    initGame();
}

//This function renders the character cards. Each character card is assigned to the hiddenAsset class
//as to make sure it is invisible to start. Each character card is also assigned an id that matches their respective
//names (in lowercase). Finally, each character card is given a caption to display the character names under their
//repsective images.
const renderCards = function() {
    const cardsDiv = document.getElementById('cardSpace');
    cardsDiv.classList.add('wrapper','row');
    let index = 0;
    filteredNameList.forEach(charName => {
        
        const figDiv = document.createElement('div');
        figDiv.id = charName.toLowerCase();
        figDiv.classList.add("hiddenAsset");

        const currentImg = document.createElement('img');
        currentImg.src = imgLocList[index];

        const currentImgFigCap = document.createElement('figcaption');
        currentImgFigCap.innerText = charName;
        
        figDiv.append(currentImg, currentImgFigCap);
        cardsDiv.append(figDiv);
       
        index++;
    });
}

//The function ends the game. The text box is disabled and the restart button revealed. The user is prompted with
//the achieved score.
const endGame = () => {
    gameForm = document.getElementById("mainForm");
    document.getElementById("ansBox").disabled = true;
    gameForm['restart'].classList.remove("hiddenAsset");
    gameForm['restart'].addEventListener('click', (e) => {
        location.reload();
    });
    document.getElementById("scoreLine").innerText = `Here is your score: ${userScore} out of 14`;
    }

//This function runs the game. The user input text box is unhidden and given focus. An event listener for input is assigned to the text box. This is so the user doesn't
//have to press any key to enter their response. If a name that hasn't already been guess is typed into the text box
//it will be entered automatically. The drawback is that the user must manually delete incorrect or duplicate responses.
//Correct guesses reveal the character card of the character that was guessed and the user scores a point. The game ends
//when the user guesses all of the character names correctly or when 60 seconds pass (whichever comes first).
const runGame = () => {
    
    const ansBoxLabel = document.getElementById("ansBoxLabel");
    ansBoxLabel.classList.remove("hiddenAsset");
    const userEntry = document.getElementById("ansBox");
    userEntry.classList.remove("hiddenAsset");
    //let userScore = 0;

    userEntry.addEventListener('input', (e) => {
        const userEntry = (e.target.value).toLowerCase();
        const nameMatch = (charName) => charName.toLowerCase() === userEntry;
        
        if(filteredNameList.some(nameMatch) && !(foundNames.includes(userEntry))) {
            foundNames.push(userEntry);
            const currentFig = document.getElementById(userEntry);
            currentFig.classList.remove("hiddenAsset");
            userScore++;
            console.log(userScore);
            e.target.value = "";
            if(userScore === 14) {
                endGame();
            }
            e.preventDefault();
        }
    });
}

//This functions assigns the click event to the start button. The start button is hidden and focus is given to the still hidden text box.
//If the user does not achieve a perfect score in 60 seconds, then this function will call endGame.
const initGame = () => {
    const gameForm = document.getElementById('mainForm');
    gameForm.elements['startGame'].addEventListener('click', (e) => {
        runGame();
        document.getElementById("ansBox").focus();
        gameForm.elements['startGame'].classList.add("hiddenAsset");
        e.preventDefault();
        setTimeout(endGame, 60000);
        
    });
}
document.addEventListener('DOMContentLoaded', getFilteredList());