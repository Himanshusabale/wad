// Create a backend application for managing employee records.
// Perform the following tasks using Node.js, Express.js, and MongoDB.
// The following operations should be performed in Node.js and Express.js
// only:
// • Add a new employee (name, department, designation, salary, joining
// date)
// • View all employee records
// • Update an existing employee’s details
// • Delete an employee record
// C20 Design and develop Student Management System using Salesforce Cloud.

const mongoose = require('mongoose')
const express = require('express')
const Employee = require('./models/employee')

const app = express();
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/employees').then(() => console.log("Connected")).catch(console.error)

const initialEmployee = async () => {
    const total = await Employee.countDocuments();
    const employees = [{ name: 'Amit Sharma', department: 'Engineering', designation: 'Software Developer', salary: 75000, doj: new Date('2022-03-15') }, { name: 'Priya Desai', department: 'Human Resources', designation: 'HR Manager', salary: 68000, doj: '2021-07-01' }, { name: 'Raj Mehta', department: 'Finance', designation: 'Accountant', salary: 60000, doj: new Date('2023-01-10') }, { name: 'Sneha Patel', department: 'Marketing', designation: 'Digital Marketer', salary: 55000, doj: new Date('2022-11-05') }, { name: 'Vikram Reddy', department: 'Engineering', designation: 'DevOps Engineer', salary: 80000, doj: new Date('2023-06-20') }];
    if (total === 0) {
        await Employee.insertMany(employees)
    }

}
initialEmployee()

app.get('/', async (req, res) => {
    const employee = await Employee.find();
    const total = await Employee.countDocuments();

    // console.log(employee); 
    res.render('index', { total, employee })
})

app.post('/create', async (req, res) => {
    await Employee.create(req.body);
    res.redirect('/')
})

app.get('/delete/:name', async (req, res) => {
    const name = req.params.name;
    await Employee.deleteOne({name:name})
    res.redirect('/')
})

app.get('/update/:name', async (req, res) => {
    const employeeName = req.params.name;
    const employee = await Employee.findOne({ name: employeeName });

    if (!employee) {
        return res.status(404).send("Employee not found");
    }

    res.render('update-form', { employee });
});

app.post('/update/:id', async (req, res) => {
    const employeeId = req.params.id;
    await Employee.findByIdAndUpdate(employeeId, req.body);
    res.redirect('/');
});

  
app.listen(3000, () => {
    console.log("Listening at http://localhost:3000")
})