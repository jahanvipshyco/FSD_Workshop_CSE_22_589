// Q2. File Handling using fs module - Student Attendance List
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'attendance.txt');

// Ensure the file exists (create empty file if not present)
function ensureFileExists() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
  }
}

// 1. Add a student's name
function addStudent(name) {
  ensureFileExists();
  fs.appendFileSync(filePath, name + '\n');
  console.log(`Added "${name}" to attendance list.`);
}

// 2. Show all names
function showAllStudents() {
  ensureFileExists();
  const data = fs.readFileSync(filePath, 'utf8');
  const names = data.split('\n').filter(n => n.trim() !== '');
  console.log('--- Attendance List ---');
  if (names.length === 0) {
    console.log('(no students yet)');
  } else {
    names.forEach((n, i) => console.log(`${i + 1}. ${n}`));
  }
  return names;
}

// 3. Update a name (replace oldName with newName)
function updateStudent(oldName, newName) {
  ensureFileExists();
  const data = fs.readFileSync(filePath, 'utf8');
  let names = data.split('\n').filter(n => n.trim() !== '');

  const index = names.indexOf(oldName);
  if (index === -1) {
    console.log(`"${oldName}" not found in attendance list.`);
    return;
  }

  names[index] = newName;
  fs.writeFileSync(filePath, names.join('\n') + '\n');
  console.log(`Updated "${oldName}" to "${newName}".`);
}

// 4. Delete a name from the file
function deleteStudent(name) {
  ensureFileExists();
  const data = fs.readFileSync(filePath, 'utf8');
  let names = data.split('\n').filter(n => n.trim() !== '');

  const newNames = names.filter(n => n !== name);
  if (newNames.length === names.length) {
    console.log(`"${name}" not found in attendance list.`);
    return;
  }

  fs.writeFileSync(filePath, newNames.join('\n') + (newNames.length ? '\n' : ''));
  console.log(`Removed "${name}" from attendance list.`);
}

// ---- Demo usage ----
addStudent('Rahul Sharma');
addStudent('Priya Singh');
addStudent('Aman Verma');

showAllStudents();

updateStudent('Priya Singh', 'Priya Gupta');
deleteStudent('Aman Verma');

showAllStudents();

module.exports = { addStudent, showAllStudents, updateStudent, deleteStudent };
