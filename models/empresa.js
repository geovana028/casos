import conexao from '../config/conexao.js'

const Empresa = conexao.Schema({
    nome: {type:String, required:true},
    area: {type:String, required:true},
    anofundacao: {type:Date, required:true},
    cnpj: {type:String, default:'Não informado'},
    foto: {
        type: Buffer,
        get: (valor) => {
            if (!valor) return null;
            return `data:image/png;base64,${valor.toString('base64')}`;
        }
    }
}, { toJSON: { getters: true }, toObject: { getters: true } })

export default conexao.model('Empresa', Empresa)