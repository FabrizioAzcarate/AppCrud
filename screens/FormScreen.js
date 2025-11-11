import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { insertPersona, updatePersona } from '../database/db';

export default function FormScreen({ route, navigation }) {
    const persona = route.params?.persona;
    const [nombre, setNombre] = useState(persona ? persona.nombre : '');
    const [edad, setEdad] = useState(persona ? String(persona.edad) : '');
    const [email, setEmail] = useState(persona ? persona.email : '');

    const handleSave = () => {
        if (persona) updatePersona(persona.id, nombre, edad, email);
        else insertPersona(nombre, edad, email);
        navigation.goBack();
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} />
            <TextInput placeholder="Edad" value={edad} onChangeText={setEdad} keyboardType="numeric" />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <Button title="Guardar" onPress={handleSave} />
        </View>
    );
}
