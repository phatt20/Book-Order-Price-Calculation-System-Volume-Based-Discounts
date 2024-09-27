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


function calculatePrice(selectedQuantities) {

    const uniqueBooks = selectedQuantities.filter((quantity) => quantity > 0); //หาที่มากกว่า 0 เพื่อดูสั่งทั้งหมดกี่ประภท
    const totalBooks = uniqueBooks.length;
    let discount = 0;

    // คำนวณส่วนลดตามจำนวนเล่มที่ไม่ซ้ำกัน
    switch (totalBooks) {
        case 2:
            discount = 0.10 * 100 * 2; // discount * default * count
            break;
        case 3:
            discount = 0.20 * 100 * 3;
            break;
        case 4:
            discount = 0.30 * 100 * 4;
            break;
        case 5:
            discount = 0.40 * 100 * 5;
            break;
        case 6:
            discount = 0.50 * 100 * 6;
            break;
        case 7:
            discount = 0.60 * 100 * 7;
            break;
        default:
            discount = 0;
    }

    const totalPrice = selectedQuantities.reduce((sum, qty) => sum + (qty > 0 ? qty * 100 : 0), 0);  //loop ผ่านทุกตัว find total
    const finalPrice = totalPrice - discount;

    return { totalPrice, discount, finalPrice };
}

const router = express.Router();
router.get('/', (req, res) => {
    res.render('index', { books, totalPrice: 0, discount: 0, finalPrice: 0, selectedBooks: [], quantities: [] });
});


router.post('/calculate', (req, res) => {
    console.log(req.body.quantities);

    const quantities = req.body.quantities ? req.body.quantities.map(Number) : [];

    const { totalPrice, discount, finalPrice } = calculatePrice(quantities);


    const selectedBooks = books.filter((_, index) => quantities[index] > 0);

    res.render('index', { books, totalPrice, discount, finalPrice, selectedBooks, quantities });
});

app.use(router);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
