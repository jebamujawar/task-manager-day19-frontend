const API = "https://task-manager-day19-backend.onrender.com";

// Load tasks
async function loadTasks() {
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
}

// Add task
async function addTask() {
    const input = document.getElementById("taskInput");
    if (!input.value) return;

    await axios.post(API, {
        title: input.value
    });

    input.value = "";
    loadTasks();
}

// Toggle complete
async function toggleTask(id, completed) {
    await axios.put(`${API}/${id}`, { completed });
    loadTasks();
}

// Delete task
async function deleteTask(id) {
    await axios.delete(`${API}/${id}`);
    loadTasks();
}

// Initial load
loadTasks();
