import { readFile,writeFile } from "./readANDWrite.js";
const FILE = "/students.json";
const updateData = async() => {
    const students = await readFile(FILE);

if(students.length == 0) return;
const updatedStudents = students.map(student => 
    student.id === 2 ? {...student, ...data} : student
)
const response = await writeFile(FILE, JSON.stringify(updatedStudents));
}




















const updateStudent = async (FILE, id, updatedStudent) => {
    const students = await readFile(FILE);
    const updatedStudents = students.map(student => {
        if (student.id === id) {
            return { ...student, ...updatedStudent };
        }
        return student;
    });
    const response = await writeFile(FILE, JSON.stringify(updatedStudents, null, 2));
    console.log(response.status);
};

export { updateStudent };