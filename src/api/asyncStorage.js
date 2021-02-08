

const ID_KEY = '@id';
const SESSION_KEY = '@sessionKey';

class Storage
{
    static async storeData(id,session)
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


    static async getUserID()
    {
        try 
        {
        await AsyncStorage.getItem(ID_KEY).then((value) =>{
            if(value)
            {
                return value;
            }
        });

        } catch (error) {
            console.log(error.message);
        }
    }

    static async getToken()
    {
        try 
        {
        await AsyncStorage.getItem(SESSION_KEY).then((value) =>{
            if(value)
            {
                return value;
            }
            });

        } catch (error) {
            console.log(error.message);
        }
    }


}


export default Storage;