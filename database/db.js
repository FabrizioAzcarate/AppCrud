import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('appcrud.db');

// Crear tabla al iniciar
export const createTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS personas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT,
                edad INTEGER,
                email TEXT
            );`
        );
    });
};

export const getDBConnection = () => db;

export const insertPersona = (nombre, edad, email) => {
    const db = getDBConnection();
        db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO personas (nombre, edad, email) VALUES (?, ?, ?);',
            [nombre, edad, email],
            (_, result) => console.log('Insertado:', result),
            (_, error) => console.log('Error al insertar:', error)
        );
    });
};

export const getPersonas = (callback) => {
    const db = getDBConnection();
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM personas;',
        [],
        (_, { rows }) => callback(rows._array)
        );
    });
};

export const updatePersona = (id, nombre, edad, email) => {
    const db = getDBConnection();
    db.transaction(tx => {
        tx.executeSql(
            'UPDATE personas SET nombre=?, edad=?, email=? WHERE id=?;',
            [nombre, edad, email, id]
        );
    });
};

export const deletePersona = (id) => {
    const db = getDBConnection();
    db.transaction(tx => {
        tx.executeSql('DELETE FROM personas WHERE id=?;', [id]);
    });
};
