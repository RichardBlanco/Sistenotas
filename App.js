import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, Pressable } from 'react-native';

export default function  App() {
  const [identification, setIdentification] = useState('');
  const [names, setNames] = useState('');
  const [subject, setSubject] = useState('');
  const [noteMoment1, setNoteMoment1] = useState('');
  const [noteMoment2, setNoteMoment2] = useState('');
  const [noteMoment3, setNoteMoment3] = useState('');
  const [definitiva, setDefinitiva] = useState('');
  const [observation, setObservation] = useState('');
  const [studentsInfo, setStudentsInfo] = useState([]);
  const [isError, setIsError] = useState(false);

  const CalculateFinal = () => {
    if(identification === '' || names === '' || subject === '' || noteMoment1 === '' || noteMoment2 === '' || noteMoment3 === ''  ) {
      Alert.alert('Error', 'Favor llenar todos los campos');
      setIsError(true);
      return;
    }
    if(noteMoment1>5 || noteMoment2>5 || noteMoment3>5){
      Alert.alert('Recuerde', 'Las notas deben tener un valor de entre 0 y 5');
      setIsError(true);
      return;
    }
      // Verificar si ya existe una entrada con la misma materia e identificación
  const verification = studentsInfo.find(
    (student) =>
      student.identification === identification && student.subject === subject
  );

  if (verification) {
    Alert.alert(
      'Error',
      'Nota ya se encuentra ingresada en sistema para esta materia, verifique e intente nuevamente'
    );
    setIsError(true);
    return;
  }


    if (noteMoment1 && noteMoment2 && noteMoment3) {
      const moment1 = parseFloat(noteMoment1);
      const moment2 = parseFloat(noteMoment2);
      const moment3 = parseFloat(noteMoment3);
  
      if (moment1 >= 0 && moment1 <= 5 && moment2 >= 0 && moment2 <= 5 && moment3 >= 0 && moment3 <= 5) {
        const definitivaValue = ((moment1 * 0.3) + (moment2 * 0.35) + (moment3 * 0.35)).toFixed(2);
  
        setDefinitiva(() => definitivaValue);
  
        let obs;
        if (definitivaValue >= 2.95) {
          obs = 'Aprueba';
        } else if (definitivaValue >= 2 && definitivaValue <= 2.94) {
          obs = 'Habilita';
        } else {
          obs = 'Reprueba';
        }

  
        setObservation(() => obs);
  
        setStudentsInfo([...studentsInfo, {
          identification,
          names,
          subject,
          noteMoment1,
          noteMoment2,
          noteMoment3,
          definitiva: definitivaValue,
          observation: obs
        }]);
      } else {
        setIsError(true);
      }
    }
  };

  const clear = () => {
    setIdentification('');
    setNames('');
    setSubject('');
    setNoteMoment1('');
    setNoteMoment2('');
    setNoteMoment3('');
    setDefinitiva('');
    setObservation('');
    Alert.alert('Mensaje', 'Campos limpiados exitosamente');
    setIsError(false);
  };

  const search = () => {
    // Obtener los valores actuales de identification y subject
    const currentIdentification = identification;
    const currentSubject = subject;
    
    // Buscar la información del estudiante en el array usando los valores actuales
    const studentInfo = studentsInfo.find(student => student.identification === currentIdentification && student.subject === currentSubject);
    if (studentInfo) {
      // Actualizar los estados con la información encontrada
      setIdentification(studentInfo.identification);
      setNames(studentInfo.names);
      setSubject(studentInfo.subject);
      setNoteMoment1(studentInfo.noteMoment1);
      setNoteMoment2(studentInfo.noteMoment2);
      setNoteMoment3(studentInfo.noteMoment3);
      setDefinitiva(studentInfo.definitiva);
      setObservation(studentInfo.observation);
  
      // Mostrar la información encontrada
      Alert.alert('Mensaje','Información del estudiante encontrada.');
    } else {
      Alert.alert('Error','No se encontró información para la asignatura y la identificación ingresadas.');
      setIsError(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems:'center', justifyContent: 'space-around'}}>
      <Text style={{color:'darkblue', fontWeight:'bold', fontSize: 30, marginTop:30}}>Sistema de Notas</Text>
      </View>
      <Text style={styles.label}>Identificación</Text>
      <TextInput
        style={styles.input}
        value={identification}
        onChangeText={setIdentification}
        inputMode= 'numeric'
      />

      <Text style={styles.label}>Nombres</Text>
      <TextInput
        style={styles.input}
        value={names}
        onChangeText={setNames}
      />

      <Text style={styles.label}>Asignatura</Text>
      <TextInput
        style={styles.input}
        value={subject}
        onChangeText={setSubject}
      />

      <Text style={styles.label}>Nota Momento 1 (30%)</Text>
      <TextInput
        style={styles.input}
        value={noteMoment1}
        onChangeText={setNoteMoment1}
        inputMode='decimal'
     />

      <Text style={styles.label}>Nota Momento 2 (35%)</Text>
      <TextInput
        style={styles.input}
        value={noteMoment2}
        onChangeText={setNoteMoment2}
        inputMode='decimal'
      />

      <Text style={styles.label}>Nota Momento 3 (35%)</Text>
      <TextInput
        style={styles.input}
        value={noteMoment3}
        onChangeText={setNoteMoment3}
        inputMode='decimal'

      />

      <Text style={styles.label}>Definitiva</Text>
      <TextInput
        style={styles.input}
        value={definitiva}
        onChangeText={setDefinitiva}
        inputMode='decimal'
      />

      <Text style={styles.label}>Observación</Text>
      <TextInput
        style={styles.input}
        value={observation}
        onChangeText={setObservation}
      />

      <View>
      <Pressable style={{backgroundColor:'darkblue', borderRadius:10,alignItems:'center',justifyContent:'center', marginTop: 15, 
      height:50}} onPress={()=>CalculateFinal()}>
      <Text style={{color:'white', fontWeight:'bold', fontSize: 20}}>Calcular/Guardar</Text>
      </Pressable>
      </View>           

      <View style={{flexDirection:'row', alignItems:'center', justifyContent: 'space-around'}}>
      <Pressable style={{backgroundColor:'darkblue', borderRadius:10,alignItems:'center',justifyContent:'center', marginTop: 15, 
      width:175, height:40}} onPress={clear}>
      <Text style={{color:'white', fontWeight:'bold', fontSize: 20}} onPress={clear}>Limpiar</Text>
      </Pressable>

      <Pressable style={{backgroundColor:'darkblue', borderRadius:10,alignItems:'center',justifyContent:'center', marginTop: 15, 
      width:175, height:40}} onPress={search}>
      <Text style={{color:'white', fontWeight:'bold', fontSize: 20}}>Buscar</Text>
      </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: 'darkblue',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    paddingHorizontal: 10,
  },
});