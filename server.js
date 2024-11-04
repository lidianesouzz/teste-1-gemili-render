const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com o MongoDB Atlas
const mongoURI = 'mongodb+srv://lidianesouzadoamaral:21novenbro2006@lidiss.5j8lc.mongodb.net/?retryWrites=true&w=majority&appName=lidiss';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err));

// Definindo o esquema do MongoDB
const conversationSchema = new mongoose.Schema({
  userId: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const loginSchema = new mongoose.Schema({
  userId: String,
  loginTime: { type: Date, default: Date.now }
});

// Modelos
const Conversation = mongoose.model('Conversation', conversationSchema);
const Login = mongoose.model('Login', loginSchema);

// Rotas para Conversas
app.get('/api', async (req, res) => {
  try {
    
    res.status(201).send("serviço funcional");
  } catch (error) {
    res.status(400).send({ error: 'Erro ao salvar conversa.' });
  }
});

// Rotas para Conversas
app.post('/api/conversations', async (req, res) => {
  try {
    const newConversation = new Conversation(req.body);
    await newConversation.save();
    res.status(201).send(newConversation);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao salvar conversa.' });
  }
});

app.get('/api/conversations/:userId', async (req, res) => {
  try {
    const conversations = await Conversation.find({ userId: req.params.userId });
    res.status(200).send(conversations);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao recuperar conversas.' });
  }
});

// Rotas para Logins
app.post('/api/logins', async (req, res) => {
  try {
    const newLogin = new Login(req.body);
    await newLogin.save();
    res.status(201).send(newLogin);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao salvar login.' });
  }
});

app.get('/api/logins/:userId', async (req, res) => {
  try {
    const logins = await Login.find({ userId: req.params.userId });
    res.status(200).send(logins);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao recuperar logins.' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
