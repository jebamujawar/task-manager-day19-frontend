// Correct API URL with /tasks at the end
const API = "https://task-manager-day19-backend-1.onrender.com/tasks";

// Load tasks
async function loadTasks() {
    try {
        const res = await fetch(API);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const tasks = await res.json();

        const list = document.getElementById("taskList");
        list.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");

            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">
                    ${task.title}
                </span>
                <button onclick="toggleTask('${task._id}', ${!task.completed})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onclick="deleteTask('${task._id}')">
                    Delete
                </button>
            `;

            list.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading tasks:", error);
        alert("Failed to load tasks. Check backend.");
    }
}

// Add task
async function addTask() {
    const input = document.getElementById("taskInput");
    if (!input.value.trim()) {
        alert("Please enter a task");
        return;
    }

    try {
        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: input.value })
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        input.value = "";
        loadTasks();
    } catch (error) {
        console.error("Error adding task:", error);
        alert("Failed to add task. Check backend.");
    }
}

// Toggle complete
async function toggleTask(id, completed) {
    try {
        const res = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed })
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        loadTasks();
    } catch (error) {
        console.error("Error updating task:", error);
        alert("Failed to update task. Check backend.");
    }
}

// Delete task
async function deleteTask(id) {
    try {
        const res = await fetch(`${API}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        loadTasks();
    } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task. Check backend.");
    }
}

// Initial load
loadTasks();
