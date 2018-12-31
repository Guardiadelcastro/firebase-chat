var config = {
    apiKey: "AIzaSyBzfdZQa8fBVe16uRV-B14uJmMfsO20_T8",
    authDomain: "adpcchat.firebaseapp.com",
    databaseURL: "https://adpcchat.firebaseio.com",
    projectId: "adpcchat",
    storageBucket: "adpcchat.appspot.com",
    messagingSenderId: "253661570139"
};

firebase.initializeApp(config);

let db = firebase.database(),
strChannel = 'ADPCHAT_CHANNEL_01';

let box = document.querySelector('#box');
let inputText = document.querySelector('#inputText');
let send = document.querySelector('#send');

send.addEventListener('click', function() {
  let userMessage = inputText.value,
  objChat = {
    ADPCHAT_USER: this.dataset.user,
    ADPCHAT_MESSAGE: userMessage,
    ADPCHAT_CREATED_AT: Date.now()
  };
  db.ref(strChannel).push(objChat);
  inputText.value = '';
})

db.ref(strChannel).on('child_added', function(objData) {
  let domTemplate = document.createElement('tpl'),
  objChat = objData.val(),
  strHMTL = `<p> ${objChat.ADPCHAT_USER} (${objChat.ADPCHAT_CREATED_AT}): ${objChat.ADPCHAT_MESSAGE}</p>`
  domTemplate.innerHTML = strHMTL;
  box.appendChild(domTemplate);
});
