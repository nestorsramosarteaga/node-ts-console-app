// import { yarg } from '../../../src/config/plugins/args.plugin';


const runCommand = async( args: string[] ) => {
  process.argv = [ ...process.argv, ...args ];
  const { yarg } = await import('../../../src/config/plugins/args.plugin');
  return yarg;
}


describe('Test args.plugins.ts', () => {

  const originalArgv = process.argv;

  beforeEach( () => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test('should return default values', async () => {

    const argv = await runCommand(['-b', '7']);

    expect(argv).toEqual(expect.objectContaining({
      b: 7,
      l: 10,
      s: false,
      n: 'multiplicate-table',
      d: 'outputs'
    }));

  });


  test('should return configuration with custom values', async() => {

    const argv = await runCommand(['-b', '5', '-l','20', '-s', '-n', 'custom-file-name', '-d', 'custom-folder-outputs']);

    expect(argv).toEqual(expect.objectContaining({
      b: 5,
      l: 20,
      s: true,
      n: 'custom-file-name',
      d: 'custom-folder-outputs'
    }));

  });

  // test('should return false when the base is a negative value', async () => {
    
  //   const argv = await runCommand(['-b', '-3']);

    
  // });

});



