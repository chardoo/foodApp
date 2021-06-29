const password = document.querySelector('#password1');
const password1 = document.querySelector('#password2')
const sentbtn = document.querySelector('.sendbtn')
const passwordmessage = document.querySelector('#passwordmessage')
let firstvalue ;
let secondvalue;
const sendbtnhandler =  ()=>{
     firstvalue = password.value;
     secondvalue = password1.value;
   if(firstvalue!=secondvalue || firstvalue ==0 | secondvalue == 0 ||firstvalue==0&&secondvalue==0){
     passwordmessage.classList.toggle('visible')
     
   }
}

sentbtn.addEventListener('click', sendbtnhandler )

// $(document).ready(function(){
// $('.sendbtn').on('click', function(){
//     if(firstvalue!=secondvalue){
//         $(this).parent().find('.passwordmessage').toggle();
//     }

// })



// })