CREATE TABLE IF NOT EXISTS tbl_cat(
    uu_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_uu_id UUID NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    picture_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE tbl_cat ADD CONSTRAINT tbl_cat_unique_uu_id UNIQUE (uu_id);
ALTER TABLE tbl_cat ADD CONSTRAINT tbl_cat_fk_user_uu_id FOREIGN KEY (user_uu_id) REFERENCES tbl_user(uu_id) ON DELETE CASCADE;

-- 1. Avvistamento a Piazza del Plebiscito
INSERT INTO tbl_cat (uu_id, user_uu_id, title, description, latitude, longitude, picture_url)
VALUES (
    '123e4567-e89b-12d3-a456-123414174022',
    '123e4567-e89b-12d3-a456-426614174022',
    'Gatto bianco e nero',
    'Un gatto bianco e nero con occhi azzurri molto socievole che gira intorno al colonnato di Piazza del Plebiscito. Sembra abituato ai turisti.',
    40.8359,
    14.2488,
    'uploads/cats/gatto_bianco_e_nero.HEIC'
);

-- -- 2. Avvistamento sul Lungomare Caracciolo (vicino Castel dell'Ovo)
-- INSERT INTO tbl_cat (user_uu_id, title, description, latitude, longitude, picture_url)
-- VALUES (
--     '123e4567-e89b-12d3-a456-426614174000',
--     'Calico sunbather a Via Partenope',
--     'Gatto calico (tricolore) che prende il sole sugli scogli sul lungomare, proprio di fronte ai ristoranti.',
--     40.8285,
--     14.2462,
--     'uploads/cats/lungomare_calico.jpg'
-- );

-- 3. Avvistamento a Spaccanapoli (Centro Storico)
INSERT INTO tbl_cat (uu_id, user_uu_id, title, description, latitude, longitude, picture_url)
VALUES (
    '123e4567-e89b-12d3-a456-123414174000',
    '123e4567-e89b-12d3-a456-426614174000',
    'Gatto grigio a pelo lungo',
    'Bellissimo gatto grigio a pelo lungo che riposa sopra una macchina sotto al mio palazzo, lo vedo spesso qui ma non so chi sia il suo padrone.',
    40.8494,
    14.2570,
    'uploads/cats/mia.HEIC'
);