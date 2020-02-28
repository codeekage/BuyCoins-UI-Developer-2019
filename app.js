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

    
    


    nextCoins(){
        this.count = this.count  + this.coinsPerPage;
        this.count = this.count % this.array;
        return this.array.slice(this.count, this.count +this.coinsPerPage);
    }

    prevCoins(){
        let i = 0;
        i = i - this.coinsPerPage;
        return this.array.slice(i, i+this.coinsPerPage);
    }

    displayButtons(){
         prevButton.style.visibility = this.count > 0 ?  "visible" : "hidden";
         nextButton.style.visibility = this.count >= 90 ?  "hidden" : "visible";
    }
    
    getCoins(coins){
        for(let coin of coins){
            console.log(coin)
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
        console.log(this.nextCoins())
        tbody.innerHTML = " ";
        button === 'next' ? coins = this.nextCoins() : coins = this.prevCoins();
        //this.getCoins(this.array);
        this.displayButtons()
    }
    
    init(coins, direction){
        this.displayNewCoins(direction);
        let coinsData = coins.slice(0,10);
        this.getCoins(coinsData);
    }
}


 const newAction = async (direction) => {
    const actions = new Actions(10);
    try{
      const coinData = await actions.fetchCoins();
      actions.init(coinData, direction)
      actions.displayButtons()
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
}
 */

 
nextButton.addEventListener('click', () => {
    newAction('next');
});

prevButton.addEventListener('click', () => {
    newAction('prev');
} );

 

 