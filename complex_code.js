/*
Filename: complex_code.js
Description: This code demonstrates a complex and elaborate implementation of a social media feed.
*/

// Database representing the social media feed
const feedData = [
  { id: 1, username: "user1", content: "This is the first post!", likes: 10, comments: 5 },
  { id: 2, username: "user1", content: "Second post here!", likes: 25, comments: 13 },
  { id: 3, username: "user2", content: "Hello world!", likes: 5, comments: 2 },
  // ... more feed items
];

// Class representing a social media feed item
class FeedItem {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.content = data.content;
    this.likes = data.likes;
    this.comments = data.comments;
  }

  render() {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    // Render post content
    const contentElement = document.createElement("p");
    contentElement.innerText = this.content;
    postElement.appendChild(contentElement);

    // Render post metadata (likes and comments)
    const metadataElement = document.createElement("div");
    metadataElement.classList.add("metadata");

    const likesElement = document.createElement("span");
    likesElement.innerText = `Likes: ${this.likes}`;
    metadataElement.appendChild(likesElement);

    const commentsElement = document.createElement("span");
    commentsElement.innerText = `Comments: ${this.comments}`;
    metadataElement.appendChild(commentsElement);

    postElement.appendChild(metadataElement);

    // Append post element to the feed container
    const feedContainer = document.getElementById("feed-container");
    feedContainer.appendChild(postElement);
  }
}

// Function to initialize the social media feed
function initializeFeed() {
  const feedContainer = document.getElementById("feed-container");

  // Clear existing feed elements
  while (feedContainer.firstChild) {
    feedContainer.removeChild(feedContainer.firstChild);
  }

  // Render each feed item
  feedData.forEach((data) => {
    const feedItem = new FeedItem(data);
    feedItem.render();
  });
}

// Execute the feed initialization
initializeFeed();