

setInterval (() => {
    let date =new Date()

    let hh=date.getHours();
    let min=date.getMinutes();
    let sec=date.getSeconds();
    
    let hr=30*hh +min/2;
    let mr=6*min;
    let sr=6*sec;

hour.style.transform  =`rotate(${hr}deg)`;
second.style.transform  =`rotate(${sr}deg)`;
minute.style.transform  =`rotate(${mr}deg)`;


    

    
}, 1000);
    

