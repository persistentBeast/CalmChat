let roomName = document.getElementById('roomName').innerText;
let chatBox = document.getElementById('chatBox');
let form = document.getElementsByTagName('form')[0];
let input = document.getElementsByTagName('input')[0];

let socket=io(`http://localhost:3000/room`);
socket.emit('user-joined', {
    user : currentUser,
    roomName : roomName
})

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('new-message', input.value);
        const newLi = document.createElement('li');
        const newSpan = document.createElement('span');
        newLi.classList.add("message-sent");
        newSpan.append("You" + " | " + (new Date).toLocaleString());
        newSpan.classList.add("msg-timing", "text-muted");
        newLi.appendChild(newSpan);
        newLi.append(input.value);
        chatBox.appendChild(newLi);
        input.value = '';
        window.scrollTo(0, document.body.scrollHeight);
    }
});


socket.on('user-joined', (msg)=>{
    // chatBox.appendChild(<)
    const newLi = document.createElement('li');
    newLi.append(msg);
    newLi.classList.add("presence-update");
    chatBox.appendChild(newLi);

});


socket.on('user-left', (msg)=>{
    // chatBox.appendChild(<)
    const newLi = document.createElement('li');
    newLi.append(msg);
    newLi.classList.add("presence-update");
    chatBox.appendChild(newLi);

});

socket.on('new-message', (msg)=>{

    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');
    newLi.classList.add("message-received");
    newSpan.append(msg.from + " | " + (new Date).toLocaleString());
    newSpan.classList.add("msg-timing", "text-muted");
    newLi.appendChild(newSpan);
    newLi.append(msg.text);
    chatBox.appendChild(newLi);

})

// const sendButton=

console.log("Hi");