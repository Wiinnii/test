"use strict";
let cardsWraper = document.querySelector('.cards__wraper');
let toTop = document.querySelector('.to-top');
toTop.addEventListener('click', () => {
    let t, s;
    s = window.pageYOffset;
    t = setInterval(() => {
        if (s > 0) {
            window.scroll(0, s -= 10)
        } else clearInterval(t)
    }, 2);
})

fetch("https://rickandmortyapi.com/api/character")
    .rejected((rejected)=>{
        alert(rejected)
    })
    .then(response => response.json())
    .then(commits => {
        console.log(commits)
        commits.results.forEach((elem) => {
            let element = document.createElement('div');
            element.classList.add('cards__card')
            element.innerHTML = `
            <div class="cards__img">
                <img src="${elem.image}" alt="">
            </div>
            <h3 class="cards__name">${elem.name}</h3>
            `
            cardsWraper.append(element);
        });
        let cards = cardsWraper.querySelectorAll('.cards__card');
        cards.forEach(element => {
            element.addEventListener('click', (EO) => {
                EO = EO || window.event;
                EO.preventDefault();
                let nam = EO.currentTarget.querySelector('.cards__name').innerHTML;

                let divImg = EO.currentTarget.querySelector('.cards__img');
                let linkImg = divImg.childNodes[1].currentSrc;
                commits.results.forEach((elem) => {
                    if (elem.image == linkImg) {
                        let element = document.createElement('div');
                        element.classList.add('cards__behind')
                        element.innerHTML = `
                        <div class="cards__modal">  
                        <span class="cards__modal__closse"> &times;</span>
                            <div class="cards__modal-img">
                                <img src="${elem.image}" alt="">
                            </div>
                            <div class="cards__modal-description">
                            
                                <div class="cards__modal-description__left">
                                    <div class="cards__modal-description__name">
                                        <h5>name :</h5>
                                        <p>${elem.name}</p>
                                    </div>
                                    <div class="cards__modal-description__status">
                                        <h5>status :</h5>
                                        <p>${elem.status}</p>
                                    </div>
                                    <div class="cards__modal-description__species">
                                        <h5>species :</h5>
                                        <p>${elem.species}</p>
                                    </div>
                                </div>
                                <div class="cards__modal-description__rights">
                                    
                                    <div class="cards__modal-description__origin">
                                        <h5>origin :</h5>
                                        <p>${elem.origin.name}</p>
                                    </div>
                                    <div class="cards__modal-description__location">
                                        <h5>location :</h5>
                                        <p>${elem.location.name}</p>
                                    </div>
                                    <div class="cards__modal-description__gender">
                                        <h5>gender :</h5>
                                        <p>${elem.gender}</p>
                                    </div>
                            
                                </div>
                            </div>
                        </div>
                        `
                        cardsWraper.append(element);
                    }
                })
                let modal = document.querySelectorAll('.cards__behind');
                modal.forEach(element => {
                    let closse = element.querySelector('.cards__modal__closse');
                    closse.addEventListener('click', (EO) => {
                        EO = EO || window.event;
                        EO.preventDefault();
                        element.remove();
                    })

                })


            });



        });
        function scroll(EO) {
            let pages = commits.info.pages;
            if (Math.round(window.pageYOffset) >= Math.round(cardsWraper.offsetHeight / 2)) {
                for (let index = 2; index < pages; index++) {
                    fetch(`https://rickandmortyapi.com/api/character?page=${index}`)
                        .then(response => response.json())
                        .then(function leding(commits) {
                            commits.results.forEach((elem) => {
                                let element = document.createElement('div');
                                element.classList.add('cards__card')
                                element.innerHTML = `
                <div class="cards__img">
                    <img src="${elem.image}" alt="">
                </div>
                <h3 class="cards__name">${elem.name}</h3>
                `
                                cardsWraper.append(element);
                            });
                            let cards = cardsWraper.querySelectorAll('.cards__card');
                            cards.forEach(element => {
                                element.addEventListener('click', (EO) => {
                                    EO = EO || window.event;
                                    EO.preventDefault();
                                    let divImg = EO.currentTarget.querySelector('.cards__img');
                                    let linkImg = divImg.childNodes[1].currentSrc;
                                    commits.results.forEach((elem) => {
                                        if (elem.image == linkImg) {
                                            let element = document.createElement('div');
                                            element.classList.add('cards__behind')
                                            element.innerHTML = `
                            <div class="cards__modal">  
                            <span class="cards__modal__closse"> &times;</span>
                                <div class="cards__modal-img">
                                    <img src="${elem.image}" alt="">
                                </div>
                                <div class="cards__modal-description">
                                
                                    <div class="cards__modal-description__left">
                                        <div class="cards__modal-description__name">
                                            <h5>name :</h5>
                                            <p>${elem.name}</p>
                                        </div>
                                        <div class="cards__modal-description__status">
                                            <h5>status :</h5>
                                            <p>${elem.status}</p>
                                        </div>
                                        <div class="cards__modal-description__species">
                                            <h5>species :</h5>
                                            <p>${elem.species}</p>
                                        </div>
                                    </div>
                                    <div class="cards__modal-description__rights">
                                        
                                        <div class="cards__modal-description__origin">
                                            <h5>origin :</h5>
                                            <p>${elem.origin.name}</p>
                                        </div>
                                        <div class="cards__modal-description__location">
                                            <h5>location :</h5>
                                            <p>${elem.location.name}</p>
                                        </div>
                                        <div class="cards__modal-description__gender">
                                            <h5>gender :</h5>
                                            <p>${elem.gender}</p>
                                        </div>
                                
                                    </div>
                                </div>
                            </div>
                            `
                                            cardsWraper.append(element);
                                        }
                                    })
                                    let modal = document.querySelectorAll('.cards__behind');
                                    modal.forEach(element => {
                                        let closse = element.querySelector('.cards__modal__closse');
                                        closse.addEventListener('click', (EO) => {
                                            EO = EO || window.event;
                                            EO.preventDefault();
                                            element.remove();
                                        })

                                    })


                                })
                            })
                        })

                }

                toTop.style.display = 'flex';


                window.removeEventListener("scroll", scroll);
            };

        }
        window.addEventListener('scroll', scroll);

    
    }).catch(()=>{
        alert('ошибка связи')
    })



