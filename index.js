import express from "express";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const books = [
    'แฮร์รี่ พอตเตอร์ กับ ศิลาอาถรรพ์',
    'แฮร์รี่ พอตเตอร์ กับ ห้องแห่งความลับ',
    'แฮร์รี่ พอตเตอร์ กับ นักโทษแห่งอัซคาบัน',
    'แฮร์รี่ พอตเตอร์ กับ ถ้วยอัคนี',
    'แฮร์รี่ พอตเตอร์ กับ ภาคีนกฟีนิกซ์',
    'แฮร์รี่ พอตเตอร์ กับ เจ้าชายเลือดผสม',
    'แฮร์รี่ พอตเตอร์ กับ เครื่องรางยมทูต'
];

function calculatePrice(checkQuantities) {
    const pricePerBook = 100;
    const uniqueBooks = checkQuantities.filter(quantity => quantity > 0); 
    const totalBooks = uniqueBooks.length;
    let discountPercentage = 0;

 
    switch (totalBooks) {
        case 2:
            discountPercentage = 0.10; 
            break;
        case 3:
            discountPercentage = 0.20; 
            break;
        case 4:
            discountPercentage = 0.30; 
            break;
        case 5:
            discountPercentage = 0.40; 
            break;
        case 6:
            discountPercentage = 0.50;
            break;
        case 7:
            discountPercentage = 0.60; 
            break;
        default:
            discountPercentage = 0; 
    }

   
    const totalPrice = checkQuantities.reduce((sum, qty) => sum + (qty * pricePerBook), 0);

    const discount = totalPrice * discountPercentage;

    
    const finalPrice = totalPrice - discount;

    return { totalPrice, discount, finalPrice };
}

const router = express.Router();
router.get('/', (req, res) => {
    res.render('index', { books, totalPrice: 0, discount: 0, finalPrice: 0, selectedBooks: [], quantities: [] });
});

router.post('/calculate', (req, res) => {
    const quantities = req.body.quantities ? req.body.quantities.map(Number) : [];
    const { totalPrice, discount, finalPrice } = calculatePrice(quantities);
    const selectedBooks = books.filter((_, index) => quantities[index] > 0);

    res.render('index', { books, totalPrice, discount, finalPrice, selectedBooks, quantities });
});

app.use(router);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
