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


fetch('https://api.coinlore.com/api/tickers/')
   .then(response => response.json())
   .then(coins => {
       let i = 0;
       let arrLength = coins.data.length
       console.log(arrLength);
       let array = coins.data;
       let coinsData = array.slice(0,10);
       getCoins();

       function nextCoins(){
           i = i + 10;
           i = i % array.length;
           return array.slice(i, i+10);
       }

       function prevCoins(){
           i = i - 10;
           return array.slice(i, i+10);
        }

        function displayButtons(){
            prevButton.style.visibility = i > 0 ?  "visible" : "hidden";
            nextButton.style.visibility = i >= 90 ?  "hidden" : "visible";
        }

       function getCoins(){
            for(let coin of coinsData){
                let tableRow = `<tr>
                                <td>${coin.name}</td>
                                <td>${coin.symbol}</td>
                                <td>${coin.price_usd}</td>
                                <td>${coin.tsupply} ${coin.symbol}</td>
                                </tr>`
                tbody.insertAdjacentHTML('beforeend', tableRow);     
           }
       }

        nextButton.addEventListener('click', function(e){
           tbody.innerHTML = " ";
           coinsData = nextCoins();
           getCoins();
           displayButtons()
           
        })

        prevButton.addEventListener('click', function(e){
            tbody.innerHTML = " ";
            coinsData = prevCoins();
            getCoins();
            displayButtons()
            
        })
       
   }) 
   .catch(error =>{
       console.log(error);
   });
