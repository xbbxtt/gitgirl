steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE jobs (
            id SERIAL PRIMARY KEY NOT NULL,
            image_url VARCHAR(250) NOT NULL,
            position_title VARCHAR(250) NOT NULL,
            company_name VARCHAR(250) NOT NULL,
            job_description TEXT,
            creator_id INTEGER NOT NULL REFERENCES users(id)
              ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE jobs;
        """
    ],
]
