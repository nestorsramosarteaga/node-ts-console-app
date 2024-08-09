import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';
import { ServerApp } from '../../src/presentation/server-app';

describe('Server App', () => {

  const options = {
    base: 9,
    limit: 10,
    showTable: false,
    fileName: 'test-filename',
    fileDestination: 'test-outputs'
  };

  beforeEach( ()=> {
    jest.clearAllMocks();
  })

  test('should create ServerApp instance', () => {
    const serverApp = new ServerApp();
    expect( serverApp ).toBeInstanceOf( ServerApp );
    expect( typeof ServerApp.run ).toBe('function');

  });

  test('should run ServerApp with options', async () => {

    const logSpy = jest.spyOn(console, 'log');
    const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute');
    const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute');

    ServerApp.run(options);

    ( options.showTable )
      ? expect( logSpy ).toHaveBeenCalledTimes(3)
      : expect(logSpy ).toHaveBeenCalledTimes(2);
    expect( logSpy ).toHaveBeenCalledWith('Server running...');
    expect( logSpy ).toHaveBeenLastCalledWith('File created successfully!');

    expect( createTableSpy ).toHaveBeenCalledTimes(1);
    expect( createTableSpy ).toHaveBeenCalledWith({ base: options.base, limit: options.limit });

    expect( saveFileSpy ).toHaveBeenCalledTimes(1);
    expect( saveFileSpy ).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileName: options.fileName,
      fileDestination: options.fileDestination,
    });

  });

  test('should run with custom values mocked', () => {
    const stringTableExample = '1 x 2 = 2';

    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createTableMock = jest.fn()
      .mockReturnValue(stringTableExample);
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createTableMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect( logMock ).toHaveBeenCalledWith('Server running...');
    expect( createTableMock ).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
    expect( saveFileMock ).toHaveBeenCalledWith(
      {
        fileContent: expect.stringContaining(stringTableExample),
        fileName: options.fileName,
        fileDestination: options.fileDestination,
      }
    );
    expect( logErrorMock ).not.toBeCalledWith();
    expect( logMock ).toHaveBeenCalledWith('File created successfully!');
  })


});

