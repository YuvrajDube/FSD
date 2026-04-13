const form = document.getElementById('student-form');
const studentIdInput = document.getElementById('student-id');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const courseInput = document.getElementById('course');
const status = document.getElementById('status');
const studentsList = document.getElementById('students-list');
const refreshBtn = document.getElementById('refresh-btn');
const cancelEditBtn = document.getElementById('cancel-edit');

function setStatus(message, tone = 'info') {
  status.textContent = message;
  status.style.color = tone === 'error' ? '#fca5a5' : tone === 'success' ? '#86efac' : 'rgba(238, 242, 255, 0.75)';
}

function resetForm() {
  form.reset();
  studentIdInput.value = '';
  cancelEditBtn.classList.add('hidden');
  form.querySelector('button[type="submit"]').textContent = 'Save Student';
}

function toStudentPayload() {
  return {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    age: Number(ageInput.value),
    course: courseInput.value.trim()
  };
}

async function loadStudents() {
  studentsList.innerHTML = '<div class="empty">Loading students...</div>';

  try {
    const response = await fetch('/api/students');
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to load students');
    }

    const students = result.data || [];
    if (!students.length) {
      studentsList.innerHTML = '<div class="empty">No students yet. Add the first one above.</div>';
      return;
    }

    studentsList.innerHTML = students
      .map(
        (student) => `
          <article class="card">
            <div class="card-top">
              <div>
                <h3>${student.name}</h3>
                <p class="meta">${student.email}</p>
              </div>
              <span class="badge">${student.course}</span>
            </div>
            <div class="badges">
              <span class="badge">Age: ${student.age}</span>
              <span class="badge">ID: ${student._id.slice(-6)}</span>
            </div>
            <div class="card-actions">
              <button class="edit" data-action="edit" data-id="${student._id}">Edit</button>
              <button class="delete" data-action="delete" data-id="${student._id}">Delete</button>
            </div>
          </article>
        `
      )
      .join('');

    setStatus(`Loaded ${students.length} student${students.length === 1 ? '' : 's'}.`);
  } catch (error) {
    studentsList.innerHTML = '<div class="empty">Could not load students.</div>';
    setStatus(error.message, 'error');
  }
}

async function getStudent(id) {
  const response = await fetch(`/api/students/${id}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch student');
  }

  return result.data;
}

async function deleteStudent(id) {
  const response = await fetch(`/api/students/${id}`, {
    method: 'DELETE'
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to delete student');
  }

  return result;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = toStudentPayload();
  const id = studentIdInput.value;
  const method = id ? 'PUT' : 'POST';
  const endpoint = id ? `/api/students/${id}` : '/api/students';

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || 'Request failed');
    }

    setStatus(result.message || 'Saved successfully', 'success');
    resetForm();
    await loadStudents();
  } catch (error) {
    setStatus(error.message, 'error');
  }
});

studentsList.addEventListener('click', async (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) {
    return;
  }

  const { action, id } = button.dataset;

  try {
    if (action === 'edit') {
      const student = await getStudent(id);
      studentIdInput.value = student._id;
      nameInput.value = student.name;
      emailInput.value = student.email;
      ageInput.value = student.age;
      courseInput.value = student.course;
      cancelEditBtn.classList.remove('hidden');
      form.querySelector('button[type="submit"]').textContent = 'Update Student';
      setStatus('Editing student record.');
    }

    if (action === 'delete') {
      if (!window.confirm('Delete this student?')) {
        return;
      }

      await deleteStudent(id);
      setStatus('Student deleted successfully.', 'success');
      if (studentIdInput.value === id) {
        resetForm();
      }
      await loadStudents();
    }
  } catch (error) {
    setStatus(error.message, 'error');
  }
});

refreshBtn.addEventListener('click', loadStudents);
cancelEditBtn.addEventListener('click', () => {
  resetForm();
  setStatus('Edit cancelled.');
});

loadStudents();
