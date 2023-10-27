const crypto=require("crypto");

//returning hashed user password
function getPassword(password){
    
    // creating random salt
    const salt=crypto.randomBytes(32).toString('hex');

    // hashing user password with the random salt
    const hashPassword=crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex');

    return {
        salt:salt,
        hash:hashPassword
    }
}

module.exports={
    getPassword,
}