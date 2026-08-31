import express from 'express';
import multer from 'multer';
import CasoController from '../controllers/CasoController.js';
import GeralController from '../controllers/controller.js';

const router = express.Router();
const controle = new CasoController();
const geral = new GeralController();

// Configuração do Multer (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Rotas principais
router.get('/', geral.home);
router.get('/add', controle.openAdd);

// Rota POST que recebe o formulário com a foto
router.post('/add', upload.single('foto'), controle.add);

export default router;