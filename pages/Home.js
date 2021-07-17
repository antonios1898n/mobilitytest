
import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert,FlatList, View, Modal, Dimensions,PermissionsAndroid,SafeAreaView, ScrollView,StyleSheet, Image, SafeArray, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import { SearchBar,Icon  } from 'react-native-elements';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function App ({navigation}){
    const [list, setList] = useState();
    const [filteredlist, setfilteredlist] = useState([]);
    const [loading, setloading] = useState(true);
    const [search, setSearch] = useState('');
    // RECORDS_PER_FETCHshowed is how many items will show when scrolling , here is 20 (in the showmore function we add 20 everytime we are at the scrollend)
    const [RECORDS_PER_FETCHshowed, setRECORDS_PER_FETCHshowed] = useState(20);
    useEffect(() => { 
        fetchdata()
    },[])
    
    const showmore=()=>{
        var a =parseInt(RECORDS_PER_FETCHshowed)+20;
        setRECORDS_PER_FETCHshowed(a)
    }
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text && text !="" && text !=null) {
            var filtered = list.filter( score => score.headline.main.includes(text));
            setfilteredlist(filtered);
            setSearch(text);
        } else {
            fetchdata()
            setfilteredlist([])
          // Inserted text is blank
            setSearch(text);
        }
      };
      const isCloseToBottom =({layoutMeasurement, contentOffset, contentSize})=>{
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
     }

    const fetchdata=async()=>{
        // get data from the api
        let c="https://api.nytimes.com/svc/search/v2/articlesearch.json?q=react&api-key=OAD0Qz0csaoDZLpw5ZR74TCeSjynnabJ"
        await fetch(c)
        .then((response) => response.json())
        .then((json) => { 
            setList(json["response"]["docs"]),setloading(false)
        })
    }
     return(
             <ScrollView style={{ height:windowHeight,width:windowWidth,backgroundColor:"white"}} 
             onScroll={({nativeEvent})=>{
                if(isCloseToBottom(nativeEvent)){
                    showmore()
                }
                }}
             >
                  <SearchBar
                    containerStyle={{backgroundColor:"grey"}}
                    // inputStyle={{backgroundColor:"white"}}
                    // leftIconContainerStyle={{backgroundColor:"white"}}
                    round
                    // style={{color:"red",backgroundColor:"white"}}
                    searchIcon={
                        <Text>>>>>></Text>}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onClear={(text) => searchFilterFunction('')}
                    placeholder="Type Here..."
                    value={search}
                    />
                 <View>
                     {/* if user not searching we show the original list  */}
                {
                    loading==true?null:filteredlist.length==0?list?list.length==0?null:
                    Object.keys(list).map((key,value) => {
                        if(value<RECORDS_PER_FETCHshowed){
                       return(
                                <TouchableOpacity 
                                    onPress={()=>{
                                        navigation.navigate('Detail',{
                                            image:list[value]["multimedia"].length==0?"null":list[value]["multimedia"][0].legacy.wide,
                                            title:list[value].uri,
                                            source:list[value].source,
                                            paragraph:list[value].lead_paragraph,
                                            maintitle:list[value].headline.main,
                                            author:list[value].byline.original,
                                            uri:list[value].web_url,


                                        })
                                    }}
                                        style={styles.bigcontainer} key={value}>
                                            <View  style={styles.container} >
                                                <View style={styles.imagecont}>
                                                   <Image source={{uri: list[value]["multimedia"].length==0?null:list[value]["multimedia"][0].legacy.wide}} style={styles.image}/>
                                                   </View>
                                                <View style={{width:windowWidth*0.4,alignItems:"center"}}>
                                                    <Text style={{color:"#444345",textAlign:'center',margin:5}}>
                                                        {list[value].headline.main}
                                                    </Text>
                                                    <Text style={{color:"#444345",margin:5}}>
                                                        {list[value].abstract}
                                                    </Text>
                                                </View>
                                         </View>
                                 </TouchableOpacity>
                       )}
                      })
                      :null:
                      Object.keys(filteredlist).map((key,value) => {
                            {/* if user is searching we show the filtered list different from the original one to always have the original data  */}
                        return(
                                 <TouchableOpacity 
                                     onPress={()=>{
                                         navigation.navigate('Detail',{
                                             image:list[value]["multimedia"].length==0?"null":filteredlist[value]["multimedia"][0].legacy.wide,
                                             title:filteredlist[value].abstract,
                                             source:filteredlist[value].source,
                                             paragraph:filteredlist[value].lead_paragraph,
                                             maintitle:filteredlist[value].headline.main,
                                             author:list[value].byline.original,
                                            uri:list[value].web_url,
 
 
                                         })
                                     }}
                                         style={styles.bigcontainer} key={value}>
                                             <View  style={styles.container} >
                                             <View style={styles.imagecont}>
                                                   <Image source={{uri: filteredlist[value]["multimedia"].length==0?null:filteredlist[value]["multimedia"][0].legacy.wide}} style={styles.image}/>
                                                   </View>
                                                 <View style={{width:windowWidth*0.4,alignItems:"center"}}>
                                                     <Text style={{color:"#444345",textAlign:'center',margin:5}}>
                                                         {filteredlist[value].headline.main}
                                                     </Text>
                                                     <Text style={{color:"#444345",margin:5}}>
                                                         {filteredlist[value].abstract}
                                                     </Text>
                                                 </View>
                                          </View>
                                  </TouchableOpacity>
                        )
                       })
                   
                }
                </View>
             </ScrollView>
   
  )
}




export default App;

const styles = StyleSheet.create({
    bigcontainer: {
        padding:20,margin:5
      },
    container: {
      padding:20,flexDirection:"row",display:"flex",margin:5,borderBottomWidth:1
    },
    imagecont:{
        width: 100,borderWidth:1,borderColor:"#444345",marginRight:10
    },
    image:{
        width: 100
    }
})
