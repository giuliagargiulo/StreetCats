CREATE TABLE IF NOT EXISTS tbl_user(
    uu_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_unique_uu_id UNIQUE (uu_id);
ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_unique_email UNIQUE (email);
ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_unique_username UNIQUE (username);


INSERT INTO tbl_user(uu_id, username, email, password) VALUES
-- (giulia28, giuliagargiulo@mail.com, password1),
('123e4567-e89b-12d3-a456-426614174000', 'maria70', 'mariagargiulo@mail.com', 'password2'),
('123e4567-e89b-12d3-a456-426614174022', 'antonio98', 'antoniogargiulo@mail.com', 'password3');
-- (ale222, alegargiulo@mail.com, password4);
 