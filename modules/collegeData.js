var fs = require('fs');

class Data {
    constructor(students,courses){
        this.students = students;
        this.courses = courses;
    }
}

var dataCollection = null;

function initialize() {

    return new Promise( (resolve, reject) => {
        fs.readFile('./data/students.json','utf8', (err, studentFile) => {
            if (err) {
                reject("unable to read student file"); return;
            }

            fs.readFile('./data/courses.json','utf8', (err, courseFile) => {
                if (err) {
                    reject("unable to read course file"); return;
                }
                dataCollection = new Data(JSON.parse(studentFile), JSON.parse(courseFile));
                resolve()
            });
        });
    });
}


function getAllStudents() {

    return new Promise((resolve,reject) => {

        var studentData = dataCollection.students

        if(studentData.length == 0){
            reject('no results returned')
        }
        else {
            resolve(studentData)
        }
                
    })

}

function getTAs() {

    return new Promise((resolve,reject) =>{

        var taList = []
        var studentData = dataCollection.students

        for(let i =0; i < studentData.length; i++ ){
            if(studentData[i].TA == true){
                taList.push(studentData[i])
            }

        }
        
        if (taList.length == 0){
            reject('no results returned')
        }
        else {
            resolve(taList)
        }

    })
}

function getCourses() {

    return new Promise((resolve,reject) =>{
        var courseData = dataCollection.courses

        if (courseData.length == 0){
            reject('no results returned')
        }
        else {
            resolve(courseData)
        }

    })

}

function getStudentsByCourse(course) {

    return new Promise((resolve,reject) =>{

        var stuList = []
        var studentData = dataCollection.students

        for(let i =0; i < studentData.length; i++ ){
            if(studentData[i].course == course){
                stuList.push(studentData[i])
            }

        }
        
        if (stuList.length == 0){
            reject('no results returned')
        }
        else {
            resolve(stuList)
        }

    })
}

function getStudentByNum(num) {

    return new Promise((resolve,reject) =>{

        var stuName
        var studentData = dataCollection.students

        for(let i =0; i < studentData.length; i++ ){
            if(studentData[i].studentNum == num){
                stuName = studentData[i].firstName+" "+studentData[i].lastName     
            }

        }
         
        if (stuName == null){
            reject('no results returned')
        }
        else {
            resolve(stuName)
        }

    })
}

function addStudent(studentData){
    return new Promise((resolve,reject) =>{
        var studentDataFile = dataCollection.students;
        let newStudent;
        if (studentData.TA) {
            newStudent={
            ...studentData,
            TA: true,
            studentNum: studentDataFile.length + 1,
        };
    }else{
        newStudent={
            ...studentData,
            TA: false,
            studentNum: studentDataFile.length + 1,
    };
}
dataCollection.students.push(newStudent);

if (studentDataFile.length != 0){
    resolve(newStudent);

}else{
    reject("no results returned");
}

    });
}


module.exports = {initialize,getAllStudents,getTAs,getCourses,getStudentsByCourse,getStudentByNum,addStudent}
