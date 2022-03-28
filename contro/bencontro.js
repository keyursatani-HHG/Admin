var hello = require('../Models/image');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
exports.insert_data = async function (req, res, next)
{
    try{
        data =
        {
            main:req.body.main,
            subtit:req.body.subtit,
            image_user: req.file.path,
        }
        const tag =await hello.create(data);
    
        res.status(201).json({
            data:tag,
            status: "Data insert",
        })
    }
    catch(error){
        console.log("not data insert........!");
    }
}

exports.find_data = async function (req, res, next)
{
    try {
            const tag = await hello.find();
            
            res.status(200).json({
            status: "find data",
            data: tag,
            })
    } catch (error) {
        console.log("not find data........!");
    }
}

exports.find_data_Id = async function (req, res, next)
{
    try {
            const tag = await hello.findById(req.params.id);
            res.status(200).json({
            status: "find id",
            data: tag
        })
    } catch (error) {
        console.log("Data not find by id........!");
    }
}


exports.Delete_data = async function (req, res, next)
{
    try {
        await hello.findByIdAndDelete(req.params.id);
        res.status(204).json({
        status: "delete",  
                      
        });
    } catch (error) {
        console.log("Data not delete........!");
    }
}


exports.Update_data = async function (req, res, next) {
    try {        
        var BannerData = await hello.findById(req.body.Id);
        BannerData.main = req.body.main;
        BannerData.subtit = req.body.subtit;
        if (req.file != null) {
            await unlinkAsync(BannerData.image_user);
            BannerData.image_user = req.file.path;
        }
        await hello.findByIdAndUpdate(req.body.Id, BannerData);
        res.status(201).json({
            status: "success",
            data:req.file,
        })        
    } catch (error) {
        console.log(error);
    }
}

