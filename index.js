const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');//used for hashing the password
const app = express();

const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');//for '/profile get api'

//for uploadinig the content of post i.e title,summary,image etc in 'upload' folder
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);//used for hashing the password
const secret = 'asdfe45we45w345wegw345werjktjwertkj';
 
 
//as we have used credential in login page so need to make it true here
app.use(cors({credentials:true,origin:'http://localhost:3000'}));

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://l201305:RivEXju4CTuHgc9l@cluster0.7fxryrd.mongodb.net/?retryWrites=true&w=majority');
 

app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try{
      const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt),
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });

  
app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    //find a user with the entered username
    const userDoc = await User.findOne({username});
    //match the password for the fined user
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      // logged in
      jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
  });


  app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
    let newPath = null;
    if (req.file) {
      const {originalname,path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ext;
      fs.renameSync(path, newPath);
    }
  
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {id,title,summary,content} = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('you are not the author');
      }
      await postDoc.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });
      res.json(postDoc);
    });
  });
  

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    });
  });

  app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
  });

  
app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];//entension of file
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
       const {title,summary,content} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author:info.id,
    });
    res.json(postDoc);
  });
    });

//  Delete API  
app.delete('/delete', uploadMiddleware.single('file'), async (req, res) => {
    console.log("In del api");
    // const postId = req.params.postId;
    
    // try {
    //   // Check if the user is authorized to delete the post
    //   const { token } = req.cookies;
    //   const decodedToken = jwt.verify(token, secret);
    //   const userId = decodedToken.id;
    //   const post = await Post.findById(postId);
      
    //   if (!post) {
    //     return res.status(404).json({ message: 'Post not found' });
    //   }
      
    //   if (post.author.toString() !== userId) {
    //     return res.status(403).json({ message: 'You are not authorized to delete this post' });
    //   }
      
    //   // Delete the post
    //   await Post.findByIdAndDelete(postId);
      
    //   res.json({ message: 'Post deleted successfully' });
    // } 
    // catch (error) {
    //   console.error('Error deleting post:', error);
    //   res.status(500).json({ message: 'An error occurred while deleting the post' });
    // }
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;

      const {userid,postid} = req.body;
      const postDoc = await Post.findById(postid);
    //   const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

    //   const {userinf,postinf} = req.body;
    //   const postDoc = await Post.findById(userinf.id);
    //   const isAuthor = JSON.stringify(postDoc) === JSON.stringify(postinf.author._id);
    //   if (!isAuthor) {
    //     return res.status(400).json('you are not the author');
    //   }
    console.log(postDoc);
      await Post.findByIdAndDelete(postid);

    //   await postDoc.updateOne({
    //     title,
    //     summary,
    //     content,
    //     cover: newPath ? newPath : postDoc.cover,
    //   });
      res.json(postDoc);
    });
  });

  
  app.get('/post', async (req,res) => {
    res.json(
      await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    );
  });
  
app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
  })
app.listen(4000);