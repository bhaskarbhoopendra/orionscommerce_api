import express from 'express'

class App{
    public app = express.application;
    constructor(){
      this.app = express()
      this.connectTodatabase()
    }
  
    private connectTodatabase =async () => {
        return "Hello"
    }
}

export default App



const variable = new App()

