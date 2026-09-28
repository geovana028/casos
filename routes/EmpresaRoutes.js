import express from 'express';
import multer from 'multer';
const router = express.Router();
//Busca o EmpresaController
import EmpresaController from '../controllers/EmpresaController.js'
const controle = new EmpresaController();

const caminhobase = 'empresa/'

// Configurar multer para upload de arquivos
const upload = multer({ storage: multer.memoryStorage() });

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', upload.single('foto'), controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)
router.get('/' + caminhobase + 'del/:id', controle.del)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', controle.edt)
export default router 