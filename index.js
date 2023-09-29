const mysql = require("mysql2");
const inquire = require("inquirer");

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "roo1234",
    database: "employee_db",
  },
  console.log("Connected to the employee_db.")
);

function dbQuery(view) {
  let dbQuery = `${view}`;

  db.query(`SELECT * FROM ${view}`, function (err, results) {
    console.table(results);
  });
}
//TODO function to add department

function depAdd(eDepAdd) {
  // let depName = `${eDepAdd}`;
  if (eDepAdd !== 0) {
    db.query(`INSERT INTO department (name) VALUES ("${eDepAdd}");`);
  }
}
// // TODO function to add role

function roleAdd(answers) {
  const { eRoleAddName, eRoleAddSalary, eRoleAddDep } = answers;

  // let roleName = `${eRoleAddName}`;
  // let roleSalary = `${eRoleAddSalary}`;
  // let depID = `${eRoleAddDep}`;

  db.query(
    `INSERT INTO role_info (title, salary, department_id) VALUES ("${eRoleAddName}", "${eRoleAddSalary}", "${eRoleAddDep}");`
  );
}
// // TODO function to inport values to add employee

function addEmp(answers) {
  const { first_name, last_name, manager, role_id } = answers;

  db.query(
    `INSERT INTO employee (first_name, last_name, manager, role_id) VALUES ("${first_name}", "${last_name}", ${manager}, ${role_id});`
  );
}
//function to que this query for View Roles

function viewRole() {
  db.query(
    "SELECT * FROM role_info JOIN department ON role_info.department_id = department.id",
    function (err, results) {
      console.table(results);
    }
  );
}

// db.query("SELECT * FROM role_info JOIN department ON role_info.department_id = department.id", function (err, results) {
//     console.table(results);
// });

function viewEmp() {
  db.query; // JUSTIN MUST HELP HERE
}
const menuQ = [
  {
    name: "menu",
    type: "list",
    message: "What would you like to do today?",
    choices: ["View Departments", "Edit Databases"],
  },
  {
    name: "view",
    type: "list",
    message: "What would you like view?",
    choices: ["department", "role_info", "employee"],
    when: (answer) => answer.menu === "View Departments",
  },
  {
    name: "editIndex",
    type: "list",
    message: "What would you like to edit?",
    choices: ["Departments", "Roles", "Employees"],
    when: (answer) => answer.menu === "Edit Databases",
  },
  {
    name: "eDep",
    type: "list",
    message: "What would you like to do?",
    choices: ["Add Department", "Delete Department"],
    when: (answer) => answer.editIndex === "Departments",
  },
  {
    name: "eDepAdd",
    type: "input",
    message: "What would you like to name this new department?",
    when: (answer) => answer.eDep === "Add Department",
  },
  {
    name: "eRole",
    type: "list",
    message: "What would you like to do?",
    choices: ["Add Role", "Delete Role"],
    when: (answer) => answer.editIndex === "Roles",
  },
  {
    name: "eRoleAddName",
    type: "input",
    message: "What would you like to name this role?",
    when: (answer) => answer.eRole === "Add Role",
  },
  {
    name: "eRoleAddSalary",
    type: "input",
    message: "What is the role salary?",
    when: (answer) => answer.eRole === "Add Role",
  },
  {
    name: "eRoleAddDep",
    type: "input",
    message: "Enter department id for the role",
    when: (answer) => answer.eRole === "Add Role",
  },
  {
    name: "eEmployees",
    type: "list",
    message: "What would you like to do",
    choices: ["Add Employee", "Delete Employee"],
    when: (answer) => answer.editIndex === "Employees",
  },
  {
    name: "first_name",
    type: "input",
    message: "employee first name",
    when: (answer) => answer.editIndex === "Employees",
  },
  {
    name: "last_name",
    type: "input",
    message: "employee last name",
    when: (answer) => answer.editIndex === "Employees",
  },
  {
    name: "role_id",
    type: "input",
    message: "role id?",
    when: (answer) => answer.editIndex === "Employees",
  },
  {
    name: "manager",
    type: "list",
    message: "are they a manager?",
    choices: ["true", "false"],
    when: (answer) => answer.editIndex === "Employees",
  },
];

function interface() {
  inquire.prompt(menuQ).then((answers) => {
    console.log(answers);

    const {
      menu,
      view,
      eDepAdd,
      eRoleAddName,
      eEmployees,
      first_name,
      last_name,
      role_id,
      manager,
    } = answers;
    console.log(
      menu,
      view,
      eDepAdd,
      eRoleAddName,
      eEmployees,
      first_name,
      last_name,
      role_id,
      manager
    );

    if (view === "department") {
      dbQuery(view);
    } else if (view === "role_info") {
      viewRole();
    } else if (view === "employees") {
      viewEmp();
    }

    if (eDepAdd) {
      depAdd(eDepAdd);
    }

    if (eRoleAddName) {
      roleAdd(answers);
    }

    if (eEmployees) {
      addEmp(answers);
      console.log(answers);
      console.log(eEmployees);
    }
  });
}

interface();
