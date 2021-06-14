import express from 'express';
import bodyParser from 'body-parser';
import imei from 'imei';

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index',{val:'',result:''});
});

app.get('/find',(req,res)=>{
    const givenNumber = req.query.imei;
    var ans = '';
    if(givenNumber.length !== 15){
        ans+='Length of IMEI should be 15 digits';
    }

    var isValidImei = imei.isValid(givenNumber);
    if(isValidImei){
        ans+='Given IMEI found';
    }
    else {
        var lastNumber = '';
        for(var i=0;i<14;i++){
            lastNumber+=givenNumber.charAt(i);
        }
        var lastDigit = givenNumber.charAt(14);
        for(var i=0;i<=9;i++){
            lastNumber+=i; 
            lastNumber=lastNumber.toString();
            var isValid = imei.isValid(lastNumber);
            if(isValid){
                console.log('came');
                ans+='Given IMEI number does not exists.Replace '+lastDigit+' by '+i+' to get correct IMEI number.';
                break;
            }
            lastNumber-=i;
        }
    }
    res.render('index',{val:givenNumber,result:ans});
})

app.listen(process.env.PORT||5000,()=>{
    console.log('Server started at port 5000');
});