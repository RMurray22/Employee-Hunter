const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "employees_db",
});

db.connect(function (err) {
  if (err) throw err;
  console.log(`Connected to Database`);
  menu();
});

function menu() {
  inquirer
    .prompt({
      type: "list",
      name: "menu_select",
      message: "Please select an option",
      choices: [
        "VIEW Departments",
        "VIEW all Roles",
        "VIEW all Employees",
        "ADD a Department",
        "ADD a Role",
        "ADD an Employee",
        "UPDATE an Employee Role",
        "UPDATE Manager of Employee",
        "DELETE Options",
      ],
    })
    .then(function (answers) {
      switch (answers.menu_select) {
        case "VIEW Departments":
          viewDepartments();
          break;
        case "VIEW all Roles":
          viewRoles();
          break;
        case "VIEW all Employees":
          viewEmployees();
          break;
        case "ADD a Department":
          addDepartment();
          break;
        case "ADD a Role":
          addRole();
          break;
        case "ADD an Employee":
          addEmployee();
          break;
        case "UPDATE an Employee Role":
          updateEmployeeRole();
          break;
        case "DELETE Options":
          deleteOptions();
          break;
        case "UPDATE Manager of Employee":
          updateManager();
          break;
      }
    });
}

function viewDepartments() {
  console.log("Directory of Departments");
  const query = "SELECT * FROM department";
  db.query(query, function (err, res) {
    console.table(res);
    menu();
  });
}

function viewEmployees() {
  console.log("Current Employees");
  query = "SELECT * FROM employee;";
  db.query(query, function (err, res) {
    console.table(res);
    menu();
  });
}

function viewRoles() {
  console.log("List of Employee roles");
  db.query("SELECT * FROM role", (err, res) => {
    console.table(res);
    menu();
  });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "department_name",
      message: "What is the name of the department?",
    })
    .then((res) => {
      db.query(
        "INSERT INTO department SET ?",
        { name: res.department_name },
        (err, res) => {
          if (err) throw err;
          console.log(`successfully added to departments!`);
          menu();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter role title",
        name: "role",
      },
      {
        type: "number",
        message: "Please enter a Salary",
        name: "salary",
      },
      {
        type: "number",
        message: "Please enter the department's ID number",
        name: "departmentid",
      },
    ])
    .then((res) => {
      db.query(
        "INSERT INTO role (title, salary, department_id) values (?,?,?)",
        [res.role, res.salary, res.departmentid],
        (err, res) => {
          if (err) throw err;
          console.log("Role added");
          menu();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input:",
        name: "firstName",
        message: "Please enter employee's first name",
      },
      {
        type: "input:",
        name: "lastName",
        message: "Please enter employee's last name",
      },
      {
        type: "number",
        name: "roleid",
        message: "What is the employee's ID?",
      },
      {
        type: "number",
        name: "managerid",
        message: "what is the ID of the employee's manager?",
      },
    ])
    .then((res) => {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)",
        [res.firstName, res.lastName, res.roleid, res.managerid],
        (err, res) => {
          if (err) throw err;
          console.log("Employee added");
          menu();
        }
      );
    });
}

function updateEmployeeRole() {
  db.query("SELECT * FROM employee", (err, res) => {
    console.table(res);
  });
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "Please enter the employee's ID number that you wish to update",
        name: "employee_id",
      },
      {
        type: "number",
        message: "Please enter their new ID number",
        name: "roleId",
      },
    ])
    .then((res) => {
      db.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [res.roleId, res.employee_id],
        (err, res) => {
          if (err) throw err;
          console.log("Employee's Role updated");
          menu();
        }
      );
    });
}

function updateManager() {
  db.query("SELECT * FROM employee", (err, res) => {
    console.table(res);
  });
  inquirer
    .prompt([
      {
        type: "number",
        message: "Please select any employee number to update their manager",
        name: "employeeId",
      },
      {
        type: "number",
        message: "Please type new manager ID number",
        name: "managerId",
      },
    ])
    .then((res) => {
      db.query(
        "UPDATE employee SET manager_id = ? WHERE id = ?",
        [res.managerId, res.employeeId],
        (err, res) => {
          if (err) throw err;
          console.log("\n Manger for selected Employee has been updated \n");
          menu();
        }
      );
    });
}

function deleteOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please choose a catagory in which you would like to delete",
        choices: ["Department", "Roles", "Employee"],
        name: "delete_choice",
      },
    ])
    .then((res) => {
      if (res.delete_choice === "Employee") {
        db.query("SELECT * FROM employee", (err, res) => {
          console.table(res);
          inquirer
            .prompt([
              {
                type: "number",
                message: "Please input ID number you wish to delete.",
                name: "id_choice",
              },
            ])
            .then((res) => {
              db.query(
                "DELETE FROM employee Where id = ?",
                res.id_choice,
                (err, res) => {
                  if (err) throw err;
                  console.log("Employee Deleted");
                  menu();
                }
              );
            });
        });
      }
      if (res.delete_choice === "Roles") {
        db.query("SELECT * FROM role", (err, res) => {
          console.table(res);
          inquirer
            .prompt([
              {
                type: "number",
                message: "Please input ID number you wish to delete.",
                name: "id_choice",
              },
            ])
            .then((res) => {
              db.query(
                "DELETE FROM role Where id = ?",
                res.id_choice,
                (err, res) => {
                  if (err) throw err;
                  console.log("Role Deleted");
                  menu();
                }
              );
            });
        });
      }
      if (res.delete_choice === "Department") {
        db.query("SELECT * FROM department", (err, res) => {
          console.table(res);
          inquirer
            .prompt([
              {
                type: "number",
                message: "Please input ID number you wish to delete.",
                name: "id_choice",
              },
            ])
            .then((res) => {
              db.query(
                "DELETE FROM department Where id = ?",
                res.id_choice,
                (err, res) => {
                  if (err) throw err;
                  console.log("Department deleted");
                  menu();
                }
              );
            });
        });
      }
    });
}
