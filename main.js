const addToInput=document.querySelector('.add__input');
const checkBoxInput=document.querySelector('.input__checkbox input');
const todoContainer=document.querySelector(".todo__items");
const clearBtn=document.querySelector('.clear__btn');
const controlBtns=document.querySelectorAll(".todo__control button");
const deleteBtn=document.querySelector('delete__btn');
const itemsNumber=document.querySelector(".items__number");
const themeBtn=document.querySelector('.theme__btn');
console.log(todoContainer.innerHTML)

let todoItems=[]

/* add new Item on Key enter*/
addToInput.addEventListener('keydown',addNewTodo);
function addNewTodo(event){
    
    if(event.keyCode===13 && this.value.trim()!==''){
        itemid=Math.random()
               const item={
            title:addToInput.value,
            id:itemid,
            completed:checkBoxInput.checked
            
        }
        todoItems.push(item)
        renderItem(item)
        saveOnlocalStorage()
       checkChecked()


    }

}

function checkChecked(){
        document.querySelectorAll('.completed').forEach(item=>{
        item.querySelector('.checkbox__container input').checked=true;
    })
}
function renderItem(item){
          let  itemHtml=`    <div class="todo__item ${item.completed?"completed":""}" data-id=${item.id}>
        <div class="checkbox__container">
          <input type="checkbox" class="add__checkbox">
          <span class="mark">
            <img src="./images/icon-check.svg" alt="checkbox icon">
          </span>
        </div>
        <p class="todo__text">${item.title}</p>
        <button class="delete__btn"><img src="./images/icon-cross.svg" alt="delete img"></button>

    </div>`
       todoContainer.insertAdjacentHTML("afterbegin",itemHtml)
}


todoContainer.addEventListener('click',(e)=>{
    // get checkbox item
    const currentTarget=e.target;
    if(currentTarget.classList.contains('add__checkbox')){
    makeCompleteHandler(currentTarget)
    }
    if(currentTarget.classList.contains('todo__text')){
        const checkBoxOfItem=currentTarget.previousElementSibling.querySelector('input');
        checkBoxOfItem.checked=!checkBoxOfItem.checked
        makeCompleteHandler(checkBoxOfItem)
    }
    if(currentTarget.classList.contains('delete__btn')||currentTarget.closest('.delete__btn')){
        //get targeted item of todo  
     const targetedItem=currentTarget.closest('.todo__item');
    todoItems= todoItems.filter(item=>item.id!=targetedItem.dataset.id);
     targetedItem.remove()
    }
    saveOnlocalStorage()
})
function makeCompleteHandler(checkBoxTarget){
          //get targeted item of todo  
     const targetedItem=checkBoxTarget.closest('.todo__item');
     //get item from the array of items to edit it
     const currentItem =todoItems.find(item=>item.id==targetedItem.dataset.id);
     //edit current item
      currentItem.completed=!(currentItem.completed);
     //store new value of item on array 
     todoItems= todoItems.map(item=>{
        if(item.id==currentItem.id){
            return currentItem;
        }
        else{
            return item
        }

     })
     targetedItem.classList.toggle('completed')
}

/* clear todo*/
clearBtn.addEventListener('click',()=>{
    if(confirm('are you sure to clear todo?')){
        clearToDoHtml()
        todoItems=[];
        saveOnlocalStorage();

    }
})
/* filter to do*/
const btns=[...controlBtns]
btns.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
                        let numOfItem=0;
                    clearToDoHtml()
        if(e.target.classList.value==='all'){
            todoItems.map(item=>{
                renderItem(item)
            })
            numOfItem=todoItems.length
            checkChecked()
        }
        else if(e.target.classList.value==='active'){
            todoItems.map(item=>{if(!item.completed){renderItem(item)
                numOfItem++
            }})
        }
        else{
            todoItems.map(item=>{if(item.completed){renderItem(item)
            numOfItem++;
            }})
            checkChecked()
        }
                    itemsNumber.innerHTML=`${numOfItem} item left`            

    })
})

/*on Click Delete btn */


function clearToDoHtml(){
            todoContainer.innerHTML=``
}

/* save on local storage */
function saveOnlocalStorage(){
    localStorage.setItem('items',JSON.stringify(todoItems))
    localStorage.setItem('name','bashar')
}
window.addEventListener('load',()=>{

    if(localStorage.getItem('theme')){
      const currentTheme=localStorage.getItem('theme');
              document.body.className=currentTheme;

      
    }
    if(localStorage.getItem('items')){
        todoItems=JSON.parse(localStorage.getItem('items'));
        
        numOfItem=todoItems.length
        todoItems.map(item=>renderItem(item))
        checkChecked()
        itemsNumber.innerHTML=`${numOfItem} item left`            

    }
})
/* handle theme btn*/
themeBtn.addEventListener('click',()=>{
    if(document.body.classList.contains('body--light')){
        document.body.className='body--dark';
        localStorage.setItem('theme','body--dark')
    }
    else{
        document.body.className='body--light'
        localStorage.setItem('theme','body--light')

    }
})