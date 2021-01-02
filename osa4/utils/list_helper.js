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
    return undefined;
  }
  return blogs.reduce((acc, cur) => (acc.likes > cur.likes ? acc : cur));
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }
  const countedBlogs = blogs.reduce(function (allBlogs, blog) {
    if (blog.author in allBlogs) {
      allBlogs[blog.author]++;
    } else {
      allBlogs[blog.author] = 1;
    }
    return allBlogs;
  }, {});
  const authorWithMostBlogs = Object.keys(countedBlogs).reduce((a, b) =>
    countedBlogs[a] > countedBlogs[b] ? a : b
  );
  return {
    author: authorWithMostBlogs,
    blogs: countedBlogs[authorWithMostBlogs],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
