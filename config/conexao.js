import mongoose from "mongoose";
//const url = "mongodb+srv://marcelosiedler:ifsul@ifsul.fify4.mongodb.net/"
const url = "mongodb://aluno123:geo123@ac-irhadvi-shard-00-00.lovlf4p.mongodb.net:27017,ac-irhadvi-shard-00-01.lovlf4p.mongodb.net:27017,ac-irhadvi-shard-00-02.lovlf4p.mongodb.net:27017/?ssl=true&replicaSet=atlas-wjvup7-shard-0&authSource=admin&appName=Cluster0"
const conexao = await mongoose.connect(url)

export default conexao