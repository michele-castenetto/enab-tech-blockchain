const fs = require("fs");
const path = require("path");
const BBPromise = require("bluebird");



const readFile = BBPromise.promisify(fs.readFile);
const writeFile = BBPromise.promisify(fs.writeFile);
const appenFile = BBPromise.promisify(fs.appendFile);
const deleteFile = BBPromise.promisify(fs.unlink);
const rename = BBPromise.promisify(fs.rename);
const mkdir = BBPromise.promisify(fs.mkdir);
const stat = BBPromise.promisify(fs.stat);
const lstat = BBPromise.promisify(fs.lstat);
const readdir = BBPromise.promisify(fs.readdir);



const readJson = function(path) {
    return new BBPromise(function(resolve, reject) {
        fs.readFile(path, "utf8", function(err, text) {
            if (err) { return reject(err);}
            try {
                const result = JSON.parse(text);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    });
};


const readJsonSync = function(path) {
    try {
        const text = fs.readFileSync(path, "utf8");
        const result = JSON.parse(text);
        return result;
    } catch (error) {
        throw error;
    }
};


const writeJson = function(path, content) {
    return new BBPromise(function(resolve, reject) {
        const text = JSON.stringify(content, null, "    ");
        fs.writeFile(path, text, "utf8", function(err) {
            if (err) { return reject(err);}
            resolve();
        });
    });
};


const writeJsonSync = function(path, content) {
    const text = JSON.stringify(content, null, "    ");
    fs.writeFileSync(path, text);
};


const checkExist = function(path) {
    return new BBPromise(function (resolve) {
        fs.access(path, function (err) {
            if (err) { resolve(false); } 
            else { resolve(true); }
        });
    });
};


const checkExistSync = function(path) {
    try {
        fs.accessSync(path);
        return true;
    } catch (error) {
        return false;
    }
};


const ensureDir = (dirpath) => {
    return new BBPromise((resolve, reject) => {
        fs.mkdir(dirpath, err => {
            if (err && err.code != 'EEXIST') { }
            resolve();
        });
    });
};


const ensureDirSync = function(dirpath) {
    if (!fs.existsSync(dirpath)){
        fs.mkdirSync(dirpath);
    }
};


const copyFile = function (src, dest) {
    return new BPromise(function (resolve, reject) {
        const readStream = fs.createReadStream(src);
        const writeStream = fs.createWriteStream(dest);
        readStream.on('error', function (err) {
            reject(err);
        });
        writeStream.on('error', function (err) {
            reject(err);
        });
        writeStream.on('close', function () {
            resolve();
        });
        readStream.pipe(writeStream);
    });
};



// ##TODO capire se hanno senso metodi semplificati o meno
const isFile = function (filePath) {
    return new Promise(function (resolve, reject) {
        fs.lstat(filePath, function (err, stats) {
            if (err) { return reject(err); }
            resolve(stats.isFile());
        });
    });
};


const getDirFileList = async function(dirPath) {
    try {
        
        const elements = await readdir(dirPath);
        const files = [];

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            const elementPath = path.join(dirPath, element);

            const stats = await lstat(elementPath);
            
            const isFile = stats.isFile();

            if (isFile) { files.push(element); }

        }

        return files;

    } catch (error) {
        throw error;
    }
};


const getDirFileListSync = function(dirPath) {
    try {
        
        const elements = fs.readdirSync(dirPath);
        const files = [];

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            const elementPath = path.join(dirPath, element);

            const stats = fs.lstatSync(elementPath);
            
            const isFile = stats.isFile();

            if (isFile) { files.push(element); }

        }

        return files;

    } catch (error) {
        throw error;
    }
};









module.exports = {
    // fs promisificati
    readFile,
    writeFile,
    appenFile,
    deleteFile,
    rename,
    mkdir,
    stat,
    lstat,
    readdir,

    // new helpers
    readJson,
    readJsonSync,
    writeJson,
    writeJsonSync,
    checkExist,
    checkExistSync,
    ensureDir,
    ensureDirSync,
    copyFile,

    getDirFileList,
    getDirFileListSync

};