const input = document.querySelector('.input');
const btn = document.querySelector('.btn-click');
const section = document.querySelector('#UnderBox');

class Response {

    start() {

        console.log('Começando a pesquisa');
        this.Search();
    }

    Search() {

        btn.addEventListener('click', (e) => {

            if(!input.value.length){

                return;
            }

           this.getData();
        });

       

        input.addEventListener('keypress', (e) => {

            if(e.keyCode === 13){

                if(!input.value) return;

                this.getData();
            }
        });
    }

    async getData(){

        const loading = document.querySelector('#loading');
            console.log(loading);
            loading.classList.remove('hidden');

            const value = input.value.replace(' ', '+').toLowerCase();
            const URL = `https://www.googleapis.com/books/v1/volumes?q=${value}`;

            const {data} = await axios.get(URL);

            this.loadElements(data).catch(err => { throw err });
            loading.classList.add('hidden');
            
            section.classList.add('Result-box');
    }

    async loadElements(json) {

        const {items} = json;

        const div = document.createElement('div');
        div.setAttribute('class', 'row');
        
        for(let i in items) {

            try{

                const resultDiv = document.createElement('div');
                resultDiv.setAttribute('class', 'result-div');
                 
                const {volumeInfo} = items[i];
                const {
                    previewLink,
                    title,
                    authors,
                    categories,
                    publisher,
                    infoLink,
                    imageLinks,        
                } = volumeInfo;
                const ThumbNails = imageLinks.smallThumbnail; 
                console.log(volumeInfo);
                
                const card = document.createElement('div');
                card.setAttribute('class', 'card col-md-6');
                card.setAttribute('style', 'max-width: 32rem;');

                const book = document.createElement('img');
                book.setAttribute('class', 'Image');
                book.src = ThumbNails;

                card.appendChild(book);

                const cardBody = document.createElement('div');
                cardBody.setAttribute('class', 'card-body');

                const bookName = document.createElement('h5');
                bookName.setAttribute('class', 'book-name');
                bookName.innerHTML = title;

                cardBody.appendChild(bookName);

                const category = document.createElement('p');
                category.setAttribute('class', 'categories');
                category.innerHTML = `Category: ${categories}`;

                cardBody.appendChild(category);

                const Publisher = document.createElement('p');
                Publisher.setAttribute('class', 'categories');
                Publisher.innerHTML = `Publisher: ${publisher}`;

                cardBody.appendChild(Publisher);
                
                const info = document.createElement('p');
                info.setAttribute('class', 'info');
                info.innerHTML = `By: ${authors}`;

                cardBody.appendChild(info);


                const btnDiv = document.createElement('div');
                btnDiv.setAttribute('class', 'btnDiv');
                
                const button = document.createElement('button');
                button.setAttribute('class', 'button btn-primary btn-md');
                button.onclick =  () =>  {window.open(previewLink)}
                button.innerHTML = 'Preview';

                btnDiv.appendChild(button);

                const BuyBtn = document.createElement('button');
                BuyBtn.setAttribute('class', 'BuyBtn btn-primary btn-md');
                BuyBtn.onclick =  () =>  {window.open(infoLink)}
                BuyBtn.innerHTML = 'Buy';

                btnDiv.appendChild(BuyBtn);

                cardBody.appendChild(btnDiv);

                card.appendChild(cardBody);
                
                if(resultDiv.hasChildNodes()){
                    resultDiv.removeChild(resultDiv.lastChild);
                }
          
                resultDiv.appendChild(card);

                div.appendChild(resultDiv);

                if(section.hasChildNodes()){
                    section.removeChild(section.lastChild);
                }

                section.appendChild(div);
            
            } catch(e) {

                console.log('Erro: ', e);

            } 
            
        }
    }

}

const test = new Response();
test.start();