module.exports =(sequelize,DataTypes)=>{
    const Student = sequelize.define('student',
    {
        name:DataTypes.STRING
    },
        {
            underscored:true,
            // tableName:"student"
        }
    )
    return Student;
}
 
