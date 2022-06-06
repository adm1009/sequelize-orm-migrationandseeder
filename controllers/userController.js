// const { Sequelize } = require("../models");
const { sequelize } = require("../models");
var db = require("../models");
const Users = db.users;
const Posts = db.posts;
const Tags = db.tags;
const Post_Tags = db.post_tags;
const Students = db.student;
const Employees = db.employee;


var { Sequelize, Op, QueryTypes, DataTypes } = require("sequelize");
// const { sequelize } = require("../models");
var addUser = async (req, resp) => {
  //   let data = await Users.build({
  //     name: "abhi",
  //     email: "abhi@gmail.com",
  //     gender: "male",
  //   });
  //   await data.save();
  let data = await Users.create({
    name: "abhijeet",
    email: "abhijeet@gmail.com",
    gender: "male",
  });

  //   data.name = "abhijeet mulik";
  // console.log(data.dataValues);
  //   data.save();
  //   data.destroy();

  // data.name = "abhis";
  // data.reload();

  let response = {
    data: "ok",
  };
  resp.status(200).json(response);
};

var crudOperation = async (req, resp) => {
  //find
  let data = await Users.findOne({});
  //insert
  //     let data = await Users.create({
  //         name: "mulik",
  //         email: "mulik@gmail.com",
  //         gender: "male",
  //       });
  // console.log(data.id);
  let response = {
    data: data,
  };
  //update
  //   let data= await Users.update({name:"final"},{
  //       where:{id:2}
  //   })

  //delete
  //   let data= await Users.destroy({where:{id:2}})

  //truncate
  // let data= await Users.destroy({
  //     truncate:true
  // })

  //bulkinsert
  // let data= await Users.bulkCreate([
  //     {name:"final",email:"final@gmail.com",gender:"male"},
  //     {name:"final1",email:"final1@gmail.com",gender:"male"},
  //     {name:"final2",email:"final2@gmail.com",gender:"male"},
  // ])

  resp.status(200).json(response);
};

var queryData = async (req, resp) => {
  //fields
  // let data = await Users.create({
  //           name: "mulik",
  //           email: "mulik@gmail.com",
  //           gender: "male",
  //         },{
  //           fields:["email"]
  //         });

  //select
  //   let data = await Users.findAll({
  //     attributes:["name",
  //     // "email"
  //     ["email","emailID"],
  //     [Sequelize.fn('CONCAT',Sequelize.col("email"),"ID"),"emailCount"]
  //   ]
  //   });

  //incude and exclude
  // let data = await Users.findAll({
  //       attributes:{exclude:["name"],include:[[Sequelize.fn('CONCAT',Sequelize.col("name"),"mulik"),"fullname"]]
  //       }
  //     });

  //condition and operator and order and limit and offset and groupby
  // let data = await Users.findAll({
  //   where:{
  //     // id:2
  //     id:{
  //       // [Op.eq]:2
  //       [Op.gt]:2
  //     }
  //   },
  //   order:[
  //     ["name","DESC"]
  //   ],
  //   group:["name"],
  //   limit:2,
  //   offset:1
  // });

  //count
  let data = await Users.count({});
  let response = {
    data: data,
  };
  resp.status(200).json(response);
};

var finderData = async (req, resp) => {
  //  let data = await Users.findAll({})
  // let data = await Users.findOne({})
  // let data = await Users.findByPk(2)
  //  let data = await Users.findAndCountAll({
  //    where:{
  //      email:"abhi123@gmail.com"
  //    }
  //  })
  let [data, created] = await Users.findOrCreate({
    where: {
      name: "dummy1",
    },
    defaults: {
      email: "dummy1@gmail.com",
      gender: "male",
    },
  });
  let response = {
    data: data,
    add: created,
  };
  resp.status(200).json(response);
};

//setter and getter
var setterGetter = async (req, resp) => {
  // let data = await Users.create({
  //             name: "mulik",
  //             email: "mulik@gmail.com",
  //             gender: "male",
  //           })
  //  let response = {
  //    data:"setter getter"
  //  }

  var data = await Users.findAll({});
  let response = {
    data: data,
  };
  resp.status(200).json(response);
};

//validation and constraints

var validationCont = async (req, resp) => {
  try {
    let data = await Users.create({
      name: "abhi",
      email: "abhi@gmail.com",
      gender: "males",
    });
  } catch (e) {
    const message = {};
    e.errors.forEach((error) => {
      let messages;
      // console.log(error);
      switch (error.validatorKey) {
        case "equals":
          console.log(error.message);
          message = "gender not correct";
          break;
        case "isIn":
          console.log(error.message);
          message = "gender not from selected";
          break;
      }
      // console.log(error.validatorKey);
      messages[error.path] = message;
      console.log(messages);
    });
    // console.log(e);
  }
  // let data = await Users.create({name:"abhi",email:"abhi@gmail.com",gender:"male"})
  let response = {
    data: "data",
  };
  resp.status(200).json(response);
};

