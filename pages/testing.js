import { Alert,FlatList, View, Modal, Dimensions,PermissionsAndroid,SafeAreaView, ScrollView,StyleSheet, Image, SafeArray, Text, TextInput, Button, Icon, TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import Progress from '../Components1/Progressbar'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openDatabase } from 'react-native-sqlite-storage'
var db=openDatabase({name:'cart.db'});
export default function Demo({route,navigation}) {
     
    const { useridrequest } = route.params;
    const { id } = route.params;
    const [submitted, setSubmitted] = useState(false);
    const [prodidss, setprodidss] = useState();
    const [list, setList] = useState();
   
    const [listdone, setlistdone] = useState();
    const [listfound, setlistfound] = useState([]);
  
    
    const [listrejected, setlistrejected] = useState([]);


    const [listbackup, setlistbackup] = useState();
    const [Confirmedlist, setConfirmedlist] = useState();
    const [Pendinglist, setPendinglist] = useState();
    const [Changedlist, setChangedlist] = useState();
    const [isloading, setLoading] = useState(true);
    const [FoundClicked, setFoundClicked] = useState(false);
    const [PendingClicked, setPendingClicked] = useState(false);
    const [RejectedClicked, setRejectedClicked] = useState(false);
    const [currentDate, setCurrentDate] = useState([]);
    const [startDate, setstartDate] = useState("Start Picking");
    const [endDate, setendDate] = useState([]);
    const [totaltime, settotaltime] = useState([]);
    useEffect(() => {
        console.log("taba2 useEffect")
        if (submitted) {
            gg()
          }
        //   setSubmitted(false);
        else{fetchdata();
            console.log("nafaz useeffect fetchdata")}
            navigation.addListener('focus', () => {
                fetchdata();
              });
            //   const credentials = [{ product_id: '25'}];
            //   var x=credentials.some(cred => cred.product_id === '25'); 
            //   console.log(x)
        db.transaction(function (txn) {
            txn.executeSql
                (
                    "SELECT NAME FROM SQLITE_MASTER WHERE TYPE='table' AND NAME='found'",
                    [],
                    function (tx, res) {
                        if (res.rows.length == 0) {
                            // txn.executeSql('DROP TABLE IF EXISTS found', []);
                            txn.executeSql('CREATE TABLE IF NOT EXISTS found(id integer primary key autoincrement,product_id varchar(22))', []);
                            // txn.executeSql('DROP TABLE IF EXISTS pending', []);
                            txn.executeSql('CREATE TABLE IF NOT EXISTS pending(id integer primary key autoincrement,product_id varchar(22))', []);
                            // txn.executeSql('DROP TABLE IF EXISTS rejected', []);
                            txn.executeSql('CREATE TABLE IF NOT EXISTS rejected(id integer primary key autoincrement,product_id varchar(22))', []);
                            tx.executeSql(
                                "SELECT DISTINCT product_id FROM found",[], (tx, res) => {
                                    var a=[];
                                    for(let i=0;i<res.rows.length;i++){
                                        console.log("lllllllllllllllllll")
                                        console.log(res.rows.item(i))
                                        a.push(res.rows.item(i))
                                    }
                                    setlistdone(a)
                                })
                        }
                        console.log("3emel found table")
                    }
                    , []);
        })
        // }
    }, [submitted]);
    const gg =()=>{
        console.log("2222222222");
        // console.log(list)
        // setSubmitted(false);
        var filteredArray=[]
        var filteredArraypending=[]
        console.log("fet 2.1")
        for(var y=0;y<listbackup.length;y++){
        filteredArray.push(listbackup[y])
        }
        var f=[]
        // console.log(filteredArray)
        let yFilter = prodidss.map(itemY => { return parseInt(itemY.product_id); });
        listbackup.map((key,value)=>{
            var c=key
            for(var i=0;i<yFilter.length;i++)
            {
                if(yFilter[i]==parseInt(c.id2)){
                    console.log(c.id2)
                    f.push(key)
                }
                else{console.log("no")}
            }
            })
            console.log(f)
        for(var i=0;i<prodidss.length;i++){
            console.log("fet 23.1")
            filteredArray = filteredArray.filter(item => {
            return parseInt(item.id2) === parseInt(prodidss[i].product_id)

            })}
            setLoading(false)
            setList(f)
            // console.log(filteredArray)
            console.log("---------------------------------")
        
        }

    const select = () => {
        setLoading(true)
        setprodidss(null)
        db.transaction(function (tx) {
            console.log("1")
            tx.executeSql(
                "SELECT DISTINCT product_id FROM found",[],
                (tx, res) => {
                    var a=[];
                    for(let i=0;i<res.rows.length;i++){
                        a.push(res.rows.item(i))
                    }
                    // console.log(list)
                    setprodidss(a)
                    setSubmitted(true);
                    gg();
                }
            )
        })
        setPendingClicked(false)
        setFoundClicked(true)
        }
    const selectpending = () => {
        setLoading(true)
        console.log("fetching pending")
        db.transaction(function (tx) {
            tx.executeSql(
                "SELECT DISTINCT product_id FROM pending",[],
                (tx, res) => {
                    var filteredArraypending=[]
                    var i=0;
                    var a=[];
                    for(let i=0;i<res.rows.length;i++){
                        a.push(res.rows.item(i))
                    }
                    console.log(a)
                    var f=[]
                    let yFilter = a.map(itemY => { return parseInt(itemY.product_id); });
                    listbackup.map((key,value)=>{
                        var c=key
                        for(var i=0;i<yFilter.length;i++)
                        {
                            if(yFilter[i]==parseInt(c.id2)){
                                console.log(c.id2)
                                f.push(key)
                            }
                            else{console.log("no")}
                        }
                        })
                        console.log(f)
                        setLoading(false)
                    setList(f);
                    setPendingClicked(true)
                    setFoundClicked(false)
                }
            )
        })
        }
        const selectrejected = () => {
            setLoading(true)
            setprodidss(null)
            console.log("fetching rejected")
            db.transaction(function (tx) {
                tx.executeSql(
                    "SELECT DISTINCT product_id FROM rejected",[],
                    (tx, res) => {
                        var a=[];
                    for(let i=0;i<res.rows.length;i++){
                        a.push(res.rows.item(i))
                    } 
                    console.log("=======a========a===========a==========a");
                    console.log(a)
                    var f=[]
                    let yFilter = a.map(itemY => { return parseInt(itemY.product_id); });
                    listbackup.map((key,value)=>{
                        var c=key
                        for(var i=0;i<yFilter.length;i++)
                        {
                            if(yFilter[i]==parseInt(c.id2)){
                                console.log(c.id2)
                                f.push(key)
                            }
                            else{}
                        }
                        })
                        console.log(f);
                         setLoading(false)
                        setList(f);
                    }
                    
                )
            })
            }
        const Drop = () => {
            console.log("fet dropping")
            db.transaction(function (tx) {
                tx.executeSql(
                    "DROP TABLE IF EXISTS found",[],(tx, res) => {console.log("sucess")}
                ),
                tx.executeSql(
                    "DROP TABLE IF EXISTS pending",[],(tx, res) => {console.log("sucess")}
                ),
                tx.executeSql(
                    "DROP TABLE IF EXISTS rejected",[],(tx, res) => {console.log("sucess")}
                ),
                tx.executeSql(
                    "DROP TABLE IF EXISTS replaced",[],(tx, res) => {console.log("sucess")}
                ),
                tx.executeSql(
                    "DROP TABLE IF EXISTS replaced1",[],(tx, res) => {console.log("sucess")}
                )
            }
            )
        }
    function toogleCheckBox() {
        setIsChecked(!isChecked);
        alert(id)
      }
    const getid=async()=>{
    setUserid(await AsyncStorage.getItem('login'))

    }
    const TakeOrder=()=>{
        // api to take order
        alert("its your order now ! order status from 'ready' to 'taken' ...")
        
    }
    const Confirmed=()=>{
        // api to take order
    alert("Confirmed")
    
    }
    const Pending=()=>{
        // api to take order
    alert("Pending")
    
    }
    const Changed=()=>{
    // api to take order
    alert("Changed")
    
    }
    const All=()=>{
        // api to take order
    alert("All")
    
    }

    const fetchdata = async (i) => {
        setLoading(true)
        let c="https://shofershop.app/api/apix/order2/"+useridrequest+"/"+id;
        await fetch(c)
        .then((response) => response.json())
        .then((json) => { 
            // console.log(json)
            // console.log(c)
            setList(json) ,
            setlistbackup(json),
            // setList(
            //     [{"ProductBulkPrice": null, "ProductDate": "2021-06-07 22:41:54", "ProductPackagePrice": null, "ProductWeightpackage": null, "Productunit": "500 G", "Productunitmeasure": "unit", "Productunitmeasure2": null, "Productunitprice": 750, "branchid": 32, "branchname": "SIDON", "cartid": 60, "cartid2": 60, "conf": "Ready", "created_at": "2021-06-16T12:30:59.000000Z", "des": null, "email": "", "gram": 0, "id": 1, "id2": 60, "mainid": 1, "name": "", "prix": 750, "prodid": 97, "productimage": "https://shofershop.app/images/prod/thumb/1623105714.png", "productname": "Tannourine Mineral Water", "quan": 1, "sess": "", "storename": "walmart", "storid": 44, "totalx": 8806, "unitmeasure": "unit", "unitmeasure2": "null", "updated_at": "2021-06-16T12:30:59.000000Z", "userid": 30, "userid2": 49}, {"ProductBulkPrice": null, "ProductDate": "2021-06-07 22:41:5sv4", "ProductPackagePrice": null, "ProductWeightpackage": null, "Productunit": "55500 G", "Productunitmeasure": "unit", "Productunitmeasure2": null, "Productunitprice": 990, "branchid": 32, "branchname": "TYRE", "cartid": 65, "cartid2": 65, "conf": "Ready", "created_at": "2021-06-16T12:30:59.000000Z", "des": null, "email": "", "gram": 10, "id": 2, "id2": 63, "mainid": 1, "name": "", "prix": 7850, "prodid": 7, "productimage": "https://shofershop.app/images/prod/thumb/1623105714.png", "productname": "Tannourine Mineral Water", "quan": 1, "sess": "", "storename": "walmart", "storid": 44, "totalx": 8806, "unitmeasure": "unit", "unitmeasure2": "null", "updated_at": "2021-06-16T12:30:59.000000Z", "userid": 30, "userid2": 49},{"ProductBulkPrice": null, "ProductDate": "2021-06-07 22:41:54", "ProductPackagePrice": null, "ProductWeightpackage": null, "Productunit": "500 G", "Productunitmeasure": "unit", "Productunitmeasure2": null, "Productunitprice": 750, "branchid": 32, "branchname": "SIDON", "cartid": 60, "cartid2": 60, "conf": "Ready", "created_at": "2021-06-16T12:30:59.000000Z", "des": null, "email": "", "gram": 0, "id": 1, "id2": 60, "mainid": 1, "name": "", "prix": 750, "prodid": 9, "productimage": "https://shofershop.app/images/prod/thumb/1623105714.png", "productname": "neral Water", "quan": 5, "sess": "", "storename": "walmart", "storid": 44, "totalx": 8806, "unitmeasure": "unit", "unitmeasure2": "null", "updated_at": "2021-06-16T12:30:59.000000Z", "userid": 30, "userid2": 49}]
            // ),
            // setlistbackup(
            //     [{"ProductBulkPrice": null, "ProductDate": "2021-06-07 22:41:54", "ProductPackagePrice": null, "ProductWeightpackage": null, "Productunit": "500 G", "Productunitmeasure": "unit", "Productunitmeasure2": null, "Productunitprice": 750, "branchid": 32, "branchname": "SIDON", "cartid": 60, "cartid2": 60, "conf": "Ready", "created_at": "2021-06-16T12:30:59.000000Z", "des": null, "email": "", "gram": 0, "id": 1, "id2": 60, "mainid": 1, "name": "", "prix": 750, "prodid": 97, "productimage": "https://shofershop.app/images/prod/thumb/1623105714.png", "productname": "Tannourine Mineral Water", "quan": 1, "sess": "", "storename": "walmart", "storid": 44, "totalx": 8806, "unitmeasure": "unit", "unitmeasure2": "null", "updated_at": "2021-06-16T12:30:59.000000Z", "userid": 30, "userid2": 49}, {"ProductBulkPrice": null, "ProductDate": "2021-06-07 22:41:5sv4", "ProductPackagePrice": null, "ProductWeightpackage": null, "Productunit": "55500 G", "Productunitmeasure": "unit", "Productunitmeasure2": null, "Productunitprice": 990, "branchid": 32, "branchname": "TYRE", "cartid": 65, "cartid2": 65, "conf": "Ready", "created_at": "2021-06-16T12:30:59.000000Z", "des": null, "email": "", "gram": 10, "id": 2, "id2": 63, "mainid": 1, "name": "", "prix": 7850, "prodid": 7, "productimage": "https://shofershop.app/images/prod/thumb/1623105714.png", "productname": "Tannourine Mineral Water", "quan": 1, "sess": "", "storename": "walmart", "storid": 44, "totalx": 8806, "unitmeasure": "unit", "unitmeasure2": "null", "updated_at": "2021-06-16T12:30:59.000000Z", "userid": 30, "userid2": 49},{"ProductBulkPrice": null, "ProductDate": "2021-06-07 22:41:54", "ProductPackagePrice": null, "ProductWeightpackage": null, "Productunit": "500 G", "Productunitmeasure": "unit", "Productunitmeasure2": null, "Productunitprice": 750, "branchid": 32, "branchname": "SIDON", "cartid": 60, "cartid2": 60, "conf": "Ready", "created_at": "2021-06-16T12:30:59.000000Z", "des": null, "email": "", "gram": 0, "id": 1, "id2": 60, "mainid": 1, "name": "", "prix": 750, "prodid": 9, "productimage": "https://shofershop.app/images/prod/thumb/1623105714.png", "productname": "neral Water", "quan": 5, "sess": "", "storename": "walmart", "storid": 44, "totalx": 8806, "unitmeasure": "unit", "unitmeasure2": "null", "updated_at": "2021-06-16T12:30:59.000000Z", "userid": 30, "userid2": 49}]
            // ),
            setLoading(false)
            console.log("fet be l fetch data kela ")
            db.transaction(function (tx) {
                tx.executeSql(
                    "SELECT DISTINCT product_id FROM found",[],
                    (tx, res) => {
                        var a=[];
                        for(let i=0;i<res.rows.length;i++){
                            a.push(res.rows.item(i))
                        }
                        console.log(a)
                        setlistfound(a)
                    }
                )
            })
            db.transaction(function (tx) {
                tx.executeSql(
                    "SELECT DISTINCT product_id FROM rejected",[],
                    (tx, res) => {
                        var a=[];
                        for(let i=0;i<res.rows.length;i++){
                            a.push(res.rows.item(i))
                        }
                        console.log("kddddddddddddddddddddddddddddddddddddddddddddddddddddd")
                        console.log(a)
                        setlistrejected(a)
                    }
                )
            })
            console.log("==============================llllll===========================================")
        //    console.log("===-=-=-=-=-=-=-") 
        })
        .catch((error) =>  {console.log(error) ,setLoading(true)} )
    }



        // .filter(item => item.cart5s.id ==id)
    return (
       <ScrollView >
           <View style={{display:(isloading==true)?"flex":"none",alignContent:"center",justifyContent:"center",height:"100%" }}>
            <Progress />
          </View>
          <View style={{display:(isloading==true)?"none":"flex"}}>
                <View style={{padding:20,alignSelf:"center"}}>
                    <Text style={{fontSize:30,color:"red"}}>Products in the cart</Text>
                </View> 
                {console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}")}
                {console.log(list)}
                {console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}")}
                <View style={{alignItems:"center"}}>
                    <Text style={{color:"red",fontSize:isloading==true?null:list.length==0?30:null}}>{isloading==true?null:list.length==0?"List is empty":null}</Text>
                </View>
                <View style={{display:(isloading==true)?"none":"flex", }} >
                    {isloading==true?null:list.map((key,value)=>{
                            return (
                                <TouchableOpacity 
                                disabled={listfound?listfound.some(cred => cred.product_id === ""+key.id2)?true:listrejected?listrejected.some(cred => cred.product_id === ""+key.id2)?true:false:false:
                                listrejected?listrejected.some(cred => cred.product_id === ""+key.id2)?true:false:false
                            }
                                style={{display:(startDate=="Start Picking")?"none":"flex",padding:30 ,borderBottomWidth:1,backgroundColor:listfound?listfound.some(cred => cred.product_id === ""+key.id2)?"green":listrejected?listrejected.some(cred => cred.product_id === ""+key.id2)?"red":"white":null:
                                        listrejected?listrejected.some(cred => cred.product_id === ""+key.id2)?"red":"white":"white"}}
                                onPress={()=>{navigation.navigate('ViewSingleItem',{
                                    productimage: key.productimage,
                                    prodid: key.prodid,
                                    quan: key.quan,
                                    des: key.des,
                                    storname: key.storname,
                                    branchname: key.branchname,
                                    branchid: key.branchid,
                                    Productunitprice:key.Productunitprice,
                                    Productunitmeasure2:key.Productunitmeasure2,
                                    ProductBulkPrice:key.ProductBulkPrice,
                                    ProductPackagePrice:key.ProductPackagePrice,
                                    totalx: key.totalx,
                                    conf:key.conf,
                                    created_at:key.created_at,
                                    mainid:key.mainid,
                                    id:key.id,
                                    idprimary:key.id2,
                                    userid:key.userid,
                                    lista:list,
                                    prodidss:prodidss
                                })}}
                                >
                                      {console.log(key.id2)}
                            {console.log(listfound?listfound.some(cred => cred.product_id === ""+key.id2)?true:false:
                                listrejected?listrejected.some(cred => cred.product_id === ""+key.id2)?true:false:false)}
                                    <View style={{flex:1,flexDirection:"row"}}>
                                    {/* <Text>{listfound?listfound.some(cred => cred.product_id === ""+key.id2)?"yes":"no":null}</Text> */}
                                        <View style={{width:"45%",borderWidth:1}}>
                                            <Image source={{uri: key.productimage}} style={{ width: "100%", height: "100%" }}/>
                                        </View>
                                        <View style={{width:"50%",backgroundColor:"white"}}>
                                            <View style={{alignSelf:"center",paddingLeft:10}}>
                                                <Text>prod id :{key.id2}</Text>
                                                <Text>quan: {key.quan}</Text>
                                                <Text>dess: {key.des}</Text>
                                                <Text>store name: {key.storname}</Text>
                                                <Text>branch name: {key.branchname}</Text>
                                                <Text>totalx: {key.totalx}</Text>
                                            </View>
                                            <View style={{borderWidth:1,borderColor:"red",paddingVertical:10}}>

                                                <Text>order status :{key.conf}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Text style={{alignSelf:"flex-end",fontSize:10,paddingTop:10}}>purchased at: {key.created_at}</Text>
                                </TouchableOpacity>
                            )
                    })}
                </View>
                <View >
                    <TouchableOpacity 
                        style={{ display:(startDate=="Start Picking")?"none":"flex",margin:5,padding:5,alignItems:"center",backgroundColor:"red",}}
                        onPress={()=>{select()}}
                        >
                            <Text style={{color:"white",paddingVertical:15,fontSize:20}}>
                                Found
                            </Text>
                    </TouchableOpacity> 
                    <TouchableOpacity 
                        style={{ display:(startDate=="Start Picking")?"none":"flex",margin:5,padding:5,alignItems:"center",backgroundColor:"red"}}
                        onPress={()=>{selectpending()}}
                        >
                            <Text style={{color:"white",paddingVertical:15,fontSize:20}}>
                                Pending
                            </Text>
                    </TouchableOpacity> 
                    <TouchableOpacity 
                        style={{ display:(startDate=="Start Picking")?"none":"flex",margin:5,padding:5,alignItems:"center",backgroundColor:"red"}}
                        onPress={()=>{selectrejected()}}
                        >
                            <Text style={{color:"white",paddingVertical:15,fontSize:20}}>
                                Rejected
                            </Text>
                    </TouchableOpacity> 
                    <TouchableOpacity 
                        style={{ display:(startDate=="Start Picking")?"none":"flex",margin:5,padding:5,alignItems:"center",backgroundColor:"red"}}
                        onPress={()=>{Drop()}}
                        >
                            <Text style={{color:"white",paddingVertical:15,fontSize:20}}>
                                Drop
                            </Text>
                    </TouchableOpacity> 
                    <TouchableOpacity 
                        style={{ display:(startDate=="Start Picking")?"none":"flex",margin:5,padding:5,alignItems:"center",backgroundColor:"red"}}
                        onPress={()=>{fetchdata()}}
                        >
                            <Text style={{color:"white",paddingVertical:15,fontSize:20}}>
                                ALL
                            </Text>
                    </TouchableOpacity> 
                    <TouchableOpacity 
                        style={{margin:5,padding:5,alignItems:"center",backgroundColor:"red"}}
                        onPress={()=>{
                            var hours = new Date().getHours(); //Current Hours
                            var min = new Date().getMinutes(); //Current Minutes
                            console.log(startDate)
                            var hours1 =  startDate=="Start Picking"?null:currentDate[0]["hours"] //Current Hours
                            var hours2 = startDate=="Start Picking"?null:hours //Current Hours
                            var min1 =  startDate=="Start Picking"?null:currentDate[0]["min"] //Current Minutes
                            var min2 = startDate=="Start Picking"?null:min //Current Minutes
                            var total_hours=startDate=="Start Picking"?null:parseInt(hours2)-parseInt(hours1)
                            var total_min=startDate=="Start Picking"?null:parseInt(min2)-parseInt(min1)
                            var c="hours : "+total_hours+"  | min  : "+total_min
                            var b =[]
                            startDate=="Start Picking"?null:b.push({total_hours,total_min})
                            startDate=="Start Picking"?null:settotaltime(b)

                            var a=[];
                            a.push({hours,min})
                            startDate=="Start Picking"?
                            setCurrentDate(
                                a
                              ):setendDate(
                                a
                              );
                              setstartDate("End Picking")
                        }}
                        >
                            <Text style={{color:"white",paddingVertical:15,fontSize:20}}>
                                {startDate}
                            </Text>
                    </TouchableOpacity> 
                </View>
                {console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")}
                {console.log(currentDate.map((key,value)=>{return key}))}
                {console.log(endDate.map((key,value)=>{return key}))}
                { console.log(totaltime)}
                {console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")}
                {/* {console.log(list==null?"":list)} */}
            </View>
       </ScrollView>
    )
}
Demo.defaultProps = {

  title: 'product',
  dess: 'text',


};

Demo.propTypes = {

  dess: PropTypes.string,
  title: PropTypes.string,


};