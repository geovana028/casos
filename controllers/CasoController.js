import Caso from '../models/caso.js'
import Empresa from '../models/empresa.js'

export default class CasoController {

    constructor(caminhoBase = 'caso/') {
        this.caminhoBase = caminhoBase;

        this.openAdd = async (req, res) => {
            const empresas = await Empresa.find({});
            res.render(this.caminhoBase + "add", { Empresas: empresas });
        }

        this.add = async (req, res) => {
            await Caso.create({
                descricaodoprocesso: req.body.descricaodoprocesso,
                tipodoprocesso: req.body.tipodoprocesso,
                marca: req.body.marca,
                foto: req.file ? req.file.buffer : null
            });
            res.redirect('/' + this.caminhoBase + 'lst');
        }

        this.list = async (req, res) => {
            const payload = req?.body ?? req?.query ?? {};
            const filtro = payload.filtro ?? '';
            const tipoSelecionado = payload.tipodoprocesso ?? '';
            
            let query = {};

            if (tipoSelecionado) {
                query.tipodoprocesso = tipoSelecionado;
            }

            if (filtro) {
                query.descricaodoprocesso = { $regex: filtro, $options: "i" };
            }

            const resultado = await Caso.find(query);
            const tipos = await Caso.distinct('tipodoprocesso');
            
            res.render(this.caminhoBase + 'lst', { 
                Casos: resultado, 
                Tipos: tipos, 
                filtro: filtro, 
                tipoSelecionado: tipoSelecionado 
            });
        }

        this.find = async (req, res) => {
            const payload = req?.body ?? req?.query ?? {};
            const filtro = payload.filtro ?? '';
            const tipoSelecionado = payload.tipodoprocesso ?? '';

            let query = {};

            if (tipoSelecionado) {
                query.tipodoprocesso = tipoSelecionado;
            }

            if (filtro) {
                query.descricaodoprocesso = { $regex: filtro, $options: "i" };
            }

            const resultado = await Caso.find(query);
            const tipos = await Caso.distinct('tipodoprocesso');

            res.render(this.caminhoBase + 'lst', {
                Casos: resultado,
                Tipos: tipos,
                filtro: filtro,
                tipoSelecionado: tipoSelecionado
            });
        }

        this.openEdt = async (req, res) => {
            const id = req.params.id;
            const resultado = await Caso.findById(id);
            const jempresas = await Empresa.find({});
            res.render(this.caminhoBase + "edt", { Caso: resultado, Empresas: jempresas });
        }

        this.edt = async (req, res) => {
            const dadosAtualizados = {
                descricaodoprocesso: req.body.descricaodoprocesso,
                tipodoprocesso: req.body.tipodoprocesso,
                marca: req.body.marca,
                ...(req.file ? { foto: req.file.buffer } : {})
            };

            await Caso.findByIdAndUpdate(req.params.id, dadosAtualizados);
            res.redirect('/' + this.caminhoBase + 'lst');
        }

        this.del = async (req, res) => {
            await Caso.findByIdAndDelete(req.params.id);
            res.redirect('/' + this.caminhoBase + 'lst');
        }
    }
}