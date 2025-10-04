/// Initialize an empty array to store todo items
let todos = [];
let filterOption = "all"; 

// Update real-time clock
function updateClock() {
    const now = new Date(); 
            
    // Format time (HH:MM:SS)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
            
    // Format date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
            
    // Update display
    const datetimeElement = document.getElementById('current-datetime');
    datetimeElement.innerHTML = `
        <div class="time">${timeString}</div>
        <div class="date">${dateString}</div>
    `;
}

// Initialize clock and update every second
updateClock();
setInterval(updateClock, 1000);

function addTodo() {
    /// Get input values
    const todoInput = document.getElementById("todo-input");
    const todoDate = document.getElementById("todo-date");
    const todoTime = document.getElementById("todo-time");
    
    /// Validate input
    if (validateInput(todoInput.value, todoDate.value, todoTime.value)) {
        /// Add new todo to the array
        let todo = { 
            task: todoInput.value, 
            date: todoDate.value, 
            time: todoTime.value,
            id: Date.now() 
        };
        todos.push(todo);
        
        /// Clear inputs
        todoInput.value = '';
        todoDate.value = '';
        todoTime.value = '';

        /// Render the updated todo list
        renderTodo();
    }
}

function renderTodo() {
    /// Get the todo list container
    const todoList = document.getElementById("todo-list");
    const todoCount = document.getElementById("todo-count");
    
    /// Update counter
    todoCount.textContent = todos.length;
    
    /// Clear existing list
    todoList.innerHTML = '';
    
    /// Filter todos
    const filteredTodos = getFilteredTodos();

    /// Check if empty
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<div class="empty-state"><p>No todos found!</p></div>';
        return;
    }

    /// Render each todo item
    filteredTodos.forEach((todo) => { 
        todoList.innerHTML += `<li>
            <div class="todo-content">
                <p>${todo.task}</p>
                <p>Due Date: ${todo.date}</p>
                <p>Due Time: ${todo.time}</p>
            </div>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        </li>`;
    });
}

function deleteTodo(id) {
    /// Remove todo by ID
    todos = todos.filter(todo => todo.id !== id); // FIXED: gunakan ID bukan index
    /// Render the updated todo list
    renderTodo();
}

function deleteAllTodo() {
    if (todos.length === 0) {
        alert("No todos to delete!");
        return;
    }
            
    if (confirm("Are you sure you want to delete all todos?")) {
        todos = [];
        renderTodo();
    }
}

function filterTodo() {
    const choice = prompt("Filter: type 'all', 'today', or 'upcoming'");
    if (choice === "all" || choice === "today" || choice === "upcoming") {
        filterOption = choice;
        renderTodo();
    } else if (choice !== null) {
        alert("Invalid choice. Use 'all', 'today', or 'upcoming'.");
    }
}

function getFilteredTodos() {
    if (filterOption === "all") return todos;

    const today = new Date().toISOString().split("T")[0];

    if (filterOption === "today") {
        return todos.filter(todo => todo.date === today);
    }
    if (filterOption === "upcoming") {
        return todos.filter(todo => todo.date > today);
    }

    return todos;
}

/// Validate input fields
function validateInput(todo, date, time) {
    /// Check if fields are empty
    if (todo === '' || date === '' || time === '') { 
        /// Show an alert if validation fails
        alert("Please fill in all fields");
        return false;
    }
    /// Input is valid
    return true;
}