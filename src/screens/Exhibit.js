import React from 'react';
import { View, Text, StyleSheet, ImageBackground,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Exhibit = ({ route }) => {
  const navigation = useNavigation();
  const { productData,alldata,ArtNo } = route.params;
  // console.log(productData, "Product Data");
  console.log(ArtNo,"Exhibit page reached");
  console.log(productData,"Exhibit page reache ?>>?>?>??>>?");
  console.log(alldata);
  console.log(productData[0].ArticleNo,"Exhibit page reached");

  const handleRegister = async () => {
    try {
      let dd = alldata.data
      if(dd.length > 0){
        navigation.navigate('ArticleDetail', { productData: alldata.data,alldata:alldata,ArtNo:productData[0].ArticleNo }); 
      }else{
        Alert.alert('Not found', 'The Article Data of This Product not Found');
      }
   } catch (error) {
      console.error('Navigation failed:', error.message);
    }
  };
  const handleRegister2 = async () => {
    try {
      let dd = alldata.data2
      if(dd.length > 0){
        navigation.navigate('SittingDetail', { productData: alldata.data2,alldata:alldata,ArtNo:productData[0].ArticleNo })
      }else{
        Alert.alert('Not found', 'The Sitting Data of This Product not Found');
      }
    } catch (error) {
      console.error('Navigation failed:', error.message);
    }
  };
  const handleNext = async () => {
    try {
      console.log("Next call");
      navigation.navigate('Commant',{ ArtNo:ArtNo});
    } catch (error) {
      console.error('Navigation failed:', error.message);
    }
  };
  return (
    <ImageBackground source={require('../../assets/images/bg/bg5.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.contentBox}>
          <Text style={styles.title}>Exhibit Detail:</Text>
          <View style={styles.item}>
            <Text style={styles.label}>Article No:</Text>
            <Text style={styles.value}>{productData[0].ArticleNo}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Exhibit samples:</Text>
            <Text style={styles.value}>{productData[0]['Exhibit Samples']}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Exhibit position1:</Text>
            <Text style={styles.value}>{productData[0]['Exhibit Position1']}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Exhibit position2:</Text>
            <Text style={styles.value}>{productData[0]['Exhibit Position2']}</Text>
          </View>

          <TouchableOpacity onPress={handleNext} style={{...styles.registerBtn1, backgroundColor: '#fa454d'}}>
          <Text style={{color: 'black', textAlign: 'center'}}>Next</Text>
        </TouchableOpacity>

          <TouchableOpacity onPress={handleRegister} style={styles.registerBtn}>
          <Text style={styles.loginText}>Article Details</Text>
          <Text style={styles.arrow}> ></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister2} style={styles.registerBtn}>
          <Text style={styles.loginText}>Sitting Samples</Text>
          <Text style={styles.arrow}> ></Text>
        </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    width: 120,
  },
  value: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
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
  registerBtn1:{
    width: "100%",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: 'black',
    textAlign: 'left',
  },
  arrow: {
    color: 'black',
    textAlign: 'right',
  },
});

export default Exhibit;