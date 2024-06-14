import fs from 'fs';
import DataScript from './datascript.js'; // Import DataScript class

async function runScript(file) {
    const ds = new DataScript();
    const script = fs.readFileSync(file, 'utf-8');
    const commands = script.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    for (let command of commands) {
        const [action, ...args] = command.split(' ');
        console.log(`Executing command: ${command}`);

        try {
            switch (action.toUpperCase()) {
                case 'LOAD':
                    const [source, , variable] = args.join(' ').split(' ');
                    await ds.loadCSV(source.replace(/"/g, ''), variable);
                    break;
                case 'SUMMARY':
                    await ds.summarize(args[0]);
                    break;
                case 'FILTER':
                    const [varToFilter, , condition, , newVar] = args.join(' ').split(' ');
                    ds.filter(varToFilter, condition, newVar);
                    break;
                case 'GROUP':
                    const [varToGroup, , column, , newGroupVar] = args.join(' ').split(' ');
                    ds.groupBy(varToGroup, column.replace(/"/g, ''), newGroupVar);
                    break;
                case 'PLOT':
                    const [, plotType, , plotVariable, bins] = args.join(' ').split(' ');
                    ds.plot(plotVariable, plotType, { bins: parseInt(bins.replace('BINS ', ''), 10) });
                    break;
                default:
                    console.log(`Unknown command: ${command}`);
            }
        } catch (error) {
            console.error(`Error executing command "${command}":`, error);
        }
    }
}

// Run the script
runScript('sample.ds');
