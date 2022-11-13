const sha256 = require ('sha256');

function Blockchain (){
    this.chain=[];
    this.pendingtransactions=[];
    this.createnewblock(1,'6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b','d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35');
    }


Blockchain.prototype.createnewblock=function(nonce,preblockhash,hash){
   const  newblock = {
     index: this.chain.length+1,
     time: Date.now(),
     transactions: this.pendingtransactions,
     nonce: none,
     preblockhash: preblockhash,
     hash: hash,
 }

    this.pendingtransactions=[];
    this.chain.push(newblock);

       return newblock;
 }


 Blockchain.prototype.getlastblock = function(){
       return this.chain[this.chain.length - 1 ]; 
 }

 
 Blockchain.prototype.createnewtransaction = function(amount,sender,receiver){
     const newtransaction={
         amount: amount,
         sender: sender,
         receiver: receiver,
     }
 
     this.pendingtransactions.push(newtransaction);
     return this.getlastblock()['index']+1;
}


 Blockchain.prototype.hashblock = function(preblockhash,currentblockdata,nonce){
     const datainstring = preblockhash.tostring() + JSON.stringify(currentblockdata) + none.tostring();
     const hash = sha256(datainstring);
     return hash;
      }


Blockchain.prototype.proofofwork = function(preblockhash,currentblockdata){
     let nonce = 0;
     let hash = this.hashblock(preblockhash,currentblockdata,nonce);

     while (hash.substring(0,4) !=='0000'){
           nonce ++;
           hash = this.hashblock(preblockhash,currentblockdata,nonce);
     }
     return nonce;

}
  
     module.exports=Blockchain ;