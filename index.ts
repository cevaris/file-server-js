import { app } from './app';

console.log('server starting...');
const PORT = process.env.PORT || '3000';
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
    console.log('server started.');
});