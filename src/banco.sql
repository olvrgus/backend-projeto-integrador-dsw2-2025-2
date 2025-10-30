-- Remover tabelas existentes para evitar erros de "já existe"
-- A ordem é importante devido à chave estrangeira
DROP TABLE IF EXISTS "discos";
DROP TABLE IF EXISTS "usuarios";

-- USUARIOS
-- Recriar as tabelas com a mesma estrutura
CREATE TABLE "usuarios" (
    "id" SERIAL PRIMARY KEY,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "senha_hash" VARCHAR(255) NOT NULL,
    "papel" SMALLINT NOT NULL CHECK ("papel" IN (0,1)),
    "data_criacao" TIMESTAMP DEFAULT NOW(),
    "data_atualizacao" TIMESTAMP DEFAULT NOW()
);

-- DISCOS
CREATE TABLE "discos" (
    "id" SERIAL PRIMARY KEY,
    "usuarios_id" INTEGER NOT NULL REFERENCES "usuarios"("id"),
    "artista" VARCHAR(255) NOT NULL,
    "genero" VARCHAR(255) NOT NULL,
    "album" VARCHAR(255) NOT NULL,
    "preco" DECIMAL(10, 2) NOT NULL,
    "url_imagem" VARCHAR(255),
    "descricao" TEXT NOT NULL,
    "faixas" TEXT NOT NULL,
    "data_criacao" TIMESTAMP NOT NULL DEFAULT NOW(),
    "data_atualizacao" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Inserir dados de exemplo na tabela 'usuarios'
INSERT INTO "usuarios" ("nome", "email", "senha_hash", "papel") VALUES
('Ana Souza', 'ana@exemplo.com', '$2a$10$Abcdefghi.Jklmnopqrstuvwxyz1234567890', 0),
('Carlos Rodrigues', 'carlos@exemplo.com', '$2a$10$Abcdefghi.Jklmnopqrstuvwxyz1234567890', 1),
('Mariana Lima', 'mariana@exemplo.com', '$2a$10$Abcdefghi.Jklmnopqrstuvwxyz1234567890', 0),
('Pedro Alvares', 'pedro@exemplo.com', '$2a$10$Abcdefghi.Jklmnopqrstuvwxyz1234567890', 1),
('Fulano de Tal', 'fulano@exemplo.com', '$2a$10$Abcdefghi.Jklmnopqrstuvwxyz1234567890', 0);

-- Inserir dados de exemplo na tabela 'discos'
INSERT INTO "discos" ("usuarios_id", "artista", "genero", "album", "preco", "url_imagem", "descricao", "faixas") VALUES
(1, 'Fulano', 'Sapecada', 'Gaúcho Raiz', 50.50, '/Usuario_1/capa.png', 'Um álbum de música gaúcha com o melhor da sapecada.', '1 - O Gauchinho; 2 - Alma do Pampa; 3 - De Campo e Pouso'),
(2, 'Artista A', 'Rock', 'Álbum de Rock', 75.00, '/Usuario_2/rock_capa.png', 'Um clássico do rock', '1 - Faixa Rock 1; 2 - Faixa Rock 2'),
(2, 'Artista B', 'Pop', 'Pop Sensação', 60.00, '/Usuario_2/pop_capa.png', 'Hits que não saem da cabeça', '1 - Hit 1; 2 - Hit 2; 3 - Hit 3'),
(3, 'Ciclano', 'Blues', 'Blues para a Alma', 85.00, '/Usuario_3/blues_capa.png', 'Melodias tranquilas para relaxar', '1 - Blues da Manhã; 2 - Blues da Noite'),
(4, 'Artista C', 'Clássica', 'Sinfonia Maior', 120.00, '/Usuario_4/classica_capa.png', 'Música clássica para apreciadores', '1 - Parte I; 2 - Parte II'),
(4, 'Artista D', 'Jazz', 'Jazz Elegante', 95.50, '/Usuario_4/jazz_capa.png', 'Sons suaves e sofisticados', '1 - Sax Solo; 2 - Improviso'),
(5, 'Outro Artista', 'Sertanejo', 'Coração Sertanejo', 45.00, '/Usuario_5/sertanejo_capa.png', 'Para quem gosta de uma boa moda de viola', '1 - Viola Chorona; 2 - Adeus'),
(1, 'Artista E', 'Eletrônica', 'Batidas Urbanas', 88.00, '/Usuario_1/eletronica_capa.png', 'Um álbum com batidas de tirar o fôlego', '1 - Batida 1; 2 - Batida 2; 3 - Batida 3'),
(3, 'Artista F', 'Hip Hop', 'Ritmo e Poesia', 72.00, '/Usuario_3/hiphop_capa.png', 'Letras que contam histórias da rua', '1 - Rima; 2 - Batida Perfeita'),
(5, 'Artista G', 'Reggae', 'Vibrações Positivas', 63.50, '/Usuario_5/reggae_capa.png', 'Sons relaxantes para o verão', '1 - Sol e Mar; 2 - Praia');
