// server.ts
import express from 'express';
import path from 'path';
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors()); // 모든 도메인에서의 요청 허용

// Express
app.use(express.static('build'));
app.get('/', (req, res) => {
    res.redirect('/index.html');
});


app.get("/apitest", async (req, res) => {
    try {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        console.log(`api테스트`);
        res.send(`api테스트2`);

    } catch (error) {
        console.error('Error with API call:', error);
        res.send("api에러테스트");
    }
});


// 서버실행코드
const PORT = 8083;
app.listen(PORT, () => {
    console.log(`Server listening on HTTP port ${PORT}`);
});

// 일렉트론에서 사용가능하도록 exports
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        } 
    })
})


export default app;