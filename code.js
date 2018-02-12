//
// this is just a stub for a function you need to implement
//
function getStats(txt) {


    var numWords = (txt.replace(/\+/g,' ').replace(/\-/g,' ').match(/\S+/g) == null)? 0 : txt.replace(/\+/g,' ').replace(/\-/g,' ').match(/\S+/g).length
    var maxLLength = compMaxLineLength(txt);
    var longestWordsArray = compLongestWords(txt);
    var mostFrequentWordsArray = compMostFrequentWords(txt);
    var palindromesArray = findPalindromes(txt);
    
    return {
        nChars: txt.length,
        nWords: (txt.replace(/\+/g,' ').replace(/\-/g,' ').match(/\S+/g) == null)? 0 : txt.replace(/\+/g,' ').replace(/\-/g,' ').match(/\S+/g).length,
        
        // count number of new lines and include first line
        nLines: (txt.match(/\n/g) == null)? 1 : txt.match(/\n/g).length + 1,
        
        // if there is a new line, count if there is anything after the new line
        nNonEmptyLines: (txt.match(/\n(?=\b)/) == null)? 1 : txt.match(/\n(?=\b)/).length,
        
        // count total number of acceptable characters and then divide by nWords
        averageWordLength: (txt.match(/\w/g) == null)? 0 : (txt.match(/\w/g).length)/numWords,

        // count after new line character
        maxLineLength: maxLLength,

        // idk tbh
        palindromes: palindromesArray,

        // put all words in an array and then calculate
        longestWords: longestWordsArray,

        // count and then calculate
        mostFrequentWords: mostFrequentWordsArray
    };
}

function compMaxLineLength(txt) {
    
    var textArray = txt.split(/\r?\n/);
    var currentMax = 0;
    var thisMax = 0;
    var index = 0;

    while (index < textArray.length) {

        thisMax = textArray[index].length;
        currentMax = Math.max(thisMax, currentMax);
        index = index + 1 ;

    }

    return currentMax;

}

function compLongestWords(txt) {

    var wordsArray = cleanAndSortArray(txt);

    // remove duplicates in array 
    wordsArray = wordsArray.filter(function(item, pos) {
        return wordsArray.indexOf(item) == pos;
    });

    return wordsArray.slice(0,10);

}

function compMostFrequentWords(txt) {

    var wordsArray = cleanAndSortArray(txt);

    var words = [], wordLength = [], previous;

    for (var i = 0; i < wordsArray.length; i++) {
        if (wordsArray[i] !== previous) {
            words.push(wordsArray[i]);
            wordLength.push(1);
        } else {
            wordLength[wordLength.length - 1]++;
        }
        previous = wordsArray[i];
    }

    var combArray = words.map((e,i) => `${e}(${wordLength[i]})`);

    return combArray.slice(0,10);

}

function cleanAndSortArray (txt) {

    var i = 0;

    // split text into words and put each word in an array
    var finishedArray = txt.replace(/\+/g, ' ').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s/);

    // remove invalid words (empty words, etc)
    while (i < finishedArray.length) {

        if (finishedArray[i] == "") {
            finishedArray.splice(i,1); 
        } else {
            i++;
        }
    }

    // sort array in descending order
    finishedArray = finishedArray.sort(function(a,b) {
        return b.length - a.length;
    });

    return finishedArray;

}

function findPalindromes(txt){

    var toBasicChar = txt.toLowerCase();
    var palArray = [];

    toBasicChar = cleanAndSortArray(toBasicChar);

    for (var i = 0; i < toBasicChar.length; i++) {

        var revWord = toBasicChar[i].split('').reverse().join('');
        console.log(revWord);
        console.log(toBasicChar[i]);

        if (revWord === toBasicChar[i]) {
            palArray.push(toBasicChar[i]);
        }

    }

    return palArray;

    // // this is to remove special characters, spaces and make lowercase
    // var toBasicChar = txt.replace(/[^A-Z0-9]/ig, "").toLowerCase();

    // // reversing the 
    // var checkPalindrome = toBasicChar.split('').reverse().join('');

    // // Check to see if myString is a Palindrome
    // if(removeChar === checkPalindrome){
      
    //   document.write("<div>"+ myString + " is a Palindrome <div>");
    // }else{
      
    //   document.write("<div>" + myString + " is not a Palindrome </div>");
    // }

    
}


