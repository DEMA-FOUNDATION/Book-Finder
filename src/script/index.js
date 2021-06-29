const input = document.querySelector('.input');
const btn = document.querySelector('.btn-click');
const section = document.querySelector('#UnderBox');

class Response {

    start() {

        console.log('Começando a pesquisa');
        this.Search();
    }

    async Search() {


        btn.addEventListener('click', (e) => {

            section.classList.add('Result-box');
            
            const value = input.value.replace(' ', '+').toLowerCase();
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

            try{
                const {volumeInfo} = items[i];
                const {imageLinks} = volumeInfo;
                console.log(imageLinks);
                const ThumbNails = imageLinks.thumbnail; 
                const {authors} = volumeInfo;
                const {title} = volumeInfo;

                const tr = document.createElement('tr');

                let TittleTd = document.createElement('td');
                TittleTd.innerHTML = title;
                tr.appendChild(TittleTd);

                let ImageTd = document.createElement('td');
                const image = document.createElement('img');
                image.classList.add('Image');
                image.src = ThumbNails
                ImageTd.appendChild(image);
                tr.appendChild(ImageTd);
                table.appendChild(tr)

            } catch(e) {

                console.log(e);

            } finally{}
        }

        const result = document.querySelector('.result');
        if(result.hasChildNodes()){
            result.removeChild(result.lastChild);
        } 
        result.appendChild(table);

    }
}

const test = new Response();
test.start();