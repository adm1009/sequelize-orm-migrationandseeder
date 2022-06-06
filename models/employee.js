
module.exports = (sequelize,DataTypes) =>{
    const Employees = sequelize.define("employee",{
        name:DataTypes.STRING
    },{
        // timestamps:false,
        paranoid:true,
        deleteAt:"softDelete",
       createdAt:false,
      updatedAt:false
    }

    )
    return Employees;
}