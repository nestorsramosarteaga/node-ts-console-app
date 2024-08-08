import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';
import fs from 'fs';



describe('SaveFileUseCase', () => {


  // beforeEach( ()=> {
  //   // clean up
  //   fs.rmSync('outputs', { recursive: true, force: true });
  // });
  const defaultDestination = 'outputs';

  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom-outputs',
    fileName: 'custom-table-name'
  }
  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  afterEach( () => {
    const outputFolderExists = fs.existsSync(defaultDestination)
      if ( outputFolderExists ) fs.rmSync(defaultDestination, { recursive: true, force: true });

    const customOutputFolderExists = fs.existsSync(customOptions.fileDestination)
      if ( customOutputFolderExists ) fs.rmSync(customOptions.fileDestination, { recursive: true });
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

});