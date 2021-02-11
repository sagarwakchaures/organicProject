const express = require('express');
const router = express.Router();
const pageService = require('../service/pageService');
/**
 * add the page with fields
 */
router.post('/add',(req,res,next)=>{
    let params = req.body;
    if (!params.title) {    
        throw new Error('Title is required !!!');
    }
    params.content = params.content !== undefined ? params.content : null;
    params.keywords = params.keywords !== undefined ? params.keywords : [];
    params.createdBy =  { userId: req.loggedInUserInfo.userId, userName: req.loggedInUserInfo.name };
    pageService.createPage(params).then(()=>{
        return res.json({
            "status": 1,
            "message": "Page is created successfully !!!"
        });
    }).catch((err)=>{
        next(err);
    });
});

/**
 * get the page with fields
 */
router.get('/retrieve',(req,res,next)=>{
    let params = req.query;
    let filters = {};
    if (params.pageId) {    
        filters['pageId'] = Number(params.pageId);
    }
    if (params.title) {    
        filters['title'] = params.title;
    }
    if (params.content) {    
        filters['content'] = params.content;
    }
    if (params.keywords) {    
        filters['keywords'] = params.keywords;
    }
    pageService.retrievePage(filters).then((response)=>{
        return res.json({
            "status": 1,
            "data": response
        });
    }).catch((err)=>{
        next(err);
    });
});

/**
 * Delete user
 */
router.delete('/delete/:pageId',(req,res,next)=>{
    let pageId = req.params.pageId;   
    if (!pageId) {    
        throw new Error('pageId is required !!!');
    }
    pageService.deletePage(pageId).then(()=>{
        return res.json({
            "status": 1,
            "message": "Page is deleted successfully !!!"
        });
    }).catch((err)=>{
        next(err);
    });
});

/**
 * Update user
 */
router.put('/update/:pageId',(req,res,next)=>{
    let pageId = req.params.pageId;
    let updateObj = {};
    if (req.body.title !== undefined) {
        updateObj['title'] = req.body.title;
    }
    if (req.body.content !== undefined) {
        updateObj['content'] = req.body.content;
    }
    if (req.body.keywords !== undefined) {
        updateObj['keywords'] = req.body.keywords;
    }
    if (Object.keys(updateObj).length === 0) {
        return res.json({
            "status": 1,
            "message": "No data for updation !!!"
        });
    }
    pageService.updatePage(pageId,updateObj).then(()=>{
        return res.json({
            "status": 1,
            "message": "Page is updated successfully !!!"
        });
    }).catch((err)=>{
        next(err);
    });
});    
module.exports = router;