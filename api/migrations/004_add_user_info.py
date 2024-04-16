steps = [
    [
        # "Up" SQL statement
        """
        ALTER TABLE users
        ADD full_name VARCHAR(100) NOT NULL,
        ADD email VARCHAR(100) NOT NULL UNIQUE,
        ADD linkedin_url VARCHAR(150) NOT NULL,
        DROP COLUMN username;
        """,
        # "Down" SQL statement
        """
        DROP COLUMN full_name,
        DROP COLUMN email,
        DROP COLUMN linkedin_url,
        ADD username VARCHAR(100) NOT NULL UNIQUE;
        """
    ],
]
