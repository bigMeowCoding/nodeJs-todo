
const fs: any = jest.createMockFromModule("fs");

const _fs = jest.requireActual("fs");

Object.assign(fs, _fs);

const mocks: any = {};

fs.setMock = (path: string, error: string | Error, data: any) => {
  mocks[path] = [error, data];
};

fs.readFile = (path: string, options: any, callback: Function) => {
  if (callback === undefined) {
    callback = options;
  }
  if (path in mocks) {
    callback(...mocks[path]);
  } else {
    _fs.readFile(path, options, callback);
  }
};

export default fs
