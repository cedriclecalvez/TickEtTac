var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
   
        useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://leila:lacapsule@cluster0.hoxrz.mongodb.net/ticetac?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );

   module.exports=mongoose;