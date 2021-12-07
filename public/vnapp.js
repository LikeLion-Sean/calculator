$(document).on('keyup','input[name=info]',function(event){
    this.value = this.value.replace(/[^0-9]/g,'');       
    this.value = this.value.replace(/(^0+)/, "");           
    this.value = this.value.replace(/,/g,'');          
    this.value = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); 	
}); 

const calBtn = document.getElementById('calc');        
calBtn.addEventListener('click', calcVND);

function calcVND(){
    var basicSalary = Number(pit.basic_salary.value.replace(/,/g, ""));   
    var lunch = Number(pit.lunch.value.replace(/,/g, ""));  
    var overPaidLunch = Math.max(lunch-730000, 0);
    var nonInsuranceAllowance = Number(pit.no_insurance_allowance.value.replace(/,/g, "")); 
    var otherAllowance = Number(pit.other_allowance.value.replace(/,/g, ""));
    var incentive = Number(pit.incentive.value.replace(/,/g, ""));
    
    var totalSalary = basicSalary + lunch + nonInsuranceAllowance + otherAllowance + incentive;
    var socialInsurance = Math.min((basicSalary + otherAllowance)*0.08, 2384000);
    var healthInsurance = Math.min((basicSalary + otherAllowance)*0.015, 447000);
    var unemploymentInsurance = Math.min((basicSalary + otherAllowance)*0.01, 884000);
    var unionFee = Math.min((basicSalary + otherAllowance)*0.01, 149000);
    var insurance = Math.round(socialInsurance) + Math.round(healthInsurance) + Math.round(unemploymentInsurance);
   
    var deduction = (Number(pit.family.value.replace(/,/g, "")) * 4400000 + 11000000) + insurance + lunch - overPaidLunch;
    
    var taxable = totalSalary - deduction;        
    
    var pitResult = Math.round(calc_pit(taxable));                          
    var unionResult = Math.round(unionFee);             
    var incomeResult = totalSalary - pitResult - insurance - unionResult;

    pit.result_gross.value = totalSalary.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    pit.result_pit.value = pitResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    pit.result_insurance.value = insurance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    pit.result_union.value = unionResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
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