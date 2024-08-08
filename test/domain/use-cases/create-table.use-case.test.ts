import { CreateTable } from '../../../src/domain/use-cases/create-table.use-case';

describe('CreateTableUseCase', () => {
  

  test('should create table with default values', () => {
    const createTable = new CreateTable();
    const base = Math.floor(Math.random() * 10 ) + 1 ;
    const table = createTable.execute({ base });
    const rows = table.split('\n').length;

    expect( createTable ).toBeInstanceOf( CreateTable );
    expect( table ).toContain(`${base} x 1 = ${base}`);
    expect( table ).toContain(`${base} x 10 = ${base * 10}`);
    expect( rows ).toBe(10); // 10 rows
  });

  test('should create table with custom values', () => {

    const createTable = new CreateTable();
    const options = {
      base: Math.floor(Math.random() * 10 ) + 1,
      limit: 20
    };
    const table = createTable.execute(options);
    const rows = table.split('\n').length;


    expect( table ).toContain(`${options.base} x 1 = ${options.base}`);
    expect( table ).toContain(`${options.base} x ${options.limit} = ${options.base * options.limit}`);
    expect( rows ).toBe(options.limit); // limit rows

  });


})
