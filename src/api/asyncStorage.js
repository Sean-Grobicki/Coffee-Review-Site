import AsyncStorage from '@react-native-async-storage/async-storage';

const ID_KEY = '@id';
const SESSION_KEY = '@sessionKey';

const storeData = async(id,session) =>
{
    try 
    {
        await AsyncStorage.setItem(ID_KEY,`${id}`);
        await AsyncStorage.setItem(SESSION_KEY,`${session}`);
    } 
    catch (error) 
    {
        console.log(error.message);
    }
}


const getUserID = async() =>
{
    try 
    {
        return await AsyncStorage.getItem(ID_KEY).then((value) =>{
        if(value)
        {
            return value;
        }
    });

    } catch (error)
    {       
        console.log(error.message);
    }
}

const getToken = async() => 
{
    try 
    {
    return await AsyncStorage.getItem(SESSION_KEY).then((value) =>{
        if(value)
        {
            return value;
        }
        });

    } catch (error)
    {
        console.log(error.message);
    }
}


module.exports =
{
    storeData: storeData,
    getUserID: getUserID,
    getToken: getToken,
};

