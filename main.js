let tasks = JSON.parse(localStorage.getItem('tasks')) || [
            { id: 1, title: 'Studies', description: 'Maths, Physics', status: 'pending' },
            { id: 2, title: 'Learn Skill', description: 'Javascript', status: 'in-progress' },
            { id: 3, title: 'Break Fast', description: 'Bread and tea', status: 'completed' }
        ];

        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function generateTaskId() {
            return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
        }


        function addtask() {
            let newTask = {
                id: generateTaskId(),
                title: document.getElementById('title').value,
                description: document.getElementById('desc').value,
                status: document.getElementById('stat').value
            };
            if (newTask.title!="" && newTask.title.length<=15 && newTask.description!="") {
            tasks.push(newTask);
            saveTasks();
            document.getElementById('addp').innerText = `Task added successfully with ID# ${newTask.id}`;
            viewall();
            resetForm('taskForm');
            }
            else{
                document.getElementById('addp').innerText = `Please do not leave any field empty and title length must be less then equal to 15`;
            }
            
        }

        function deletetask(id) {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            searchTasks();
            // viewall();
        }

        function openModal(id) {
            let task = tasks.find(task => task.id === id);
            if (task) {
                document.getElementById('uid').value = task.id;
                document.getElementById('utitle').value = task.title;
                document.getElementById('udesc').value = task.description;
                document.getElementById('ustat').value = task.status;
                document.getElementById('updateModal').classList.remove('hidden');
            }
        }

        function closeModal() {
            document.getElementById('updateModal').classList.add('hidden');
        }

        function updateTask() {

            let uid = parseInt(document.getElementById('uid').value);
            let utitle = document.getElementById('utitle').value;
            let udesc = document.getElementById('udesc').value;
            let ustat = document.getElementById('ustat').value;
            if (utitle!="" && utitle.length<=15 && udesc!="") {
                let task = tasks.find(task => task.id === uid);
            if (task) {
                task.title = utitle || task.title;
                task.description = udesc || task.description;
                task.status = ustat || task.status;
                document.getElementById('up').innerText = `Task updated successfully with ID# ${uid}`;
                saveTasks();
                closeModal();
                viewall();
            }

            }
            else{
                document.getElementById('up').innerText = `Please do not leave any field empty and title length must be less then equal to 15`;
            }

        }

        function viewall() {
            let taskTable = document.getElementById('taskTable');
            taskTable.innerHTML = '';
            tasks.forEach(task => {
                taskTable.innerHTML += `
            <tr>
                <td class="border p-2 text-center">${task.id}</td>
                <td class="border p-2">${task.title}</td>
                <td class="border p-2 max-w-xs overflow-x-auto whitespace-nowrap">${task.description}</td>
                <td class="border p-2 text-center">${task.status}</td>
                <td class="border p-2 text-center">
                    <button onclick="openModal(${task.id})" class="bg-blue-500 text-white p-2  me-2 rounded hover:bg-blue-600">Edit</button>
                    <button onclick="deletetask(${task.id})" class="bg-red-500 text-white p-2 rounded ms-2 hover:bg-red-600">Delete</button>
                </td>
            </tr>
        `;
            });
        }

        function searchTasks() {
            let query = document.getElementById('search').value.toLowerCase();
            let filteredTasks = tasks.filter(task =>
                task.title.toLowerCase().includes(query) ||
                task.description.toLowerCase().includes(query) ||
                task.status.toLowerCase().includes(query)
            );

            let taskTable = document.getElementById('taskTable');
            taskTable.innerHTML = '';
            filteredTasks.forEach(task => {
                taskTable.innerHTML += `
            <tr>
                <td class="border p-2 text-center">${task.id}</td>
                <td class="border p-2">${task.title}</td>
                <td class="border p-2 max-w-xs overflow-x-auto whitespace-nowrap">${task.description}</td>
                <td class="border p-2 text-center">${task.status}</td>
                <td class="border p-2 ">
                    <button onclick="openModal(${task.id})" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Edit</button>
                    <button onclick="deletetask(${task.id})" class="bg-red-500 text-white p-2 rounded hover:bg-red-600">Delete</button>
                </td>
            </tr>
        `;
            });
        }

        function clearSearch() {
            document.getElementById('search').value = '';
            viewall();
        }

        function resetForm(formId) {
            document.getElementById(formId).reset();
        }


        viewall();