var rawQuery = async (req, resp) => {
  let users = await db.sequelize.query(
    "Select * from users where gender= $gender ",
    {
      type: QueryTypes.SELECT,
      // model:Users,
      // mapToModel:true,
      // raw:true,
      // replacements:{gender:"male"}   //gender = :gender
      // replacements:['female']   //gender = ?
      // replacements: {gender:["male","female"]} //gender IN(:gender)
      // replacements:{searchEmail: '%@gmail.com'} //email LIKE :searchEmail
      bind: { gender: "males" },
    }
  );

  let response = {
    data: "ok",
    record: users,
  };
  resp.status(200).json(response);
};

var addPosts = async (req, resp) => {
  let data = await Posts.create({
    name: "Swift",
    title: "car",
    content: "racing",
    user_id: "1",
  });

  let response = {
    data: data,
  };
  resp.status(200).json(response);
};
var oneToOne = async (req, resp) => {
  let data = await Users.findAll({
    attributes: ["name", "email"],
    
    include: {
      model: Posts,
      as:"postdetail",
      attributes: ["title"],
    },
    where: { id: 8 },
  });

  resp.status(200).json(data);
};

var oneToMany = async (req, resp) => {
  let data = await Users.findAll({
    attributes: ["name", "email"],
    
    include: {
      model: Posts,
      as:"postdetail",
      attributes: ["title"],
    },
    where: { id: 1 },
  });

  resp.status(200).json(data);
};

var belongsTo = async (req, resp) => {
  let data = await Posts.findAll({
    include:{
      model:Users
    }
  });

  resp.status(200).json(data);
};

var addTags = async (req, resp) => {
  let data = await Tags.create({
    name: "Sports",
  });

  let response = {
    data: data,
  };
  resp.status(200).json(response);
};
var addPostTags = async (req, resp) => {
  let data = await Post_Tags.create({
    postId: 1,
    tagId:1
  });

  let response = {
    data: data,
  };
  resp.status(200).json(response);
};

//lazy loading
// var loading = async (req, resp) => {
//   let data = await Users.findOne({ where:{id:8}});
//   let postData =await data.getPosts();
//   let response={
//      data:data,
//      posts:postData
//   }
//   resp.status(200).json(response);
// };
//eager loading
var loading = async (req, resp) => {
  let data = await Users.findOne({ 
    include:[{
      // required:true,
      model:Posts,
      as:"postdetail"
    }],
    where:{id:8}});
  // let postData =await data.getPosts();
  let response={
     users:data,
    //  posts:postData
  }
  resp.status(200).json(response);
};
var paranoid = async (req,resp) =>{
  // let data = await Employees.findAll({
  //   where:{id:2}
  // })
  // let data = await Employees.destroy({
  //   where:{id:2}
  // })
  //  let data = await Employees.findAll({
  //   where:{id:{
  //     [Op.gt]:0
  //   }},
  //   paranoid:false
  // })
  // let data = await Employees.restore({
  //   where:{id:2}
  // })
   let data = await Employees.findAll({
    // where:{id:2}
  })
  resp.status(200).json(data)
};
var transaction = async (req,resp)=>{
  const t = await sequelize.transaction();
  // try{
  //   const user = await Users.create({name:"abhi",email:"abhi@gmail.com",gender:"male"});
  //   console.log("commited")
  //   t.commit();
  // }
  // catch(e){
  //   t.rollback("rollback")
  // }
  const data = await Users.findAll({
    // transaction:t,
    // lock:true
  })
  resp.status(200).json(data)
}
var hooks = async(req,resp)=>{
  let data = await Users.create({name:"demo",email:"demo@gmail.com",gender:"male"})
  resp.status(200).json(data);
}
var queryinterface = async(req,resp)=>{
  const queryinterface = sequelize.getQueryInterface();
  // queryinterface.createTable("avon",{
  //   name:DataTypes.STRING
  // })
  // queryinterface.addColumn("avon","email",{
  //   type:DataTypes.STRING
  // })
  // queryinterface.changeColumn("avon","email",{
  //   type:DataTypes.INTEGER
  // })
  // queryinterface.removeColumn("avon","email")
  queryinterface.dropTable("avon")
  let data = "queryinterface"
  resp.status(200).json(data);
}
module.exports = {
  addUser,
  crudOperation,
  queryData,
  finderData,
  setterGetter,
  validationCont,
  rawQuery,
  oneToOne,
  addPosts,
  belongsTo,
  oneToMany,
  addTags,
  addPostTags,
  loading,
  paranoid,
  transaction,
  hooks,
  queryinterface
};
