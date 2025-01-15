const express = require('express');
const { productensure } = require('../middlewares/productensure');

const router = express.Router();

router.get('/', productensure, (req, res) => { 
    res.status(200).json([ 
        {
            "name": "product 1",
            "price": 1000
        },
        {
            "name": "product 2",
            "price": 2000
        }
    ]);
});

module.exports = router;



//.............................


// const express = require('express');
// const { productensure } = require('../middlewares/productensure');

// const router = express.Router();

// router.get('/', productensure, (req, res) => { 
// res.status(200).json([ 
//     {
       
//         "name": "product 1",
//         "price": 1000
//     },
//     {
       
//         "name": "product 2",
//         "price": 2000
//     }
// ]);
//  });


// module.exports = router;