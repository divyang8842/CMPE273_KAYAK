import React, {Component} from 'react';
//import * as API from '../api/api';
import {connect} from 'react-redux';
//import CheckBox from 'react-native-checkbox';
//var Slider = require('react-native-slider');


class Results extends Component {

    state ={
        airlines :['airindia','airasia','luftansa','jetblue','emirates'],
        checkbox_airindia:1
    };

    flights()
    {
        var flight_flag=false;
        var duration ;

        return this.props.flights.map((flights,index) =>{

            // Filter Condition for AIRLINES
            var array =this.state.airlines;

            duration = new Date("01/01/2007 " + flights.flights.flight_arrival).getHours() - new Date("01/01/2007 " + flights.flights.flight_departure).getHours();

            for (var i=0;i<array.length;i++)
            {
                if(array[i] == flights.flights.airline_name)
                {
                    flight_flag= true;

                }
            }

            if (flight_flag){
                flight_flag= false;

                if( duration> 0)
                {
                    if(flights.flights.totalprice > 20)
                    {
                        return(
                            <tr>
                                <td>
                                    {flights.flights.airline_name}
                                </td>
                                <td>
                                    {flights.flights.origin_station}
                                </td>
                                <td>
                                    {flights.flights.destination_station}
                                </td>
                                <td>
                                    {flights.flights.flight_departure}
                                </td>
                                <td>
                                    {flights.flights.flight_arrival}
                                </td>
                                <td>
                                    {flights.flights.totalprice}
                                </td>
                            </tr>
                        )
                    }
                }



        }

        });
    }

    render()
    {
        return(
            <div className="container-fluid">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>

                <div className="col-sm-2 col-lg-2 col-md-2 col-xs-2" >


                    <h3>Air Lines</h3>
                    <form>
                        <div>
                            <input type="checkbox"
                                    id="airindia"
                                    name="airindia"
                                    value="airindia"
                                    onClick={(event) => {

                                        if ( this.state.checkbox_airindia = 1){
                                        var temp = this.state.airlines;
                                        var index = temp.indexOf(event.target.value);
                                        temp.splice(index,1);
                                        console.log(temp);
                                        this.setState(Object.assign({},this.state,{airlines:temp}));
                                            this.setState({
                                                checkbox_airindia: 0
                                            });

                                        this.flights();
                                        }
                                        else
                                        {
                                            var temp = this.state.airlines;
                                            temp.push(event.target.value);
                                            console.log(temp);
                                            this.setState(Object.assign({},this.state,{airlines:temp}));
                                            this.setState(Object.assign({},this.state,{checkbox_airindia:1}));
                                            this.flights();
                                        }
                                    }}
                                   checked
                                />
                                <label for="airindia">Air India</label>
                        </div>
                        <div>
                            <input type="checkbox"
                                   id="airasia"
                                   name="airasia"
                                   value="airasia"
                                   checked/>
                            <label for="airasia">Air Asia</label>

                        </div>
                        <div>
                            <input type="checkbox"
                                   id="emirates"
                                   name="emirates"
                                   value="emirates"
                                   checked/>
                            <label for="emirates">Emirates</label>

                        </div>
                        <div>

                            <input type="checkbox"
                                    id="jetblue"
                                   name="jetblue"
                                    value="jetblue"
                                   checked/>
                            <label for="jetblue">Jet Blue</label>
                        </div>

                    </form>

                    <h3>Duration</h3>


                </div>
                <div className="col-sm-10 col-lg-10 col-md-10 col-xs-10" >
                    <div className="row">
                    <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6" >
                        <button className="btn btn-primary btn-block" >
                            PRICE
                        </button>
                    </div>
                    <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6" >
                        <button className="btn btn-primary btn-block" >
                            DURATION
                        </button>
                    </div>
                </div>
                <div className="row">

                    <table >

                        <tbody>

                        {this.flights()}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const flights = Object.keys(state.getflights).map((items) => (
        {
            'flights' : state.getflights[items]


        }
    ));
    return {flights};
}

//export default Results;

export default connect(mapStateToProps, null)(Results);