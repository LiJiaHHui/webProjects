const config = require('../config').database
const mysql = require('mysql')
const pool = mysql.createPool(config)
const query = function(sql,sucCb,errCb){
  pool.getConnection(function(err,conn){
    if(err){
      let data={
        code:500,
        message:"请求失败",
        data:err
      };
      errCb(data);
    }else{
      conn.query(sql,function(err,result){
        if(err){
          let data={
            code:500,
            message:"查询请求失败",
            data:err
          };
          errCb(data);
        }else{
          sucCb(result);
          conn.release()
        }
      })
    }
  })
}
module.exports = query; 