const express = require('express')
const redis = require('redis')

const app = express();

const client = redis.createClient({
    host: 'redis-server',
    port: 6379,
});

client.set('visits',0);

app.get('/', (req,res) => {
    client.get('visits' , (err, visits) => {
        res.send('Number of visits: '+ visits);
        client.set('visists', parseInt(visits)+1);
    })
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})