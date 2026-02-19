import fs from "fs/promises";

export const readFile =async(FILE)=>{
try{
        const data = await fs.readFile(FILE, "utf-8");
        return JSON.parse(data);
    }catch (error){
    console.log("unable to read data.", error);
    }
}
readFile("/students.json").then((data)=>{
    console.log("Data read successfully:", data);
}).catch((error)=>{
    console.log("Error reading data:", error);
});
const writeFile =async(FILE, data) => {
    let status = 0;
    let message = "";
    try{
        await fs.writeFile(FILE, data);
        console.log("Data written successfully.");
        status = 200;
        message = "Data written successfully.";
    }catch(error){
        console.log("Error writing data:", error);
        status = 500;
        message = "Error writing data.";
    }
    return { status, message };
}