var index = function(req, res) {
  res.render('index', { layout: false });
};

module.exports = {
  index
};
