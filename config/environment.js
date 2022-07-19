

const development = {
   name:'development',
   asset_path:'/assets',
   session_secret:"Anandamalthunai",
   db:'v_socialize_dev',
   smtp:{
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'vsocialize369@gmail.com', 
      pass: 'wpdxuwginszkaasq', 
    },
  },
  google_client_id: '957095670216-r9s7dnb5ol57r7mmrtnknd2kkajucn77.apps.googleusercontent.com',
  google_client_secret: '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',
  google_callback_url: 'http://localhost:9000/user/auth/google/callback',
  jwt_secret:'Anandhamalthunai',
};

const production = {
   name:'production'
};

module.exports = development;