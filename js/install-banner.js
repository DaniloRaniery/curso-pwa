(function (){
    'use strict';

    var eventInstall;
    var btInstall = $("#bt-install");

    window.addEventListener('beforeinstallprompt', function (event){
        
        console.log('beforeinstallPrompt')
        eventInstall = event;
        event.preventDefault();
        btInstall.show();
        return false;
    });
    
    btInstall.click(function(){
    
        if (eventInstall){
            eventInstall.prompt();

            eventInstall.userChoice.then(function(choiceResult){
                if (choiceResult.outcome === "accepted"){
                    alert("Valeu!");
                } else{
                    console.log(choiceResult.outcome);
                    alert ("Que pena!");
                }
            });

            eventInstall = null;
            btInstall.hide();
        }
    });
})();