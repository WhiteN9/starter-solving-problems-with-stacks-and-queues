const Queue = require("../lib/queue");

/**
 *
 * @param {*} Graph an object containing key-value pair where the key is the user's identity and the values are an array of the users they follow
 * @param {*} startUser 1st user's name
 * @param {*} endUser 2nd user's name
 * @returns a link from the 1st to the 2nd user through their follow
 */
const connected = (Graph, startUser, endUser) => {
  //use an enqueued array to track which users have been added to the queue
  if (Object.keys(Graph).length === 0) {
    return false;
  }
  if (startUser === endUser) {
    return true;
  }
  const discovered = new Queue();
  const enqueued = new Array();
  discovered.enqueue(startUser);
  enqueued.push(startUser);

  while (discovered.first) {
    let user = discovered.first.value;
    const following = Graph[user];
    for (const followedUser of following) {
      if (followedUser === endUser) {
        return true;
      } else if (!enqueued.includes(followedUser)) {
        discovered.enqueue(followedUser);
        enqueued.push(followedUser);
      }
    }
    discovered.dequeue();
  }
  return false;
};

const graph = {
  A: ["B", "C"],
  B: ["F", "D"],
  C: ["E"],
  D: ["C", "B"],
  E: ["D", "F"],
  F: [],
};

console.log(connected(graph, "F", "E"));
module.exports = connected;
//Initially, each user node in the following diagram is white, indicating that the node hasn't been discovered yet. Once discovered, the user is enqueued, and the node is filled with gray lines. After everyone the user is following has been discovered, the user node is colored solid gray. These colors are simply indicators of the state of the user; they're there to make it easier to see how the algorithm proceeds.
