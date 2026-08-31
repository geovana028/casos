import conexao from '../config/conexao.js'

const Julgamento = conexao.Schema({
    nome: {type:String, required:true},
    area: {type:String, required:true},
    anofundacao: {type:Number, required:true},
    datadojulgamento: {type:Date, required:true},
    foto: {
        type: Buffer,
        get: (valor) => {
            if (!valor) return null;
            return `data:image/png;base64,${valor.toString('base64')}`;
        }
    }
}, { toJSON: { getters: true }, toObject: { getters: true } })

export default conexao.model('Julgamento', Julgamento)