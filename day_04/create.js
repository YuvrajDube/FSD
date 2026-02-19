import { read } from "fs";
import { writeFile, readFile } from "./readANDWrite.js";

const FILE = "/students.json";
const students = [
    {
        "id": 2,
         "first_name": "colnnns",
          "last_name": "hugg",
         "email": "lscholes1@vinaora.com",
         "gender": "male"
    }];

const writeData = async(Stundent) => {
    const student = await readFile(FILE);
    let updateddata = [];

    if(student.length ==0) updateddata = [Stundent];
    else updateddata = [...student, Stundent]; 
    const response = await writeFile(FILE, JSON.stringify(updateddata, null, 2));
    console.log(response.status);
}
writeData(students);