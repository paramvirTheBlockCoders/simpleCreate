import React from 'react';
import { View, Text, StyleSheet, ImageBackground,TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ArticleDetail = ({ route }) => {
  const navigation = useNavigation();
  const { productData,alldata,ArtNo } = route.params;
   console.log(productData, "Product Data");
  console.log(alldata.data1,"=-=-=-=-=-=-=- 1111");
  // console.log(productData.data[0].ArtNo,"=-=-=-=-=-=-=- 1111");

  const handleRegister = async () => {
    try {
      let dd = alldata.data1
      if(dd.length > 0){
        navigation.navigate('Exhibit', { productData: alldata.data1, alldata: alldata, ArtNo: productData[0].ArtNo});
      }else{
        Alert.alert('Not found', 'The Exhibit Data of This Product not Found');
      }
    } catch (error) {
      console.error('Navigation failed:', error.message);
    }
  };
  const handleRegister2 = async () => {
    try {
      let dd = alldata.data2
      if(dd.length > 0){
        navigation.navigate('SittingDetail', { productData: alldata.data2,alldata:alldata,ArtNo:productData[0].ArtNo })
      }else{
        Alert.alert('Not found', 'The Exhibit Data of This Product not Found');
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
          <Text style={styles.title}>Article Detail</Text>
          <View style={styles.item}>
            <Text style={styles.label}>ArtNo:</Text>
            <Text style={styles.value}>{productData[0].ArtNo}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Compo:</Text>
            <Text style={styles.value}>{productData[0].Compo}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Density:</Text>
            <Text style={styles.value}>{productData[0].Density}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Finish:</Text>
            <Text style={styles.value}>{productData[0].Finish}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Group:</Text>
            <Text style={styles.value}>{productData[0].Group}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Texture:</Text>
            <Text style={styles.value}>{productData[0].Texture}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>U.Price ($):</Text>
            <Text style={styles.value}>{productData[0]['U.Price ($)']}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>U.Price (¥):</Text>
            <Text style={styles.value}>{productData[0]['U.Price (¥)']}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Weight (g/m2):</Text>
            <Text style={styles.value}>{productData[0]['Weight (g/m2)']}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Yarn Count:</Text>
            <Text style={styles.value}>{productData[0]['Yarn Count']}</Text>
          </View>
          <TouchableOpacity onPress={handleNext} style={{...styles.registerBtn1, backgroundColor: '#fa454d'}}>
          <Text style={{color: 'black', textAlign: 'center'}}>Next</Text>
        </TouchableOpacity>

          <TouchableOpacity onPress={handleRegister} style={styles.registerBtn}>
          <Text style={styles.loginText}>Exhibit Location</Text>
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

export default ArticleDetail;
