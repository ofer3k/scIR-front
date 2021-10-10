import axios from 'axios'

const getAllData=async()=>{
    try {
        console.log('here')
        const data=await axios.get('http://localhost:8000/getData',{
            headers: {
                'Access-Control-Allow-Origin': true,
              }
        })
        console.log(data,'data')
        return data        
    } catch (error) {
        return error
    }
}
const getDataForNeighborhood=async(neighborhood)=>{
    try {
        console.log(neighborhood,'not server')
        const res=await axios.post('http://localhost:8000/dataOfNeighborhood', {neighborhood})
    return res
    } catch (error) {
    return error    
    }
}


const getDataForCounty=async(county)=>{
    try {
        console.log(county,'not server')
        const res=await axios.post('http://localhost:8000/dataOfCounty', {county})
    return res
    } catch (error) {
    return error    
    }
}
const getDataForCountyAndRoom=async(county,room)=>{
    try {
        console.log(county,room,'not server')
        const res=await axios.post('http://localhost:8000/dataOfCountyAndRoom', {county,bedrooms:room})
    return res
    } catch (error) {
    return error    
    }
}

const getValueForCountyAndRoom=async(county,room)=>{
    try {
        const res=await axios.post('http://localhost:8000/dataOfNeighborhoodRoomsRent', {county,bedrooms:room})
    return res
    } catch (error) {
    return error    
    }
}

export {
    getValueForCountyAndRoom,
    getDataForCountyAndRoom,
    getDataForCounty,
    getDataForNeighborhood,
    getAllData
}