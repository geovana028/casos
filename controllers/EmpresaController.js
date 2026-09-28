//importar o Model
import Empresa from '../models/empresa.js'

export default class EmpresaController {
    constructor(caminhoBase = 'empresa/') {
        this.caminhoBase = caminhoBase;
    }

    openAdd = async (req, res) => {
        res.render(this.caminhoBase + 'add');
    }

    add = async (req, res) => {
        await Empresa.create({
            nome: req.body.nome,
            area: req.body.area,
            anofundacao: req.body.anofundacao ?? req.body.ano,
            datadojulgamento: req.body.datadojulgamento ?? req.body.data,
            foto: req.file ? req.file.buffer : null
        });
        res.redirect('/' + this.caminhoBase + 'lst');
    }

    list = async (req, res) => {
        const resultado = await Empresa.find({});
        res.render(this.caminhoBase + 'lst', { empresas: resultado });
    }

    find = async (req, res) => {
        const filtro = req.body.filtro ?? '';
        const resultado = await Empresa.find({
            nome: { $regex: filtro, $options: 'i' }
        });
        res.render(this.caminhoBase + 'lst', { empresas: resultado });
    }

    openEdt = async (req, res) => {
        const id = req.params.id;
        const empresa = await Empresa.findById(id);
        res.render(this.caminhoBase + 'edt', { Empresa: empresa });
    }

    edt = async (req, res) => {
        await Empresa.findByIdAndUpdate(req.params.id, {
            nome: req.body.nome,
            area: req.body.area,
            anofundacao: req.body.anofundacao ?? req.body.ano,
            datadojulgamento: req.body.datadojulgamento ?? req.body.data,
            foto: req.file ? req.file.buffer : undefined
        });
        res.redirect('/' + this.caminhoBase + 'lst');
    }

    del = async (req, res) => {
        await Empresa.findByIdAndDelete(req.params.id);
        res.redirect('/' + this.caminhoBase + 'lst');
    }
}