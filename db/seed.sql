USE employee_db;

INSERT INTO department (name,) VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Intern'),
    ('Janitorial');

INSERT INTO role_info (title, salary, department_id) VALUES
    ('Salesperson', 80000, 1),
    ('Engineer', 10000, 2),
    ('Lead Engineer', 150000, 2),
    ('Accountant', 80000, 3),
    ('Head Accountant', 120000, 3),
    ('Account Manager', 90000, 1),
    ('Laywer', 90000, 4),
    ('Lead Laywer', 150000, 4),
    ('Intern', 10, 5),
    ('Janitor', 200000, 6);

INSERT INTO employee (first_name, last_name, manager, role_id, manager_id) VALUES
('Beth', 'Betherson', true, 1, null),
('Patirk', 'Star', true, 5, null),
('Martha', 'Sewart', true, 2, null),
('Maya', 'TheDog', true, 3, null),
('George', 'Washington', true, 4, null),
('Ben', 'Franklin', false, 1, 1),
('George', 'Lucis', false, 2, 3),
('Justin',' Moore', false, 3, 4),
('Steve', 'Martin', False, 4, 5),
('Cat', 'Dog', false, 6, 5);
