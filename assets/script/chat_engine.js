

class chatEngine{
    constructor(chatbox_id,userEmail)
    {
        this.chatbox = document.getElementById(chatbox_id);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:9003');
        
        if(this.userEmail)
        {
           this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;
        this.socket.on('connect',() => {
            console.log('socket :: client ---> server');
            
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'V_room'
            });

            self.socket.on('user_joined_room',(data) => {
                console.log('user : ',data.user_email,'joined :',data.chatroom);
            });

            self.chatbox.querySelector('button').addEventListener('click',(event) => {
                event.preventDefault();

                self.socket.emit('room_incomming_message',{
                    chatroom:'V_room',
                    userEmail:self.userEmail,
                    data:self.chatbox.querySelector('input').value
                });

                self.chatbox.querySelector('input').value = '';
            });

            self.socket.on('room_message',(message) => {
                let chat_display = self.chatbox.querySelector('.chat-display');
                
                if(self.userEmail == message.userEmail)
                {
                   chat_display.innerHTML += `<li class = 'self-message'>
                      <span>${message.data}</span>
                   </li>`;
                }
                else
                {
                   chat_display.innerHTML += `<li class = 'other-message'>
                      <span>${message.data}</span>
                   </li>`;
                }
            });
        });

    }
}