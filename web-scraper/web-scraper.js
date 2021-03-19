const fetch = require('isomorphic-fetch');

/* This class will scrape cplusplus.com for information based on the user input passed through by first appending the user
input to the set url. Once that's done it'll fetch the data from the url making sure it's what we requested if it is it'll be converted into a 
a string then passed to a format function to extract the exact piece of data we're looking for.
*/
class library {

    constructor() {
        this.baseUrl = 'https://www.cplusplus.com/';
        this.refUrl = 'https://www.cplusplus.com/reference/';
    }

    ref(ref) {
        this.ref = ref;
        this.refUrl += this.ref;
        
    }


    async response() {
        const response = await fetch(this.refUrl);
        const text = await response.text();
        const errorFound = text.match(/([a-zA-Z0-9_\n\r]).([^\n\r]*)404/g);
        if(errorFound !== null){
            console.log(errorFound);
            return "error";
        }else{
            return text;
        }
    

    }

    async format(str) {
        let keyword = this.ref;
        let data = [];
        let flushData = [];
        let finalData = [];
        let regEx = RegExp(`([a-zA-Z0-9_\n\r]).${keyword}([^\n\r]*)<span>`, "g");
        let word =`e/${keyword}/`;
        let wordLen = word.length;
        let wordTwo = '/"><span>';
        let wordLenTwo = wordTwo.length;
        let count = 0;

        data.push(str.match(regEx));      
       
        for (let i = 0; i < data[0].length; i++) {
            flushData.push(data[0][i].substring(wordLen, data[0][i].length));
        }

        for (let i = 0; i < flushData.length; i++) {
            let num = count.toString();
            finalData.push(`${num}. ${flushData[i].substring(0, flushData[i].length - wordLenTwo)}`);
            count ++;
        }

        finalData.shift();
        return finalData.join('\n');

    }

}

module.exports = library;

