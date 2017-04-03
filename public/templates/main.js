//For cancel buttons
function redirect(){
 window.location="./admin_home.php";
}
//function to match two passwords
function verifypass(pass,repass,color){
    var passfield=document.getElementById(pass);
    var repassfield=document.getElementById(repass);
    var help=document.getElementById("repasshelp");

    help.setAttribute("visibility","visible");
    if(passfield.value!=""){
         if(passfield.value===repassfield.value ){
         help.innerHTML="Passwords match!! Good to go!";
         help.setAttribute("style","font-size: 15px;color:"+color+";font-weight:bold;");
        return true;
    }
    else{

        help.innerHTML="Passwords don't match!!";
        help.setAttribute("style","font-size: 15px;color:orange;font-weight:bold");

        return false;
    }
    }

}
//function to allow only alphabets
function allowOnlyAlphabets(element){
    var content=element.value;
    var regex = /^[a-zA-Z]*$/;

    if (regex.test(content)){
      
      return true;
  } else {

      return false;
  }

}

//function to validate register elements
function register(pass,repass,username){

    var checkpass=verifypass(pass,repass,'white');

    if(checkpass){
        var str=document.getElementById(username).value;
        if(allowOnlyAlphabets(document.getElementById("name"))){
            if(document.getElementById(pass).value.length<10){
              alert("Password should be greater than 10 characters");
              return false;
            }
            return true;
        }
        else{
            alert("Name cannot contain numbers!!");
            return false;
          }
    }
    return false;
}



//function to allow on future dates
function allowfuturedates(){
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("date")[0].setAttribute('min', today);
}
function toggleOpacity(element1,element2){
     var elem=$('#'+element1);
     $("#"+element1+" :input").attr("disabled",true);
     elem.prop("style","padding-top:10px;opacity:0.1");
     $("#"+element2).prop("style","padding-top:10px;opacity:1");
      $("#"+element2+" :input").attr("disabled",false);
}
