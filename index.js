import express from 'express';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    let index = 0;
    const interval = setInterval(() => {
        index += 1;
        const time = new Date().toISOString();
        console.log('Sending data. Time:', time);
        res.write(`data: ${JSON.stringify({time, index})} \n\n`);
    }, 1000);
    
    req.on('close', () => {
        clearInterval(interval);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
