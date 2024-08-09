import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';
import fs from 'fs';



describe('SaveFileUseCase', () => {

  const defaultDestination = 'outputs';

  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom-outputs',
    fileName: 'custom-table-name'
  }

  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  const clean = () => {
    const outputFolderExists = fs.existsSync(defaultDestination);
    if ( outputFolderExists ) fs.rmSync(defaultDestination, { recursive: true });

    const customOutputFolderExists = fs.existsSync(customOptions.fileDestination)
    if ( customOutputFolderExists ) fs.rmSync(customOptions.fileDestination, { recursive: true });

    const outoputErrorFolderExists = fs.existsSync('output-error');
    if ( outoputErrorFolderExists ) fs.rmSync('output-error', { recursive: true });

  }

  // beforeEach( ()=> {
  //   clean();
  // });

  // afterEach( () => {
  //   clean();
  // });

  afterAll( () => {
    clean();
  });

  test('should save file with default values', () => {

    const saveFile = new SaveFile();
    const defaultFilePath = `${defaultDestination}/table.txt`;
    const options = {
      fileContent: 'Test Content',
    }

    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(defaultFilePath);
    const fileContent = fs.readFileSync(defaultFilePath, { encoding: 'utf-8'});


    expect( result ).toBe( true );
    expect( fileExists ).toBeTruthy();
    expect( fileContent ).toBe( options.fileContent );

  });


  test('should save file custom values', ()=>{

    const saveFile = new SaveFile();

    const result = saveFile.execute(customOptions);
    const fileExists = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8'});

    expect( result ).toBe( true );
    expect( fileExists ).toBeTruthy();
    expect( fileContent ).toBe( customOptions.fileContent );

  });


  test('should return false if directory could not be created', () => {

    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs,'mkdirSync').mockImplementation(
      () => { throw new Error('Error creating directory') }
    );

    const result = saveFile.execute(customOptions);

    expect( result ).toBe( false );

    // clear spy
    mkdirSpy.mockRestore();

  });

  test('should return false if file could not be created ', () => {
    const saveFile = new SaveFile();
    const mkdirFileSpy = jest.spyOn(fs,'writeFileSync').mockImplementation(
      () => { throw new Error('Error writing in file') }
    );

    const result = saveFile.execute({fileContent: 'This is the custom content'});

    expect( result ).toBe( false );

    // clear spy
    mkdirFileSpy.mockRestore();
  })

});