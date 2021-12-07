$(document).on('keyup','input[name=info]',function(event){
    this.value = this.value.replace(/[^0-9]/g,'');       
    this.value = this.value.replace(/(^0+)/, "");           
    this.value = this.value.replace(/,/g,'');          
    this.value = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); 	
});


const units = document.getElementsByName('currency');
console.log(units)

$("#calc").on('click touchstart touchend', function (){                                   
    for(i = 0; i < units.length; i++) {
        if(units[i].checked){
            unit = units[i].value;        
            if(unit === 'USD'){
                calcUSD();
            } else{            
                calcVND();
            }
        }
    }                    
})
// const calBtn = document.getElementById('calc');        
// calBtn.addEventListener('click' , function (){                                   
//     for(i = 0; i < units.length; i++) {
//         if(units[i].checked){
//             unit = units[i].value;        
//             if(unit === 'USD'){
//                 calcUSD();
//             } else{            
//                 calcVND();
//             }
//         }
//     }                    
// });

function calcUSD(){
    fetch('https://vnkrtax.com/api/exchange/usd')
        .then(response => response.json())
        .then(data => displayUSD(data))
        .catch((error) => {
            console.error('Error:', error);
        });
}

function displayUSD(exchange){
    let exchangeRate = document.getElementById('exchange-rate');    
    let eur = exchange.rates.EUR;    
    let usd = exchange.rates.USD;
    let vnd = exchange.rates.VND;
    let rate = Math.round(vnd/usd);    
    exchangeRate.innerText = `Exchange rate: VND${rate.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}/USD1`;

    
    var totalSalary = Number(pit.salary.value.replace(/,/g, ""))*rate + (Math.min(Number(pit.rental.value.replace(/,/g, "")), Number(pit.salary.value.replace(/,/g, "")) *0.15))*rate;
    var insurance = Math.min(Number(pit.salary.value.replace(/,/g, "")) * 0.015*rate, 447000);    
    var deduction = (Number(pit.family.value.replace(/,/g, "")) * 4400000 + 11000000) + insurance;            
    var taxable = totalSalary - deduction;  

    var pitResult = Math.round(calc_pit(taxable)/rate);                              
    var insuranceResult = Math.round(insurance/rate);                
    var incomeResult = Number(pit.salary.value.replace(/,/g, "")) - pitResult - insuranceResult;

    pit.result_pit.value = pitResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    pit.result_insurance.value = insuranceResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    pit.result_income.value = incomeResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");     
}

function calcVND(){
    let exchangeRate = document.getElementById('exchange-rate');   
    exchangeRate.innerText = '';
    
    var totalSalary = Number(pit.salary.value.replace(/,/g, "")) + (Math.min(Number(pit.rental.value.replace(/,/g, "")), Number(pit.salary.value.replace(/,/g, "")) *0.15));
    var insurance = Math.min(Number(pit.salary.value.replace(/,/g, "")) * 0.015, 447000);
    var insuranceResult = Math.round(insurance);             
    var deduction = (Number(pit.family.value.replace(/,/g, "")) * 4400000 + 11000000) + insuranceResult;
    
    var taxable = totalSalary - deduction;            
    
    var pitResult = Math.round(calc_pit(taxable));                             
    var incomeResult = Number(pit.salary.value.replace(/,/g, "")) - pitResult - insuranceResult;

    pit.result_pit.value = pitResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    pit.result_insurance.value = insuranceResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    pit.result_income.value = incomeResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");    
};

function calc_pit(a){
    if(a <= 0){
    return 0;
    } else if(a>0 && a <= 5000000){
    return a * 0.05;
    } else if(a > 5000000 && a <= 10000000){
    return ((a-5000000)*0.1 + 250000);
    } else if(a > 10000000 && a <= 18000000){
    return ((a-10000000) * 0.15 + 750000);
    } else if(a> 18000000 && a <= 32000000){
    return ((a-18000000)*0.2 + 1950000);
    } else if(a > 32000000 && a <= 52000000){
    return ((a-32000000)*0.25 + 4750000);
    } else if(a> 52000000 && a <= 80000000){
    return ((a-52000000)*0.3 + 9750000);
    } else{
    return ((a-80000000)*0.35 + 18150000);
    }                
} 