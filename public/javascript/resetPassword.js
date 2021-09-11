const resetInput = document.getElementById('resetInput');
const resetButton = document.getElementById('resetButton');

function handleReset(id){
    const myObject = {
       newPassword:resetInput.value, 
       id:id
    }
    fetch('/api/users/reset', {headers:{'Content-Type':'application/json'},method:'PUT', body:JSON.stringify(myObject)}).then(function(data){
        return data.json()
    });
};