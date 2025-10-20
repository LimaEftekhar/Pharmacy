const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const register = async (req, res) =>{
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name: user.name}, token})
}

const login = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        throw new BadRequestError('please provide email and password')
        
    }

    const user = await User.findOne({email})
    
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
//compare password
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name}, token})
}

// Logout
const logout = async (req, res) => {
  try {
    // No session or cookie handling needed for JWT-based auth
    res.status(StatusCodes.OK).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Logout failed' });
  }
};

module.exports = {
    register,
    login,
    logout
}