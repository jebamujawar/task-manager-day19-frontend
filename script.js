// 🔴 Make sure to include /tasks at the end
const API = "https://task-manager-day19-backend.onrender.com/tasks";

// Load tasks
async function loadTasks() {
    try {
        const res = await axios.get(API);
        const tasks = res.data;

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
        await axios.post(API, { title: input.value });
        input.value = "";
        loadTasks();
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

// Toggle complete
async function toggleTask(id, completed) {
    try {
        await axios.put(`${API}/${id}`, { completed });
        loadTasks();
    } catch (error) {
        console.error("Error updating task:", error);
    }
}

// Delete task
async function deleteTask(id) {
    try {
        await axios.delete(`${API}/${id}`);
        loadTasks();
    } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task. Check backend.");
    }
}

// Initial load
loadTasks();
