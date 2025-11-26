const SERVER_URL = "http://localhost:8080";

function getToken() {
  return localStorage.getItem("token");
}

// ---------------- LOGIN ----------------
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Attempting login with:", email, password);

  fetch(`${SERVER_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || `Login failed (${response.status})`);
      return data;
    })
    .then((data) => {
      console.log("Login success, token:", data.token);
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      window.location.href = "todos.html";
    })
    .catch((error) => {
      console.error("Login error:", error);
      alert("Error: " + error.message);
    });
}

// ---------------- REGISTER ----------------
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${SERVER_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(async (response) => {
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Registration failed");
      alert("Registration successful. Now login.");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Registration error:", error);
      alert(error.message);
    });
}

// ---------------- CREATE TODO CARD ----------------
function createTodoCard(todo) {
  const card = document.createElement("div");
  card.className = "todo-card";

  const left = document.createElement("div");
  left.style.display = "flex";
  left.style.flexDirection = "column";

  const title = document.createElement("span");
  title.textContent = todo.title;

  const date = document.createElement("small");
  date.textContent = "📅 " + todo.date;
  date.style.color = "#555";

  left.appendChild(title);
  left.appendChild(date);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.isCompleted;
  checkbox.className = "todo-checkbox";

  checkbox.addEventListener("change", () => {
    const updatedTodo = { ...todo, isCompleted: checkbox.checked };
    updateTodosStatus(updatedTodo);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.onclick = () => deleteTodo(todo.id);

  card.appendChild(checkbox);
  card.appendChild(left);
  card.appendChild(deleteBtn);

  return card;
}

// ---------------- DELETE TODO ----------------
function deleteTodo(id) {
  const token = getToken();
  fetch(`${SERVER_URL}/todo/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(async (response) => {
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Delete failed");
      loadTodos();
    })
    .catch((error) => {
      console.error("Delete error:", error);
      alert(error.message);
    });
}

// ---------------- LOAD TODOS ----------------
function loadTodos() {
  const token = getToken();
  if (!token) {
    alert("Login first");
    window.location.href = "login.html";
    return;
  }

  fetch(`${SERVER_URL}/todo/get`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(async (response) => {
      const todos = await response.json();
      if (!response.ok) throw new Error(todos.message || "Failed to get todos");
      return todos;
    })
    .then((todos) => {
      const todoList = document.getElementById("todo-list");
      todoList.innerHTML = "";
      if (!todos || todos.length === 0) {
        todoList.innerHTML = `<p id="empty-message">No todos yet</p>`;
      } else {
        todos.forEach((todo) => todoList.appendChild(createTodoCard(todo)));
      }
    })
    .catch((error) => {
      console.error("Load todos error:", error);
      const todoList = document.getElementById("todo-list");
      if (todoList)
        todoList.innerHTML = `<p id="empty-message">No todos yet</p>`;
    });
}

// ---------------- ADD TODO ----------------
function addTodos() {
  const token = getToken();
  const title = document.getElementById("new-todo").value.trim();
  const date = document.getElementById("todo-date").value;

  if (!title || !date) {
    alert("Please enter both title and date");
    return;
  }

  fetch(`${SERVER_URL}/todo/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: title,
      isCompleted: false,
      date: date,
    }),
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Add failed");
      document.getElementById("new-todo").value = "";
      document.getElementById("todo-date").value = "";
      loadTodos();
    })
    .catch((error) => alert(error.message));
}

// ---------------- UPDATE TODO ----------------
function updateTodosStatus(todo) {
  const token = getToken();
  fetch(`${SERVER_URL}/todo/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  })
    .then(async (response) => {
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Update failed");
      loadTodos();
    })
    .catch((error) => {
      console.error("Update todo error:", error);
      alert(error.message);
    });
}
