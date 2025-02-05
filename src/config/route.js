

const paths={
    ACCESS:{
        LOGIN:'/login',
        REGISTER:'/register'
    },
    PRODUCT: '/product',
    PASSWORD:{
        CHANGEPASSWORD:'/changePassword'
    },
    USER:{
        GETALL:'/users',
        UPDATE:`/users`,
        GETBYID:`/users`

    },
    CATEGORY:{
        GET:'/categories',
        GETBYID:'/categories',
        UPDATE:'/categories/:id',
        DELETE:'/categories/:id',
        CREATE:'/categories'

    },
    PAYMENTMETHOD:{
        GET:'/paymentMethods',
        GETBYID:'/paymentMethods/:id',
        CREATE:'/paymentMethods',
        UPDATE:'/paymentMethods/:id',
        DELETE:'/paymentMethods/:id'
    },
    SUBCATEGORY:{
        GET:'/subcategories',
        CREATE:'/subcategories',
        GETBYID:'/subcategories/:id',
        DELETE:'/subcategories/:id',
        UPDATE:'/subcategories/:id'
    },
    INVENTORY:{
        GET:'/inventories',
        CREATE:'/inventories',
        GETBYID:'/inventories/:id',
        DELETE:'/inventories/:id',
        UPDATE:'/subcategories/:id'
    },
    PRODUCTS:{
        POST:'/products',
        GET:'/products',
        GETBYID:"/products/:id",
        DELETE:"/products/:id",
        UPDATE:"/products/:id",
        GETBYSLUG:"/products/slug/:slug"
    },
    CONVERSATION:{
        POST:'/conversations',
        GETUSERCONVERSATION:'/users/conversations',
        GETMESSAGEINCONVERSATION:'/users/conversations/messages'

    }
    
}

module.exports={paths}