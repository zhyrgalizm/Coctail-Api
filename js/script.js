const API = 'https://www.thecocktaildb.com/api/json/v1/1/'
const get_ALL_COCKTAILS = API + 'filter.php?c=Cocktail'
const get_BY_NAME = API + 'search.php?s='
const filter_Alcoholic = API + 'filter.php?a='
const get_ID = API + 'lookup.php?i='
const get_ingr = API + 'search.php?i='

const form = document.getElementById('search')
const input = document.getElementById('inp')
const btn = document.getElementById('btn')
const select = document.getElementById('select')
const output = document.getElementById('output')



const getAllCocktails = async () => {
    const request = await fetch(get_ALL_COCKTAILS)
    const response = await request.json()
    console.log(response.drinks);
    renderCocktails(response.drinks)
    input.value = ''
}

const getCocktailsByName = async () => {
    let request = ''
    if (input.value.length >= 2) {
        request = await fetch(get_BY_NAME + input.value)
    } else {
        request = await fetch(get_ALL_COCKTAILS)
    }

    const response = await request.json()
    renderCocktails(response.drinks);
}

const filterByAlcohol = async () => {
    let count = select.value
    const request = await fetch(filter_Alcoholic + count)
    const response = await request.json()
    renderCocktails(response.drinks);

}

const getCocktailsById = async (id) => {
    const request = await fetch(get_ID + id)
    const response = await request.json()
    console.log(response);
    renderDetailInfo(response.drinks[0])

}
const getInfoByIngridient = async (ingr) => {
    const request = await fetch(get_ingr + ingr)
    const response = await request.json()
    console.log(response);
    renderIngridient(response.ingredients[0])
}

const renderDetailInfo = (name) => {
    output.innerHTML = ''
    const img2 = document.createElement('img')
    img2.classList = ('img2')
    img2.src = name.strDrinkThumb
    const card2 = document.createElement('div')
    card2.classList = ('card2 wow bounceInDown')
    const alc = document.createElement('h3')
    alc.textContent = 'Alcoholic: ' + name.strAlcoholic
    const instructions = document.createElement('h3')
    instructions.textContent = 'Инструкция: ' + name.strInstructions
    const ingrDiv = document.createElement('div')
    ingrDiv.classList = ('ingrDiv')
    const text = document.createElement('h3')
    text.textContent = 'Ингридиенты: '




    ingrDiv.append(alc, instructions, text,)
    card2.append(img2, ingrDiv, backButton)
    output.append(card2)

    for (let key in name) {
        if (key.includes('strIngredient') && name[key] != null) {
            let ingr = document.createElement('li')
            ingr.textContent = name[key]
            ingrDiv.append(ingr)
            ingr.addEventListener('click', () => {
                getInfoByIngridient(name[key]);

            })
        }
    }

}

const renderIngridient = (ingridient) => {
    output.innerHTML = ""
    const card3 = document.createElement('div')
    card3.classList = ('card2 wow bounceInDown')
    card3.innerHTML = `
    <h4>${ingridient.strIngredient}</h4>
    <h4>Alcohol: ${ingridient.strAlcohol}</h4>
    <h4>${ingridient.strDescription}</h4>
    `;
    output.append(card3, backButton)
}

const renderCocktails = (data) => {
    output.innerHTML = ""
    data ?
        data.map((el) => {
            const card = document.createElement('div')
            card.classList = ('card wow fadeInUpBig')
            const img = document.createElement('img')
            const name = document.createElement('h2')

            img.src = el.strDrinkThumb
            name.textContent = el.strDrink

            card.append(img, name)
            output.append(card)
            card.addEventListener('click', () => {
                console.log(el);
                getCocktailsById(el.idDrink)
            })
        })
        : output.innerHTML = '<h1>Server Error</h1>'
}

form.addEventListener('submit', (event) => event.preventDefault())

input.addEventListener('keydown', () => getCocktailsByName())

select.addEventListener('change', () => filterByAlcohol())

const backButton = document.createElement('button')
backButton.classList = ('btn2')
backButton.innerHTML = '< Back'
backButton.addEventListener('click', getAllCocktails)

getAllCocktails()