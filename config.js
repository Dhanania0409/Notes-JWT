require('dotenv').config();

const env = process.env.NODE_ENV || 'development'; 

const config = {
    app: {
      port: process.env.PORT || 3000,
      jwtKey: process.env.JWT_SECRET || 'default_secret',
    },
    db: {
      uri: process.env.MONGODB_URI || 'mongodb+srv://sourav12:sourav12@notesdb.akfrhdr.mongodb.net/',
    }
};

const baseConfig = {
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  db: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://sourav12:sourav12@notesdb.akfrhdr.mongodb.net/',
  }
};

const envConfig = {
  development: {
    jwtKey: 'development_secret', 
  },
  production: {
    jwtKey: process.env.JWT_SECRET, 
  },
  test: {
    jwtKey: 'test_secret',
    db: {
      uri: 'mongodb+srv://sourav12:sourav12@notesdb.akfrhdr.mongodb.net/', 
    }
  }
};


module.exports = config;
