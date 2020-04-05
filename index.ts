import { app } from './app';
import Config from './src/config';

console.log('server starting...');
app.listen(Config.ServerPort, () => {
    console.log(`Example app listening on port ${Config.ServerPort}!`);
    console.log('server started.');
});