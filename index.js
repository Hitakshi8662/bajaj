const { createServer } = require('http');

const server = createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/bfhl') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);

        // Generate user_id using full_name_ddmmyyyy format
        const full_name_ddmmyyyy = 'john_doe_17091999';
        const user_id = `user_id: ${full_name_ddmmyyyy}`;

        // Extract email and roll_number from the request or use predefined values
        const email = 'john@xyz.com';
        const roll_number = 'ABCD123';

        // Separate even_numbers, odd_numbers, and alphabets from the data array
        const even_numbers = data.data.filter((num) => num % 2 === 0);
        const odd_numbers = data.data.filter((num) => num % 2 !== 0);

         let alphabets=[];
         for(let i=0;i<data.data.length;i++){
           if(typeof(data.data[i])==='string'){
             if(data.data[i].match(/[a-zA-Z]/)){
               alphabets.push(data.data[i].toUpperCase());
             }
           }
         }

        // Prepare the response object
        const responseObj = {
          is_success: true,
          user_id,
          email,
          roll_number,
          odd_numbers,
          even_numbers,
          alphabets,
        };

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;

       res.end(JSON.stringify(responseObj));
      } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid request payload' }));
      }
    });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
