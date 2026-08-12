import conexao from '../config/conexao.js'

const Caso = conexao.Schema({
    descricao: {type:String, required:true},
    tipodocrime: {type:String, required:true},
    local: {type:String, required:true}
})

export default conexao.model('Caso',Caso)