const fs: any = jest.createMockFromModule("fs");

const _fs = jest.requireActual("fs");

Object.assign(fs, _fs);

let readMocks: any = {};

fs.setReadMock = (path: string, error: string | Error, data: any) => {
  readMocks[path] = [error, data];
};
fs.readFile = (path: string, options: any, callback: Function) => {
  if (callback === undefined) {
    callback = options;
  }
  if (path in readMocks) {
    callback(...readMocks[path]);
  } else {
    _fs.readFile(path, options, callback);
  }
};
let writeMocks: any = {};

fs.setWriteMock = (path: string, callback: Function) => {
  writeMocks[path] = callback;
};
fs.writeFile = (path: string, data: any, options: any, callback: Function) => {
  if (callback === undefined) {
    callback = options;
  }
  if (path in writeMocks) {
    writeMocks[path](path, data, options, callback);
  } else {
    _fs.writeFile(path, data, options, callback);
  }
};
fs.clearMocks = () => {
  readMocks = {};
  writeMocks = {};
};

export default fs;
