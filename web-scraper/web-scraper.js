const fetch = require('isomorphic-fetch');


// function Scrape(ref){
//     (async (ref) => {
//         const response = await fetch(`https://www.cplusplus.com/reference/${ref}`);
//         const text = await response.text();
//         console.log(text.match(/(?<=\<h1>).*(?=\<\/h1>)/));
//       })()

// }

class scrape {

    constructor() {
        this.url = 'https://www.cplusplus.com/reference/'
    }

    ref(ref) {
        this.url = this.url + ref;
    }


    async response() {
        const response = await fetch(this.url);
        const text = await response.text();
        console.log(this.url);
        // console.log(text.match(/(?<=\<h1>).*(?=\<\/h1>)/));
        return text.match(/(?<=\<h1>).*(?=\<\/h1>)/);


    }

    async format(str) {
        let keyword = "reference";
        let i = 0;
        for (i = 0; i < str.length; i++) {
            if (str[i] == "r" && str.substring(i, i + 9) == keyword) {
                for (j = i; j < str.length; j++) {
                    if (str[j] == '"') {
                        console.log(str.substring(i - 1, j - 1) + "\n");
                        return (str.substring(i - 1, j - 1) + '\n');
                        break;
                    }
                }
            }
        }
    }

}

module.exports = scrape;