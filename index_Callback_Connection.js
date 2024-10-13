const mysql = require('mysql2');
require('dotenv').config()
  // create the connection to database
  const connection = mysql.createConnection({
    //host : 'localhost',
    host: '127.0.0.1',
    port: '33060',
    database : 'demo',
    user : 'root',
    password: process.env.PASS
  });

  
  // execute will internally call prepare and query
//   connection.execute(
//     'SELECT * FROM demo WHERE `name` = ? AND `age` > ?',
//     ['Rick C-137', 53],
//     function (err, results, fields) {
//       console.log(results); // results contains rows returned by server
//       console.log(fields); // fields contains extra meta data about results, if available
//     }
//   );
// connection.execute('SHOW TABLES FROM `test`;', (_err, rows) => {
//     console.log(rows);
//     /**
//      * @rows: [ { Tables_in_test: 'test' } ]
//      */
//   });
connection.query('SELECT * FROM empleados'
    , function (error, results, fields) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
}
);
connection.end();
