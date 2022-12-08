import React from "react";

class UserLocator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      attractions: []
    };
  }

  componentDidMount() {
    // Determine the user's location
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Use the OpenCageData API to reverse geocode the latitude and longitude
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=7a3b7563519143d38aa695f536db3eb5`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          const location = data.results[0].formatted;
          this.setState({ location });

          // Use the OpenTripMap API to find the top attractions near the location
          fetch(
            `https://api.opentripmap.com/0.1/en/places/radius?radius=50000&lon=${longitude}&lat=${latitude}&limit=10&apikey=5ae2e3f221c38a28845f05b6e879c2baf66bb6e98d5a79033e402898`
          )
            .then((response) => response.json())
            .then((attractions) => {
              console.log("attractions", attractions);
              this.setState({ attractions: attractions.features });
            });
        });
    });
  }

  render() {
    console.log(this.state.attractions);
    return (
      <div>
        {this.state.location && (
          <h2>Top Attractions near {this.state.location}</h2>
        )}
        <ul>
          {this.state.attractions.map((attraction) => (
            <li key={attraction.id}>
              <h3>{attraction.properties.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserLocator;
