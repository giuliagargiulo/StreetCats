CREATE TABLE IF NOT EXISTS tbl_cat(
    uu_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_uu_id UUID NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location JSON NOT NULL,
    picture_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE tbl_cat ADD CONSTRAINT tbl_cat_unique_uu_id UNIQUE (uu_id);
ALTER TABLE tbl_cat ADD CONSTRAINT tbl_cat_fk_user_uu_id FOREIGN KEY (user_uu_id) REFERENCES tbl_user(uu_id) ON DELETE CASCADE;

