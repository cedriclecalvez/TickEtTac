var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
   
        useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://cedric:cedric@cluster0.udb80.mongodb.net/Ticetac?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );

   module.exports=mongoose;