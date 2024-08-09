// process.argv = ['node','app.ts','-b','8'];
// import '../src/app';
import { ServerApp } from '../src/presentation/server-app';

describe('Test App.ts', ()=>{

  test('should call Server.Run with values', async () => {
    
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = [
      'node','app.ts',
      '-b','8',
      '-l','20',
      '-s',
      '-n','test-filename',
      '-d','test-outputs'
    ];

    // ACT
    await import('../src/app');

    // ASSERT
    expect(serverRunMock).toHaveBeenCalledWith({
      base: 8,
      limit: 20,
      showTable: true,
      fileName: 'test-filename',
      fileDestination: 'test-outputs'
    });

    // Reset Mock
    serverRunMock.mockClear();

  });

});