//importar o Model
import Julgamento from '../models/julgamento.js'

export default class JulgamentoController{

    constructor(caminhoBase='julgamento/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
     this.add = async(req, res)=>{
        await Julgamento.create({
            nome: req.body.nome,
            area: req.body.area ?? 'Não informado',
            anofundacao: Number(req.body.anofundacao ?? req.body.ano ?? 0),
            datadojulgamento: req.body.datadojulgamento ?? req.body.data,
            valorindenizacao: Number(req.body.valorindenizacao ?? 0)
        });
        res.redirect('/'+this.caminhoBase + 'lst');
    }
        this.list = async(req, res)=>{
            const resultado = await Julgamento.find({})
            res.render(caminhoBase + 'lst', {julgamentos:resultado})
        }
    }

    openEdt = async(req, res)=>{
        const id = req.params.id
        const julgamento = await Julgamento.findById(id)
        res.render(this.caminhoBase + "edt", {Julgamento: julgamento})
    }

    edt = async(req, res)=>{
        await Julgamento.findByIdAndUpdate(req.params.id, {
            nome: req.body.nome,
            area: req.body.area ?? 'Não informado',
            anofundacao: Number(req.body.anofundacao ?? req.body.ano ?? 0),
            datadojulgamento: req.body.datadojulgamento ?? req.body.data,
            valorindenizacao: Number(req.body.valorindenizacao ?? 0)
        })
        res.redirect('/' + this.caminhoBase + 'lst')
    }

    del = async(req, res)=>{
        await Julgamento.findByIdAndDelete(req.params.id)
        res.redirect('/' + this.caminhoBase + 'lst')
    }
}