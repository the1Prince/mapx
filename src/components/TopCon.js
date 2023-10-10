import { Container, Stack, Badge, Button, Form, FormControl,option } from "react-bootstrap";
import { MapContainer, Marker, TileLayer, Popup, Circle, CircleMarker, useMap} from "react-leaflet";
import { Icon, icon } from "leaflet";
import { useState, useEffect, useMemo, useRef, useCallback, createContext } from "react";
import 'leaflet/dist/leaflet.css'
import data from '../fac.json'
import Analysis from "./Analysis";

const description= createContext(null)
// --- (6) Create a custom marker ---
const customIcon = new Icon({
    iconUrl: '/location.png',
    iconSize: [30, 30],
    // iconAnchor: [1, 1],
    // popupAnchor: [-0, -76]
  })

const TopCon = ()=>{
    const markerRef = useRef(null)
    const reg = useRef(null)
    const [draggable, setDraggable] = useState(false)
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [position, setPosition] = useState([])
    const [region, setRegion] = useState([])
    const [details, setDetails] = useState([])
    const [simpAnalysis, setSimpAnalysis] = useState([])
    
    


    

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
            
          }
        },
      }),
      [],
    )
    /*const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, []) */

    



    const regSelected = useCallback(()=>{
      
      region.length = 0
      details.length = 0
      
      for(var i =0; i<data.length;i++){
        
        if(data[i].Region == reg.current.value){
          /*setDetails(details.push({'District':data[i].District, 'FacilityName':data[i].FacilityName, 
          'Type':data[i].Type, 'Town':data[i].Town, 'Ownership':data[i].Ownership}))*/
          setRegion(region.push({'District':data[i].District,'FacilityName':data[i].FacilityName,'Type':data[i].Type,
          'Town':data[i].Town,'Ownership':data[i].Ownership,'latlng':[data[i].Latitude, data[i].Longitude]}))
         
        }

        
      }
      
      
      //setGov(gov)
      
      setPosition(region)
      
      /*console.log(position)
      console.log(details[6])*/
      
    },[])

    


   

    const getLocation = ()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition( pos=>{
                setLatitude(pos.coords.latitude)
                setLongitude(pos.coords.longitude)
                //setPosition([pos.coords.latitude,pos.coords.longitude])
                /*console.log('lat---'+pos.coords.latitude+' long----'+pos.coords.longitude)
                console.log(latitude+ '  '+longitude)*/
                /*setPosition([pos.coords.latitude, pos.coords.longitude])
                console.log(position)*/
                /*for(var i =0; i<data.length;i++){
                  setPosition(position.push([data[i].Latitude, data[i].Longitude]))
                }
                console.log(position)*/
            }, console.log('not granted'))
        }
        else{
            console.log('update your browser')
        }
    }

    useEffect(()=>{
        getLocation()
        
        
    },[])
    return(
      <description.Provider value={position}>
      <div className="row" ><div className="col-sm-8" style={{height:'100%'}}>
        <div style={{height:'700px', backgroundColor:'#ded5e2'}}>
        
       {/* --- (5) Add leaflet map container --- */}
      <div className='map'>
      <MapContainer center={[7.408010 ,-1.963170]} zoom={13} scrollWheelZoom={true} style={{width:'100%', height:'100%'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // --- (7) Alternative map style (attribution and url copied from the leaflet extras website) ---
          // attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          // url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
          // --- -------------------------------------------------------------------------------------- ---
        />
        {position.map((markerposition, i)=>{
          return(
            <CircleMarker center={markerposition.latlng} pathOptions='blue' radius={20} key={i}>
        <Marker key={i} position={markerposition.latlng} icon={customIcon} draggable={false} eventHandlers={eventHandlers} ref={markerRef}>
        
          <Popup>
          <span >
          
             <strong>{markerposition.FacilityName +'\n'}</strong>
             <hr></hr>
              <p>{'district: '+markerposition.District +'\n'}</p>
              <p>{'type: '+ markerposition.Type +'\n'}</p>
              <p>{'town: '+ markerposition.Town +'\n'}</p>
              <p>{'owned by: '+ markerposition.Ownership}</p>
            
          </span>
          </Popup>
        </Marker>
        </CircleMarker>
          )
        })}
        
      </MapContainer>
      {/* --- ---------------------------- --- */}

      </div>
        
        </div>

        </div>
        
        <div className="col-sm-4" style={{paddingRight:'2%', overflowY:'scroll'}}>
          <Form style={{marginTop:'3%'}}>
            
            <Form.Select aria-label="Default select example" ref={reg} onChange={regSelected}>
              <option>Open this select menu</option>
              <option value="Ashanti">Ashanti</option>
              <option value="Brong Ahafo">Brong Ahafo</option>
              <option value="Central">Central</option>
              <option value="Eastern">Eastern</option>
              <option value="Greater Accra">Greater Accra</option>
              <option value="Northern">Northern</option>
              <option value="Upper East">Upper East</option>
              <option value="Upper West">Upper West</option>
              <option value="Volta">Volta</option>
              <option value="Western">Western</option>
            </Form.Select>
            
          </Form>
          {position.length>0?
        <Analysis></Analysis>:
        <p>select a region</p>
      }
        
        </div>
        </div>
        </description.Provider>
    )

}
export default TopCon
export {description}