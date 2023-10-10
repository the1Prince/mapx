import { Container, Card, Stack, Badge } from "react-bootstrap";
import { useContext, useMemo, useEffect, useState, useCallback } from "react";
import { description } from "./TopCon";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";


//initialise chartJS
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale,BarElement,Title);



const Analysis = ()=>{
    const pos = useContext(description)
    var type =[] // an array of type of facilities
    var typeCount =[] // an array of unique facility names
    var typeValue = {} //object containing facility and its corresponding total in the region
    var typeBarData = [] //an array of number of facilities in a region
   

    //get a unique array of facility type
    const uniqueType = ()=>{
        type = pos.map(ele=>ele.Type)
        typeCount = new Set(type)
        //console.log(typeCount)
    } 

    //get an object containing facilities and their corresponding total in a region
    const typeRecord = ()=>{
        type.forEach(ele=>{
            if(typeValue[ele]){
                typeValue[ele] +=1
            }else{
                typeValue[ele] =1
            }
        })
        //console.log(typeValue)
    }


    // get the individual head counts of each facility
    const typeBarValue = ()=>{
        typeBarData = Object.values(typeValue)
        console.log(typeBarData)
    }

    
    
    var gov =0
    var quasigov=0
    var chag=0
    var p=0


    
    

    //console.log(uniqueType)

    // get the total count of each facility type in the region
    for(var i =0; i < pos.length; i++){
        if(pos[i].Ownership == 'Government'){
            gov = gov + 1
           
            
        }
        if(pos[i].Ownership == 'Quasi-Government'){
            quasigov = quasigov + 1
            
            
        }
        if(pos[i].Ownership == 'CHAG'){
            chag = chag + 1
            
            
        }
        if(pos[i].Ownership == 'Private'){
            p = p + 1
            
            
        }
        
    }

    uniqueType()
    typeRecord ()
    typeBarValue ()

    //doughnut chart
    const data = {
        labels: ['Government', 'Quasi-Government', 'CHAG', 'Private'],
        datasets: [
          {
            data: [gov, quasigov, chag, p],
            backgroundColor: [
             'rgb(131, 58, 180)',
              "rgb(255,232,157)",
              "rgb(236,107,109)",
              "rgb(122,231,125)",
              "rgb(195,233,151)"
              
            ],
            hoverBackgroundColor: ["#22c1c3", '#c322ae', "#36A2EB", "#FFCE56"]
          }
        ],
       
        plugins: {
          labels: {
            render: "percentage",
            fontColor: ["green", "white", "red"],
            precision: 2
          },
        },
         text: "23%",
      };
    //doughnut chart ends here
    

      //bar chart
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Type of Facility distributuion',
          },
        },
      };

      const label= Object.keys(typeValue)

      const barData = {
        labels:label,
        datasets: [
          {
            label: 'Number of facility',
            data: typeBarData,
            backgroundColor: 'rgba(131, 58, 180, 0.5)',
          },
          
        ],
      }
      // bar chart ends here

    return(
        <>
            <Badge style={{marginTop:'4%'}}>Ownership</Badge>
            <Stack direction="horizontal" gap={2} style={{marginTop:'2%'}}>
                <Card style={{width:'25%',padding:'2%','background': 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)', border:'none', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', textAlign:'center'}}>
                    
                    <h5>{gov}</h5>
                    <p style={{fontSize:'70%'}}>Government</p>
                </Card>
                <Card style={{width:'25%',padding:'2%','background': 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)', border:'none', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', textAlign: 'center'}}>
                <h5>{quasigov}</h5>
                <p style={{fontSize:'65%'}}>Quasi-Government</p>
                </Card>
                <Card style={{width:'25%',padding:'2%','background': 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)', border:'none', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', textAlign: 'center'}}>
                <h5>{chag}</h5>
                <p style={{fontSize:'70%'}}>CHAG</p>
                </Card>
                <Card style={{width:'25%',padding:'2%','background': 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)', border:'none', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', textAlign: 'center'}}>
                <h5>{p}</h5>
                <p style={{fontSize:'70%'}}>Private</p>
                </Card>
            </Stack>
            <Card style={{marginTop:'5%', width:'70%', marginLeft:'18%'}}>
            <Doughnut data={data} />
            </Card>
            <Card style={{marginTop:'5%', marginBottom:'5%'}}>
            <Bar options={options} data={barData} />
            </Card>
        </>
    )
}
export default Analysis