const mongoose = require("mongoose"); // Erase if already required
const { default: slugify } = require("slugify");
const slug=require('slugify')

const COLLECTION_NAME="Product"

const DOCUMENT_NAME="Product"

var productSchema =new mongoose.Schema({
    product_name:{
        type:String,

    },
    product_description:{type:String},
    product_price:{ type:String },
    product_slug:{ type:String },
    product_image :{type:String},
    product_type:{type:mongoose.Schema.Types.Mixed},
    product_attribute:{type:mongoose.Schema.Types.Mixed},
    product_ratingAverage:{
        type:Number,
        default:4.5,
        min:[1,"Rating must be above 1.0"],
        max:[5,"Rating must be above 5.0"],
        ///set
        set:(val)=> Math.round(val*10)/10
    },
    product_variation:{type:Array ,default:[]},
    isDraft:{type:Boolean,default:true,index:true,select:false},
    isPublished:{type:Boolean ,default:false,index:true,select:false}


},{
    collection:COLLECTION_NAME,
    timestamps:true
})

productSchema.index({ product_name:'text', product_description:"text"})

/////document run bf
productSchema.pre('save', function(next) {
    this.product_slug = slugify(this.product_name,{lower:true});
    next();
});

var clothingSchema =new mongoose.Schema({
    brand:{type :String},
    size:{type:String},
    material:{type:String}
},{
    collection:"Clothes",
    timestamps:true
    
})

var electric=new mongoose.Schema({
    company:{type:String},
    address:{type:String}
},
{
    timestamps:true,
    collection:"Electrics"
})

module.exports={
    products: mongoose.model(COLLECTION_NAME,productSchema),
    clothes : mongoose.model('Clothes',clothingSchema),
    electric: mongoose.model('Electrics',electric)

}