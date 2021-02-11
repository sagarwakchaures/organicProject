const PageModel = require('../model/pageModel');
let pageObj = {};

/**
 * @param {*} obj
 * create the user
 */
pageObj.createPage = async(obj) =>{
    let pageId = await pageObj.createPageId();
    obj['pageId'] = pageId;
    let result;
    try {
        result = await PageModel.create(obj);
    } catch(err){
        let error = new Error("Enable to page!!!");
        error.status = 500;
        throw error;
    }
    return result;
}

/**
 * create the userId based on previous userId
 */
pageObj.createPageId = async () => {
    let result = await PageModel.findOne({}).sort({pageId:-1});
    let pageId;
    if(!result) {
        pageId = 1
    } else {
        pageId = result.pageId + 1;
    }
    return pageId;
}

/**
 * update the user based on pageId
 */
pageObj.updatePage = async (pageId,obj) => {
    let result;
    try {
        result = await PageModel.updateOne({pageId: pageId},{$set:obj});
        if (result.deletedCount === 0) {
            throw new Error('Page Id is not exist');
        }
    } catch(err){
        let error = new Error(err.message);
        error.status = 404;
        throw error;
    }
    return result; 
}

/**
 * delete the user based on pageId
 */
pageObj.deletePage = async (pageId) => {
    let result;
    try {
        result = await PageModel.deleteOne({pageId: pageId});
        if (result.deletedCount === 0) {
            throw new Error('Page Id is not exist');
        }
    } catch(err){
        let error = new Error(err.message);
        error.status = 500;
        throw error;
    }
    return result; 
}

/**
 * retrieve the page data based on filters
 */
pageObj.retrievePage = async(filters) => {
    let result;
    try {
        result = await PageModel.find(filters);
    } catch(err){
        let error = new Error(err.message);
        error.status = 500;
        throw error;
    }
    return result; 
}

module.exports = pageObj;