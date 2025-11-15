const db = require('../../../../../config/database');
const Document = require('./documentClass');

class DocumentRepository {
    static async findAll() {
        const rows = await db.query('SELECT * FROM documents');
        return rows.map(row => new Document(...Object.values(row)));
    };
    static async FindByExportId(id) {
        const rows = await db.query('SELECT * FROM documents WHERE export_id = $1', [id]);
        return rows.map(row => new Document(...Object.values(row)));
    };
    static async findById(id) {
        const rows = await db.query('SELECT * FROM documents WHERE id = $1', [id]);
        return rows.length ? new Document(...Object.values(rows[0])) : null;
    };
    static async create(documentData) {
        const { export_id, document_type, file_path, created_at } = documentData;
        const rows = await db.query(
            `INSERT INTO documents (export_id, document_type, file_path, created_at, updated_at)
             VALUES ($1, $2, $3, $4, NOW())
             RETURNING *`,
            [export_id, document_type, file_path, created_at || new Date()]
        );
        return new Document(...Object.values(rows[0]));
    };
    static async update(id, documentData) {
        const { export_id, document_type, file_path } = documentData;
        const rows = await db.query(
            `UPDATE documents
             SET export_id = $1, document_type = $2, file_path = $3, updated_at = NOW()
             WHERE id = $4
             RETURNING *`,
            [export_id, document_type, file_path, id]
        );
        return rows.length ? new Document(...Object.values(rows[0])) : null;    
    };
    static async delete(id) {
        await db.query('DELETE FROM documents WHERE id = $1', [id]);
        return { message: `Document with ID ${id} deleted successfully.` };
        
    };

}

module.exports = DocumentRepository;