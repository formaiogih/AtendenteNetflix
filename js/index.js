import express from 'express';
import { connect, Schema, model } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

const uri = "mongodb+srv://Giovanna:megsnoop23@cluster0.iuxuair.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

connect(uri)
    .then(() => {
        console.log('Conectado ao MongoDB Atlas');
    })
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

    console.log ("Conectado na porta:" +port);
const chatSchema = new Schema({
    user: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const ChatHistory = model('ChatHistory', chatSchema);
app.get('/api/saveChatHistory', async (req, res) => {});
// Endpoint para salvar o histórico de chat
app.post('/api/saveChatHistory', async (req, res) => {
    try {
        const { user, message } = req.body;

        const chatEntry = new ChatHistory({
            user,
            message
        });

        await chatEntry.save();

        res.status(200).send('Histórico salvo com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar o histórico:', error);
        res.status(500).send('Erro ao salvar o histórico');
    }
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });