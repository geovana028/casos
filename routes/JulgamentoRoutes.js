import express from 'express';
import multer from 'multer';
const router = express.Router();
//Busca o JulgamentoController
import JulgamentoController from '../controllers/JulgamentoController.js'
const controle = new JulgamentoController();

const caminhobase = 'julgamento/'

// Configurar multer para upload de arquivos
const upload = multer({ storage: multer.memoryStorage() });

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.get('/' + caminhobase + 'edit/:id', controle.openEdt)
router.post('/' + caminhobase + 'edit/:id', controle.edt)
router.get('/' + caminhobase + 'delete/:id', controle.del)
export default router