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
    count = 0;
    array = [];
    constructor(coinsPerPage){
        this.coinsPerPage = coinsPerPage;
    }
    
    async fetchCoins() {
        try{
            const response = await axios('https://api.coinlore.com/api/tickers/');
            this.array = response.data.data
           return this.array;
        }
        catch(error){
           console.log(error)
        }
    }
    
    nextCoins(){
        this.count++
        console.log(this.coinsPerPage, this.array, this.count);
        return this.array.slice(this.count, this.count + this.coinsPerPage);
    }

    prevCoins(){
        this.count--
        return this.array.slice(this.count, this.count + this.coinsPerPage);
    }

    displayButtons(){
         prevButton.style.visible ? this.count > 0 : "visible";
         nextButton.className = "visible";
         console.log('button display')
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
    }
    
    init(coins, direction){
        let coinsData = coins.slice(0, 10);
        this.getCoins(coinsData);
        this.displayNewCoins(direction);
    }
}


const actions = new Actions(10);
 const newAction = async (direction) => {
    try{
      const coinData = await actions.fetchCoins();
      actions.init(coinData, direction)
      //actions.displayButtons()
    }catch(error){
       console.log(error);
    }
    
}
newAction('next')
/*newAction();
 */
/*const buttonClick = () =>{
    state.coinsData.displayNewCoins
    let coins;
    tbody.innerHTML = " ";
    button === 'next' ? coins = this.nextCoins() : coins = this.prevCoins();
    this.getCoins(coins);
    this.displayButtons()
}*/

/* const newAction2 = async (direction) => {
    state.coinData = new Actions(10);
    try{
        await state.coinData.fetchCoins();
        state.coinData.displayNewCoins(direction);
    }catch(error){
        console.log(error);
    }
} */


 
nextButton.addEventListener('click', () => {
newAction('next');
});

prevButton.addEventListener('click', () => {
 newAction('prev');
} );

 

 