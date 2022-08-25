import './App.css';
import * as d3 from 'd3';
import { useEffect } from 'react'


function App() {

    useEffect(() =>{

        let dataSet = [
            {subject: "Dogs", count: 150},
            {subject: "Fish", count: 75},
            {subject: "Cats", count: 135},
            {subject: "Bunnies", count: 240}
        ]

        d3.select('#pgraphs')
          .selectAll('p')
          .data(dataSet)
          .enter()
          .append('p')
          .text(dt => dt.subject + ": " + dt.count)

        // Bar Chart:
        const getMax = () => {
            let max = 0
            dataSet.forEach((dt) => {
                if(dt.count > max) {max = dt.count}
            })
            return max
        }
                      
        d3.select('#BarChart')
          .selectAll('div')
          .data(dataSet) 
          .enter()
          .append('div')
          .classed('bar', true)
          .style('height', `${getMax()}px`)
      
          
        d3.select('#BarChart')
          .selectAll('.bar')
          .transition()
          .duration(1000)
          .style('height', bar => `${bar.count}px`)
          .style('width', '80px')
          .style('margin-right', '10px')
          .delay(300)


        // Line Graph        
        let lineData = []
        for(let i = 0; i < 15; i++) {
           lineData.push({x: i + 1, y: Math.round(Math.random() * 100)})
        }
   
        let xScale = d3.scaleLinear().domain([0,15]).range([0, 300])
        let yScale = d3.scaleLinear().domain([0,100]).range([300, 0])
        
        let line = d3.line()
         .x(dt => xScale(dt.x))
         .y(dt => yScale(dt.y))
        
        let xAxis = d3.axisBottom(xScale)
        let yAxis = d3.axisLeft(yScale)
       
        d3.select('#LineChart')
          .selectAll('path')
          .datum(lineData) 
          .attr('d', d3.line().x(dt => xScale(dt.x)) 
          .y(yScale(0)))
          .attr("stroke", "blue")
          .attr('fill', 'none')      
       
        d3.select('#LineChart')
          .selectAll('path')
          .transition()
          .duration(1000) 
          .attr('d', line) 
                
        d3.select('#LineChart')
          .append("g")
          .attr("transform", "translate(0, " + 300 + ")")
          .call(xAxis)
   
        d3.select('#LineChart')
          .append("g")
          .attr("transform", "translate(0, 0)")
          .call(yAxis)

    },[])

    return (
        <div className="App">
            <div id="pgraphs"></div>
            <div id="BarChart"></div>
            <svg id="LineChart" width = {350} height = {350}><path/></svg>
        </div>
    );
}

export default App;
