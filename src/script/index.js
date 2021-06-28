const input = document.querySelector('.input');
const btn = document.querySelector('.btn-click');

class Response {

    constructor() {

        this.book = []
    }

    start() {

        console.log('Começando a pesquisa');
        this.Search();
    }

    async Search() {

        btn.addEventListener('click', (e) => {

            const value = input.value.replace(' ', '+');
            const URL = `https://www.googleapis.com/books/v1/volumes?q=${value}`
        
            fetch(URL)
            .then(res => res.json())
            .then((out) => this.loadElements(out)).catch(err => { throw err });
        
            console.log(URL);
        
        });
    }

    async loadElements(json) {

        const {items} = json;
        const table = document.createElement('table');

        for(let i in items) {

            
            const {volumeInfo} = items[i];
            const {imageLinks} = volumeInfo;
            //const {smallThumbnail} = imageLinks;
            const {authors} = volumeInfo;
            const {title} = volumeInfo;

            const tr = document.createElement('tr');
            let td = document.createElement('td');
            td.innerHTML = title;
            tr.appendChild(td);
            table.appendChild(tr);
        }

        const result = document.querySelector('.result');
        result.appendChild(table);
    }
}

const test = new Response();
test.start();