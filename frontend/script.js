const api = "http://localhost:3000";

// Load data
function loadStudents() {
    fetch(`${api}/student`)
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("list");
        list.innerHTML = "";

        data.forEach(s => {
            list.innerHTML += `
         
            <tr>
            <td>${s.name}</td>
            <td>${s.percentage}</td>
            <td>${s.course}</td>
            <td>
     <button class="editbtn" onclick="editStudent(${s.id}, '${s.name}', '${s.percentage}', '${s.course}')">Edit</button>
                        <button class="deletebtn" onclick="deleteStudent(${s.id})">Delete</button>

           </td>
           </tr>                     
            `;
        });
              
    })
     
}
// Add
function addStudent() {
    const name = document.getElementById("name").value;
    const percentage = document.getElementById("percentage").value;
    const course = document.getElementById("course").value;

    fetch(`${api}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, percentage,course })
    }).then(() => loadStudents());
}

// Delete
function deleteStudent(id) {
    fetch(`${api}/delete/${id}`, {
        method: "DELETE"
    }).then(() => loadStudents());
}

function editStudent(id, name, percentage, course) {
    // Fill input fields with selected student data
    document.getElementById("name").value = name;
    document.getElementById("percentage").value = percentage;
    document.getElementById("course").value = course;

    // Change button to update
    const btn = document.getElementById("submitBtn");
    btn.innerText = "Update";

    // Change button action
    btn.onclick = function () {
        updateStudent(id);
    };
}
function updateStudent(id) {
    const name = document.getElementById("name").value;
    const percentage = document.getElementById("percentage").value;
    const course = document.getElementById("course").value;

    fetch(`${api}/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, percentage, course })
    })
    .then(() => {
        loadStudents();

        // Reset button back to Add
        const btn = document.getElementById("submitBtn");
        btn.innerText = "Add";
        btn.onclick = addStudent;
    });
}
// Initial load
loadStudents();
