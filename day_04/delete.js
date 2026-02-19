import{readFile, WriteFile} from "./readANDWrite.js";
const FILE = "/students.json"; 

const deleteData = async(id) => {
    const students = await readFile(FILE);
    
    if(students.length == 0) return;

    const student = students.filter(student => student.id === id);
    if(student.length == 0) return;

    const updatedStudents = students.filter(student => student.id !== id);
    const response = await WriteFile(FILE, JSON.stringify(updatedStudents, null, 2));
    console.log(response.status);
    

}

deleteData(2);