import * as SQLite from "expo-sqlite";
import Place from "../Models/Place";

const dataBase = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    dataBase.transaction((tx) => {
      tx.executeSql(
        `
                    CREATE TABLE IF NOT EXISTS places (
                        id INTEGER PRIMARY KEY NOT NULL,
                        image TEXT NOT NULL,
                        name TEXT NOT NULL,
                        address TEXT NOT NULL,
                        lat REAL NOT NULL,
                        lng REAL NOT NULL
                    )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function InsertPlaces(places) {
  const promise = new Promise((resolve, reject) => {
    dataBase.transaction((tx) => {
      tx.executeSql(
        `
                    INSERT INTO places (image, name, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          places.image,
          places.name,
          places.address,
          places.location.lat,
          places.location.lng,
        ],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    dataBase.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          let places = [];
          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.name,
                dp.image,
                { address: dp.address, latitude: dp.lat, longitude: dp.lng },
                dp.id
              )
            );
          }
          const reversedPlaces = places.reverse();
          resolve(reversedPlaces);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
}

export const fetchDetails = (id) => {
  const promise = new Promise((resolve, reject) => {
    dataBase.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          const dbPlace = result.rows._array[0];
          resolve(
            new Place(
              dbPlace.name,
              dbPlace.image,
              {
                address: dbPlace.address,
                latitude: dbPlace.lat,
                longitude: dbPlace.lng,
              },
              dbPlace.id
            )
          );
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deletePlace = (id) => {
  console.log(id);
  const promise = new Promise((resolve, reject) => {
    dataBase.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
