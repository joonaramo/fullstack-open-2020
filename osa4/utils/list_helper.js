const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    return blogs.reduce((acc, cur) => acc + cur.likes, 0);
  }
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  return blogs.reduce((acc, cur) => (acc.likes > cur.likes ? acc : cur));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
