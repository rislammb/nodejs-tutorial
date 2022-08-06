const { URL } = require('url');

const parsedUrl = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?q=str&new=tr&q=d#hash');

console.log('protocol =', parsedUrl.protocol);
console.log('username =', parsedUrl.username);
console.log('password =', parsedUrl.password);
console.log('hostname =', parsedUrl.hostname);
console.log('port =', parsedUrl.port);
console.log('host =', parsedUrl.host);
console.log('origin =', parsedUrl.origin);
console.log('pathname =', parsedUrl.pathname);

console.log('get query new =', parsedUrl.searchParams.get('q'));
console.log('get all query q =', parsedUrl.searchParams.getAll('q'));
console.log('start: get all query with value --------');
parsedUrl.searchParams.forEach((val, key) => console.log(key, '=', val));
console.log('end: get all query with value --------');

console.log('search =', parsedUrl.search);
console.log('hash =', parsedUrl.hash);
console.log('href =', parsedUrl.href);
