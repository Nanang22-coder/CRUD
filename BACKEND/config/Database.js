import { Sequelize } from "sequelize";

const db = new Sequelize('crud_db','ant','0122',{host: 'localhost',dialect: 'mysql'
})

export default db