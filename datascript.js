import fs from 'fs';
import csv from 'csv-parser';
import { mean } from './functions.js'; // Custom functions module

class DataScript {
    constructor() {
        this.data = {};
    }

    async loadCSV(file, variable) {
        const results = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(file)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    this.data[variable] = results;
                    console.log(`Loaded ${file} into ${variable}`);
                    resolve();
                })
                .on('error', reject);
        });
    }

    async summarize(variable) {
        const data = this.data[variable];
        if (!data) {
            console.log(`No data found for variable: ${variable}`);
            return;
        }
        // Implement summary logic (e.g., mean, count, etc.)
        // Example:
        const summary = {
            count: data.length,
            mean_age: mean(data.map(row => parseFloat(row.age))),
            // Add more statistics as needed
        };
        console.log(`Summary of ${variable}:`, summary);
    }

    filter(variable, condition, newVariable) {
        const data = this.data[variable];
        if (!data) {
            console.log(`No data found for variable: ${variable}`);
            return;
        }
        const filteredData = data.filter(row => eval(condition));
        this.data[newVariable] = filteredData;
        console.log(`Filtered ${variable} into ${newVariable}`);
    }

    groupBy(variable, column, newVariable) {
        const data = this.data[variable];
        if (!data) {
            console.log(`No data found for variable: ${variable}`);
            return;
        }
        const groupedData = data.reduce((groups, row) => {
            const key = row[column];
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(row);
            return groups;
        }, {});
        this.data[newVariable] = groupedData;
        console.log(`Grouped ${variable} by ${column} into ${newVariable}`);
    }

    async plot(variable, type, options) {
        // Implement plotting logic (e.g., using a plotting library)
        console.log(`Plotting ${type} of ${variable} with options:`, options);
        // Placeholder for actual plotting code
    }
}

export default DataScript;
