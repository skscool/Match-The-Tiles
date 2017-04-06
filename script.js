//populate all tile name in respective default index 0-7 tiles in 0-15 place, occuring twice
var indexTile = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
//Number if cards currently facing upwards
var cards_open = 0;
//value of cards currently facing upwards
var opened_cards = [];
//positions currently opened
var opened_card_index = [];
//reset unmatched previous 2 cards
var resetCard = 0;
//cards to reset
var reset = [];
//Number of matches found
var matchFound = 0;


//when window is refresed shuffle the indexTile for randomization
window.onload =function(){
    indexTile = shuffleArray(indexTile);
    alert(indexTile);                               // alert the tile-index array for debugging;
}

//change the tile of element firing event with the tile in "randomized indexTile"
function changeTile(obj){
    if(resetCard == 1){        //if previous two cards did not match reset them, alternative of sleep fuction
        var card1 = document.getElementById(reset.pop());
        var card2 = document.getElementById(reset.pop());
        card1.src = "giphy.gif";
        card2.src = "giphy.gif";
        var attr1 = document.createAttribute("onclick");
        attr1.value = "changeTile(this)";
        var attr2 = document.createAttribute("onclick");
        attr2.value = "changeTile(this)";
        card1.setAttributeNode(attr1);
        card2.setAttributeNode(attr2);
        resetCard = 0;
    }
    var id = obj.id;                                //get id of element firing event
    var cell = document.getElementById(id);         //select element using id
    var tile = indexTile[id];                       //select the tile using tile-index mapping
    var sr = tile+".jpg";                           
    cell.src = sr;                                  //set the image source to target image
    cards_open++;                                   //one more card is turned
    opened_cards.push(tile);                          //turned card value(id) is saved
    opened_card_index.push(id);
    cell.removeAttribute("onclick");
    if(cards_open==2){
        matchCards();
    }
}

/* Shuffling is done for randomizing the appearance of tiles each time game is restarted
    A random position is selected -> current
    Top element is swapped with the current element
    the top is not included in next iteration in the subarray
*/
function shuffleArray(array){  
  var tmp, current, top = array.length-1;
  while(top>0) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
    top--;
  }
  return array;
}

function matchCards(){
    if(opened_cards[0] == opened_cards[1]){
        matchFound++;
        if(matchFound==8){
            document.write("You Win!");
        }
    }else{
        resetCard = 1;
    }
    opened_cards.pop();
    opened_cards.pop();
    reset.push(opened_card_index.pop());    //opened cards need to be reset when thired tile is opened
    reset.push(opened_card_index.pop()); 
    cards_open -= 2;
}