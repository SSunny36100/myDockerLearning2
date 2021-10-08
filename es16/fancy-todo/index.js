import { Element } from './element.js';
const todosElementContainter = document.getElementById("todo-display-todos");
const inputTodo = document.getElementById("todo-add");

/*
const elementsStatus = {
    ACTIVE: "active",
    DONE: "DONE",
    UNDONE: "UNDONE",
    DELETED: "DELETED",
}
elementsStatus.
*/

let currentlyDisplaying = "active";

const todoElements = [];
const selectedElements = [];

document.getElementById("todo-display-new").addEventListener('click', function () {
    inputTodo.style.display = inputTodo.style.display === "none" ? "block" : "none";
    document.getElementById("todo-display-new").innerHTML = document.getElementById("todo-display-new").innerHTML === "+" ? "-" : "+";
});



function deleteTodoHandler(evt) {
    console.log("deleting...");
    if (currentlyDisplaying === "deleted")
        return;

    let index = evt.target.parentNode.id;
    console.log(index);
    selectedElements.findIndex(selected => selected === index) === -1 ? selectedElements.push(index) : console.log("Sending current item with the selected");

    deleteTodo(selectedElements);
    selectedElements.length = 0;
}

function deleteTodo(indexes) {
    indexes.forEach(index => {
        let todoDomElement = document.getElementById(index);
        todoDomElement.classList.replace(todoElements[index].status, "deleted");
        todoElements[index].status = "deleted";
        todoDomElement.classList.add("changing");
        setTimeout(function () {
            /*
            evt.target.parentNode.classList.remove("changing");
            evt.target.parentNode.style.display = "none";
            changeShowing(currentlyDisplaying);*/
            currentlyDisplaying !== "all" ? todoDomElement.parentNode.removeChild(todoDomElement) : todoDomElement.classList.remove("changing");;
        }, 1000);
    })
    handlePostChange();
}

function setTodoAsUndoneHandler(evt) {
    console.log("undoning...");

    if (currentlyDisplaying === "undone")
        return;

    let index = evt.target.parentNode.id;
    console.log(index);
    selectedElements.findIndex(selected => selected === index) === -1 ? selectedElements.push(index) : console.log("Sending current item with the selected");

    setTodoAsUndone(selectedElements);
    selectedElements.length = 0;
    /*
        let index = evt.target.parentNode.id;
        evt.target.parentNode.classList.replace(todoElements[index].status, "undone");
    
        todoElements[index].status = "undone";
        evt.target.parentNode.classList.add("changing");
    
    
        setTimeout(function () 
            //evt.target.parentNode.classList.remove("changing");
            //evt.target.parentNode.style.display = "none";
            //changeShowing(currentlyDisplaying);
            currentlyDisplaying !== "all" ? evt.target.parentNode.parentNode.removeChild(evt.target.parentNode) : evt.target.parentNode.classList.remove("changing");;
    
        }, 1000);*/
}

function setTodoAsUndone(indexes) {
    indexes.forEach(index => {
        let todoDomElement = document.getElementById(index);
        todoDomElement.classList.replace(todoElements[index].status, "undone");
        todoElements[index].status = "undone";
        todoDomElement.classList.add("changing");
        setTimeout(function () {
            /*
            evt.target.parentNode.classList.remove("changing");
            evt.target.parentNode.style.display = "none";
            changeShowing(currentlyDisplaying);*/
            currentlyDisplaying !== "all" ? todoDomElement.parentNode.removeChild(todoDomElement) : todoDomElement.classList.remove("changing");;
        }, 1000);
    })
    handlePostChange();

}

function setTodoAsDoneHandler(evt) {
    console.log("doning...");
    if (currentlyDisplaying === "undone")
        return;

    let index = evt.target.parentNode.id;
    console.log(index);
    selectedElements.findIndex(selected => selected === index) === -1 ? selectedElements.push(index) : console.log("Sending current item with the selected");

    setTodoAsDone(selectedElements);
    selectedElements.length = 0;
    /*
        let index = evt.target.parentNode.id;
        evt.target.parentNode.classList.replace(todoElements[index].status, "done");
        todoElements[index].status = "done";
    
        evt.target.parentNode.classList.add("changing");
    
        setTimeout(function () {
            //evt.target.parentNode.classList.remove("changing");
            //evt.target.parentNode.style.display = "none";
            currentlyDisplaying !== "all" ? evt.target.parentNode.parentNode.removeChild(evt.target.parentNode) : evt.target.parentNode.classList.remove("changing");;
            //changeShowing(currentlyDisplaying);
        }, 1000);*/

}
function setTodoAsDone(indexes) {
    indexes.forEach(index => {
        let todoDomElement = document.getElementById(index);
        todoDomElement.classList.replace(todoElements[index].status, "done");
        todoElements[index].status = "done";
        todoDomElement.classList.add("changing");
        setTimeout(function () {
            /*
            evt.target.parentNode.classList.remove("changing");
            evt.target.parentNode.style.display = "none";
            changeShowing(currentlyDisplaying);*/
            currentlyDisplaying !== "all" ? todoDomElement.parentNode.removeChild(todoDomElement) : todoDomElement.classList.remove("changing");;
        }, 1000);
    })
    handlePostChange();

}

function handlePostChange() {
    document.querySelectorAll("input[name=selected]").forEach(ck => ck.checked = false);
    document.getElementById("check-all").checked = false;
}

