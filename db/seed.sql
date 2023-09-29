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

INSERT INTO employee (first_name, last_name, manager, role_id) VALUES
('Beth', 'Betherson', true, 1),
('Ben', 'Franklin', false, 1),
('George', 'Lucis', false, 2),
('Martha', 'Sewart', true, 2),
('Justin',' Moore', false, 3),
('Maya', 'TheDog', True, 3),
('George', 'Washington', True, 4),
('Steve', 'Martin', False, 4),
('Patirk', 'Star', True, 5),
('Cat', 'Dog', false, 6),
