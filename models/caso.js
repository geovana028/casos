import conexao from '../config/conexao.js'

const Caso = conexao.Schema({
    descricaodoprocesso: {type:String, required:true},
    tipodoprocesso: {type:String, required:true},
    marca: {type:String},
    foto: {
        type: Buffer,
        get: (valor) => {
            if (!valor) return null;
            return `data:image/png;base64,${valor.toString('base64')}`;
        }
    }
}, { toJSON: { getters: true }, toObject: { getters: true } })

export default conexao.model('Caso', Caso)