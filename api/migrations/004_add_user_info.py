steps = [
    [
        # "Up" SQL statement
        """
        ALTER TABLE users
        ADD full_name VARCHAR(100) NOT NULL,
        ADD email VARCHAR(100) NOT NULL UNIQUE,
        ADD linkedin_url VARCHAR(150) NOT NULL;
        """,
        # "Down" SQL statement
        """
        ALTER TABLE users
        DROP COLUMN full_name,
        DROP COLUMN email,
        DROP COLUMN linkedin_url;
        """,
    ],
]
