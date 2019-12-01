let defaultTodos=[
    {text: 'todo 1',completed: false},
    { text: 'todo 2', completed: true}
]
var hideCompleted =false

const todos = JSON.parse(localStorage.getItem('todos')) || defaultTodos

function generateTodo (todo,index){
    
    const p = document.createElement('li');
    p.innerHTML="<input type='checkbox'" + (todo.completed ? " checked " : "")  + ">" + todo.text;   
    p.addEventListener('change',(e) =>statee(e,index))

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'delete'
    deleteButton.addEventListener('click', () => deleteTodo(index))
    p.append(' | ', deleteButton)

    //console.log(index +" "+ todo.completed)
    if (todo.completed) { p.classList.add('done') }

    return p
}

function statee(e,index){
    //console.log(index +" "+ e.target.checked)
  todos[index].completed=e.target.checked
  saveToLocalStorage()
  renderTodos(todos)
}

function saveToLocalStorage(){
    localStorage.setItem('todos',JSON.stringify(todos))
}

function renderTodos (_todos) {
    document.querySelector('#todos').innerHTML=""  
    console.log(hideCompleted)
    _todos.forEach((todo,index) => {        
        if (hideCompleted && todo.completed){

        }
        else
            document.querySelector('#todos').appendChild(generateTodo(todo,index))      
    });
    
}
//-----------------------------------------------------------------------------------------------

document.querySelector('#new-todos').addEventListener('submit',function(e){
    e.preventDefault()
    if (e.target.elements.text.value.length >0){
        todos.push({
            text: e.target.elements.text.value,
            completed: false
        })
        saveToLocalStorage()
        renderTodos(todos)
        e.target.elements.text.value=""
    }

    e.target.elements.text.focus()
})



function deleteTodo(index) {
    //console.log(todos.length)
    todos.splice(index, 1)
    //console.log(todos.length)
    saveToLocalStorage()
    renderTodos(todos)
  }

  document.querySelector('#resett').addEventListener('click', () => {
      const con =confirm("Reset data?")
      if (con){
        localStorage.clear()
        window.location.reload()
      }
  })

  document.querySelector('#hide').addEventListener('click',(e) => {
    hideCompleted=  e.target.checked      
        renderTodos(todos)
  })

  renderTodos(todos)