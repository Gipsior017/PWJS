function checkForm(){
    var error=false; //to znaczy, że danych nie brakuje
    var errorText=""; //komunikat z błędem
    var contactName = document.getElementById("contactName");
    var contactEmail = document.getElementById("contactEmail");
    console.log(contactName.value+'\n'+contactEmail.value);
    if(contactName.value=="")
    {
        document.getElementById("im").innerHTML="Imie nie może być puste";
        errorText+="imie\n";
        error=true; 
    }
    if(contactEmail.value=="")
    {
        document.getElementById("em").innerHTML="email jest wymagany";
        errorText+="emial\n";
        error=true;
    }
else
{
    var email = contactEmail.value;
    var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
if(regex.test(email)==false)
    {
    document.getElementById("em").innerHTML="Błędny email";
    errorText+="błedny emial\n";
    error=true;
    }
}
    if (!error) return true; 
    else{
        alert ("Nie wypełniłeś następujących pól:\n" + errorText);
        return false;
    } 
    
}