function addNewTodo() {
    const todoContent = document.getElementById("todo-add-input-text").value;
    if (todoContent.trim() === "")
        return;

    const todoElement = new Element(todoContent, "active");

    let currentIndex = todoElements.length;

    todoElements.push(todoElement);

    if (currentlyDisplaying === "active" || currentlyDisplaying === "all")
        drawElement(todoElement, currentIndex);

    //todo-edit
    document.getElementById("todo-add-input-text").value = "";
    //changeShowing(currentlyDisplaying);
    document.getElementById("check-all").checked = false;

}

function editContentInit(evt) {
    let index = evt.target.parentNode.id;
    console.log(`editing...${index}`);
    document.getElementById("todo-edit-bg").style.display = "inline";
    document.getElementById("todo-edit-input").value = todoElements[index].content;

    document.getElementById("todo-edit-bg").addEventListener('click', () => {
        document.getElementById("todo-edit-bg").style.display = "none";
        document.getElementById("todo-edit-input").value = "";
    })
    document.getElementById("todo-edit").addEventListener('click', (evt) => {
        evt.stopPropagation();
    })

    document.getElementById("todo-edit-cancel").addEventListener('click', () => {
        document.getElementById("todo-edit-bg").style.display = "none";
        document.getElementById("todo-edit-input").value = "";
    })
    let buttonEdit = document.getElementById("todo-edit-confirm");
    buttonEdit.addEventListener('click', editContent);
    buttonEdit.indexToEdit = index;


}

function editContent(evt) {
    evt.stopPropagation();
    let index = evt.target.indexToEdit;
    console.log(`editing content-${index}`);

    todoElements[index].content = document.getElementById("todo-edit-input").value;
    console.log(todoElements[index].content);

    document.getElementById(`content-${index}`).innerHTML = todoElements[index].content;

    document.getElementById("todo-edit-bg").style.display = "none";
    document.getElementById("todo-edit-confirm").removeEventListener('click', editContent);
}


function drawElement(element, index) {
    todosElementContainter.innerHTML += `<div id="${index}" class="todo-element ${element.status}">
    <input type="checkbox" name="selected" class="todo-bulk-selector"/>
    <span class="todo-content" id="content-${index}">${element.content}</span>
    <button class = "todo-delete-element">×</button>
    <button class = "todo-mark-done">☺</button>
    <button class = "todo-mark-undone">»</button>
    </div>`

    Array.from(document.getElementsByClassName(`todo-delete-element`)).forEach(btnDel => btnDel.addEventListener('click', deleteTodoHandler));
    Array.from(document.getElementsByClassName(`todo-mark-done`)).forEach(btnDone => btnDone.addEventListener('click', setTodoAsDoneHandler));
    Array.from(document.getElementsByClassName(`todo-mark-undone`)).forEach(btnUndone => btnUndone.addEventListener('click', setTodoAsUndoneHandler));
    Array.from(document.getElementsByClassName(`todo-content`)).forEach(spanContent => spanContent.addEventListener('click', editContentInit));
    document.querySelectorAll("input[name=selected]").forEach(checkbox => checkbox.addEventListener('change', function (evt) {
        //console.log(evt.target.checked);
        if (evt.target.checked) {
            let index = evt.target.parentNode.id;
            console.log(index);
            selectedElements.findIndex(selected => selected === index) === -1 ? selectedElements.push(index) : console.log("This item is already selected");
        } else {
            selectedElements.pop(index);
        }
        console.log(selectedElements);

    }))

}

function changeShowing(showCategory) {
    console.log(showCategory);
    console.log(currentlyDisplaying);

    selectedElements.length = 0;
    document.getElementById("check-all").checked = false;


    if (showCategory === currentlyDisplaying)
        return;

    todosElementContainter.innerHTML = "";

    todoElements.forEach((elem, index) => {
        console.log(index);
        if (showCategory === "all" || elem.status === showCategory) {
            drawElement(elem, index);
        }

    });
    currentlyDisplaying = showCategory;


    //currentlyDisplaying = showCategory;
    /*
    document.querySelectorAll(".todo-element").forEach(elem => {
        if (showCategory === "all") {
            elem.style.removeProperty("display");
            return;
        }
    
        if (!Array.from(elem.classList).includes(showCategory)) {
            elem.style.display = "none";
        } else {
            elem.style.removeProperty("display");
        }
    });
    */
}



document.getElementById("todo-add-input-text").addEventListener('keyup', (evt) => {
    if (evt.key === "Enter")
        addNewTodo();
})
document.getElementById("todo-add-add").addEventListener('click', addNewTodo);
document.getElementById("show-all").addEventListener('click', (evt) => {
    changeShowing(evt.target.dataset.show);
});
document.getElementById("show-active").addEventListener('click', (evt) => {
    changeShowing(evt.target.dataset.show);
});
document.getElementById("show-done").addEventListener('click', (evt) => {
    changeShowing(evt.target.dataset.show);
});
document.getElementById("show-undone").addEventListener('click', (evt) => {
    changeShowing(evt.target.dataset.show);
});
document.getElementById("show-deleted").addEventListener('click', (evt) => {
    changeShowing(evt.target.dataset.show);
});
document.getElementById("check-all").addEventListener('change', function () {
    document.querySelectorAll("input[name=selected]").forEach(ck => {
        ck.checked = this.checked
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        ck.dispatchEvent(evt);
    });
});
