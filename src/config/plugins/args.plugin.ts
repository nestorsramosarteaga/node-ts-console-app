
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
  .option('b',{
    alias: 'base',
    type: 'number',
    demandOption: true,
    description: 'Multiplication table base',
  })
  .option('l',{
    alias: 'limit',
    type: 'number',
    default: 10,
    description: 'Multiplication table limit',
  })
  .option('s',{
    alias: 'show',
    type: 'boolean',
    default: false,
    description: 'Show multiplication table',
  })
  .option('n',{
    alias: 'name',
    type: 'string',
    default: 'multiplicate-table',
    description: 'File name',
  })
  .option('d',{
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    description: 'File Destination',
  })
  .check(( argv, options )=>{

    // console.log({argv,options});

    if ( argv.b < 1 ) throw 'Error: Base must be greater than 0';
    if ( argv.b > 10 ) throw 'Error: Base must be less than 10';
    
    if ( argv.l < 1 ) throw 'Error: Limit must be greater than 0';

    return true;

  })
  .parseSync()


