/* 
 * ✅ Use the Coinlore API (Coins) 
 *    https://www.coinlore.com/cryptocurrency-data-api
 * 
 *    Get 10 coins per "page"
*/

//DOM Variables
const tbody = document.querySelector('#coins-data');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');

const state = {};

class Actions {
  
    constructor(coinsPerPage){
        this.coinsPerPage = coinsPerPage;
        
    }
    
    async fetchCoins() {
        try{
            const response = await axios('https://api.coinlore.com/api/tickers/');
            this.array = response.data.data;
            console.log(this.array);
        }
        catch(error){
           console.log(error)
        }
    }
    nextCoins(){
        let i =0;
        i = i + this.coinsPerPage;
        i = i % this.array;
        return this.array.slice(i, i+coinsPerPage);
    }

    prevCoins(){
        let i = 0;
        i = i - this.coinsPerPage;
        return this.array.slice(i, i+coinsPerPage);
    }

    displayButtons(){
         prevButton.style.visibility = i > 0 ?  "visible" : "hidden";
         nextButton.style.visibility = i >= 90 ?  "hidden" : "visible";
    }
    
    getCoins(coins){
        for(let coin of coins){
             let tableRow = `<tr>
                         <td>${coin.name}</td>
                         <td>${coin.symbol}</td>
                         <td>${coin.price_usd}</td>
                         <td>${coin.tsupply} ${coin.symbol}</td>
                         </tr>`
            tbody.insertAdjacentHTML('beforeend', tableRow);     
         }
    }

    displayNewCoins(button){
        let coins;
        tbody.innerHTML = " ";
        button === 'next' ? coins = this.nextCoins() : coins = this.prevCoins();
        this.getCoins(coins);
        this.displayButtons()
    }
    
    init(){
        let coinsData = this.array.slice(0,10);
        this.getCoins(coinsData);
    }
}


const newAction = async (direction) => {
    state.coinData = new Actions(10);
    try{
      await state.coinData.fetchCoins();
      //state.coinData.init();
      state.coinData.displayNewCoins(direction);
    }catch(error){
       console.log(error);
    }
    
}
newAction();

/*const buttonClick = () =>{
    state.coinsData.displayNewCoins
    let coins;
    tbody.innerHTML = " ";
    button === 'next' ? coins = this.nextCoins() : coins = this.prevCoins();
    this.getCoins(coins);
    this.displayButtons()
}*/

const newAction2 = async (direction) => {
    state.coinData = new Actions(10);
    try{
        await state.coinData.fetchCoins();
        state.coinData.displayNewCoins(direction);
    }catch(error){
        console.log(error);
    }
}


 
nextButton.addEventListener('click', () => {
    newAction('next');
} );
prevButton.addEventListener('click', () => {
    newAction('prev');
} );

 

 