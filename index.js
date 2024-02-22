const express = require('express')
const Sequelize = require('sequelize')
const connection = require('./Database/connnection')
const PartDetails = require('./Model/parts');
const orders = require('./Model/Orders')

const app = express();
const port = 3201;

app.use(express.json())

const router = express.Router();

// Orders 

router.post('/createOrder', async (req, res) => {
    try {
        const { orderNumber, partDetailId } = req.body;

        // Create a new order
        const newOrder = await orders.create({
            orderNumber,
            partDetailId,
        });

        res.json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get All Parts
router.post('/getallParts', async (req, res) => {
    try {
        const partDetails = await PartDetails.findAll();
        res.json(partDetails);        
    }catch(error) {
        console.log('Error while fetching parts', error);
        res.status(500).json({error: 'Internal server error'})
    }
});

// Get parts by review 
router.post('/getPartByReview', async (req, res) => {
    try {
        const { reviewCount } = req.query;

        if (!reviewCount) {
            return res.status(400).json({ error: 'Review count is required.' });
        }

        const parts = await PartDetails.findAll({
            where: { reviewCount: { [Sequelize.Op.gte]: reviewCount } },
            order: [['reviewCount', 'DESC']]  // Optional: Order by review count in descending order
        });

        if (parts && parts.length > 0) {
            res.json(parts);
        } else {
            res.status(404).json({ error: 'No parts found with the given review count.' });
        }

    } catch (error) {
        console.error('Error fetching parts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Get parts by rating
router.post('/getPartsByRating', async (req, res) => {
    try {
        const { rating } = req.query;

        if (!rating) {
            console.log('Rating is required');
            res.status(400).json({ error: 'Rating is required' });
            return;  
        }

        const parts = await PartDetails.findAll({
            where: {
                rating: {
                    [Sequelize.Op.gte]: rating
                }
            },
            order: [['rating', 'DESC']]
        });

        if (parts && parts.length > 0) {
            res.json(parts);
        } else {
            res.status(404).json({ error: 'No parts found with the given rating.' });
        }
    } catch (error) {
        console.error('Error fetching parts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Add Parts 
router.post('/addPart', async (req, res) => {

    try {
        const {itemName, itemNumber, rating, reviewCount, price} = req.body;

        const newPartDetails = await PartDetails.create({
            itemName, 
            itemNumber, 
            rating, 
            reviewCount, 
            price,
    })

        res.json(newPartDetails)
    } catch(error) {
        console.log('Error while adding parts');
        res.status(500).json({error: 'Internal server error'})
    }
})

// Database connectivity and table creation.

connection
    .sync()
    .then((result) => {
        console.log('Database connected!!!', result);
     app.listen(port, ()=> {
        console.log(`Server is running ${port}`)
    });
}).catch((error) => {
    console.log('Not able to connect', error)
});

app.use('/api', router);