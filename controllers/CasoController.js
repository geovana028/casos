//importar o Model
import Caso from '../models/caso.js'

export default class CasoController{

    constructor(caminhoBase='caso/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
        //cria o Caso
        await Caso.create({
            descricaodoprocesso: req.body.descricaodoprocesso,
            tipodoprocesso: req.body.tipodoprocesso, // Corrigido de tipodoproduto para tipodoprocesso
            local: req.body.local,
            foto: req.file ? req.file.buffer : null
        });
        res.redirect('/'+this.caminhoBase + 'lst');
    }
        this.list = async(req, res)=>{
            const resultado = await Caso.find({})
            res.render(caminhoBase + 'lst', {Casos:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Caso.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Casos:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const caso = await Caso.findById(id) 
            console.log(caso)
            res.render(caminhoBase + "edt", 
                {Caso:caso})
        }


        this.edt = async(req, res)=>{
        await Caso.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Caso.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}