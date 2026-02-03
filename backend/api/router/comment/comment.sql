CREATE TABLE tbl_comment(
    uu_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cat_uu_id UUID NOT NULL,
    user_uu_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
)

ALTER TABLE tbl_comment ADD CONSTRAINT tbl_comment_unique_uu_id UNIQUE (uu_id);
ALTER TABLE tbl_comment ADD CONSTRAINT tbl_comment_fk_cat_uu_id FOREIGN KEY (cat_uu_id) REFERENCES tbl_cat(uu_id) ON DELETE CASCADE;
ALTER TABLE tbl_comment ADD CONSTRAINT tbl_comment_fk_user_uu_id FOREIGN KEY (user_uu_id) REFERENCES tbl_user(uu_id) ON DELETE CASCADE;
