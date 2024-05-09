steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE applications (
            id SERIAL PRIMARY KEY NOT NULL,
            applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            applicant_id INTEGER NOT NULL REFERENCES users(id)
              ON DELETE CASCADE,
            job_id INTEGER NOT NULL REFERENCES jobs(id)
              ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE applications;
        """,
    ],
]
