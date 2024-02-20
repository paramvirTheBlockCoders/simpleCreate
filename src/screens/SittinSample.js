import React from 'react';
import { View, Text, StyleSheet, ScrollView,ImageBackground,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SittingDetail = ({ route }) => {
  const { productData,alldata,ArtNo } = route.params;
  const navigation = useNavigation();
  console.log(productData, "Product Data");
  console.log(alldata,"=-=-=-=-=-=-=- 9999");
  console.log( productData[0].ArtNo);

  const handleNext = async () => {
    try {
      console.log("Next call");
      navigation.navigate('Commant',{ ArtNo:ArtNo});
    } catch (error) {
      console.error('Navigation failed:', error.message);
    }
  };

  const handleRegister = async () => {
    try {
      let dd =alldata.data
      if(dd.length > 0){
        navigation.navigate('ArticleDetail', { productData: alldata.data, alldata: alldata, ArtNo: productData[0].ArtNo});
      }else{
        Alert.alert('Not found', 'The Article Data of This Product not Found');
      }
    } catch (error) {
      console.error('Navigation failed:', error.message);
    }
  };
  const handleRegister2 = async () => {
    try {
      let dd =alldata.data1
      if(dd.length > 0){
        navigation.navigate('Exhibit', { productData: alldata.data1, alldata: alldata, ArtNo: productData[0].ArtNo});
      }else{
        Alert.alert('Not found', 'The Exhibit Data of This Product not Found');
      }
    } catch (error) {
      console.error('Navigation failed:', error.message);
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/bg/bg1.png')} style={styles.backgroundImage}>

    <View style={styles.container}>
      <Text style={styles.title}>Sitting Samples</Text>
      <ScrollView horizontal={true}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={styles.columnHeader}>ArtNo</Text>
            <Text style={styles.columnHeader}>Colour Code</Text>
            <Text style={styles.columnHeader}>E. Colour</Text>
            <Text style={styles.columnHeader}>C. Colour</Text>
            <Text style={styles.columnHeader}>Quantity</Text>
            <Text style={styles.columnHeader}>Unit</Text>
            <Text style={styles.columnHeader}>L1</Text>
            <Text style={styles.columnHeader}>L2</Text>
            <Text style={styles.columnHeader}>Fabric Remarks</Text>
          </View>

          {/* Table Data */}
          {productData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.ArtNo}</Text>
              <Text style={styles.tableCell}>{item['Color Code']}</Text>
              <Text style={styles.tableCell}>{item['E. Color']}</Text>
              <Text style={styles.tableCell}>{item['C. Color']}</Text>
              <Text style={styles.tableCell}>{item.Quantity}</Text>
              <Text style={styles.tableCell}>{item.Unit}</Text>
              <Text style={styles.tableCell}>{item.L1}</Text>
              <Text style={styles.tableCell}>{item.L2}</Text>
              <Text style={styles.tableCell}>{item['Fabric Remarks']}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleNext} style={{...styles.registerBtn1, backgroundColor: '#fa454d'}}>
          <Text style={{color: 'black', textAlign: 'center'}}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister} style={styles.registerBtn}>
          <Text style={styles.loginText}>Article Detail</Text>
          <Text style={styles.arrow}> ></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister2} style={styles.registerBtn}>
          <Text style={styles.loginText}>Exhibit Location</Text>
          <Text style={styles.arrow}> ></Text>
        </TouchableOpacity>
        
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'column',
    maxHeight: 300, // Decrease the height of the table
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  columnHeader: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 100, // Set minimum width for each column
    borderRightWidth: 1, // Add border to the right
    borderColor: 'black',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderRightWidth: 1, // Add border to the right
    borderColor: 'black',
    textAlign: 'center',
    minWidth: 100, // Set minimum width for each column
  },
  registerBtn1:{
    width: "100%",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    
  },
  registerBtn: {
    width: "100%",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "#fa454d",
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default SittingDetail;
