CREATE TABLE IF NOT EXISTS tbl_comment(
    uu_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cat_uu_id UUID NOT NULL,
    user_uu_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE tbl_comment ADD CONSTRAINT tbl_comment_unique_uu_id UNIQUE (uu_id);
ALTER TABLE tbl_comment ADD CONSTRAINT tbl_comment_fk_cat_uu_id FOREIGN KEY (cat_uu_id) REFERENCES tbl_cat(uu_id) ON DELETE CASCADE;
ALTER TABLE tbl_comment ADD CONSTRAINT tbl_comment_fk_user_uu_id FOREIGN KEY (user_uu_id) REFERENCES tbl_user(uu_id) ON DELETE CASCADE;


INSERT INTO tbl_comment(cat_uu_id, user_uu_id, content) VALUES (
    '123e4567-e89b-12d3-a456-123414174022', -- gatto bianco e nero, postato da antonio
    '123e4567-e89b-12d3-a456-426614174000', -- commento lasciato da maria
    'Credo sia il mio gatto! Non torna a casa da 3 giorni.'
);

INSERT INTO tbl_comment(cat_uu_id, user_uu_id, content) VALUES (
    '123e4567-e89b-12d3-a456-123414174000', -- mia, postata da maria
    '123e4567-e89b-12d3-a456-426614174022', -- commento lasciato da antonio
    'Che carino! Anche io vivo nelle vicinanze e ho visto questo gatto per il quartiere.'
);