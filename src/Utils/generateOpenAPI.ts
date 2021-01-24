import fs from 'fs';
import CONFIG from '../Core/config';

/**
 * Script to generate JSON OpenAPI documentation
 */

const dir = `${process.cwd()}/generated`;
const file = 'swagger.json';
const swaggerSpec = CONFIG.spec;

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

console.log(swaggerSpec);

// @ts-ignore
fs.writeFileSync(`${dir}/${file}`, JSON.stringify(swaggerSpec), (err) => {
    if (err) return console.error(err);
    console.log('Generating generated/swagger.json');
});
