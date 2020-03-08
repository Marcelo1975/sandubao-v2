function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

if('serviceWorker' in navigator && 'Notification' in window) {

  window.onload = function() {
    navigator.serviceWorker.register('serviceWorker.js')
      .then(function(){
        console.log("Service worker resgistered with success");
      })
      .catch(function(e){
        console.log("Service worker failed.");
        console.log(e);
      });

    navigator.serviceWorker.ready
      .then(function(reg){
        /*
        reg.pushManager.getSubscription()
          .then(function(subscription){
            subscription.unsubscribe()
              .then(function(){
                console.log("Unsubscribe yes");
              })
              .catch(function(){
                console.log("Unsubscribe no");
              });
          });*/

        var appCode = 'BMm26SKBH2ezQbQe7bD4wnEZh79y2ijPGNI6Erk7gxvY0_7EixYQ-e2myYaRfgMGbXldAc1L3dY8FCgt0c5jHQA';
        var options = {
          userVisibleOnly: true,
          applicationServerKey:urlBase64ToUint8Array(appCode)
        };

        reg.pushManager.subscribe(options)
          .then(function(pushSubscription){
            console.log(JSON.stringify(pushSubscription));
            /*fetch(
              "https://meusite.com.br/notificacao/registro",
              {
                method:'POST',
                body:JSON.stringify(pushSubscription)
              }
            )
            .then(function(res){
              // Fazer alguma coisa
              console.log("Deu certo!");
            })
            .catch(function(e){
              // Fazer alguma coisa com o erro
              console.log("Deu erro.");
            })*/
          })
          .catch(function(error){
            console.log(error.message);
          });
      });

    Notification.requestPermission(function(permission){
      if(permission == 'granted') {
        console.log("Permission yes");
      } else {
        console.log("Permission no");
      }
    });
  };
}