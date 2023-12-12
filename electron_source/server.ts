// server.ts
import express from 'express';
const app = express();
// Express
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

const PORT = 8083;


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
// app.listen(PORT, () => {
//   console.log(`Server listening on HTTP port ${PORT}`);
// }); 

// 일렉트론에서 사용가능하도록 exports
export default app;