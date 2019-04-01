module.exports = {
  port: process.env.PORT || 3000,
  //databaseURL: "postgres://plelnwfzdqmbpb:0af5da94d09fd58ae7dde28976e9a83764bae2784a0c73a314b40aeda15d6186@ec2-54-221-243-211.compute-1.amazonaws.com:5432/d8auhuoibbe3m2?ssl=true"
  
  /* For local database testing: COMMENT IT when attempt to connect heroku database, DON'T DELETE */
  databaseURL: "postgres://postgres:@localhost:5432/postgres",
};
