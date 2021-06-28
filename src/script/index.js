const input = document.querySelector('.input');
const btn = document.querySelector('.btn-click');
btn.addEventListener('click', (e) => {

    const value = input.value
    console.log(value);
});


class Response {

    start() {

        console.log('Começando a pesquisa');
        this.Search();

    }

    Search() {

       

    }

}

const test = new Response();
test.start();