
import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert,FlatList,Linking , View, Modal, Dimensions,PermissionsAndroid,SafeAreaView, ScrollView,StyleSheet, Image, SafeArray, Text, TextInput, Button, Icon, TouchableOpacity } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function App ({route,navigation}){
    const {image}=route.params;
    const {uri}=route.params;
    const {author}=route.params;
    const {title}=route.params;
    const {source}=route.params;
    const {paragraph}=route.params;
    const {maintitle}=route.params;
    const [list, setList] = useState();
    const [loading, setloading] = useState(true);

    useEffect(() => { 
    },[])
     return(
             <ScrollView >
                 
              <View style={{alignItems:"center",margin:10}}>
                    <Text style={{fontSize:30,textAlign:'center',color:"red",fontWeight:"bold"}}>
                        {maintitle}
                    </Text>
              </View>
              <View style={styles.imagecont}>
                       <Image source={{uri:image}} style={styles.image}/>
                    </View>
              <View style={{alignItems:"center",margin:8}}>
                    <Text style={{fontSize:10,fontWeight:"bold"}}>
                        {author}
                    </Text>
              </View>
              <View style={{alignItems:"center"}}>
                    <Text>
                        {title}
                    </Text>
              </View>
              <View style={{alignItems:"center",margin:8}}>
                    <Text style={{fontSize:10,fontWeight:"bold"}}>
                        source:{source}
                    </Text>
              </View>
              <View style={{alignItems:"center",margin:10}}>
                    <Text>
                        {paragraph}
                    </Text>
              </View>
              <View style={{alignItems:"center",margin:10}}>
                <Text style={{color: 'red',fontSize:20}}
                        onPress={() => Linking.openURL(uri)}>
                    Click to go to original article
                    </Text>
                </View>
                <View style={{alignItems:"center",margin:10}}>
                <Text style={{color: 'red',fontSize:20}}
                        onPress={() => Linking.openURL('whatsapp://send?text='+uri)}>
                   share Link to Whatsapp
                    </Text>
                </View>
             </ScrollView>
   
  )
}




export default App;

const styles = StyleSheet.create({
    container: {
      padding:20,flexDirection:"row",display:"flex"
    },
    imagecont:{
        borderWidth:1,borderColor:"#444345",margin:20,alignItems:"center"
    },
    image:{
        height:100
    }
})
