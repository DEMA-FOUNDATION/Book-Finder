const input = document.querySelector('.input');
const btn = document.querySelector('.btn-click');
btn.addEventListener('click', (e) => {

    const value = input.value.replace(' ', '+');
    const URL = `https://www.googleapis.com/books/v1/volumes?q=${value}`

    fetch(URL)
    .then(res => res.json())
    .then((out) => {
      const {items} = out;
      console.log(items);
    })
    .catch(err => { throw err });

    console.log(URL);

});


class Response {

    start() {

        console.log('Começando a pesquisa');
        this.Search();
    }

    async Search() {

    
       
    }
}

const test = new Response();
test.start();