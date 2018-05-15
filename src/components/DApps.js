import React from 'react';
import '../App.css';
import {
    Link,
} from 'react-router-dom'
import DAppItems from "./DAppItems"
import DAppTopCards from "./DAppTopCards"
import { TrustClient } from "../network/TrustClient"
import getWeb3 from '../utils/provider'

class DApps extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.trustClient = new TrustClient()
    }

    fetch() {
        let network = parseInt(getWeb3().version.network, 10)
        this.trustClient.fetchBootstrap(network).then(response => {
            this.setState({ data: response.data.docs });
        });
    }

    componentWillMount() {
        this.fetch()
    }

    render() {
        const elements = this.state.data || []
       
        const sliderElements = elements.filter(function(item){
            if (item.category.name.toLowerCase() == "new dapps")
            return item;
        });
        
        return (
            <div>
                <div className="TopSlider">
                    <h4>New DApps</h4>
                    {sliderElements.map((element, index) => (
                            <DAppTopCards key={element} items={element.results} />
                    ))}
                </div>
                <div className="DApps">
                    {elements.map((element, index) => (
                        <div key={element.category._id}>
                            <Link to={"category/" + element.category._id}>
                                <h2 className="categories">{element.category.name}</h2>
                            </Link>
                            <DAppItems key={element} items={element.results} />
                        </div>
                    ))}
                </div>
                <Footer configuration={{ show: (elements.length !== 0) }} />
            </div>
        )
    }
}

class Footer extends React.Component {
    render() {
        const show = this.props.configuration.show
        if (show) {
            return (
                <div>
                    <hr />
                    <div className="footer">
                        <center>
                            We do not control, or endorse the Dapps listed, simply provide them as a list of convenience for you. Please investigate and Play at your own Risk.
                        </center>
                        <center>
                            <Link className="contact-us-link" to="/contact-us">
                                Contact Us 
                            </Link>
                        </center>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default DApps;
