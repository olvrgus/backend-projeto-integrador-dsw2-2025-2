// src/routes/chamados.routes.js
import { Router } from "express";
import { unlink } from 'node:fs/promises'; // unlink do fs para apagar arquivo
import { pool } from "../database/db.js";
import multer from "multer"; // import do multer
import path from "path";     // import do path
import fs from "fs";         // import do fs

const router = Router();

// setup mínimo de upload em disco
const uploadDir = path.resolve('uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});
const upload = multer({ storage });

router.get("/", async (_req, res) => {
    try {
        // Desestruturação: extraímos apenas "rows" do objeto retornado.
        const { rows } = await pool.query(`SELECT * FROM "discos" ORDER BY "id" DESC`);
        res.json(rows); // retorna um array de objetos (cada objeto é um produto)
    } catch {
        res.status(500).json({ erro: "erro interno" });
    }
});

// -----------------------------------------------------------------------------
// MOSTRAR UM (GET /discos/:id)
// -----------------------------------------------------------------------------
// Objetivo: buscar UM produto específico pelo id.
// Observação: parâmetros de rota (":id") chegam como string e precisamos converter.

router.get("/:id", async (req, res) => {
    // req.params.id é SEMPRE string; usamos Number(...) para converter.
    const id = Number(req.params.id);

    // Validação do "id":
    // - Number.isInteger(id): checa se é número inteiro (NaN falha aqui).
    // - id <= 0: não aceitamos ids zero ou negativos.
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "id inválido" });
    }

    try {
        // Consulta parametrizada: $1 será substituído pelo valor de "id".
        const result = await pool.query(`SELECT * FROM "discos" WHERE "id" = $1`, [id]);

        // "rows" é um array de linhas. Se não houver primeira linha, não achou.
        const { rows } = result;
        if (!rows[0]) return res.status(404).json({ erro: "não encontrado" });

        // Achou: devolve o primeiro (e único) produto.
        res.json(rows[0]);
    } catch {
        res.status(500).json({ erro: "erro interno" });
    }
});

// -----------------------------------------------------------------------------
// CRIAR (POST /discos)
// -----------------------------------------------------------------------------
// Objetivo: inserir um novo disco. Espera-se receber JSON com { usuarios_id, artista, genero, album, preco, url_imagem, descricao, faixas}.
// Observações:
// - req.body pode ser "undefined" se o cliente não enviar JSON; por isso usamos "?? {}"
//   para ter um objeto vazio como padrão (evita erro ao desestruturar).


