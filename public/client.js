const prettyMassage = (msg)=>{
  const msgs = {
    'connected': '[sys][time]%time%[/time]: Connect [user]%name%[/user].[/sys]',
    'userJoined': '[sys][time]%time%[/time]: User [user]%name%[/user] connected.[/sys]',
    'messageSent': '[out][time]%time%[/time]: [user]%name%[/user]: %text%[/out]',
    'messageReceived': '[in][time]%time%[/time]: [user]%name%[/user]: %text%[/in]',
    'userSplit': '[sys][time]%time%[/time]: User [user]%name%[/user] left.[/sys]'
  }
  return msgs[msg.event].replace(/\[([a-z]+)\]/g, '<span class="$1">')
      .replace(/\[\/[a-z]+\]/g, '</span>')
      .replace(/\%time\%/, msg.time)
      .replace(/\%name\%/, msg.name)
      .replace(/\%text\%/, unescape(msg.text)
      .replace('<', '&lt;')
      .replace('>', '&gt;')) + '<br>'
}

window.addEventListener('load', ()=>{
  const $board = document.querySelector('#board')
  const $input = document.querySelector('#input')
  const $sendBt = document.querySelector('#send')

  let socket = io()
  socket.on('message', function (msg) {
    $board.innerHTML += prettyMassage(msg);
    $board.scrollTop = $board.scrollHeight;
  });
  
  $input.addEventListener('keydown', (e)=>{
    if(e.keyCode == 13) {
      socket.send(escape($input.value));
      $input.value = ''
    }
  })
  $sendBt.addEventListener('click', (e)=>{
    socket.send(escape($input.value));
    $input.value = ''
  })

})