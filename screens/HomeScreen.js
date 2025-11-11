import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { createTable, getPersonas, deletePersona } from '../database/db';

export default function HomeScreen({ navigation }) {
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        createTable();
        loadData();
    }, []);

    const loadData = () => {
        getPersonas(setPersonas);
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Button title="Agregar Persona" onPress={() => navigation.navigate('Form')} />
            <FlatList
            data={personas}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
                <Text>{item.nombre} - {item.edad} años - {item.email}</Text>
                <Button title="Editar" onPress={() => navigation.navigate('Form', { persona: item })} />
                <Button title="Eliminar" color="red" onPress={() => { deletePersona(item.id); loadData(); }} />
            </View>
            )}
        />
        </View>
    );
}