router.post("/:id", async (req, res) => {
    // Extraímos "usuarios_id", "artista", "genero", "album", "preco", "url_imagem", "descricao", "faixas do corpo". Se req.body for undefined, vira {}.
    const { usuarios_id, artista, genero, album, preco, url_imagem, descricao, faixas } = req.body ?? {};
    const uId = Number(usuarios_id);
    const p = Number(preco);

    // Validações:
    // - !nome → nome ausente, vazio, null, etc. (falsy)
    // - preco == null → captura especificamente null (e também undefined)
    //   Observação: usamos == de propósito para cobrir null/undefined juntos.
    // - Number.isNaN(p) → conversão falhou (ex.: "abc")
    // - p < 0 → preço negativo não é permitido
    if (!artista || typeof (artista) !== 'string' ||
        !genero || typeof (genero) !== 'string' ||
        !album || typeof (album) !== 'string' ||
        !faixas || typeof (faixas) !== 'string' ||
        !url_imagem || typeof (url_imagem) !== 'string' ||
        !descricao || typeof (descricao) !== 'string' ||
        usuarios_id == null || Number.isNaN(uId) || uId < 1 ||
        preco == null || Number.isNaN(p) || p < 1
    ) {
        return res.status(400).json({ erro: "usuarios_id, artista, genero, album, preco, url_imagem, descricao, faixas precisam ser do tipo string e não vazios. Usuarios_id, preco e faixas precisa ser um número inteiro maior que 0" });
    }

    try {
        // INSERT com retorno: RETURNING * devolve a linha criada.
        const { rows } = await pool.query(
            `INSERT INTO discos (usuarios_id, artista, genero, album, preco, url_imagem, descricao, faixas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [usuarios_id, artista, genero, album, preco, url_imagem, descricao, faixas]
        );

        // rows[0] contém o objeto recém-inserido (com id gerado, etc.)
        res.status(201).json(rows[0]); // 201 Created → recurso criado com sucesso
    } catch {
        res.status(500).json({ erro: "erro interno" });
    }
});

// -----------------------------------------------------------------------------
// SUBSTITUIR (PUT /discos/:id)
// -----------------------------------------------------------------------------
// Objetivo: substituir TODOS os campos do produto (put = envia o recurso completo).
// Requer: { nome, preco } válidos.

router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { usuarios_id, artista, genero, album, preco, url_imagem, descricao, faixas } = req.body ?? {};
    const uId = Number(usuarios_id);
    const p = Number(preco);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "id inválido" });
    }
    if (!artista || typeof (artista) !== 'string' ||
        !genero || typeof (genero) !== 'string' ||
        !album || typeof (album) !== 'string' ||
        !faixas || typeof (faixas) !== 'string' ||
        !url_imagem || typeof (url_imagem) !== 'string' ||
        !descricao || typeof (descricao) !== 'string' ||
        usuarios_id == null || Number.isNaN(uId) || uId < 1 ||
        preco == null || Number.isNaN(p) || p < 1
    ) {
        return res.status(400).json({ erro: "usuarios_id, artista, genero, album, preco, url_imagem, descricao, faixas precisam ser do tipo string e não vazios. Usuarios_id e preco precisa ser um número inteiro maior que 0" });
    }

    try {
        // Atualiza ambos os campos sempre (sem manter valores antigos).
        const { rows } = await pool.query(
            `UPDATE discos SET
              usuarios_id = $1,
              artista = $2, 
              genero = $3,
              album = $4,
              preco = $5,
              url_imagem = $6,
              descricao = $7,
              faixas = $8
            WHERE id = $9
            RETURNING *`,
            [usuarios_id, artista, genero, album, preco, url_imagem, descricao, faixas, id]
        );                                                                                                                                                                                                                                                                                                    
        // Se não atualizou nenhuma linha, o id não existia.
        if (!rows[0]) return res.status(404).json({ erro: "não encontrado" });

        res.json(rows[0]); // retorna o produto atualizado
    } catch(error) {
        res.status(500).json({ erro: error });
    }
});

// -----------------------------------------------------------------------------
// ATUALIZAR PARCIALMENTE (PATCH /discos/:id)
// -----------------------------------------------------------------------------
// Objetivo: atualizar APENAS os campos enviados.
// Regras:
// - Se "nome" não for enviado, mantemos o nome atual.
// - Se "preco" não for enviado, mantemos o preço atual.
// Como fazemos isso no SQL?
// - COALESCE(a, b) devolve "a" quando "a" NÃO é NULL; caso seja NULL, devolve "b".
// - Então passamos "null" para campos não enviados, e o COALESCE usa o valor atual do banco.
router.patch("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { usuarios_id, artista, genero, album, preco, url_imagem, descricao, faixas } = req.body ?? {};
    // Validação do id
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "id inválido" });
    }

    // Se nenhum campo foi enviado, não há o que atualizar.
    if (preco === undefined &&
        usuarios_id === undefined &&
        artista === undefined &&
        genero === undefined &&
        album === undefined &&
        preco  === undefined &&
        url_imagem  === undefined &&
        descricao === undefined &&
        faixas === undefined 
        ) {
        return res.status(400).json({ erro: "É necessário enviar pelo menos um dado para atualizar" });
    }

    let uId = null;
    if (usuarios_id !== undefined) {
        uId = Number(usuarios_id);
        if (Number.isNaN(uId) || uId < 1) {
            return res.status(400).json({ erro: "Usuario deve ser maior que o 1" });
        }
    }
    let p = null;
    if (preco !== undefined) {
        p = Number(preco);
        if (Number.isNaN(uId) || uId < 1) {
            return res.status(400).json({ erro: "Usuario deve ser maior que o 1" });
        }
    }

    try {
    const { rows } = await pool.query(

     `UPDATE discos SET 
     usuarios_id = coalesce($1, usuarios_id), 
     artista = coalesce($2, usuarios_id), 
     genero = coalesce($3, usuarios_id), 
     album = coalesce($4, usuarios_id),
     preco = coalesce($5, usuarios_id),
     url_imagem = coalesce($6, usuarios_id),
     descricao = coalesce($7, usuarios_id),
     faixas = coalesce($8, usuarios_id)
     WHERE id = $9 RETURNING *`,
     [usuarios_id ?? null, artista ?? null, genero ?? null, album ?? null, preco ?? null, url_imagem ?? null, descricao ?? null, faixas ?? null, id]
    );

    if (!rows[0]) return res.status(404).json({ erro: "não encontrado" });
    res.json(rows[0]);

    } catch {
        res.status(500).json({ erro: "erro interno" });
    }
});

// -----------------------------------------------------------------------------
// DELETAR (DELETE /discos/:id)
// -----------------------------------------------------------------------------
// Objetivo: remover um produto existente.
// Retornamos 204 No Content quando dá certo (sem corpo na resposta).
router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "id inválido" });
    }

    try {
        // RETURNING id nos permite saber se algo foi realmente deletado.
        const r = await pool.query("DELETE FROM discos WHERE id = $1 RETURNING id", [id]);

        // r.rowCount é o número de linhas afetadas. Se 0, o id não existia.
        if (!r.rowCount) return res.status(404).json({ erro: "não encontrado" });

        res.status(204).end(); // 204 = sucesso sem corpo de resposta
    } catch {
        res.status(500).json({ erro: "erro interno" });
    }
});

export default router;