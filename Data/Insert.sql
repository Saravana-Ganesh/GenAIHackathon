INSERT INTO sprints (sprint_name, start_date, end_date) VALUES
('Sprint 1', '2024-01-01', '2024-01-15'),
('Sprint 2', '2024-01-16', '2024-01-31'),
('Sprint 3', '2024-02-01', '2024-02-15');



INSERT INTO modules (module_name) VALUES
('Authentication'),
('Billing'),
('Payments'),
('Notifications'),
('Reports'),
('Dashboard');


INSERT INTO TeamMembers (name, role) VALUES
('Alice', 'Developer'),
('Bob', 'Developer'),
('Charlie', 'Developer'),
('David', 'Developer'),
('Eve', 'Developer'),
('Frank', 'Developer'),
('QA1', 'QA'),
('QA2', 'QA'),
('QA3', 'QA'),
('QA4', 'QA'),
('QA5', 'QA'),
('BA1', 'BA'),
('BA2', 'BA'),
('BA3', 'BA');


INSERT INTO velocity (sprint_id, module_id, developer_id, ba_id, qa_id, actual_story_points, completed_story_points) VALUES
(1, 1, 1, 12, 7, 40, 35),
(1, 2, 2, 12, 8, 30, 25),
(1, 3, 3, 13, 9, 25, 20),
(1, 4, 4, 13, 10, 50, 45),
(1, 5, 5, 14, 7, 35, 30),
(1, 6, 6, 14, 8, 45, 40),
(2, 1, 1, 12, 9, 38, 30),
(2, 2, 2, 12, 10, 32, 28),
(2, 3, 3, 13, 7, 20, 15);



INSERT INTO defects (sprint_id, module_id, developer_id, qa_id, priority, status, root_cause_analysis, defect_age_days, reopened, fix_time_days) VALUES
(1, 1, 1, 7, 'High', 'Resolved', 'Code Issue', 5, FALSE, 3),
(1, 2, 2, 8, 'Medium', 'Closed', 'Requirement Gap', 7, TRUE, 4),
(1, 3, 3, 9, 'Critical', 'In Progress', 'Environment Issue', 10, FALSE, 6),
(1, 4, 4, 10, 'Low', 'Open', 'Test Coverage Miss', 3, FALSE, 2),
(2, 1, 1, 7, 'High', 'Resolved', 'Code Issue', 4, TRUE, 5),
(2, 2, 2, 8, 'Medium', 'Closed', 'Requirement Gap', 6, FALSE, 3),
(2, 3, 3, 9, 'Critical', 'Open', 'Environment Issue', 12, FALSE, 7);


--If you want to get the team velocity per sprint, run:

SELECT sprint_id, SUM(completed_story_points) AS team_velocity
FROM velocity
GROUP BY sprint_id
ORDER BY sprint_id;
