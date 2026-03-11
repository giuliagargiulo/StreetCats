CREATE TABLE IF NOT EXISTS tbl_user(
    uu_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_unique_uu_id UNIQUE (uu_id);
ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_unique_email UNIQUE (email);
ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_unique_username UNIQUE (username);
