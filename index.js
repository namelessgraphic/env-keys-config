#!/usr/bin/env node

'use strict';

import fs from 'node:fs';
import { Base64 } from 'js-base64';

const pathFile = '/.env';

const generateAppKey = () => {
    return new Promise((resolve, reject) => {
        console.log("\x1b[33mInitializing APP_KEY process...\x1b[0m");

        fs.readFile(pathFile, 'utf8', (error, data) => {
            if (error) {
                console.log("\x1b[91mError reading file:\x1b[0m", error);
                return;
            } else {
                console.log("\x1b[94mReading file...\x1b[0m");
            }
    
            const encodePhrase = Base64.encode(generatePhrase());
            
            const lines = data.split('\n');
    
            const lineIndexWithAppKey = lines.findIndex(line => line.includes('APP_KEY='));
    
            if (lineIndexWithAppKey !== -1) {
                lines[lineIndexWithAppKey] = 'APP_KEY='+encodePhrase;
                const newData = lines.join('\n');
                
                fs.writeFile(pathFile, newData, 'utf8', (error) => {
                    if (error) {
                        console.log("\x1b[91mError writing to file\x1b[0m");
                        return;
                    }
                    console.log('\x1b[32mAPP_KEY created successfully!\x1b[0m');
                });
            } else {
                console.log("\x1b[91mThe line with APP_KEY was not found in the file\x1b[0m");
            }
        });

        setTimeout(() => {
            resolve(); // Resolvemos la promesa cuando la operación haya terminado
        }, 2000);
    });
};

const generateSecretKey = () => {
    console.log("\x1b[33mInitializing SECRET_KEY process...\x1b[0m");

    fs.readFile(pathFile, 'utf8', (error, data) => {
        if (error) {
            console.log("\x1b[91mError reading file:\x1b[0m", error);
            return;
        } else {
            console.log("\x1b[94mReading file...\x1b[0m");
        }

        const encodePhrase = Base64.encode(generatePhrase());
        
        const lines = data.split('\n');

        const lineIndexWithAppKey = lines.findIndex(line => line.includes('SECRET_KEY='));

        if (lineIndexWithAppKey !== -1) {
            lines[lineIndexWithAppKey] = 'SECRET_KEY='+encodePhrase;
            const newData = lines.join('\n');
            
            fs.writeFile(pathFile, newData, 'utf8', (error) => {
                if (error) {
                    console.log("\x1b[91mError writing to file\x1b[0m");
                    return;
                }
                console.log('\x1b[32mSECRET_KEY created successfully!\x1b[0m');
            });
        } else {
            console.log("\x1b[91mThe line with SECRET_KEY was not found in the file\x1b[0m");
        }
    });
};

const generatePhrase = () => {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=';
    var length = 33;
    var randomLine = '';
  
    for (var i = 0; i < length; i++) {
      var index = Math.floor(Math.random() * chars.length);
      randomLine += chars.charAt(index);
    }
  
    return randomLine;
}

generateAppKey()
    .then(() => generateSecretKey())
    .catch(error => console.error("Error:", error));