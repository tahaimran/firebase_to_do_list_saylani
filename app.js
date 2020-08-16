var list = document.getElementById("list")


firebase.database().ref('Tasks').on('child_added',function(data){


	var li = document.createElement("li")
    var litext = document.createTextNode(data.val().value)
    li.append(litext)

    // delete button
    var delbtn = document.createElement("button")
    var deltext = document.createTextNode("Delete")
    delbtn.appendChild(deltext)
    delbtn.setAttribute("class", "btn btn btn-warning midbtn btns")
	delbtn.setAttribute('id',data.val().key)
    delbtn.setAttribute("onclick", "deleteitem(this)")

    // create edit buttom
    var editbtn = document.createElement("button")
    var edittext = document.createTextNode("Edit")
    editbtn.appendChild(edittext)
    editbtn.setAttribute("class", "btn btn-warning sidbtn btns")
	editbtn.setAttribute("id",data.val().key)
    editbtn.setAttribute("onclick", "editbutton(this)")



    li.appendChild(delbtn)
    li.appendChild(editbtn)
    list.appendChild(li)

    
})





function addTodo() {
    var todo_ent = document.getElementById("todo-item")
	var key = firebase.database().ref('Tasks').push().key;
	var Tasks = {
		value: todo_ent.value,
        key: key		
	}
	firebase.database().ref('Tasks').child(key).set(Tasks)
	todo_ent.value = ""

}



function deleteitem(e) {
	firebase.database().ref('Tasks').child(e.id).remove();
	 e.parentNode.remove()
}


function deleteall() {
	firebase.database().ref('Tasks').remove()
    list.innerHTML = ""
}

function editbutton(e) {
	var val = prompt("Enter Updated Value", e.parentNode.firstChild.nodeValue)
	var edittodo={
		value: val,
		key:e.id
	}
	firebase.database().ref('Tasks').child(e.id).set(edittodo)
    e.parentNode.firstChild.nodeValue = val;
}