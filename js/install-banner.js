(function (){
    'use strict';

    var eventInstall;
    var btInstall = $("#bt-install");

    window.addEventListener('beforeInstallprompt', function (event){
        
        console.log('beforeInstallPrompt')
        eventInstall = event;
        event.preventDefault();
        btInstall.show();
    });
    
    btInstall.click(function(){
        if (eventInstall){
            eventInstall.prompt();

            eventInstall.userChoice.then(function(choiceResult){
                if (choiceResult.outcome == "dismissed"){
                    alert("Que pena!");
                } else{
                    alert ("Veleu!");
                }
            });

            eventInstall = null;
            btInstall.hide();
        }
    });
})();