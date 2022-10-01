import * as SQLite from 'expo-sqlite';

export class Database {
  static db() {
    return SQLite.openDatabase('places.db');
  }

  static init() {
    const result = new Promise((resolve, reject) => {
      this.db().transaction((transaction) => {
        transaction.executeSql(
          `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT,
                address TEXT NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL
            );`,
          [],
          () => resolve(),
          (_, error) => reject(error)
        );
      });
    });

    return result;
  }

  static createPlace({ title, imageUri, address, latitude, longitude }) {
    const result = new Promise((resolve, reject) => {
      this.db().transaction((transaction) => {
        transaction.executeSql(
          `
            INSERT INTO places (title, imageUri, address, latitude, longitude)
                        VALUES (?, ?, ?, ?, ?);
          `,
          [title, imageUri, address ?? '', latitude, longitude],
          (_, resultSet) => resolve(resultSet.insertId),
          (_, error) => reject(error)
        );
      });
    });

    return result;
  }

  static getAllPlaces() {
    const result = new Promise((resolve, reject) => {
      this.db().transaction((transaction) => {
        transaction.executeSql(
          `SELECT * FROM places ORDER BY id DESC;`,
          [],
          (_, resultSet) => resolve(resultSet.rows._array),
          (_, error) => reject(error)
        );
      });
    });

    return result;
  }

  static findPlaceById(id) {
    const result = new Promise((resolve, reject) => {
      this.db().transaction((transaction) => {
        transaction.executeSql(
          `SELECT * FROM places WHERE id = ?;`,
          [id],
          (_, resultSet) => resolve(resultSet.rows.item(0)),
          (_, error) => reject(error)
        );
      });
    });

    return result;
  }
}
