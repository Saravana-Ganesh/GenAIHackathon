--Stores metadata about each sprint.

CREATE TABLE sprints (
    sprint_id SERIAL PRIMARY KEY,
    sprint_name VARCHAR(50) UNIQUE NOT NULL,
    start_date DATE,
    end_date DATE
);


--Stores module-related details.

CREATE TABLE modules (
    module_id SERIAL PRIMARY KEY,
    module_name VARCHAR(100) UNIQUE NOT NULL
);

--Stores information about developers, BAs, and QAs.

CREATE TABLE TeamMembers (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('Developer', 'BA', 'QA')) NOT NULL
);


--Stores actual vs. completed story points along with team velocity.

CREATE TABLE velocity (
    velocity_id SERIAL PRIMARY KEY,
    sprint_id INT REFERENCES sprints(sprint_id) ON DELETE CASCADE,
    module_id INT REFERENCES modules(module_id) ON DELETE CASCADE,
    developer_id INT REFERENCES TeamMembers(user_id) ON DELETE SET NULL,
    ba_id INT REFERENCES TeamMembers(user_id) ON DELETE SET NULL,
    qa_id INT REFERENCES TeamMembers(user_id) ON DELETE SET NULL,
    actual_story_points INT NOT NULL,
    completed_story_points INT NOT NULL
);

--Stores defect details per sprint and module.
CREATE TABLE defects (
    defect_id SERIAL PRIMARY KEY,
    sprint_id INT REFERENCES sprints(sprint_id) ON DELETE CASCADE,
    module_id INT REFERENCES modules(module_id) ON DELETE CASCADE,
    developer_id INT REFERENCES TeamMembers(user_id) ON DELETE SET NULL,
    qa_id INT REFERENCES TeamMembers(user_id) ON DELETE SET NULL,
    priority VARCHAR(20) CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    status VARCHAR(20) CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed')),
    root_cause_analysis VARCHAR(100),
    defect_age_days INT,
    reopened BOOLEAN DEFAULT FALSE,
    fix_time_days INT
);
