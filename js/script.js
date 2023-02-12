console.log("infinite scroll -warsztat");

let endOfThePage = 0;

let preloading = false;


const showPreloader = () => {

    let preloader = document.getElementById('preloader');
    console.log(`showPreloader()`);
    preloader.style.display = 'block';
    preloading = true;
}

const hidePreloader = () => {

    let preloader = document.getElementById('preloader')
    console.log(`hidePreloader()`);
    preloader.style.display = 'none';
    preloading = false

}


const getData = () => {

    if (!preloading) {

        showPreloader();


        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(res => res.json())
            .then(data => {

                let body = document.body;

                let hr = document.createElement('hr');
                body.appendChild(hr);

                for (let user of data) {

                    let pId = document.createElement('p');
                    let pName = document.createElement('p');
                    let pWebsite = document.createElement('p');

                    pId.innerText = `User ID:  ${user.id}`;
                    pName.innerText = ` user Name: ${user.name}`;
                    pWebsite.innerHTML = `User URL: ${user.website}<br/>-------`;



                    body.appendChild(pId);
                    body.appendChild(pName);
                    body.appendChild(pWebsite);


                }
                hidePreloader();

                console.log(data);

            })
            .catch(error => {
                console.error(error);
            });

    }




}


const scrollToEndofPage = () => {



    let d = document.documentElement;
    // wysokosc zawartosci elementow storny w tym zawartosc nie widoczna
    let scrollHeight = d.scrollHeight;
    //   wartosc liczby pikesli o ktora zostal przeskrolowany od gory strony
    let scrollTop = d.scrollTop;
    //    wewnetrzna wysokosc okna przegladarki
    let clientHeight = d.clientHeight;


    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);






    console.log(`scrollHeight: ${scrollHeight}`);
    console.log(`sumScrollTopClientHeight: ${sumScrollTopClientHeight}`);
    console.log(`scrollTop: ${scrollTop}`);
    console.log(`clientHeight: ${clientHeight}`);
    console.log(`================`);


    if (sumScrollTopClientHeight >= scrollHeight) {
        endOfThePage += 1;


        console.log(`scrolled to end of page: ${endOfThePage}`);


        getData();



    }

}


window.addEventListener('scroll', scrollToEndofPage);




