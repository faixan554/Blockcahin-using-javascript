const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const {v4: uuidv4} = require('uuid');
const Blockchain = require('./Blockchain');
const Bitcoin = new Blockchain();
const nodeaddress = uuidv4().split('-').join(''); 

const port = process.argv[2];

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ ectended: false}));


app.get('/Blockchain',function(req,res){
      res.send(Bitcoin);
});
// This is for view full blockchain //



app.post('/Transaction',function(req,res){
      const blockindex = Bitcoin.createnewtransaction(req.body.amount,req.body,sender,req.body.receiver);
      res.json({note: 'This Transaction will be added in Block ${blockindex}'});
});
// This is for add new Transaction //



app.get('/mine',function(req,res){
      
      const lastblock = Bitcoin.getlastblock();
      const preblockhash = lastblock['hash'];

      const currentblockdata = {
            transaction: Bitcoin.pendingtransactions,
            index: lastblock['index'] + 1,
      }

      const nonce = Bitcoin.proofofwork(preblockhash,currentblockdata);

      const hash = Bitcoin.hashblock(preblockhash,currentblockdata,nonce);

      Bitcoin.createnewtransaction(10,'00000', nodeaddress);

      const newblock  = Bitcoin.createnewblock(nonce,preblockhash,hash);


      res.json({
            note: "New Block Mined Successfuly",
            block: newblock
      });
});
// This is for mine new block //


app.get('/wallet',function(req,res){
      res.sendfile(__dirname + "/index.html");
});

app.post('/wallet',function(req,res){
      const blockindex = Bitcoin.createnewtransaction(req.body.amount,req.body,sender,req.body.receiver);
      res.json({note: 'This Transaction will be added in Block ${blockindex}'});
});
// The Simple Web Wallet //

app.listen(port,function(){
      console.log('Server is running  on ${port}...')
});