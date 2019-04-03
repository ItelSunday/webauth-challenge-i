
module.exports = (req, res, next) => {
try {
    if (req.session && req.session.user) {
     next();
    } else {
      res.status(400).json({ message: 'Invalid Credentials' })
    } 
    } catch(error) {
        res.status(500).json({ message: 'Server not found'})
    }
  };