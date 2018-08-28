/*
 * @Author: wllluoo.zhongpeipei 
 * @Date: 2018-08-28 15:55:56 
 * @Last Modified by: wllluoo.zhongpeipei
 * @Last Modified time: 2018-08-28 16:38:42
 */

const Swagger = require('swagger-client');
const Handlebars = require('handlebars');
const mkdirp = require('mkdirp');
const fs = require('fs');
const getDirName = require('path').dirname;
const url = 'http://192.168.80.69:8080/v2/api-docs';

const source = require('./template');

const buildData = (obj, method, url) => {

    const { description, tags, parameters } = obj;
    const newPara = parameters.map((par) => {
        const _par = par;
        if (_par.description) {
            _par.description = _par.description
                .replace(/\n/g, '')
                .replace(/<br\/>/g, '');
        }
        return _par;
    });
    const urlInit = url.replace(/[{}]/g, '').replace(/[\/-]/g, '_');
    const apiName = method + urlInit.replace(/_([a-zA-Z])/g, ($, $1) => $1.toUpperCase());

    return {
        url,
        method,
        tag: tags[0],
        description,
        parametersInPath: newPara.filter(value => value.in == 'path'),
        parametersInQuery: newPara.filter(value => value.in == 'query'),
        parametersInBody: newPara.filter(value => value.in == 'body'),
        apiName,
    }
}

const template = Handlebars.compile(source);

Handlebars.registerHelper('ifGet', function (v1, options) {
    if (v1 === 'get') {
        return options.fn(this);
    }
    return options.inverse(this);
});
function writeFile(path, contents, cb) {
    mkdirp(getDirName(path), (err) => {
        if (err) return cb(err);

        fs.writeFile(path, contents, cb);
    });
}

Swagger(url).then(({ spec: { paths, tags } }) => {
    const tagsObj = {};
    tags.forEach((tag) => {
        tagsObj[tag.name] = {
            items: [],
        };
    });
    Object.keys(paths).forEach((key) => {
        const obj = paths[key];
        if (obj.get) {
            const tag = obj.get.tags[0];
            const o = buildData(obj.get, 'get', key);
            tagsObj[tag].items.push(o);
        }

        if (obj.post) {
            const tag = obj.post.tags[0];
            const o = buildData(obj.post, 'post', key);
            tagsObj[tag].items.push(o);
        }

        if (obj.put) {
            const tag = obj.put.tags[0];
            const o = buildData(obj.put, 'put', key);
            tagsObj[tag].items.push(o);
        }

        if (obj.delete) {
            const tag = obj.delete.tags[0];
            const o = buildData(obj.delete, 'delete', key);
            tagsObj[tag].items.push(o);
        }

        if (obj.patch) {
            const tag = obj.patch.tags[0];
            const o = buildData(obj.patch, 'patch', key);
            tagsObj[tag].items.push(o);
        }
    });
    Object.keys(tagsObj).forEach((key) => {
        const contents = template(tagsObj[key]);
        writeFile(`./swaggerGen/${key}.js`, contents, (err) => {
            if (err) {
                return console.error(
                    `Autsch! Failed to store ${key} template: ${err.message}.`,
                );
            }
            console.log(`${key} template Saved!`);
        });
    });
});
