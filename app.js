const express = require("express");
const app = express();
const port = 8080;
require("./models");
app.get("/", (req, resp) => {
  resp.send("Homepage");
});
var userCtrl = require("./controllers/userController");
app.get("/add", userCtrl.addUser);
app.get("/crud", userCtrl.crudOperation);
app.get("/query", userCtrl.queryData);
app.get("/finder", userCtrl.finderData);
app.get("/settergetter", userCtrl.setterGetter);
app.get("/validation", userCtrl.validationCont);
app.get("/rawquery", userCtrl.rawQuery);
app.get("/addpost", userCtrl.addPosts);
app.get("/onetoone", userCtrl.oneToOne);
app.get("/belongsTo", userCtrl.belongsTo);
app.get("/onetomany", userCtrl.oneToMany);
app.get("/addtags", userCtrl.addTags);
app.get("/addposttags", userCtrl.addPostTags);
app.get("/loading", userCtrl.loading);
app.get("/paranoid", userCtrl.paranoid);
app.get("/transaction", userCtrl.transaction);
app.get("/hooks", userCtrl.hooks);
app.get("/queryinterface", userCtrl.queryinterface);




app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
