import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,ScrollView,TouchableOpacity,TextInput,Button} from 'react-native';
import * as SQLite from "expo-sqlite";
import { useState } from 'react';

export default function App() {

  
  const [aidatTutar,setAidatTutar] = useState()
  const [daire,setDaire] = useState([])
  const [daireNo,setDaireNo] = useState()
  const [daireSahibi,setDaireSahibi] = useState()
  const [daireOdenenAy,setDaireOdenenAy] = useState()
  const [daireOdenmeyenAy,setDaireOdenmeyenAy] = useState()
  const [daireToplamAidatBorc,setDaireToplamAidatBorc] = useState()

  const daireNoChangeText = (input) =>{
    setDaireNo(input)
  }

  const daireSahibiChangeText = (input) =>{
    setDaireSahibi(input)
  }

  const daireOdenenAyChangeText = (input) =>{
    setDaireOdenenAy(input)
  }

  const daireOdenmeyenAyChangeText = (input) =>{
    setDaireOdenmeyenAy(input)
  }

  const aidatTutarChangeText = (input) =>{
    setAidatTutar(input)
   
  }

  async function CreateDataBase() {
    try {
        const db = await SQLite.openDatabaseSync('mydatabase.db')
        await db.execAsync('CREATE TABLE IF NOT EXISTS daire (daireNo INTEGER PRIMARY KEY NOT NULL,daireSahibi TEXT NOT NULL, daireOdenenAy INTEGER NOT NULL, daireOdenmeyenAy INTEGER NOT NULL, daireToplamAidatBorc INTEGER NOT NULL, aidatTutar INTEGER NOT NULL)')
    } 
    catch (e) {
        console.log(e)
    }
  }

  async function InsertDataBase() {
    try {
        const db = await SQLite.openDatabaseSync('mydatabase.db')
        const result = await db.runAsync('INSERT INTO daire (daireNo, daireSahibi, daireOdenenAy, daireOdenmeyenAy, daireToplamAidatBorc, aidatTutar) VALUES (?, ?, ?, ?, ?, ?)', Number(daireNo), daireSahibi, Number(daireOdenenAy), Number(daireOdenmeyenAy), Number(0),Number(aidatTutar))
        getallDataBase()
    } 
    catch (e) {
        console.log(e)
    }
  }

  async function UpdateDataBase() {
    try {
        const db = await SQLite.openDatabaseSync('mydatabase.db')
        const result = await db.runAsync('UPDATE daire SET daireSahibi=?, daireOdenenAy=?, daireOdenmeyen=?, WHERE daireNo=?', daireSahibi, Number(daireOdenenAy), Number(daireOdenmeyenAy))
        getallDataBase()
    } 
    catch (e) {
        console.log(e)
    }
  }

  async function DeleteDataBase(daireNo) {
    try {
        const db = await SQLite.openDatabaseSync('mydatabase.db')
        const result = await db.runAsync('DELETE FROM daire WHERE daireNo=?', Number(daireNo))
        getallDataBase()
    } 
    catch (e) {

        console.log(e)
    }
  }

  async function DeleteDataBaseD() {
    try {
        const db = await SQLite.openDatabaseSync('mydatabase.db')
        const result = await db.runAsync('DROP TABLE daire ')
        getallDataBase()
    } 
    catch (e) {

        console.log(e)
    }
  }


  async function getallDataBase() {
    try {
        const db = await SQLite.openDatabaseSync('mydatabase.db')
        const allRows = await db.getAllAsync('SELECT * FROM daire')
        setDaire(allRows)
        console.log(daire)
    } 
    catch (e) {
        console.log(e)
    }
  }


  async function UpdateDataBaseAidat() {
    try {
        const db = await SQLite.openDatabaseSync('mydatabase.db')
        const result = await db.runAsync('UPDATE daire SET aidatTutar=?', Number(aidatTutar))
        getallDataBase()
    } 
    catch (e) {
        console.log(e)
    }
  }

  async function UpdateDataBase(daireOdenenAy,daireToplamAidatBorc,daireNo) {
    try {
        const db = await SQLite.openDatabaseSync('mydatabase.db')
        const result = await db.runAsync('UPDATE daire SET daireOdenenAy=?,daireToplamAidatBorc=? WHERE daireNo=?', Number(daireOdenenAy + 1),Number(daireToplamAidatBorc + Number(aidatTutar)),Number(daireNo))
        getallDataBase()
    } 
    catch (e) {
        console.log(e)
    }
  }

  function kaydet () {
    CreateDataBase()
    InsertDataBase()
    setDaireNo('')
    setDaireSahibi('')
    setDaireOdenenAy('')
    setDaireOdenmeyenAy('')
    
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Öztürk Apartmanı</Text>
      <TextInput placeholder='Daire No Giriniz' style={styles.daireNoTextInp} onChangeText={daireNoChangeText} value={daireNo} />
      <TextInput placeholder='Daire Sahibi Adını Giriniz' style={styles.daireNoTextInp} onChangeText={daireSahibiChangeText} value={daireSahibi} />
      <TextInput placeholder='Odenen Aylar' style={styles.daireNoTextInp} onChangeText={daireOdenenAyChangeText} value={daireOdenenAy}/>
      <TextInput placeholder='Odenmeyen Aylar' style={styles.daireNoTextInp} onChangeText={daireOdenmeyenAyChangeText} value={daireOdenmeyenAy}/>
      <TouchableOpacity style={styles.kaydetButton} onPress={kaydet}>
        <Text>Kaydet</Text>
      </TouchableOpacity>
      <TextInput placeholder='Aidat Tutar' style={styles.daireAidatTextInp} onChangeText={aidatTutarChangeText} value={aidatTutar}/>
      <TouchableOpacity style={styles.fiyatButton} onPress={UpdateDataBaseAidat}>
        <Text>Fiyat</Text>
      </TouchableOpacity>

      {daire.map((item,index)=>(
        <View key={index} style={styles.gorunum}>
          <Text>Daire No : {item.daireNo}</Text>
          <Text>Daire Sahibi Adı : {item.daireSahibi}</Text>
          <Text>Daire Odenen Ay : {item.daireOdenenAy}</Text>
          <Text>Toplam Senet : {item.daireOdenmeyenAy}</Text>
          <Text>Toplam Odenmis Miktar : {item.daireToplamAidatBorc}</Text>
          <Text>Aylik Aidat Tutari : {item.aidatTutar}</Text>
          <TouchableOpacity style={styles.odendiButton} onPress={()=> UpdateDataBase(item.daireOdenenAy,item.daireToplamAidatBorc,item.daireNo)}>
            <Text>Odendi</Text>
          </TouchableOpacity>
          <Button title='sil' onPress={() => DeleteDataBase(item.daireNo)}/>
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.2,
    textAlign: 'center',
    color: '#111827',
    marginBottom: 16,
  },

  daireNoTextInp: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  kaydetButton: {
    alignSelf: 'stretch',
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: '#2563EB',
    backgroundColor: '#EAF2FF',
    paddingVertical: 12,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

daireAidatTextInp: {
  width: '100%',
  backgroundColor: '#FFFFFF',
  borderWidth: 1.5,
  borderColor: '#0EA5E9',
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 14,
  marginTop: 10,
  marginBottom: 6,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 2,
},

fiyatButton: {
  alignSelf: 'stretch',
  marginTop: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
  borderWidth: 1.5,
  borderColor: '#0EA5E9',
  backgroundColor: '#E9F7FF',
  paddingVertical: 10,
  justifyContent: 'center',
  alignItems: 'center',
},

  gorunum: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 14,
    marginTop: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: 6, 
  },

  odendiButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    borderWidth: 1.5,
    borderColor: '#22C55E',
    backgroundColor: '#ECFDF5',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#FFFFFF',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  daireItem: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },

  buttonText: {
    color: '#111827',
    fontWeight: '700',
  },
});
