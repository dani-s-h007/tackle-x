import { database } from '../.firebase/index';

const createRoom = (obj) => {
  const id = new Date().getTime();
  return new Promise((resolve, reject) => {
    database
      .ref(id)
      .set(obj)
      .then(() => resolve({ roomID: id }))
      .catch((error) => reject(error));
  });
};

const joinRoom = async (roomID, name) => {
  const snap = await database.ref().child(roomID).get();

  let gameObj = snap.val();
  gameObj.second_player = name;

  return new Promise((resolve, reject) => {
    database
      .ref(roomID)
      .set(gameObj)
      .then(() => resolve({ roomID }))
      .catch((error) => reject(error));
  });
};

export { createRoom, joinRoom };