const express = require("express")
const router = express.Router();
const Post = require('../../models/Post')
const passport = require('passport');
const upload = require('../../config/mongoconnection')
const mongoose = require('mongoose');
const Grid = require('gridfs-stream')
const conn = mongoose.connection;

require('../../config/passport')(passport)
const Image = require("../../models/Image")

//@route GET api/post/myposts
// @desc get Posts by user
// @access private


router.get("/myposts", passport.authenticate('jwt', {session: false}), (req, res)=>{
    
    Post.find({user : req.user.id}).then(posts=>{
        return posts ?  res.status(200).json(posts) : res.status(200).json({status : "No Posts Yet"});
    }).catch(err=>{
        return res.status(404).json({error : "Some error occured"})
    })
})


//@route GET api/posts/all
//@desc get get all the posts
//@access private

router.get("/all", passport.authenticate('jwt', {session : false}), (req, res)=>{
    Post.find().then(posts=>{
        if(!posts)
        {
            return res.status(200).json({status : "No Posts Found !"})
        }else{
            return res.status(200).json(posts);
        }
    }).catch(err=>{
        return res.status(404).json({error : "Some error occured" })
    })
})

//@route GET api/posts/:id
//@desc get pos by id
//@access private

router.get("/:id", passport.authenticate('jwt', {session:false}), (req, res,err)=>{
    const id = req.params.id;
    Post.findById({_id : id}).then(post=>{
        return !post ? res.status(404).json({status: "Post Not found"}) :res.status(200).json({status: true, post : post})  
    })
})


//@route POST api/posts/:id
//@desc Like
//@access private


router.post("/like/:id", passport.authenticate('jwt', {session: false}), (req, res, err)=>{
    const id = req.params.id;
    const user = req.user.id;
    Post.findByIdAndUpdate(id,{ $addToSet : {likes : user}},{new : true}).then(post=>{
        return !post ? res.status(404).json({status: "Post Not found"}) :res.status(200).json({status: true, post : post})
    })
})


//@route POST api/posts/upload
//@desc Like
//@access private


router.post("/upload", passport.authenticate('jwt', {session : false}),upload.single('post'), (req, res)=>{
    const newPost = new Post({
        text: req.body.text,
        user : req.user.id,
    })
    newPost.save().then(post=>{
        const user = req.user.id;
        const file = req.file;
        const newImage = new Image({
            filename : file.filename,
            user : user,
            post : post._id,
            url : "/api/posts/upload/" + file.filename
        })
        newImage.save().then(img=>{
            return res.status(201).json({succes : true, post: post, img : img})
        }).catch(err=>{
            return res.status(400).json({succes: false, img : "error"})
        })
    }).catch(err=>{
        return res.status(400).json({
            status : "Oops error occured",
            error: err
        })
    })
    
})



//@route GET api/posts/upload/:filename
//@desc getting the image by user
//@access private

router.get("/upload/:filename", passport.authenticate('jwt', {session:false}), (req, res)=>{
    const filename = req.params.filename;
    const gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection().find({filename: filename}).toArray((err, files)=>{
        if(!files || files.length === 0 || err)
        {
            return res.status(400).json({succes: false, img : "error"})
        }else{
            const file = files[0];
            res.set('Content-Type', file.contentType);
            res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
            const readStream = gfs.createReadStream({filename : filename})
            readStream.on("error", function(err) { 
                res.end();
            });
            readStream.pipe(res);
        }
    })
})


//@route POST api/posts/unlike/:id
//@desc UnLike
//@access private


router.post("/unlike/:id", passport.authenticate('jwt', {session: false}), (req, res, err)=>{
    const id = req.params.id;
    const user = req.user.id;
    Post.findByIdAndUpdate(id,{ $pull : {likes : user}},{new : true}).then(post=>{
        return !post ? res.status(404).json({status: "Post Not found"}) :res.status(200).json({status: true, post : post})
    })
})


module.exports = router;