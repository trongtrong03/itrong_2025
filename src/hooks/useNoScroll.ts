export default function (val:boolean){
    if(val == true) {
        document.body.classList.add('no-scroll');
    }
    else {
        document.body.classList.remove('no-scroll');
    }
}